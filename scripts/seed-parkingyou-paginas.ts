/**
 * Seeds the generic marketing pages from docs/IA.md that are not their own
 * collection (zakelijk, over-ons, contact, klantenservice, werken-bij,
 * abonnementen, parkingpass, veelgestelde-vragen, legal pages), each with a
 * couple of the new Dutch blocks already placed so the block editor and
 * reordering can be tried immediately.
 *
 * Copy is intentionally short placeholder text, not final marketing copy —
 * the point of this pass is the editable architecture, not the wording.
 * Nesting: /zakelijk/{onderwerp} works because the catch-all frontend route
 * (src/app/(frontend)/[...slug]/page.tsx) treats the whole `slug` field,
 * slashes included, as the URL path. No nested-docs plugin involved.
 *
 * Run with: npx tsx --env-file=.env scripts/seed-parkingyou-paginas.ts
 */
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

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

async function upsertPage(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
  title: string,
  bovenliggendePagina: number | string | undefined,
  heroText: string,
  layout: Record<string, unknown>[],
) {
  const p = payload as any // eslint-disable-line @typescript-eslint/no-explicit-any
  const existing = await p.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, overrideAccess: true })
  const data = {
    title,
    slug,
    bovenliggendePagina,
    hero: { type: 'lowImpact' as const, richText: lexical([{ type: 'p', text: heroText }]) },
    layout,
    _status: 'published' as const,
  }
  if (existing.docs[0]) {
    return p.update({ collection: 'pages', id: existing.docs[0].id, data, overrideAccess: true, context: { disableRevalidate: true } })
  }
  return p.create({ collection: 'pages', data, overrideAccess: true, context: { disableRevalidate: true } })
}

async function main() {
  const payload = await getPayload({ config: configPromise })
  payload.logger.info("Seeding generieke pagina's...")

  await upsertPage(payload, 'over-ons', 'Over ons', undefined, 'ParkingYou maakt parkeren in de stad voorspelbaar: vooraf reserveren, vast tarief, geen gedoe bij de slagboom.', [
    {
      blockType: 'uspRij',
      items: [
        { titel: 'Sinds 2015 actief', tekst: 'Gegroeid van één garage tot 40+ locaties in heel Nederland.', icoon: 'shield' },
        { titel: 'Eigen technologie', tekst: 'Kentekenherkenning en realtime beschikbaarheid, zelf gebouwd.', icoon: 'bolt' },
        { titel: 'Nederlands bedrijf', tekst: 'Klantenservice en techniek zitten in Eindhoven.', icoon: 'check' },
      ],
    },
  ])

  const overOns = await payload.find({ collection: 'pages', where: { slug: { equals: 'over-ons' } }, limit: 1, overrideAccess: true })
  await upsertPage(payload, 'over-ons/team', 'Het team', overOns.docs[0]?.id, 'De mensen achter ParkingYou.', [
    { blockType: 'content', columns: [{ size: 'full', richText: lexical([{ type: 'p', text: "Teamprofielen volgen. {{TODO-NL: foto's en bios aanleveren}}" }]) }] },
  ])

  await upsertPage(payload, 'contact', 'Contact', undefined, 'Vraag over een reservering, een factuur of iets anders? Wij helpen je graag.', [
    { blockType: 'uspRij', items: [
      { titel: 'Telefonisch', tekst: '085 4011647, 24/7 bereikbaar', icoon: 'clock' },
      { titel: 'E-mail', tekst: 'info@parkingyou.nl', icoon: 'check' },
    ] },
  ])

  await upsertPage(payload, 'klantenservice', 'Klantenservice', undefined, 'Antwoord op de meestgestelde vragen, of neem direct contact op.', [
    { blockType: 'faqBlok', titel: 'Veelgestelde vragen', bron: 'alles' },
  ])

  await upsertPage(payload, 'werken-bij', 'Werken bij ParkingYou', undefined, 'ParkingYou groeit. Bekijk de openstaande vacatures.', [
    { blockType: 'content', columns: [{ size: 'full', richText: lexical([{ type: 'p', text: '{{TODO-NL: actuele vacatures aanleveren}}' }]) }] },
  ])

  await upsertPage(payload, 'zakelijk', 'Zakelijk parkeren', undefined, 'Een parkeeroplossing voor je medewerkers, bezoekers of wagenpark, op maat van je bedrijf.', [
    { blockType: 'uspRij', items: [
      { titel: 'Eén factuur per maand', tekst: 'Geen losse bonnetjes meer.', icoon: 'card' },
      { titel: 'Beheer op afstand', tekst: "Voeg of verwijder kentekens zelf toe in het portaal.", icoon: 'check' },
      { titel: 'Flexibele contracten', tekst: 'Van 5 tot honderden plekken.', icoon: 'shield' },
    ] },
    { blockType: 'cta' },
  ])

  const zakelijk = await payload.find({ collection: 'pages', where: { slug: { equals: 'zakelijk' } }, limit: 1, overrideAccess: true })
  await upsertPage(
    payload,
    'zakelijk/klein-zakelijk-parkeren',
    'Klein-zakelijk parkeren',
    zakelijk.docs[0]?.id,
    "Voor zzp'ers en kleine bedrijven: een voordelig abonnement zonder lange looptijd.",
    [{ blockType: 'content', columns: [{ size: 'full', richText: lexical([{ type: 'p', text: '{{TODO-NL: voorwaarden en prijzen klein-zakelijk aanleveren}}' }]) }] }],
  )

  await upsertPage(payload, 'abonnementen', 'Abonnementen', undefined, 'Parkeer vaker voor minder met een ParkingYou-abonnement.', [
    { blockType: 'content', columns: [{ size: 'full', richText: lexical([{ type: 'p', text: '{{TODO-NL: abonnementsvormen en actuele prijzen aanleveren, zie docs/CONTENT-MODEL.md}}' }]) }] },
  ])

  await upsertPage(payload, 'parkingpass', 'ParkingPass', undefined, 'De ParkingPass: één pas voor al je bezoeken aan ParkingYou-locaties.', [
    { blockType: 'content', columns: [{ size: 'full', richText: lexical([{ type: 'p', text: '{{TODO-NL: ParkingPass-voorwaarden aanleveren}}' }]) }] },
  ])

  await upsertPage(payload, 'veelgestelde-vragen', 'Veelgestelde vragen', undefined, 'Alles wat je wilt weten over reserveren, betalen en parkeren bij ParkingYou.', [
    { blockType: 'faqBlok', titel: 'Veelgestelde vragen', bron: 'alles' },
  ])

  await upsertPage(payload, 'algemene-voorwaarden', 'Algemene voorwaarden', undefined, '', [
    { blockType: 'content', columns: [{ size: 'full', richText: lexical([{ type: 'p', text: '{{TODO-NL: juridische tekst aanleveren}}' }]) }] },
  ])
  await upsertPage(payload, 'privacybeleid', 'Privacybeleid', undefined, '', [
    { blockType: 'content', columns: [{ size: 'full', richText: lexical([{ type: 'p', text: '{{TODO-NL: AVG/GDPR-tekst aanleveren}}' }]) }] },
  ])
  await upsertPage(payload, 'cookiebeleid', 'Cookiebeleid', undefined, '', [
    { blockType: 'content', columns: [{ size: 'full', richText: lexical([{ type: 'p', text: '{{TODO-NL: cookiebeleid aanleveren}}' }]) }] },
  ])

  payload.logger.info("Klaar met de generieke pagina's.")
  process.exit(0)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
