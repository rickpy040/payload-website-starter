import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { LocatieHero } from '@/blocks/locatie/Hero/config'
import { LocatieTarieven } from '@/blocks/locatie/Tarieven/config'
import { LocatieFaciliteiten } from '@/blocks/locatie/Faciliteiten/config'
import { LocatieOpeningstijden } from '@/blocks/locatie/Openingstijden/config'
import { LocatiePoisNabij } from '@/blocks/locatie/PoisNabij/config'
import { LocatieKaartProducten } from '@/blocks/locatie/KaartProducten/config'
import { LocatieEvenementen } from '@/blocks/locatie/Evenementen/config'
import { LocatieFaq } from '@/blocks/locatie/Faq/config'
import { Content } from '@/blocks/Content/config'
import { Citaat } from '@/blocks/Citaat/config'
import { revalidateLocatie, revalidateLocatieDelete } from './hooks/revalidateLocatie'

/**
 * `locations`, extended from the original PR #2 shape to match
 * docs/CONTENT-MODEL.md (including its addendum) and to add the `secties`
 * blocks field that makes the page body reorderable in the admin.
 *
 * Booking-critical fields from the original shape (`city`, `aeroparkerProductId`,
 * `pricePerHour`, `spotsFree`, `spotsTotal`, `amenities`, `openingHours`,
 * `address.street/postalCode/cityName`) are left exactly as they were: the
 * live /parkeren search and booking flow reads them and nothing here should
 * break that. The new fields below are additive. Where a new field and an old
 * one cover close to the same ground (`amenities` vs `faciliteiten`, `rating`
 * vs the prototype's "beoordeling", `openingHours` vs the new `uren` group),
 * both exist for now; reconciling them into one field is a follow-up, called
 * out in the PR description rather than done silently here.
 */
