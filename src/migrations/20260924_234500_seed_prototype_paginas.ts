import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'
import type { CollectionSlug, Payload, PayloadRequest } from 'payload'

/**
 * Builds the prototype pages (legacy-prototype in the Parkingyou repo) out of
 * the prototype section blocks: Home, Locaties, Evenementen, Abonnementen,
 * ParkingPass, Zakelijk and Over ons.
 *
 * - Pages: created, or, for the placeholder pages the first seed made
 *   (abonnementen, parkingpass, zakelijk, over-ons), their hero and layout are
 *   replaced. All seven are published: the copy is the prototype's, with only
 *   the sentences that talked about the prototype itself rewritten.
 * - Header and footer: set to the prototype's menu and footer columns.
 * - Forms: one Form Builder form per prototype form, so submissions are stored.
 * - Events: the prototype's five events, as drafts (their dates are in the
 *   past); the two the first seed made only get their empty fields filled.
 * - Photos: the prototype's Unsplash photos are downloaded into Media. When a
 *   download fails the block renders without that photo; nothing else fails.
 */

type Ctx = { payload: Payload; req: PayloadRequest }
type Id = number | string

const log = (payload: Payload, msg: string) => payload.logger.info(`seed prototype: ${msg}`)

function lexical(children: Array<{ type: 'h2' | 'p'; text: string }>) {
  return {
    root: {
      type: 'root',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children: children.map((c) =>
        c.type === 'h2'
          ? {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', version: 1, text: c.text }],
            }
          : {
              type: 'paragraph',
              version: 1,
              children: [{ type: 'text', version: 1, text: c.text }],
            },
      ),
    },
  }
}

async function findOne(
  { payload, req }: Ctx,
  collection: CollectionSlug,
  where: Record<string, unknown>,
) {
  const { docs } = await payload.find({
    collection,
    where: where as never,
    limit: 1,
    depth: 0,
    draft: true,
    overrideAccess: true,
    req,
  })
  return (docs[0] as unknown as Record<string, unknown> & { id: Id; _status?: string }) ?? null
}

// --- Photos ------------------------------------------------------------------

export const FOTOS = {
  parkeerterrein: {
    url: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1600&q=80',
    alt: "Auto's op een parkeerterrein, van bovenaf",
  },
  garage: {
    url: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=1600&q=80',
    alt: "Auto's in een verlichte parkeergarage",
  },
  glow: {
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
    alt: 'Publiek bij een avondevenement',
  },
  psv: {
    url: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=1400&q=80',
    alt: 'Voetbalstadion met publiek',
  },
  markthal: {
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80',
    alt: 'Overdekte markt met eetkraampjes',
  },
  museum: {
    url: 'https://images.unsplash.com/photo-1567449303078-57ad995bd17f?auto=format&fit=crop&w=1400&q=80',
    alt: 'Museumzaal',
  },
  kerstmarkt: {
    url: 'https://images.unsplash.com/photo-1482402668576-5a4f3f50e0a4?auto=format&fit=crop&w=1400&q=80',
    alt: 'Kerstmarkt met lichtjes',
  },
} as const

type FotoKey = keyof typeof FOTOS

