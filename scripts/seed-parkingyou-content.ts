/**
 * Seeds the ParkingYou-specific content that the generic Payload demo seed
 * (src/endpoints/seed) does not touch: steden, the three reference locations
 * from rick040/Parkingyou's content/locaties.json (with the full addendum
 * fields and a default `secties` order), evenementen, faq-categorieen, faq,
 * one sample POI page, and the generic marketing pages from docs/IA.md.
 *
 * Idempotent: every document is upserted by its slug, so running this twice
 * updates rather than duplicates. It does not touch `scripts/seed-locations.ts`'s
 * demo locations, only adds `stad` links to them by matching `city` to a
 * seeded Steden slug.
 *
 * Run with: npx tsx --env-file=.env scripts/seed-parkingyou-content.ts
 */
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import type { Location, Steden } from '../src/payload-types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function upsert<T extends { id: number | string }>(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
  where: Record<string, unknown>,
  data: Record<string, unknown>,
): Promise<T> {
  const p = payload as any // eslint-disable-line @typescript-eslint/no-explicit-any
  const existing = await p.find({ collection, where, limit: 1, overrideAccess: true })
  if (existing.docs[0]) {
    return (await p.update({
      collection,
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
      context: { disableRevalidate: true },
    })) as T
  }
  return (await p.create({
    collection,
    data,
    overrideAccess: true,
    context: { disableRevalidate: true },
  })) as T
}

const STEDEN = [
  { slug: 'eindhoven', naam: 'Eindhoven', isRegio: false, intro: 'Parkeer centraal in Eindhoven en loop zo het centrum in. Reserveer vooraf, dan weet je zeker dat er een plek voor je is.', oudeCid: 3 },
  { slug: 'amsterdam', naam: 'Amsterdam', isRegio: false, intro: '', oudeCid: 1 },
  { slug: 'rotterdam', naam: 'Rotterdam', isRegio: false, intro: '', oudeCid: 5 },
  { slug: 'tilburg', naam: 'Tilburg', isRegio: false, intro: '', oudeCid: 7 },
  { slug: 'regio-zuid-holland', naam: 'Regio Zuid-Holland', isRegio: true, intro: '', oudeCid: 9 },
  { slug: 'den-haag', naam: 'Den Haag', isRegio: false, intro: '', oudeCid: 11 },
  { slug: 'regio-gelderland', naam: 'Regio Gelderland', isRegio: true, intro: '', oudeCid: 13 },
  { slug: 'utrecht', naam: 'Utrecht', isRegio: false, intro: '', oudeCid: 15 },
  { slug: 'heerhugowaard', naam: 'Heerhugowaard', isRegio: false, intro: '', oudeCid: 17 },
  { slug: 'zoetermeer', naam: 'Zoetermeer', isRegio: false, intro: '', oudeCid: 19 },
  { slug: 'almere', naam: 'Almere', isRegio: false, intro: '', oudeCid: 21 },
]

const DEFAULT_SECTIES = [
  { blockType: 'locatieHero' },
  { blockType: 'locatieTarieven' },
  { blockType: 'locatieFaciliteiten' },
  { blockType: 'locatieOpeningstijden' },
  { blockType: 'locatiePoisNabij' },
  { blockType: 'locatieKaartProducten' },
  { blockType: 'locatieEvenementen' },
  { blockType: 'locatieFaq' },
]

