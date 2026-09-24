import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'
import type { CollectionSlug, Payload, PayloadRequest } from 'payload'

/**
 * One-off content seed for production, based on scripts/seed-parkingyou-*.ts
 * but safe to run against real data:
 * - only creates documents, never overwrites one that already exists;
 * - publishes only content without placeholders (steden, faq-categorieën, and
 *   the stad link on existing locations);
 * - everything with {{TODO-NL}} markers or invented data (reference locations,
 *   events, the sample POI, generic pages) is created as a draft for review.
 * Sample FAQ items are left out: the faq collection has no drafts and items
 * without locations show on every location page.
 */

type Ctx = { payload: Payload; req: PayloadRequest }

async function createIfMissing(
  { payload, req }: Ctx,
  collection: CollectionSlug,
  where: Record<string, unknown>,
  data: Record<string, unknown>,
  { draft }: { draft: boolean },
): Promise<{ id: number | string }> {
  const existing = await payload.find({
    collection,
    where: where as never,
    limit: 1,
    depth: 0,
    draft: true,
    overrideAccess: true,
    req,
  })
  if (existing.docs[0]) {
    payload.logger.info(`seed: ${collection} ${JSON.stringify(where)} exists, left untouched`)
    return existing.docs[0] as { id: number | string }
  }
  const doc = await payload.create({
    collection,
    data: { ...data, _status: draft ? 'draft' : 'published' } as never,
    draft,
    depth: 0,
    overrideAccess: true,
    req,
    context: { disableRevalidate: true },
  })
  payload.logger.info(`seed: ${collection} ${JSON.stringify(where)} created${draft ? ' as draft' : ''}`)
  return doc as { id: number | string }
}

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
          ? { type: 'heading', tag: 'h2', version: 1, children: [{ type: 'text', version: 1, text: c.text }] }
          : { type: 'paragraph', version: 1, children: [{ type: 'text', version: 1, text: c.text }] },
      ),
    },
  }
}

const STEDEN = [
  { slug: 'eindhoven', naam: 'Eindhoven', isRegio: false, intro: 'Parkeer centraal in Eindhoven en loop zo het centrum in. Reserveer vooraf, dan weet je zeker dat er een plek voor je is.' },
  { slug: 'amsterdam', naam: 'Amsterdam', isRegio: false, intro: '' },
  { slug: 'rotterdam', naam: 'Rotterdam', isRegio: false, intro: '' },
  { slug: 'tilburg', naam: 'Tilburg', isRegio: false, intro: '' },
  { slug: 'regio-zuid-holland', naam: 'Regio Zuid-Holland', isRegio: true, intro: '' },
  { slug: 'den-haag', naam: 'Den Haag', isRegio: false, intro: '' },
  { slug: 'regio-gelderland', naam: 'Regio Gelderland', isRegio: true, intro: '' },
  { slug: 'utrecht', naam: 'Utrecht', isRegio: false, intro: '' },
  { slug: 'heerhugowaard', naam: 'Heerhugowaard', isRegio: false, intro: '' },
  { slug: 'zoetermeer', naam: 'Zoetermeer', isRegio: false, intro: '' },
  { slug: 'almere', naam: 'Almere', isRegio: false, intro: '' },
]