export const Locations: CollectionConfig = {
  slug: 'locations',
  labels: { singular: 'Locatie', plural: 'Locaties' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'aeroparkerProductId', '_status'],
    livePreview: {
      url: ({ data }) => {
        const stadSlug =
          typeof data?.stad === 'object' && data?.stad ? data.stad.slug : data?.city
        return `/parkeren/${stadSlug ?? ''}/${data?.slug ?? ''}`
      },
    },
  },
  versions: { drafts: true },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Naam' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL',
      admin: { position: 'sidebar', description: 'Gebruikt in de URL, bv. parkeren/eindhoven/strijp-s' },
    },
    {
      name: 'city',
      type: 'select',
      required: true,
      label: 'Stad (legacy)',
      admin: {
        position: 'sidebar',
        description:
          'Gebruikt door de zoek- en boekingsflow op /parkeren. Nieuw: koppel hieronder ook de Stad-pagina.',
      },
      options: [
        { label: 'Eindhoven', value: 'eindhoven' },
        { label: 'Rotterdam', value: 'rotterdam' },
        { label: 'Amsterdam', value: 'amsterdam' },
        { label: 'Den Haag', value: 'den-haag' },
        { label: 'Utrecht', value: 'utrecht' },
        { label: 'Tilburg', value: 'tilburg' },
        { label: 'Heerhugowaard', value: 'heerhugowaard' },
        { label: 'Zoetermeer', value: 'zoetermeer' },
        { label: 'Almere', value: 'almere' },
        { label: 'Regio Zuid-Holland', value: 'regio-zuid-holland' },
        { label: 'Regio Gelderland', value: 'regio-gelderland' },
      ],
    },
    {
      name: 'stad',
      type: 'relationship',
      relationTo: 'steden',
      label: 'Stad-pagina',
      admin: {
        position: 'sidebar',
        description: 'Koppelt deze locatie aan haar stadspagina (/parkeren/{stad}). Vult de stadssectie en de breadcrumb.',
      },
    },
    {
      name: 'address',
      type: 'group',
      label: 'Adres',
      fields: [
        { name: 'street', type: 'text', label: 'Straat' },
        { name: 'huisnummer', type: 'text', label: 'Huisnummer' },
        { name: 'postalCode', type: 'text', label: 'Postcode' },
        { name: 'cityName', type: 'text', label: 'Plaats' },
      ],
    },
    { name: 'coordinates', type: 'point', label: 'Locatie op de kaart', admin: { description: '[lng, lat]' } },
    {
      name: 'aeroparkerProductId',
      type: 'text',
      required: true,
      label: 'Aeroparker product-ID',
      admin: { description: 'Het product/locatie-ID zoals gebruikt in de Aeroparker API (koppeling voor beschikbaarheid + prijs)' },
    },
    { name: 'leverancier', type: 'text', label: 'Leverancier parkeersysteem', admin: { position: 'sidebar', description: 'Bv. IP Parking, Skidata, WPS' } },
    { name: 'googleMapsUrl', type: 'text', label: 'Google Maps-link' },
    {
      name: 'pricePerHour',
      type: 'number',
      required: true,
      label: 'Vanafprijs per uur',
      admin: { description: 'In euro, getoond als fallback zolang er geen live Aeroparker-tarief is opgehaald' },
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      label: 'Beoordeling',
      admin: { description: 'Gemiddelde beoordeling, bv. 4.6. Bron nog te bevestigen, zie docs/CONTENT-MODEL.md.' },
    },
    { name: 'openingHours', type: 'text', label: 'Openingstijden (kort)', admin: { description: 'Bv. "24/7 geopend" of "06:00 – 01:00"' } },
    { name: 'maxHeight', type: 'text', label: 'Maximale doorrijhoogte', admin: { description: 'Bv. "4.50 m (open terrein)"' } },
    { name: 'spotsTotal', type: 'number', min: 0, label: 'Aantal parkeerplaatsen' },
    {
      name: 'spotsFree',
      type: 'number',
      min: 0,
      label: 'Vrije plekken (handmatig)',
      admin: { description: 'Handmatig bij te werken vrije plekken, zolang er geen live feed is.' },
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Korte omschrijving',
      admin: { description: 'Gebruikt in listings, de hero en als meta-omschrijving fallback.' },
    },
    { name: 'description', type: 'richText', label: 'Uitgebreide omschrijving' },
    {
      name: 'images',
      type: 'array',
      label: "Foto's",
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'alt', type: 'text', required: true, label: 'Alt-tekst' },
      ],
    },
    {
      name: 'amenities',
      type: 'select',
      hasMany: true,
      label: 'Voorzieningen (legacy filter)',
      options: [
        { label: 'Overdekt', value: 'covered' },
        { label: 'Laadpaal', value: 'ev-charging' },
        { label: 'Mindervalide plek', value: 'disabled-access' },
        { label: '24/7 open', value: '24-7' },
        { label: 'Bewaakt', value: 'guarded' },
      ],
    },
    {
      name: 'terminals',
      type: 'array',
      label: 'Terminalregister',
      admin: { description: 'Terminalregister per locatie, bv. BSG-I1' },
      fields: [
        { name: 'code', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Inrit', value: 'inrit' },
            { label: 'Uitrit', value: 'uitrit' },
            { label: 'Betaalautomaat', value: 'betaal' },
          ],
        },
      ],
    },
    { name: 'poiPaginas', type: 'relationship', relationTo: 'pois', hasMany: true, label: "Bijbehorende POI-landingspagina's" },
    { name: 'faqs', type: 'relationship', relationTo: 'faq', hasMany: true, label: 'Aanvullende FAQ-items' },

    // --- Addendum fields from docs/CONTENT-MODEL.md, "fields the prototype's
    // location page requires" ---
    {
      name: 'soort',
      type: 'select',
      label: 'Type locatie',
      defaultValue: 'Parkeerterrein',
      options: [
        { label: 'Parkeerterrein', value: 'Parkeerterrein' },
        { label: 'Parkeergarage', value: 'Parkeergarage' },
        { label: 'Ondergrondse garage', value: 'Ondergrondse garage' },
        { label: 'Parkeerdak', value: 'Parkeerdak' },
      ],
    },
    { name: 'loopafstand', type: 'text', label: 'Loopafstand', admin: { description: 'Vrije tekst, bv. "8 min lopen naar centrum"' } },
    {
      name: 'faciliteiten',
      type: 'array',
      label: 'Faciliteiten',
      admin: { description: "Vrije lijst, bv. \"Laadpalen (6x)\". Vervangt de vaste 'Voorzieningen'-lijst hierboven voor de nieuwe locatiepagina." },
      fields: [{ name: 'tekst', type: 'text', required: true }],
    },
    {
      name: 'betaalmogelijkheden',
      type: 'array',
      label: 'Betaalmogelijkheden',
      fields: [{ name: 'tekst', type: 'text', required: true }],
    },
    {
      name: 'poisNabij',
      type: 'array',
      label: "POI's in de buurt",
      admin: { description: "Vrije tekstlijst voor de 'in de buurt'-sectie. Anders dan de POI-landingspagina's hierboven." },
      fields: [
        { name: 'naam', type: 'text', required: true },
        { name: 'soort', type: 'text' },
        { name: 'afstand', type: 'text' },
      ],
    },
    {
      name: 'uren',
      type: 'group',
      label: 'Openingsweek',
      fields: [
        { name: 'open247', type: 'checkbox', label: '24/7 geopend' },
        { name: 'doordeweeks', type: 'text', label: 'Maandag t/m vrijdag', admin: { condition: (_d, s) => !s?.open247 } },
        { name: 'zaterdag', type: 'text', label: 'Zaterdag', admin: { condition: (_d, s) => !s?.open247 } },
        { name: 'zondag', type: 'text', label: 'Zondag', admin: { condition: (_d, s) => !s?.open247 } },
      ],
    },
    { name: 'reserveerbaar', type: 'checkbox', label: 'Reserveerbaar (kentekentoegang)' },
    { name: 'waardekaart', type: 'checkbox', label: 'Waardekaart beschikbaar' },
    { name: 'strippenkaart', type: 'checkbox', label: 'Strippenkaart beschikbaar' },
    {
      name: 'abonnementen',
      type: 'checkbox',
      label: 'Abonnementen mogelijk',
      admin: { description: 'Toont deze locatie in een Locatie-overzicht met bron "Abonnementslocaties", zoals op /abonnementen.' },
    },
    {
      name: 'parkingPass',
      type: 'checkbox',
      label: 'ParkingPass geldig',
      admin: { description: 'Toont deze locatie bij de ParkingPass-locaties en in het ParkingPass-bestelformulier.' },
    },
    {
      name: 'kaartLabels',
      type: 'array',
      label: 'Labels op de locatiekaart',
      maxRows: 3,
      admin: {
        description:
          'De kleine labels op de kaart in een Locatie-overzicht, bv. "Reserveerbaar", "24/7", "Events". Leeg = automatisch uit de velden hierboven.',
      },
      fields: [{ name: 'tekst', type: 'text', required: true }],
    },
    {
      name: 'inrit',
      type: 'richText',
      editor: lexicalEditor(),
      label: 'Inrijden',
      admin: { description: 'Hoe kom je naar binnen: slagboom, kentekenherkenning, ticket.' },
    },
    { name: 'uitrit', type: 'richText', editor: lexicalEditor(), label: 'Uitrijden' },
    { name: 'route', type: 'richText', editor: lexicalEditor(), label: 'Route en bereikbaarheid' },

    {
      name: 'aeroparkerSync',
      type: 'group',
      label: 'Aeroparker synchronisatie',
      admin: { description: 'Gesynchroniseerd: alleen-lezen, wordt elke nacht overschreven door Aeroparker.' },
      fields: [
        {
          name: 'tarieven',
          type: 'array',
          label: 'Tarieventabel',
          admin: { readOnly: true },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'prijs', type: 'text', required: true, admin: { description: 'Nederlandse notatie, bv. "12,00"' } },
          ],
        },
        { name: 'dagprijs', type: 'text', label: 'Dagprijs (koptekst)', admin: { readOnly: true } },
        { name: 'laatsteSync', type: 'date', label: 'Laatst bijgewerkt', admin: { readOnly: true } },
        {
          name: 'syncStatus',
          type: 'select',
          label: 'Synchronisatiestatus',
          defaultValue: 'ok',
          admin: { readOnly: true },
          options: [
            { label: 'OK', value: 'ok' },
            { label: 'Verouderd', value: 'verouderd' },
            { label: 'Vermist', value: 'vermist' },
            { label: 'Fout', value: 'fout' },
          ],
        },
        { name: 'syncMelding', type: 'textarea', label: 'Melding aan redacteur', admin: { readOnly: true } },
      ],
    },

    {
      name: 'secties',
      type: 'blocks',
      label: 'Secties op de locatiepagina',
      labels: { singular: 'Sectie', plural: 'Secties' },
      blocks: [
        LocatieHero,
        LocatieTarieven,
        LocatieFaciliteiten,
        LocatieOpeningstijden,
        LocatiePoisNabij,
        LocatieKaartProducten,
        LocatieEvenementen,
        LocatieFaq,
        Content,
        Citaat,
      ],
      admin: {
        initCollapsed: true,
        description:
          'Sleep om te herordenen, of verwijder een sectie om hem uit te zetten. Elke sectie leest zijn eigen inhoud uit de velden hierboven.',
      },
      defaultValue: [
        { blockType: 'locatieHero' },
        { blockType: 'locatieTarieven' },
        { blockType: 'locatieFaciliteiten' },
        { blockType: 'locatieOpeningstijden' },
        { blockType: 'locatiePoisNabij' },
        { blockType: 'locatieKaartProducten' },
        { blockType: 'locatieEvenementen' },
        { blockType: 'locatieFaq' },
      ],
    },

    // --- SEO group, shared shape per docs/CONTENT-MODEL.md ---
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'titel', type: 'text', label: 'SEO-titel', admin: { description: 'Valt terug op de naam van de locatie.' } },
        { name: 'omschrijving', type: 'textarea', label: 'SEO-omschrijving', admin: { description: 'Valt terug op de introductietekst.' } },
        { name: 'afbeelding', type: 'upload', relationTo: 'media', label: 'Deelafbeelding' },
        { name: 'geenIndex', type: 'checkbox', label: 'Niet laten indexeren door Google' },
      ],
    },

    // --- Systeem fields ---
    { name: 'oudeId', type: 'number', label: 'Oud CMS-ID', admin: { position: 'sidebar' } },
    {
      name: 'oudeSlugs',
      type: 'array',
      label: 'Historische URLs',
      admin: { position: 'sidebar' },
      fields: [{ name: 'slug', type: 'text', required: true }],
    },
  ],
  hooks: {
    afterChange: [revalidateLocatie],
    afterDelete: [revalidateLocatieDelete],
  },
}