async function main() {
  const payload = await getPayload({ config: configPromise })
  payload.logger.info('Seeding ParkingYou content (steden, locaties, evenementen, faq, pois, paginas)...')

  // --- Steden ---
  const stedenBySlug = new Map<string, Steden>()
  for (const s of STEDEN) {
    const doc = await upsert<Steden>(payload, 'steden', { slug: { equals: s.slug } }, {
      naam: s.naam,
      slug: s.slug,
      isRegio: s.isRegio,
      secties: [
        { blockType: 'stadHero', intro: s.intro || undefined },
        { blockType: 'stadLocatiesLijst' },
      ],
      _status: 'published',
    })
    stedenBySlug.set(s.slug, doc)
  }
  payload.logger.info(`— ${stedenBySlug.size} steden klaar`)

  // Link the existing demo locations (scripts/seed-locations.ts) to their Steden.
  const allLocations = await payload.find({ collection: 'locations', limit: 200, overrideAccess: true })
  for (const loc of allLocations.docs as Location[]) {
    const stad = stedenBySlug.get(loc.city)
    if (stad && !loc.stad) {
      await payload.update({
        collection: 'locations',
        id: loc.id,
        data: { stad: stad.id },
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    }
  }

  // --- The three reference locations from rick040/Parkingyou/content/locaties.json ---
  const eindhoven = stedenBySlug.get('eindhoven')!

  const philipsStadion = await upsert<Location>(payload, 'locations', { slug: { equals: 'philips-stadion' } }, {
    name: 'Philips Stadion',
    slug: 'philips-stadion',
    city: 'eindhoven',
    stad: eindhoven.id,
    intro: 'Een slimme keuze voor PSV, Strijp-S en een dag Eindhoven. Reserveer vooraf en rij zonder ticketstress naar binnen.',
    soort: 'Parkeerterrein',
    rating: 4.7,
    loopafstand: '8 min lopen naar centrum',
    maxHeight: '4.50 m (open terrein)',
    faciliteiten: [
      { tekst: 'Cameratoezicht' },
      { tekst: 'Verlichting' },
      { tekst: 'Kentekenherkenning' },
      { tekst: 'Rolstoeltoegankelijk' },
      { tekst: 'Fietsenstalling' },
    ],
    betaalmogelijkheden: [{ tekst: 'iDEAL' }, { tekst: 'Creditcard' }, { tekst: 'PIN' }, { tekst: 'ParkingYou App' }, { tekst: 'Contant' }],
    poisNabij: [
      { naam: 'Philips Stadion', soort: 'Stadion', afstand: '5 min lopen' },
      { naam: 'Strijp-S', soort: 'Cultuur & Horeca', afstand: '8 min lopen' },
      { naam: 'Eindhoven Centrum', soort: 'Winkelgebied', afstand: '12 min lopen' },
    ],
    uren: { open247: true },
    reserveerbaar: true,
    waardekaart: true,
    strippenkaart: false,
    address: { street: 'Frederiklaan', huisnummer: '10', postalCode: '{{TODO-NL: postcode bevestigen}}', cityName: 'Eindhoven' },
    coordinates: [5.4677, 51.4417],
    spotsTotal: 128,
    aeroparkerProductId: '{{TODO-NL: Aeroparker product ID opvragen}}',
    pricePerHour: 5,
    aeroparkerSync: {
      tarieven: [
        { label: 'Per 30 minuten', prijs: '2,50' },
        { label: 'Dagtarief zonder reservering', prijs: '15,00' },
        { label: 'Dagtarief met reservering', prijs: '12,00' },
        { label: 'Evenementtarief', prijs: '12,00' },
        { label: 'Avondtarief (na 18:00)', prijs: '8,00' },
        { label: 'Weekendtarief', prijs: '18,00' },
      ],
      dagprijs: '5',
      syncStatus: 'ok',
    },
    oudeId: 0,
    secties: DEFAULT_SECTIES,
    _status: 'published',
  })

  const dllParkeerdek = await upsert<Location>(payload, 'locations', { slug: { equals: 'dll-parkeerdek' } }, {
    name: 'Parking DLL parkeerdek',
    slug: 'dll-parkeerdek',
    city: 'eindhoven',
    stad: eindhoven.id,
    intro: 'Een centrale keuze voor Eindhoven: snel parkeren, korte loopafstand en duidelijke tarieven.',
    soort: 'Parkeerterrein',
    rating: 4.6,
    loopafstand: '4 min lopen naar centrum',
    maxHeight: '4.50 m (open terrein)',
    faciliteiten: [
      { tekst: 'Laadpalen (4x)' },
      { tekst: 'Cameratoezicht' },
      { tekst: 'Verlichting' },
      { tekst: 'Betaalterminal' },
      { tekst: 'Rolstoeltoegankelijk' },
    ],
    betaalmogelijkheden: [{ tekst: 'iDEAL' }, { tekst: 'Creditcard' }, { tekst: 'PIN' }, { tekst: 'ParkingYou App' }],
    poisNabij: [
      { naam: 'Eindhoven Centrum', soort: 'Winkelgebied', afstand: '4 min lopen' },
      { naam: 'Heuvel Galerie', soort: 'Shopping', afstand: '6 min lopen' },
      { naam: 'Stationsplein', soort: 'OV Hub', afstand: '10 min lopen' },
    ],
    uren: { open247: false, doordeweeks: '06:00 – 23:00', zaterdag: '07:00 – 23:00', zondag: '09:00 – 22:00' },
    reserveerbaar: true,
    waardekaart: true,
    strippenkaart: true,
    address: { street: '{{TODO-NL: straatnaam bevestigen}}', huisnummer: '{{TODO-NL: huisnummer bevestigen}}', postalCode: '{{TODO-NL: postcode bevestigen}}', cityName: 'Eindhoven' },
    coordinates: [5.4805, 51.4381],
    spotsTotal: 92,
    aeroparkerProductId: '{{TODO-NL: Aeroparker product ID opvragen}}',
    pricePerHour: 2.5,
    aeroparkerSync: {
      tarieven: [
        { label: 'Per 30 minuten', prijs: '1,25' },
        { label: 'Dagtarief zonder reservering', prijs: '12,00' },
        { label: 'Dagtarief met reservering', prijs: '10,00' },
        { label: 'Vroegboekkorting (vóór 09:00)', prijs: '8,00' },
        { label: 'Avondtarief (na 18:00)', prijs: '5,00' },
      ],
      dagprijs: '2,50',
      syncStatus: 'ok',
    },
    oudeId: 101,
    secties: DEFAULT_SECTIES,
    _status: 'published',
  })

  await upsert<Location>(payload, 'locations', { slug: { equals: 'philips-bedrijfsschool' } }, {
    name: 'Parking Philips Bedrijfsschool',
    slug: 'philips-bedrijfsschool',
    city: 'eindhoven',
    stad: eindhoven.id,
    intro: 'Voor wie vaak in Eindhoven parkeert en een vaste, voordelige plek zoekt.',
    soort: 'Parkeerterrein',
    rating: 4.5,
    loopafstand: '10 min lopen naar centrum',
    maxHeight: '4.50 m (open terrein)',
    faciliteiten: [{ tekst: 'Cameratoezicht' }, { tekst: 'Verlichting' }, { tekst: 'Kentekenherkenning' }],
    betaalmogelijkheden: [{ tekst: 'iDEAL' }, { tekst: 'Creditcard' }, { tekst: 'PIN' }, { tekst: 'ParkingYou App' }],
    poisNabij: [
      { naam: 'Strijp-S', soort: 'Cultuur & Horeca', afstand: '6 min lopen' },
      { naam: 'Eindhoven Centrum', soort: 'Winkelgebied', afstand: '10 min lopen' },
    ],
    uren: { open247: true },
    reserveerbaar: true,
    waardekaart: false,
    strippenkaart: false,
    address: { street: 'Kastanjelaan', huisnummer: '400', postalCode: '{{TODO-NL: postcode bevestigen}}', cityName: 'Eindhoven' },
    coordinates: [5.4571, 51.4489],
    spotsTotal: 138,
    aeroparkerProductId: '31',
    pricePerHour: 1.5,
    aeroparkerSync: {
      tarieven: [
        { label: 'Per 30 minuten', prijs: '0,75' },
        { label: 'Dagtarief met reservering', prijs: '7,50' },
        { label: 'Maandabonnement', prijs: '{{TODO-NL: prijs bevestigen}}' },
      ],
      dagprijs: '1,50',
      syncStatus: 'vermist',
      syncMelding: 'Dit product stond niet in de laatste synchronisatie van Aeroparker. De prijs hieronder is de laatst bekende prijs van 10 september.',
    },
    oudeId: 31,
    secties: DEFAULT_SECTIES,
    _status: 'published',
  })

  payload.logger.info('— 3 referentielocaties (Eindhoven) klaar')

  // --- Evenementen ---
  await upsert(payload, 'evenementen', { slug: { equals: 'glow-2025' } }, {
    naam: 'GLOW Eindhoven 2025',
    slug: 'glow-2025',
    soort: 'Festival',
    kleur: 'orange',
    datums: '8 t/m 16 november 2025',
    vanafPrijs: '12',
    locaties: [philipsStadion.id, dllParkeerdek.id],
    _status: 'published',
  })
  await upsert(payload, 'evenementen', { slug: { equals: 'psv-seizoen' } }, {
    naam: 'PSV Eindhoven Thuiswedstrijden',
    slug: 'psv-seizoen',
    soort: 'Sport',
    kleur: 'blue',
    datums: 'Eredivisie seizoen 2025',
    vanafPrijs: '12',
    locaties: [philipsStadion.id],
    _status: 'published',
  })
  payload.logger.info('— evenementen klaar')

  // --- FAQ categorieën + een paar voorbeeldvragen ---
  const catData = [
    { naam: 'Algemeen', slug: 'algemeen', volgorde: 1 },
    { naam: 'Betalen', slug: 'betalen', volgorde: 2 },
    { naam: 'Abonnementen', slug: 'abonnementen', volgorde: 3 },
    { naam: 'Reserveren', slug: 'reserveren', volgorde: 4 },
    { naam: 'Zakelijk', slug: 'zakelijk', volgorde: 5 },
  ]
  const catBySlug = new Map<string, { id: number | string }>()
  for (const c of catData) {
    const doc = await upsert(payload, 'faq-categorieen', { slug: { equals: c.slug } }, c)
    catBySlug.set(c.slug, doc as { id: number | string })
  }

  const faqData: Array<{ question: string; answerText: string; categorie: string; volgorde: number }> = [
    { question: 'Kan ik mijn reservering kosteloos wijzigen?', answerText: 'Ja, tot een uur voor aankomst kun je je reservering kosteloos wijzigen of annuleren via de app of website.', categorie: 'reserveren', volgorde: 1 },
    { question: 'Welke betaalmethoden accepteert ParkingYou?', answerText: 'iDEAL, creditcard, PIN aan de terminal en de ParkingYou App. Op sommige locaties ook contant.', categorie: 'betalen', volgorde: 1 },
    { question: 'Hoe werkt kentekenherkenning bij het in- en uitrijden?', answerText: 'Bij een reservering herkent de camera je kenteken automatisch en gaat de slagboom open, zonder ticket of pas.', categorie: 'algemeen', volgorde: 1 },
    { question: 'Kan mijn bedrijf een zakelijk parkeerabonnement afsluiten?', answerText: 'Ja, neem contact op via de zakelijke pagina voor een abonnement op maat voor je medewerkers of vloot.', categorie: 'zakelijk', volgorde: 1 },
  ]
  for (const f of faqData) {
    await upsert(payload, 'faq', { question: { equals: f.question } }, {
      question: f.question,
      answer: {
        root: {
          type: 'root',
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [{ type: 'text', version: 1, text: f.answerText }],
            },
          ],
        },
      },
      categorie: catBySlug.get(f.categorie)?.id,
      volgorde: f.volgorde,
    })
  }
  payload.logger.info('— faq-categorieën en voorbeeld-FAQ klaar')

  // --- Eén voorbeeld POI-pagina ---
  await upsert(payload, 'pois', { slug: { equals: 'philips-stadion-evenementen' } }, {
    name: 'Philips Stadion (evenementen)',
    titel: 'Parkeren bij het Philips Stadion',
    slug: 'philips-stadion-evenementen',
    category: 'venue',
    primaireLocatie: philipsStadion.id,
    loopafstand: 5,
    intro: 'Op weg naar een PSV-wedstrijd of een concert in het Philips Stadion? Reserveer vooraf en parkeer op loopafstand.',
    secties: [{ blockType: 'poiHero' }],
    _status: 'published',
  })
  payload.logger.info("— voorbeeld POI-pagina klaar")

  payload.logger.info('Klaar. Draai dit script opnieuw na wijzigingen: het overschrijft op slug, dupliceert niet.')
  process.exit(0)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