const LOCATIE_SECTIES = [
  { blockType: 'locatieHero' },
  { blockType: 'locatieTarieven' },
  { blockType: 'locatieFaciliteiten' },
  { blockType: 'locatieOpeningstijden' },
  { blockType: 'locatiePoisNabij' },
  { blockType: 'locatieKaartProducten' },
  { blockType: 'locatieEvenementen' },
  { blockType: 'locatieFaq' },
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const ctx = { payload, req }

  // --- Steden (published) ---
  const stadIdBySlug = new Map<string, number | string>()
  for (const s of STEDEN) {
    const doc = await createIfMissing(ctx, 'steden', { slug: { equals: s.slug } }, {
      naam: s.naam,
      slug: s.slug,
      isRegio: s.isRegio,
      secties: [{ blockType: 'stadHero', intro: s.intro || undefined }, { blockType: 'stadLocatiesLijst' }],
    }, { draft: false })
    stadIdBySlug.set(s.slug, doc.id)
  }

  // --- Link existing locations to their stad ---
  const { docs: locations } = await payload.find({
    collection: 'locations',
    draft: true,
    depth: 0,
    limit: 0,
    pagination: false,
    overrideAccess: true,
    req,
  })
  for (const loc of locations) {
    if (loc.stad) continue
    const stadId = stadIdBySlug.get(loc.city)
    if (!stadId) continue
    // A draft here means unpublished edits (or never published); saving now
    // would bypass them, so leave those for the editor.
    if (loc._status !== 'published') {
      payload.logger.info(`seed: location ${loc.slug} has a pending draft, stad not linked`)
      continue
    }
    try {
      await payload.update({
        collection: 'locations',
        id: loc.id,
        data: { stad: stadId } as never,
        depth: 0,
        overrideAccess: true,
        req,
        context: { disableRevalidate: true },
      })
      payload.logger.info(`seed: location ${loc.slug} linked to stad ${loc.city}`)
    } catch (err) {
      payload.logger.warn(`seed: location ${loc.slug} not linked: ${(err as Error).message}`)
    }
  }

  // --- FAQ categorieën (published; no drafts on this collection) ---
  for (const c of [
    { naam: 'Algemeen', slug: 'algemeen', volgorde: 1 },
    { naam: 'Betalen', slug: 'betalen', volgorde: 2 },
    { naam: 'Abonnementen', slug: 'abonnementen', volgorde: 3 },
    { naam: 'Reserveren', slug: 'reserveren', volgorde: 4 },
    { naam: 'Zakelijk', slug: 'zakelijk', volgorde: 5 },
  ]) {
    await createIfMissing(ctx, 'faq-categorieen', { slug: { equals: c.slug } }, c, { draft: false })
  }

  // --- Reference locations (drafts: placeholder addresses and Aeroparker IDs) ---
  const eindhoven = stadIdBySlug.get('eindhoven')
  const philipsStadion = await createIfMissing(ctx, 'locations', { slug: { equals: 'philips-stadion' } }, {
    name: 'Philips Stadion',
    slug: 'philips-stadion',
    city: 'eindhoven',
    stad: eindhoven,
    intro: 'Een slimme keuze voor PSV, Strijp-S en een dag Eindhoven. Reserveer vooraf en rij zonder ticketstress naar binnen.',
    soort: 'Parkeerterrein',
    rating: 4.7,
    loopafstand: '8 min lopen naar centrum',
    maxHeight: '4.50 m (open terrein)',
    faciliteiten: [{ tekst: 'Cameratoezicht' }, { tekst: 'Verlichting' }, { tekst: 'Kentekenherkenning' }, { tekst: 'Rolstoeltoegankelijk' }, { tekst: 'Fietsenstalling' }],
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
    secties: LOCATIE_SECTIES,
  }, { draft: true })

  const dllParkeerdek = await createIfMissing(ctx, 'locations', { slug: { equals: 'dll-parkeerdek' } }, {
    name: 'Parking DLL parkeerdek',
    slug: 'dll-parkeerdek',
    city: 'eindhoven',
    stad: eindhoven,
    intro: 'Een centrale keuze voor Eindhoven: snel parkeren, korte loopafstand en duidelijke tarieven.',
    soort: 'Parkeerterrein',
    rating: 4.6,
    loopafstand: '4 min lopen naar centrum',
    maxHeight: '4.50 m (open terrein)',
    faciliteiten: [{ tekst: 'Laadpalen (4x)' }, { tekst: 'Cameratoezicht' }, { tekst: 'Verlichting' }, { tekst: 'Betaalterminal' }, { tekst: 'Rolstoeltoegankelijk' }],
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
    secties: LOCATIE_SECTIES,
  }, { draft: true })

  await createIfMissing(ctx, 'locations', { slug: { equals: 'philips-bedrijfsschool' } }, {
    name: 'Parking Philips Bedrijfsschool',
    slug: 'philips-bedrijfsschool',
    city: 'eindhoven',
    stad: eindhoven,
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
    secties: LOCATIE_SECTIES,
  }, { draft: true })

  // --- Evenementen (drafts) ---
  await createIfMissing(ctx, 'evenementen', { slug: { equals: 'glow-2025' } }, {
    naam: 'GLOW Eindhoven 2025',
    slug: 'glow-2025',
    soort: 'Festival',
    kleur: 'orange',
    datums: '8 t/m 16 november 2025',
    vanafPrijs: '12',
    locaties: [philipsStadion.id, dllParkeerdek.id],
  }, { draft: true })
  await createIfMissing(ctx, 'evenementen', { slug: { equals: 'psv-seizoen' } }, {
    naam: 'PSV Eindhoven Thuiswedstrijden',
    slug: 'psv-seizoen',
    soort: 'Sport',
    kleur: 'blue',
    datums: 'Eredivisie seizoen 2025',
    vanafPrijs: '12',
    locaties: [philipsStadion.id],
  }, { draft: true })

  // --- Sample POI page (draft) ---
  await createIfMissing(ctx, 'pois', { slug: { equals: 'philips-stadion-evenementen' } }, {
    name: 'Philips Stadion (evenementen)',
    titel: 'Parkeren bij het Philips Stadion',
    slug: 'philips-stadion-evenementen',
    category: 'venue',
    primaireLocatie: philipsStadion.id,
    loopafstand: 5,
    intro: 'Op weg naar een PSV-wedstrijd of een concert in het Philips Stadion? Reserveer vooraf en parkeer op loopafstand.',
    secties: [{ blockType: 'poiHero' }],
  }, { draft: true })

  // --- Generic pages (drafts: placeholder copy) ---
  const page = (
    slug: string,
    title: string,
    heroText: string,
    layout: Record<string, unknown>[],
    bovenliggendePagina?: number | string,
  ) =>
    createIfMissing(ctx, 'pages', { slug: { equals: slug } }, {
      title,
      slug,
      bovenliggendePagina,
      hero: { type: 'lowImpact', richText: lexical(heroText ? [{ type: 'p', text: heroText }] : []) },
      layout,
    }, { draft: true })
  const content = (text: string) => ({ blockType: 'content', columns: [{ size: 'full', richText: lexical([{ type: 'p', text }]) }] })

  const overOns = await page('over-ons', 'Over ons', 'ParkingYou maakt parkeren in de stad voorspelbaar: vooraf reserveren, vast tarief, geen gedoe bij de slagboom.', [
    {
      blockType: 'uspRij',
      items: [
        { titel: 'Sinds 2015 actief', tekst: 'Gegroeid van één garage tot 40+ locaties in heel Nederland.', icoon: 'shield' },
        { titel: 'Eigen technologie', tekst: 'Kentekenherkenning en realtime beschikbaarheid, zelf gebouwd.', icoon: 'bolt' },
        { titel: 'Nederlands bedrijf', tekst: 'Klantenservice en techniek zitten in Eindhoven.', icoon: 'check' },
      ],
    },
  ])
  await page('over-ons/team', 'Het team', 'De mensen achter ParkingYou.', [content("Teamprofielen volgen. {{TODO-NL: foto's en bios aanleveren}}")], overOns.id)
  await page('contact', 'Contact', 'Vraag over een reservering, een factuur of iets anders? Wij helpen je graag.', [
    {
      blockType: 'uspRij',
      items: [
        { titel: 'Telefonisch', tekst: '085 4011647, 24/7 bereikbaar', icoon: 'clock' },
        { titel: 'E-mail', tekst: 'info@parkingyou.nl', icoon: 'check' },
      ],
    },
  ])
  await page('klantenservice', 'Klantenservice', 'Antwoord op de meestgestelde vragen, of neem direct contact op.', [{ blockType: 'faqBlok', titel: 'Veelgestelde vragen', bron: 'alles' }])
  await page('werken-bij', 'Werken bij ParkingYou', 'ParkingYou groeit. Bekijk de openstaande vacatures.', [content('{{TODO-NL: actuele vacatures aanleveren}}')])
  const zakelijk = await page('zakelijk', 'Zakelijk parkeren', 'Een parkeeroplossing voor je medewerkers, bezoekers of wagenpark, op maat van je bedrijf.', [
    {
      blockType: 'uspRij',
      items: [
        { titel: 'Eén factuur per maand', tekst: 'Geen losse bonnetjes meer.', icoon: 'card' },
        { titel: 'Beheer op afstand', tekst: 'Voeg of verwijder kentekens zelf toe in het portaal.', icoon: 'check' },
        { titel: 'Flexibele contracten', tekst: 'Van 5 tot honderden plekken.', icoon: 'shield' },
      ],
    },
    { blockType: 'cta' },
  ])
  await page('zakelijk/klein-zakelijk-parkeren', 'Klein-zakelijk parkeren', "Voor zzp'ers en kleine bedrijven: een voordelig abonnement zonder lange looptijd.", [content('{{TODO-NL: voorwaarden en prijzen klein-zakelijk aanleveren}}')], zakelijk.id)
  await page('abonnementen', 'Abonnementen', 'Parkeer vaker voor minder met een ParkingYou-abonnement.', [content('{{TODO-NL: abonnementsvormen en actuele prijzen aanleveren}}')])
  await page('parkingpass', 'ParkingPass', 'De ParkingPass: één pas voor al je bezoeken aan ParkingYou-locaties.', [content('{{TODO-NL: ParkingPass-voorwaarden aanleveren}}')])
  await page('veelgestelde-vragen', 'Veelgestelde vragen', 'Alles wat je wilt weten over reserveren, betalen en parkeren bij ParkingYou.', [{ blockType: 'faqBlok', titel: 'Veelgestelde vragen', bron: 'alles' }])
  await page('algemene-voorwaarden', 'Algemene voorwaarden', '', [content('{{TODO-NL: juridische tekst aanleveren}}')])
  await page('privacybeleid', 'Privacybeleid', '', [content('{{TODO-NL: AVG/GDPR-tekst aanleveren}}')])
  await page('cookiebeleid', 'Cookiebeleid', '', [content('{{TODO-NL: cookiebeleid aanleveren}}')])
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content seed: the created documents are ordinary editable content now and
  // may have been changed by editors, so rolling back would lose their work.
}