async function laadFotos(ctx: Ctx): Promise<Partial<Record<FotoKey, Id>>> {
  const ids: Partial<Record<FotoKey, Id>> = {}
  for (const [key, foto] of Object.entries(FOTOS) as [FotoKey, (typeof FOTOS)[FotoKey]][]) {
    const filename = `prototype-${key}.jpg`
    const bestaand = await findOne(ctx, 'media', { filename: { equals: filename } })
    if (bestaand) {
      ids[key] = bestaand.id
      continue
    }
    try {
      const res = await fetch(foto.url, { signal: AbortSignal.timeout(20000) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = Buffer.from(await res.arrayBuffer())
      const doc = await ctx.payload.create({
        collection: 'media',
        data: { alt: foto.alt },
        file: { data, mimetype: 'image/jpeg', name: filename, size: data.length },
        overrideAccess: true,
        req: ctx.req,
      })
      ids[key] = doc.id
      log(ctx.payload, `photo ${filename} uploaded`)
    } catch (err) {
      ctx.payload.logger.warn(`seed prototype: photo ${key} skipped (${(err as Error).message})`)
    }
  }
  return ids
}

// --- Forms -------------------------------------------------------------------

type FormVeld = Record<string, unknown> & { blockType: string; name: string }

async function formulier(
  ctx: Ctx,
  title: string,
  fields: FormVeld[],
  submitButtonLabel: string,
  bevestiging: [string, string],
): Promise<Id> {
  const bestaand = await findOne(ctx, 'forms', { title: { equals: title } })
  if (bestaand) {
    log(ctx.payload, `form "${title}" exists, left untouched`)
    return bestaand.id
  }
  const doc = await ctx.payload.create({
    collection: 'forms',
    data: {
      title,
      fields,
      submitButtonLabel,
      confirmationType: 'message',
      confirmationMessage: lexical([
        { type: 'h2', text: bevestiging[0] },
        { type: 'p', text: bevestiging[1] },
      ]),
    } as never,
    overrideAccess: true,
    req: ctx.req,
  })
  log(ctx.payload, `form "${title}" created`)
  return doc.id
}

const tekst = (name: string, label: string, placeholder: string, required = true): FormVeld => ({
  blockType: 'text',
  name,
  label,
  placeholder,
  required,
})
const email = (placeholder: string): FormVeld => ({
  blockType: 'email',
  name: 'email',
  label: 'E-mail',
  placeholder,
  required: true,
})

// --- Page content --------------------------------------------------------------

const ZOEKBALK = {
  waarLabel: 'Waar',
  waarPlaceholder: 'Stad, garage of adres',
  wanneerLabel: 'Wanneer',
  wanneerWaarde: 'Vandaag 09:00 - 17:00',
  knopLabel: 'Zoek plek',
  doel: '/locaties',
  hint: 'We tonen nu de beste matches voor {stad}.',
}

const knop = (label: string, url: string, stijl = 'primary', icoon = 'arrow') => ({
  label,
  url,
  stijl,
  icoon,
})

const VOORDELEN = {
  blockType: 'voordelenSplit',
  titel: 'Een parkeermerk dat minder voelt als moeten.',
  tekst:
    'ParkingYou maakt parkeren vriendelijker, sneller en herkenbaarder. Heldere prijzen voor bezoekers, grip voor beheerders en minder zoekverkeer in de stad.',
  voordelen: [
    {
      icoon: 'car',
      titel: 'Voor bezoekers',
      tekst: 'Heldere prijzen en simpele reservering voordat je vertrekt.',
    },
    {
      icoon: 'shield',
      titel: 'Voor beheerders',
      tekst: 'Meer grip op bezetting, service en dagkaartcampagnes.',
    },
    {
      icoon: 'bolt',
      titel: 'Voor steden',
      tekst: 'Minder zoekverkeer door duidelijke digitale verwijzing.',
    },
    {
      icoon: 'card',
      titel: 'Voor finance',
      tekst: 'Facturen, betaalbewijzen en zakelijke accounts in een flow.',
    },
  ],
}

function paginas(f: Partial<Record<FotoKey, Id>>, forms: Record<string, Id>) {
  const standaardAfbeeldingen = [f.garage, f.parkeerterrein].filter(Boolean)

  return [
    {
      slug: 'home',
      title: 'Home',
      description:
        'Vind een ParkingYou-garage, reserveer je plek en rij in met kentekenherkenning.',
      layout: [
        {
          blockType: 'homeHero',
          titel: 'Parkeer *voordelig* midden in de stad.',
          tekst:
            'Vind een ParkingYou-garage, reserveer je plek en rij in met kentekenherkenning. Minder rondjes rijden, meer tijd voor je dag.',
          zoekbalk: ZOEKBALK,
          snelleSteden: ['Eindhoven', 'Amsterdam', 'Rotterdam', 'Den Haag'].map((naam) => ({
            naam,
          })),
          afbeelding: f.parkeerterrein,
          prijs: '5',
          prijsEenheid: 'per dag',
          ticketLabel: 'Gereserveerd',
          ticketTitel: 'Philips Stadion',
          ticketTijd: 'Vandaag 09:00 - 17:00',
          statWaarde: '40+',
          statLabel: 'garages in Nederland',
          cijfers: [
            { waarde: 'EUR 5', label: 'dagkaarten vanaf' },
            { waarde: '24/7', label: 'service bij storing' },
            { waarde: '2 min', label: 'gemiddeld tot reserveren' },
            { waarde: '100%', label: 'digitaal betaalbewijs' },
          ],
        },
        {
          blockType: 'productKeuze',
          linkLabel: 'Bekijk optie',
          producten: [
            {
              icoon: 'car',
              titel: 'Direct parkeren',
              tekst:
                'Voor bezoekers die vandaag een plek willen. Zoek, reserveer en rij binnen met kentekenherkenning.',
              url: '/parkeren',
            },
            {
              icoon: 'calendar',
              titel: 'Abonnementen',
              tekst:
                'Voor wie vaak bij dezelfde locatie parkeert. Minimaal 3 maanden, daarna maandelijks opzegbaar.',
              url: '/abonnementen',
            },
            {
              icoon: 'card',
              titel: 'ParkingPass',
              tekst:
                'Voor veelparkeerders die flexibel blijven. Kies 10 of 25 parkeeracties en gebruik je code online.',
              url: '/parkingpass',
            },
            {
              icoon: 'ticket',
              titel: 'Evenementen',
              tekst:
                'Parkeer slim bij GLOW, PSV en andere evenementen. Vooraf reserveren = gegarandeerde plek.',
              url: '/evenementen',
            },
          ],
        },
        {
          blockType: 'locatieOverzicht',
          achtergrond: 'papier',
          titel: 'Onze *favoriete* garages.',
          tekst:
            'Een handvol parkings waar klanten vaak terugkomen: scherp geprijsd, digitaal en midden in de stad.',
          actieLabel: 'Bekijk alle locaties',
          actieUrl: '/locaties',
          bron: 'alle',
          maxAantal: 3,
          toonStadFilter: false,
          toonSortering: false,
          toonAantal: false,
          eersteUitgelicht: true,
          standaardAfbeeldingen,
        },
        VOORDELEN,
        { blockType: 'stedenStrip', bron: 'automatisch', maxAantal: 5, linkNaar: 'locaties' },
        {
          blockType: 'appCallout',
          anker: 'app',
          titel: 'Makkelijk parkeren *vanuit je broekzak.*',
          tekst:
            'De ParkingYou-app maakt parkeren voorspelbaar: plek vinden, reserveren, betalen en later je bewijs terugvinden.',
          features: [
            { icoon: 'pin', tekst: 'Vind direct de dichtstbijzijnde garage' },
            { icoon: 'card', tekst: 'Betaal vooraf of bij vertrek' },
            { icoon: 'clock', tekst: 'Geen wachten bij ticketautomaten' },
          ],
          knoppen: [
            knop('Bekijk de app', '#app', 'aqua'),
            knop('Reserveer online', '/locaties', 'on-dark'),
          ],
          telefoon: {
            zoekTekst: 'Waar parkeer je?',
            label: 'Beste keuze',
            titel: 'Parking Stadskantoor',
            tekst: '1 min lopen - vanaf EUR 2,55',
            knop: 'Reserveer',
          },
        },
        {
          blockType: 'stappenSectie',
          achtergrond: 'wit',
          stijl: 'kaarten',
          titel: 'Zo werkt het - *echt* zo simpel.',
          tekst:
            'Drie stappen tussen jou en een parkeerplek. Geen ticketrolletje, geen rondjes rijden.',
          stapLabel: 'Stap',
          stappen: [
            {
              nummer: '01',
              titel: 'Zoek je locatie',
              tekst: 'Vul stad, adres of garage in en vergelijk direct op prijs en afstand.',
            },
            {
              nummer: '02',
              titel: 'Reserveer digitaal',
              tekst: 'Kies je tijdvak, voeg je kenteken toe en betaal veilig online.',
              uitgelicht: true,
            },
            {
              nummer: '03',
              titel: 'Rij ontspannen uit',
              tekst: 'Je kenteken opent de slagboom. Het betaalbewijs staat meteen klaar.',
            },
          ],
        },
        {
          blockType: 'bannerCta',
          titel: 'Begin je *dagje weg* hier.',
          tekst: 'Vergelijk de dichtstbijzijnde garages en reserveer je plek in hetzelfde scherm.',
          actie: 'knop',
          knopLabel: 'Vind een parking',
          knopUrl: '/locaties',
          stijl: 'aqua',
          icoon: 'arrow',
        },
        {
          blockType: 'faqAccordeon',
          achtergrond: 'papier',
          titel: 'Veelgestelde vragen.',
          tekst: 'Kort, eerlijk, zonder kleine lettertjes.',
          bron: 'handmatig',
          vragen: [
            {
              vraag: 'Moet ik vooraf reserveren?',
              antwoord:
                'Nee. Je kunt bij veel locaties gewoon binnenrijden. Reserveren is handig op drukke dagen en vaak voordeliger.',
            },
            {
              vraag: 'Hoe werkt in- en uitrijden?',
              antwoord:
                'Na je reservering koppelen we je kenteken aan de slagboom. Je rijdt binnen, parkeert en rijdt later weer uit zonder papieren ticket.',
            },
            {
              vraag: 'Kan ik een factuur krijgen?',
              antwoord:
                'Ja. In je account vind je reserveringen, betaalbewijzen en zakelijke facturen per locatie.',
            },
          ],
        },
      ],
    },
    {
      slug: 'locaties',
      title: 'Locaties',
      description: 'Vind je parking en reserveer in minuten. Filter op stad, prijs en afstand.',
      layout: [
        {
          blockType: 'paginaHero',
          stijl: 'licht',
          visual: 'kaart',
          titel: 'Vind je parking. Reserveer in minuten.',
          tekst:
            'Filter op stad, prijs en afstand. Zoeken, vergelijken en reserveren doe je hier in één keer.',
          toonZoekbalk: true,
          zoekbalk: ZOEKBALK,
        },
        {
          blockType: 'locatieOverzicht',
          achtergrond: 'wit',
          bron: 'alle',
          toonStadFilter: true,
          toonSortering: true,
          toonAantal: true,
          eersteUitgelicht: true,
          standaardAfbeeldingen,
        },
      ],
    },
    {
      slug: 'evenementen',
      title: 'Evenementen',
      description:
        'Parkeer slim bij evenementen: reserveer vooraf je parkeerticket en skip de wachtrij.',
      layout: [
        {
          blockType: 'paginaHero',
          stijl: 'evenementen',
          visual: 'evenementen',
          titel: 'Parkeer slim bij evenementen.',
          tekst:
            'Van lichtfestivals tot voetbalwedstrijden: ParkingYou is officieel parkeerpartner bij tientallen evenementen. Reserveer vooraf en skip de wachtrij.',
          knoppen: [
            knop('Bekijk evenementen', '#evenementen-grid'),
            knop('Alle locaties', '/locaties', 'outline'),
          ],
        },
        {
          blockType: 'infoBanden',
          achtergrond: 'papier',
          stijl: 'banden',
          kaarten: [
            {
              titel: 'Gegarandeerde plek',
              tekst:
                'Reserveer vooraf en rij met vertrouwen naar het evenement. Geen rondje zoeken.',
            },
            {
              titel: 'Officiele parkeerpartner',
              tekst: 'Locaties op loopafstand of langs de looproute, geselecteerd per evenement.',
            },
            {
              titel: 'Altijd scherp geprijsd',
              tekst: 'Speciale evenementtarieven zijn vaak voordeliger dan parkeren ter plekke.',
            },
          ],
        },
        {
          blockType: 'evenementenOverzicht',
          achtergrond: 'wit',
          anker: 'evenementen-grid',
          titel: 'Aankomende *evenementen*.',
          tekst: 'Filter op stad of type evenement en reserveer direct je parkeerticket.',
          toonFilters: true,
          toonAantal: true,
        },
        {
          blockType: 'bannerCta',
          titel: 'Evenement op de planning?',
          tekst:
            'Schrijf je in voor onze evenementenalert en ontvang parkeerdeals voordat ze uitverkocht zijn.',
          actie: 'inschrijven',
          inschrijven: {
            placeholder: 'jij@voorbeeld.nl',
            knopLabel: 'Alert instellen',
            formulier: forms.alert,
            bedankt: 'Gelukt! Je ontvangt voortaan onze evenementenalert.',
          },
        },
      ],
    },
    {
      slug: 'abonnementen',
      title: 'Abonnementen',
      description:
        'Een vaste parkeerplek zonder dagelijks opnieuw te regelen. Minimaal 3 maanden, daarna maandelijks opzegbaar.',
      layout: [
        {
          blockType: 'paginaHero',
          stijl: 'aqua',
          visual: 'paneel',
          titel: 'Een vaste parkeerplek zonder dagelijks opnieuw te regelen.',
          tekst:
            'Voor frequente parkeerders: kies een abonnementslocatie, vraag beschikbaarheid aan en parkeer flexibel met je toegangsmiddel.',
          knoppen: [
            knop('Bestel abonnement', '#abonnement-aanvragen'),
            knop('Bekijk voorwaarden', '#abonnement-info', 'outline'),
          ],
          paneel: {
            label: 'Abonnement in het kort',
            regels: [
              { waarde: '3 maanden', label: 'minimale periode' },
              { waarde: '1 maand', label: 'opzegtermijn daarna' },
              { waarde: 'Toegang', label: 'pas, tag, handzender of kenteken' },
            ],
          },
        },
        {
          blockType: 'infoBanden',
          achtergrond: 'wit',
          anker: 'abonnement-info',
          stijl: 'banden',
          kaarten: [
            {
              titel: 'Start helder',
              tekst:
                'Je abonnement loopt minimaal 3 maanden. Daarna kun je maandelijks opzeggen met 1 volle maand opzegtermijn.',
            },
            {
              titel: 'Toegang geregeld',
              tekst:
                'Afhankelijk van de locatie krijg je een pas, tag, handzender of kentekentoegang voor soepel in- en uitrijden.',
            },
            {
              titel: 'Maandelijks gemak',
              tekst:
                'De kosten worden maandelijks geincasseerd. Eenmalige aanvraagkosten worden vooraf duidelijk getoond.',
            },
          ],
        },
        {
          blockType: 'locatieOverzicht',
          achtergrond: 'papier',
          titel: 'Abonnementslocaties *per stad*.',
          tekst:
            'Niet elke garage heeft dezelfde producten. Hier zie je per stad waar je een abonnement kunt afsluiten.',
          bron: 'abonnementen',
          toonStadFilter: true,
          toonSortering: false,
          toonAantal: false,
          eersteUitgelicht: false,
          legeTekst: 'Binnenkort vind je hier onze abonnementslocaties.',
          standaardAfbeeldingen,
        },
        {
          blockType: 'formulierSectie',
          achtergrond: 'wit',
          anker: 'abonnement-aanvragen',
          titel: 'Vraag beschikbaarheid aan.',
          tekst:
            'Kies je locatie en laat je contactgegevens achter. De contractdetails regelen we daarna samen met je.',
          locatieLabels: 'geen',
          formulier: forms.abonnement,
        },
      ],
    },
    {
      slug: 'parkingpass',
      title: 'ParkingPass',
      description:
        'Kies 10 of 25 parkeeracties, ontvang je code per e-mail en gebruik hem bij deelnemende ParkingYou-locaties.',
      layout: [
        {
          blockType: 'passHero',
          titel: 'ParkingPass voor wie vaak parkeert, maar niet vast wil zitten.',
          tekst:
            'Kies 10 of 25 parkeeracties, ontvang je code per e-mail en gebruik hem bij deelnemende ParkingYou-locaties.',
          opties: [
            { waarde: '10', label: '10x parkeren' },
            { waarde: '25', label: '25x parkeren' },
          ],
          kaartLabel: 'ParkingPass',
          kaartOndertitel: 'flexibel parkeren',
          kaartTekst: 'Code per e-mail - online reserveren - locatiegebonden voorwaarden.',
          koppelVeld: 'aantal',
        },
        {
          blockType: 'infoBanden',
          achtergrond: 'wit',
          stijl: 'banden',
          kaarten: [
            {
              titel: 'Voordeliger dan losse tickets',
              tekst: 'Bespaar per parkeeractie wanneer je vaker dezelfde steden bezoekt.',
            },
            {
              titel: 'Flexibel in gebruik',
              tekst: 'Geen vast maandcontract: gebruik je strippen wanneer het jou uitkomt.',
            },
            {
              titel: 'Eenvoudig online bestellen',
              tekst: 'Betaal veilig online en ontvang je unieke ParkingPass-code in je inbox.',
            },
          ],
        },
        {
          blockType: 'stappenSectie',
          achtergrond: 'papier',
          stijl: 'flow',
          titel: 'Hoe het *werkt*.',
          tekst: 'In drie stappen van bestellen naar parkeren.',
          stappen: [
            {
              nummer: '01',
              titel: 'Bestel online',
              tekst: 'Kies locatie, 10 of 25 parkeeracties en betaal veilig.',
            },
            {
              nummer: '02',
              titel: 'Ontvang je code',
              tekst: 'Je ParkingPass-code komt direct per e-mail binnen.',
            },
            {
              nummer: '03',
              titel: 'Reserveer met code',
              tekst: 'Gebruik de code bij je reservering. Je kenteken opent de slagboom.',
            },
          ],
        },
        {
          blockType: 'formulierSectie',
          achtergrond: 'wit',
          titel: 'Bestel je ParkingPass.',
          tekst:
            'Beschikbaar voor geselecteerde locaties in Eindhoven, Amsterdam, Rotterdam en Rijswijk. Sommige passen hebben weekendvoorwaarden per locatie.',
          locatieLabels: 'parkingpass',
          formulier: forms.parkingpass,
        },
      ],
    },
    {
      slug: 'zakelijk',
      title: 'Zakelijk',
      description:
        'Voor eigenaren en beheerders: reserveringen, dagkaarten, service en bezettingsinzichten onder één merk.',
      layout: [
        {
          blockType: 'paginaHero',
          stijl: 'aqua',
          visual: 'dashboard',
          titel: 'Maak van je parkeergarage een digitaal product.',
          tekst:
            'Voor eigenaren en beheerders: combineer reserveringen, dagkaarten, service en bezettingsinzichten onder een merk dat klanten begrijpen.',
          knoppen: [
            knop('Plan kennismaking', '#zakelijk-contact'),
            knop('Waardekaarten bestellen', '#zakelijk-waardekaart', 'aqua', 'wallet'),
          ],
          paneel: {
            label: 'Live bezetting',
            waarde: '83%',
            balken: '44, 62, 78, 84, 71, 56, 38',
            regels: [
              { label: 'Dagkaart campagne actief' },
              { label: '18 reserveringen vandaag' },
              { label: 'Service SLA gehaald' },
            ],
          },
        },
        VOORDELEN,
        {
          blockType: 'infoBanden',
          achtergrond: 'papier',
          stijl: 'partner',
          kaarten: [
            {
              titel: 'Exploitatie',
              tekst: 'Zet lege daluren om in boekbare dagkaarten en meet resultaat per campagne.',
            },
            {
              titel: 'Service',
              tekst:
                'Bundel storingsmeldingen, locatie-informatie en contactkanalen in een consistente ervaring.',
            },
            {
              titel: 'Merk',
              tekst:
                'Laat elke garage voelen als onderdeel van ParkingYou, zonder de lokale context kwijt te raken.',
            },
          ],
        },
        {
          blockType: 'waardekaartBestellen',
          achtergrond: 'wit',
          anker: 'zakelijk-waardekaart',
          titel: 'Waardekaarten voor zakelijk gebruik.',
          tekst:
            'Geef medewerkers, klanten of relaties een ParkingYou Waardekaart. Laad het tegoed vooraf op en gebruik het bij alle deelnemende locaties. Ideaal als bedrijfscadeau of personeelsbenefit.',
          infoKaarten: [
            {
              titel: 'Flexibel in gebruik',
              tekst: 'Geldig bij alle deelnemende ParkingYou-locaties in Nederland.',
            },
            {
              titel: 'Zakelijke factuur',
              tekst: 'Ontvang een factuur per bestelling, inclusief BTW-specificatie.',
            },
          ],
          wizard: {
            stap1: 'Keuze',
            stap2: 'Gegevens',
            stap3: 'Bevestiging',
            keuzeTitel: 'Kies het tegoed per kaart.',
            bedragen: '25, 50, 100, 200, 500',
            standaardBedrag: '100',
            aantalLabel: 'Aantal kaarten',
            totaalLabel: 'Totaal',
            volgendeLabel: 'Ga naar gegevens',
            gegevensTitel: 'Bedrijfsgegevens.',
            terugLabel: 'Terug',
            bevestigLabel: 'Naar bevestiging',
            succesTitel: 'Bestelling ontvangen!',
            succesTekst:
              '{aantal}x Waardekaart van € {bedrag} – totaal € {totaal}.\nFactuur en kaartgegevens worden gestuurd naar {email}.',
          },
          formulier: forms.waardekaart,
        },
        {
          blockType: 'formulierSectie',
          achtergrond: 'papier',
          anker: 'zakelijk-contact',
          titel: 'Plan een kennismaking.',
          tekst:
            'Wil je weten wat ParkingYou voor jouw locatie kan betekenen? Laat je gegevens achter en we nemen binnen één werkdag contact op.',
          locatieLabels: 'geen',
          formulier: forms.zakelijk,
        },
      ],
    },
    {
      slug: 'over-ons',
      title: 'Over ons',
      description:
        'ParkingYou maakt centrale parkeerplekken toegankelijker, voor bezoekers en voor opdrachtgevers.',
      layout: [
        {
          blockType: 'paginaHero',
          stijl: 'zacht',
          visual: 'cijfers',
          titel: 'Wij maken centrale parkeerplekken toegankelijker.',
          tekst:
            'Jaarlijks gebruiken meer dan 500.000 parkeerders ParkingYou-locaties. Voor bezoekers betekent dat voordelig en centraal parkeren; voor opdrachtgevers beter beheer en exploitatie.',
          knoppen: [
            knop('Reserveer direct', '/locaties'),
            knop('Zakelijk samenwerken', '/zakelijk', 'outline'),
          ],
          paneel: {
            regels: [
              { waarde: '500k+', label: 'parkeerders per jaar' },
              { waarde: '40+', label: 'locaties en terreinen' },
              { waarde: '2', label: 'werelden: bezoekers en beheerders' },
            ],
          },
        },
        {
          blockType: 'verhaalKolommen',
          achtergrond: 'wit',
          kolommen: [
            {
              titel: 'ParkingYou for You.',
              tekst:
                'Via website en app reserveer je tegen voordelige tarieven, ook tijdens evenementen en drukke dagen. Zo geven we ruimte terug aan de stad en voorkomen we onnodig zoekverkeer.',
              knopLabel: 'Bekijk locaties',
              knopUrl: '/locaties',
              stijl: 'outline',
            },
            {
              titel: 'ParkingYou voor opdrachtgevers.',
              tekst:
                'We werken samen met parkeervastgoedeigenaren en maken garages beter vindbaar, boekbaar en beheersbaar. Een win-win voor consument en eigenaar.',
              knopLabel: 'Bekijk dienstverlening',
              knopUrl: '/zakelijk',
              stijl: 'outline',
            },
          ],
        },
        VOORDELEN,
      ],
    },
  ]
}

// --- Events --------------------------------------------------------------------

async function evenementen(ctx: Ctx, f: Partial<Record<FotoKey, Id>>) {
  const locatie = async (slug: string) =>
    (await findOne(ctx, 'locations', { slug: { equals: slug } }))?.id

  const lijst = [
    {
      slug: 'glow-2025',
      naam: 'GLOW Eindhoven 2025',
      tagline: 'Officieel parkeerpartner van het lichtfestival',
      soort: 'Festival',
      kleur: 'orange',
      plaats: 'Eindhoven',
      datums: '8 t/m 16 november 2025',
      vanafPrijs: '12',
      afbeelding: f.glow,
      locaties: ['philips-stadion', 'dll-parkeerdek'],
    },
    {
      slug: 'psv-seizoen',
      naam: 'PSV Eindhoven Thuiswedstrijden',
      tagline: 'Officieel parkeerpartner van PSV',
      soort: 'Sport',
      kleur: 'blue',
      plaats: 'Eindhoven',
      datums: 'Eredivisie seizoen 2025',
      vanafPrijs: '12',
      afbeelding: f.psv,
      locaties: ['philips-stadion'],
    },
    {
      slug: 'markthal-rotterdam',
      naam: 'Weekend Markt Markthal Rotterdam',
      tagline: 'Voordelig parkeren bij de beroemdste markthal van NL',
      soort: 'Markt',
      kleur: 'aqua',
      plaats: 'Rotterdam',
      datums: 'Elk weekend',
      vanafPrijs: '10',
      afbeelding: f.markthal,
      locaties: ['hofplein', 'maashaven'],
    },
    {
      slug: 'amsterdam-museumweekend',
      naam: 'Amsterdam Museumweekend',
      tagline: 'Rijksmuseum, Van Gogh Museum en meer',
      soort: 'Cultuur',
      kleur: 'blue',
      plaats: 'Amsterdam',
      datums: '14–16 maart 2025',
      vanafPrijs: '22',
      afbeelding: f.museum,
      locaties: ['plantage', 'bos-en-lommerplantsoen'],
    },
    {
      slug: 'kerstmarkt-den-haag',
      naam: 'Kerstmarkt Den Haag',
      tagline: 'Sfeer & lichtjes in de Hofstad',
      soort: 'Markt',
      kleur: 'orange',
      plaats: 'Den Haag',
      datums: '15–24 december 2025',
      vanafPrijs: '8',
      afbeelding: f.kerstmarkt,
      locaties: ['stationsweg-ypenburg'],
    },
  ]

  for (const ev of lijst) {
    const bestaand = await findOne(ctx, 'evenementen', { slug: { equals: ev.slug } })
    if (bestaand) {
      if (bestaand._status !== 'draft') {
        log(ctx.payload, `event ${ev.slug} is published, left untouched`)
        continue
      }
      const aanvulling: Record<string, unknown> = {}
      for (const veld of ['tagline', 'plaats', 'afbeelding'] as const) {
        if (!bestaand[veld] && ev[veld]) aanvulling[veld] = ev[veld]
      }
      if (Object.keys(aanvulling).length) {
        await ctx.payload.update({
          collection: 'evenementen',
          id: bestaand.id,
          data: aanvulling as never,
          draft: true,
          overrideAccess: true,
          req: ctx.req,
          context: { disableRevalidate: true },
        })
        log(ctx.payload, `event ${ev.slug}: filled ${Object.keys(aanvulling).join(', ')}`)
      }
      continue
    }

    const locaties = (await Promise.all(ev.locaties.map(locatie))).filter(Boolean)
    if (locaties.length === 0) {
      log(ctx.payload, `event ${ev.slug} skipped: none of its locations exist`)
      continue
    }
    await ctx.payload.create({
      collection: 'evenementen',
      data: { ...ev, locaties, _status: 'draft' } as never,
      draft: true,
      overrideAccess: true,
      req: ctx.req,
      context: { disableRevalidate: true },
    })
    log(ctx.payload, `event ${ev.slug} created as draft`)
  }
}

function blokNaam(block: Record<string, unknown>): string | undefined {
  if (typeof block.titel === 'string') return block.titel.replace(/\*/g, '')
  const kaarten = (block.kaarten ?? block.kolommen) as Array<{ titel: string }> | undefined
  if (kaarten?.length) return kaarten.map((k) => k.titel).join(' · ')
  if (block.blockType === 'stedenStrip') return 'Steden'
  if (block.blockType === 'locatieOverzicht') return 'Alle locaties'
  return undefined
}

// --- Migration -----------------------------------------------------------------

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const ctx = { payload, req }

  const fotos = await laadFotos(ctx)

  const forms = {
    abonnement: await formulier(
      ctx,
      'Abonnement aanvragen',
      [
        {
          blockType: 'locatieKeuze',
          name: 'locatie',
          label: 'Locatie',
          placeholder: 'Kies abonnementslocatie',
          bron: 'abonnementen',
          required: true,
        },
        tekst('naam', 'Naam', 'Voor- en achternaam'),
        email('jij@voorbeeld.nl'),
        tekst('startdatum', 'Gewenste startdatum', 'Bijvoorbeeld 1 juni'),
      ],
      'Verstuur aanvraag',
      ['Aanvraag klaar.', 'Het team neemt contact met je op over de beschikbaarheid.'],
    ),
    parkingpass: await formulier(
      ctx,
      'ParkingPass bestellen',
      [
        {
          blockType: 'locatieKeuze',
          name: 'locatie',
          label: 'Locatie',
          placeholder: 'Kies locatie',
          bron: 'parkingpass',
          required: true,
        },
        {
          blockType: 'select',
          name: 'aantal',
          label: 'Aantal',
          defaultValue: '10',
          required: true,
          options: [
            { label: '10 parkeeracties', value: '10' },
            { label: '25 parkeeracties', value: '25' },
          ],
        },
        tekst('voornaam', 'Voornaam', 'Voornaam'),
        tekst('achternaam', 'Achternaam', 'Achternaam'),
        email('jij@voorbeeld.nl'),
      ],
      'Bestel nu',
      ['ParkingPass besteld.', 'Je ontvangt je ParkingPass-code per e-mail.'],
    ),
    zakelijk: await formulier(
      ctx,
      'Kennismaking zakelijk',
      [
        tekst('bedrijfsnaam', 'Bedrijfsnaam', 'Bedrijfsnaam'),
        tekst('naam', 'Naam', 'Voor- en achternaam'),
        email('jij@bedrijf.nl'),
        tekst('telefoon', 'Telefoonnummer', '06 12 34 56 78', false),
        tekst('locatie', 'Locatie / garage', 'Naam of adres van de locatie', false),
        {
          blockType: 'textarea',
          name: 'bericht',
          label: 'Bericht',
          placeholder: 'Vertel kort wat je zoekt...',
        },
      ],
      'Verstuur aanvraag',
      ['Aanvraag ontvangen.', 'We nemen binnen één werkdag contact op.'],
    ),
    waardekaart: await formulier(
      ctx,
      'Waardekaart bestelling',
      [
        tekst('bedrag', 'Bedrag per kaart', ''),
        tekst('aantal', 'Aantal kaarten', ''),
        tekst('totaal', 'Totaal', ''),
        tekst('bedrijfsnaam', 'Bedrijfsnaam', ''),
        tekst('contactpersoon', 'Contactpersoon', ''),
        email(''),
        tekst('kvk', 'KvK-nummer', '', false),
      ],
      'Naar bevestiging',
      ['Bestelling ontvangen!', 'Factuur en kaartgegevens volgen per e-mail.'],
    ),
    alert: await formulier(
      ctx,
      'Evenementenalert',
      [email('jij@voorbeeld.nl')],
      'Alert instellen',
      ['Gelukt!', 'Je ontvangt voortaan onze evenementenalert.'],
    ),
  }

  for (const pagina of paginas(fotos, forms)) {
    const data = {
      title: pagina.title,
      slug: pagina.slug,
      generateSlug: false,
      hero: { type: 'none', links: [] },
      // A readable name per block in the admin list instead of "Untitled".
      layout: pagina.layout.map((block) => ({ ...block, blockName: blokNaam(block) })),
      _status: 'published',
    }
    const bestaand = await findOne(ctx, 'pages', { slug: { equals: pagina.slug } })
    if (bestaand) {
      // Keep the existing title and SEO fields; replace what the page shows.
      const { title: _title, ...vervanging } = data
      await payload.update({
        collection: 'pages',
        id: bestaand.id,
        data: vervanging as never,
        draft: false,
        overrideAccess: true,
        req,
        context: { disableRevalidate: true },
      })
      log(payload, `page ${pagina.slug}: hero and layout replaced, published`)
    } else {
      await payload.create({
        collection: 'pages',
        data: {
          ...data,
          meta: { title: `${pagina.title} | ParkingYou`, description: pagina.description },
        } as never,
        draft: false,
        overrideAccess: true,
        req,
        context: { disableRevalidate: true },
      })
      log(payload, `page ${pagina.slug} created, published`)
    }
  }

  const menu = [
    ['Locaties', '/locaties'],
    ['Evenementen', '/evenementen'],
    ['Abonnementen', '/abonnementen'],
    ['ParkingPass', '/parkingpass'],
    ['Zakelijk', '/zakelijk'],
    ['Over ons', '/over-ons'],
  ]
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: menu.map(([label, url]) => ({
        link: { type: 'custom', url, label, newTab: false },
      })),
      telefoon: '085 4011647',
      knopLabel: 'Direct reserveren',
      knopUrl: '/parkeren',
    } as never,
    overrideAccess: true,
    req,
    context: { disableRevalidate: true },
  })
  log(payload, 'header menu set')

  const kolom = (titel: string, links: [string, string][]) => ({
    titel,
    links: links.map(([label, url]) => ({ label, url })),
  })
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      tekst:
        'ParkingYou is de no-nonsense challenger op de parkeermarkt: digitaal waar het kan, menselijk wanneer het moet.',
      kolommen: [
        kolom('Parkeren', [
          ['Vind een garage', '/locaties'],
          ['Reserveer nu', '/parkeren'],
          ['Evenementen', '/evenementen'],
          ['App', '/#app'],
        ]),
        kolom('Producten', [
          ['Abonnementen', '/abonnementen'],
          ['ParkingPass', '/parkingpass'],
          ['Waardekaarten', '/zakelijk#zakelijk-waardekaart'],
        ]),
        kolom('ParkingYou', [
          ['Over ons', '/over-ons'],
          ['Zakelijk', '/zakelijk'],
          ['085 4011647', 'tel:0854011647'],
          ['info@parkingyou.nl', 'mailto:info@parkingyou.nl'],
        ]),
      ],
      onderregelLinks: 'ParkingYou {jaar} - The other way of parking.',
    } as never,
    overrideAccess: true,
    req,
    context: { disableRevalidate: true },
  })
  log(payload, 'footer columns set')

  await evenementen(ctx, fotos)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content seed: the pages, forms and events are ordinary editable content
  // now and may have been changed by editors, so rolling back would lose work.
}
