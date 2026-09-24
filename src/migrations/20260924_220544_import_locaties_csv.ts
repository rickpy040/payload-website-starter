import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'
import type { Location } from '@/payload-types'

/**
 * Imports the ParkingYou location list (PY Locaties export, 50 rows, 46 unique
 * after merging rows that share an old CMS id).
 *
 * - Existing locations are matched on old CMS id, then slug, then name, and
 *   only have empty or {{TODO-NL}} fields filled in; nothing an editor set is
 *   overwritten. Invented values from the earlier seed migration are replaced
 *   only while they are still unchanged.
 * - New locations are created as drafts: the export has no price or
 *   Aeroparker product id, both required to publish.
 * - A location with unpublished draft edits is left alone.
 */

type Row = {
  name: string
  slug: string
  stad: string
  oudeId: number | null
  oudePad: string | null
  address: { street: string | null; huisnummer: string | null; postalCode: string | null; cityName: string | null } | null
  spotsTotal: number | null
  reserveerbaar: boolean
  soort: string | null
  leverancier: string | null
  googleMapsUrl: string | null
}

const LOCATIES: Row[] = [
  {
    "name": "Philips Stadion",
    "slug": "philips-stadion",
    "stad": "eindhoven",
    "oudeId": 7,
    "oudePad": "/nl/locaties/eindhoven/parking-philips-stadion/id=7",
    "address": {
      "street": "Gerard Philipslaan",
      "huisnummer": null,
      "postalCode": "5616",
      "cityName": "Eindhoven"
    },
    "spotsTotal": 700,
    "reserveerbaar": true,
    "soort": "Ondergrondse garage",
    "leverancier": "IP Parking",
    "googleMapsUrl": "https://maps.app.goo.gl/p3MmJAcfVS34h9Ko6"
  },
  {
    "name": "TD Gebouw",
    "slug": "td-gebouw",
    "stad": "eindhoven",
    "oudeId": 17,
    "oudePad": "/nl/locaties/eindhoven/parking-td-gebouw/id=17",
    "address": {
      "street": "Frederik van Eedenplein",
      "huisnummer": null,
      "postalCode": "5615",
      "cityName": "Eindhoven"
    },
    "spotsTotal": 97,
    "reserveerbaar": true,
    "soort": "Parkeerterrein",
    "leverancier": "Scheidt & Bachmann",
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Frederik+van+Eedenplein+5615+Eindhoven&hl=nl"
  },
  {
    "name": "Evoluon",
    "slug": "evoluon",
    "stad": "eindhoven",
    "oudeId": 103,
    "oudePad": "/nl/locaties/eindhoven/parking-evoluon/id=103",
    "address": {
      "street": "Noord Brabantlaan",
      "huisnummer": "1",
      "postalCode": "5652 LA",
      "cityName": "Eindhoven"
    },
    "spotsTotal": 350,
    "reserveerbaar": true,
    "soort": "Parkeerterrein",
    "leverancier": "IP Parking",
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Noord+Brabantlaan+1+5652+LA+Eindhoven&hl=nl"
  },
  {
    "name": "DLL parkeerdek",
    "slug": "dll-parkeerdek-centrum",
    "stad": "eindhoven",
    "oudeId": 101,
    "oudePad": "/nl/locaties/eindhoven/parking-dll-parkeerdek-centrum/id=101",
    "address": {
      "street": "Kanaalstraat",
      "huisnummer": "4",
      "postalCode": "5611 CT",
      "cityName": "Eindhoven"
    },
    "spotsTotal": 125,
    "reserveerbaar": true,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Kanaalstraat+4+5611+CT+Eindhoven&hl=nl"
  },
  {
    "name": "DLL garage",
    "slug": "dll-garage-centrum",
    "stad": "eindhoven",
    "oudeId": 5,
    "oudePad": "/nl/locaties/eindhoven/parking-dll-garage-centrum/id=5",
    "address": {
      "street": "Kanaalstraat",
      "huisnummer": "4",
      "postalCode": "5611 CT",
      "cityName": "Eindhoven"
    },
    "spotsTotal": 284,
    "reserveerbaar": true,
    "soort": "Ondergrondse garage",
    "leverancier": "IP Parking",
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Kanaalstraat+4+5611+CT+Eindhoven&hl=nl"
  },
  {
    "name": "Philips Bedrijfsschool",
    "slug": "philips-bedrijfsschool",
    "stad": "eindhoven",
    "oudeId": 31,
    "oudePad": "/nl/locaties/eindhoven/parking-philips-bedrijfsschool/id=31",
    "address": {
      "street": "Frederiklaan",
      "huisnummer": "60",
      "postalCode": "5616 NJ",
      "cityName": "Eindhoven"
    },
    "spotsTotal": 176,
    "reserveerbaar": true,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Frederiklaan+60+5616+NJ+Eindhoven&hl=nl"
  },
  {
    "name": "P1 Belgielaan",
    "slug": "p1-belgielaan",
    "stad": "zoetermeer",
    "oudeId": 109,
    "oudePad": "/nl/locaties/zoetermeer/parking-p1-belgielaan-/id=109",
    "address": {
      "street": "Belgiëlaan",
      "huisnummer": null,
      "postalCode": null,
      "cityName": "Zoetermeer"
    },
    "spotsTotal": 326,
    "reserveerbaar": false,
    "soort": "Parkeergarage",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Belgi%C3%ABlaan+Zoetermeer&hl=nl"
  },
  {
    "name": "Hofplein",
    "slug": "hofplein",
    "stad": "rotterdam",
    "oudeId": 9,
    "oudePad": "/nl/locaties/rotterdam/parking-hofplein/id=9",
    "address": {
      "street": "Hofplein",
      "huisnummer": "20",
      "postalCode": "3032 AC",
      "cityName": "Rotterdam"
    },
    "spotsTotal": 300,
    "reserveerbaar": true,
    "soort": "Parkeergarage",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Hofplein+20+3032+AC+Rotterdam&hl=nl"
  },
  {
    "name": "P2 Bovenlangs",
    "slug": "p2-bovenlangs",
    "stad": "zoetermeer",
    "oudeId": 111,
    "oudePad": "/nl/locaties/zoetermeer/parking-p2-bovenlangs/id=111",
    "address": {
      "street": "Bovenlangs",
      "huisnummer": null,
      "postalCode": "2712",
      "cityName": "Zoetermeer"
    },
    "spotsTotal": 448,
    "reserveerbaar": false,
    "soort": "Parkeergarage",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Bovenlangs+2712+Zoetermeer&hl=nl"
  },
  {
    "name": "P2 Onderlangs",
    "slug": "p2-onderlangs",
    "stad": "zoetermeer",
    "oudeId": 113,
    "oudePad": "/nl/locaties/zoetermeer/parking-p2-onderlangs/id=113",
    "address": {
      "street": "Onderlangs",
      "huisnummer": null,
      "postalCode": null,
      "cityName": "Zoetermeer"
    },
    "spotsTotal": 287,
    "reserveerbaar": false,
    "soort": "Ondergrondse garage",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Onderlangs+Zoetermeer&hl=nl"
  },
  {
    "name": "P1 Carlton WTC",
    "slug": "p1-carlton-wtc",
    "stad": "almere",
    "oudeId": 123,
    "oudePad": "/nl/locaties/almere/parking-p1-carlton-wtc/id=123",
    "address": {
      "street": "Marga Klompéhof",
      "huisnummer": null,
      "postalCode": "1314 WP",
      "cityName": "Almere"
    },
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Ondergrondse garage",
    "leverancier": "WPS",
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Marga+Klompeplaats+1314+WP+Almere&hl=nl"
  },
  {
    "name": "Bos en Lommerplantsoen",
    "slug": "bos-en-lommerplantsoen",
    "stad": "amsterdam",
    "oudeId": 21,
    "oudePad": "/nl/locaties/amsterdam/parking-bos-en-lommerplantsoen/id=21",
    "address": {
      "street": "Bos en Lommerplantsoen",
      "huisnummer": "1",
      "postalCode": "1055 AA",
      "cityName": "Amsterdam"
    },
    "spotsTotal": null,
    "reserveerbaar": true,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": "https://maps.app.goo.gl/RiMviD1on2BuikHSA"
  },
  {
    "name": "P2 Mandela WTC",
    "slug": "p2-mandela-wtc",
    "stad": "almere",
    "oudeId": 125,
    "oudePad": "/nl/locaties/almere/parking-p2-mandela-wtc/id=125",
    "address": {
      "street": "Dag Hammarskjöldhof",
      "huisnummer": null,
      "postalCode": "1314 WK",
      "cityName": "Almere"
    },
    "spotsTotal": 200,
    "reserveerbaar": false,
    "soort": "Ondergrondse garage",
    "leverancier": "WPS",
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Dag+Hammarskj%C3%B6ldhof+1314+WK+Almere&hl=nl"
  },
  {
    "name": "Europoint",
    "slug": "europoint",
    "stad": "rotterdam",
    "oudeId": 11,
    "oudePad": "/nl/locaties/rotterdam/parking-europoint/id=11",
    "address": {
      "street": "Marconistraat",
      "huisnummer": "16",
      "postalCode": "3029 AK",
      "cityName": "Rotterdam"
    },
    "spotsTotal": 1133,
    "reserveerbaar": true,
    "soort": "Parkeergarage",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Marconistraat+16+3029+AK+Rotterdam&hl=nl"
  },
  {
    "name": "Plantage (Artis)",
    "slug": "plantage",
    "stad": "amsterdam",
    "oudeId": 35,
    "oudePad": "/nl/locaties/amsterdam/parking-plantage/id=35",
    "address": {
      "street": "Plantage Kerklaan",
      "huisnummer": "38",
      "postalCode": "1018 CZ",
      "cityName": "Amsterdam"
    },
    "spotsTotal": 483,
    "reserveerbaar": true,
    "soort": "Parkeerterrein",
    "leverancier": "IP Parking",
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Plantage+Kerklaan+38+1018+CZ+Amsterdam&hl=nl"
  },
  {
    "name": "Cruquius",
    "slug": "cruquius",
    "stad": "amsterdam",
    "oudeId": 27,
    "oudePad": "/nl/locaties/amsterdam/parking-cruquius/id=27",
    "address": {
      "street": "Zeeburgerkade",
      "huisnummer": "830",
      "postalCode": "1019",
      "cityName": "Amsterdam"
    },
    "spotsTotal": 177,
    "reserveerbaar": true,
    "soort": "Ondergrondse garage",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Zeeburgerkade+830+1019+Amsterdam&hl=nl"
  },
  {
    "name": "Zeeburgerkade",
    "slug": "zeeburgerkade",
    "stad": "amsterdam",
    "oudeId": 45,
    "oudePad": "/nl/locaties/amsterdam/parking-zeeburgerkade/id=45",
    "address": {
      "street": "Wijnsilostraat",
      "huisnummer": "2",
      "postalCode": "1019",
      "cityName": "Amsterdam"
    },
    "spotsTotal": 120,
    "reserveerbaar": true,
    "soort": "Ondergrondse garage",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Wijnsilostraat+2+1019+Amsterdam&hl=nl"
  },
  {
    "name": "B1",
    "slug": "b-amsterdam-b1",
    "stad": "amsterdam",
    "oudeId": 23,
    "oudePad": "/nl/locaties/amsterdam/parking-b-amsterdam-b1/id=23",
    "address": {
      "street": "Transformatorweg",
      "huisnummer": "90",
      "postalCode": "1014 AK",
      "cityName": "Amsterdam"
    },
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Ondergrondse garage",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Transformatorweg+90+1014+AK+Amsterdam&hl=nl"
  },
  {
    "name": "P4 Luxemburglaan",
    "slug": "p4-luxemburglaan",
    "stad": "zoetermeer",
    "oudeId": 115,
    "oudePad": "/nl/locaties/zoetermeer/parking-p4-luxemburglaan/id=115",
    "address": {
      "street": "Luxemburglaan",
      "huisnummer": "1",
      "postalCode": "2711 BD",
      "cityName": "Zoetermeer"
    },
    "spotsTotal": 453,
    "reserveerbaar": false,
    "soort": "Parkeergarage",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Luxemburglaan+1+2711+BD+Zoetermeer&hl=nl"
  },
  {
    "name": "P5 Amsterdamstraat",
    "slug": "p5-amsterdamstraat",
    "stad": "zoetermeer",
    "oudeId": 117,
    "oudePad": "/nl/locaties/zoetermeer/parking-p5-amsterdamstraat-/id=117",
    "address": {
      "street": "Amsterdamstraat",
      "huisnummer": null,
      "postalCode": "2711",
      "cityName": "Zoetermeer"
    },
    "spotsTotal": 439,
    "reserveerbaar": false,
    "soort": "Parkeergarage",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Amsterdamstraat+2711+Zoetermeer&hl=nl"
  },
  {
    "name": "Onyx",
    "slug": "onyx",
    "stad": "eindhoven",
    "oudeId": 25,
    "oudePad": "/nl/locaties/eindhoven/parking-onyx/id=25",
    "address": {
      "street": "Victoriapark",
      "huisnummer": "753",
      "postalCode": "5611 BN",
      "cityName": "Eindhoven"
    },
    "spotsTotal": 44,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Victoriapark+753+5611+BN+Eindhoven&hl=nl"
  },
  {
    "name": "P8 Nederlandlaan",
    "slug": "p8-nederlandlaan",
    "stad": "zoetermeer",
    "oudeId": 119,
    "oudePad": "/nl/locaties/zoetermeer/parking-p8-nederlandlaan/id=119",
    "address": {
      "street": "Nederlandlaan",
      "huisnummer": "8",
      "postalCode": "2711 HT",
      "cityName": "Zoetermeer"
    },
    "spotsTotal": 659,
    "reserveerbaar": false,
    "soort": "Ondergrondse garage",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Nederlandlaan+8+2711+HT+Zoetermeer&hl=nl"
  },
  {
    "name": "P9 Duitslandlaan",
    "slug": "p9-duitslandlaan",
    "stad": "zoetermeer",
    "oudeId": 121,
    "oudePad": "/nl/locaties/zoetermeer/parking-p9-duitslandlaan/id=121",
    "address": {
      "street": "Duitslandlaan",
      "huisnummer": "15",
      "postalCode": "2711 BG",
      "cityName": "Zoetermeer"
    },
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeergarage",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Duitslandlaan+15+2711+BG+Zoetermeer&hl=nl"
  },
  {
    "name": "Vliegend Hert",
    "slug": "vliegend-hert",
    "stad": "utrecht",
    "oudeId": 75,
    "oudePad": "/nl/locaties/utrecht/parking-vliegend-hert/id=75",
    "address": {
      "street": "Vliegend Hertlaan",
      "huisnummer": "1",
      "postalCode": "3526 KT",
      "cityName": "Utrecht"
    },
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Vliegend+Hertlaan+1+3526+KT+Utrecht&hl=nl"
  },
  {
    "name": "Shopping Center",
    "slug": "shopping-center",
    "stad": "rotterdam",
    "oudeId": 1,
    "oudePad": "/nl/locaties/rotterdam/parking-shopping-center/id=1",
    "address": {
      "street": "Watermanweg",
      "huisnummer": "120",
      "postalCode": "3067 GG",
      "cityName": "Rotterdam"
    },
    "spotsTotal": 129,
    "reserveerbaar": true,
    "soort": "Parkeergarage",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Watermanweg%20120+3067%20GG+5&hl=nl"
  },
  {
    "name": "Lentse plas",
    "slug": "lentse-plas",
    "stad": "regio-gelderland",
    "oudeId": 59,
    "oudePad": "/nl/locaties/regio-gelderland/parking-lentse-plas/id=59",
    "address": {
      "street": "Willem van Arenbergstraat",
      "huisnummer": "4",
      "postalCode": "6515 AT",
      "cityName": "Nijmegen"
    },
    "spotsTotal": 335,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Willem+van+Arenbergstraat+4+6515+AT+Nijmegen&hl=nl"
  },
  {
    "name": "Pathé Ede",
    "slug": "pathe-ede",
    "stad": "regio-gelderland",
    "oudeId": 61,
    "oudePad": "/nl/locaties/regio-gelderland/parkingyou-pathe-ede-/id=61",
    "address": {
      "street": "Laan der Verenigde Naties",
      "huisnummer": "150",
      "postalCode": "6716 JE",
      "cityName": "Ede"
    },
    "spotsTotal": 425,
    "reserveerbaar": false,
    "soort": null,
    "leverancier": null,
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Laan%20der%20Verenigde%20Naties%20150+6716%20JE%20Ede+13&hl=nl"
  },
  {
    "name": "Diergaarde Blijdorp",
    "slug": "diergaarde-blijdorp",
    "stad": "rotterdam",
    "oudeId": 127,
    "oudePad": "/nl/locaties/rotterdam/parking-diergaarde-blijdorp/id=127",
    "address": {
      "street": "Blijdorplaan",
      "huisnummer": "5",
      "postalCode": "3041 JG",
      "cityName": "Rotterdam"
    },
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": "Skidata",
    "googleMapsUrl": "https://maps.google.com/maps?daddr=Blijdorplaan+5+3041+JG+Rotterdam&hl=nl"
  },
  {
    "name": "Maashaven",
    "slug": "maashaven",
    "stad": "rotterdam",
    "oudeId": null,
    "oudePad": null,
    "address": {
      "street": "Maashaven Z.z",
      "huisnummer": "100",
      "postalCode": "3081 AE",
      "cityName": "Rotterdam"
    },
    "spotsTotal": 95,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": "https://share.google/IfnLAICqj0C418woB"
  },
  {
    "name": "Parking Pakhuis",
    "slug": "pakhuis",
    "stad": "tilburg",
    "oudeId": 77,
    "oudePad": "/nl/locaties/tilburg/parking-pakhuis/id=77",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "Parking De Holland",
    "slug": "de-holland",
    "stad": "regio-zuid-holland",
    "oudeId": 73,
    "oudePad": "/nl/locaties/regio-zuid-holland/parking-de-holland-/id=73",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "Parking Heerhugowaard P1 Zuidtangent",
    "slug": "heerhugowaard-p1-zuidtangent",
    "stad": "heerhugowaard",
    "oudeId": 105,
    "oudePad": "/nl/locaties/heerhugowaard/parking-heerhugowaard-p1-zuidtangent-/id=105",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeergarage",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "Parking Hoog Stratum",
    "slug": "hoog-stratum",
    "stad": "eindhoven",
    "oudeId": 97,
    "oudePad": "/nl/locaties/eindhoven/parking-hoog-stratum/id=97",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "Amsterdam Parking B2",
    "slug": "amsterdam-parking-b2",
    "stad": "amsterdam",
    "oudeId": 67,
    "oudePad": "/nl/locaties/amsterdam/amsterdam-parking-b2/id=67",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "Parking P2 Middenwaard",
    "slug": "p2-middenwaard",
    "stad": "heerhugowaard",
    "oudeId": 107,
    "oudePad": "/nl/locaties/heerhugowaard/parking-p2-middenwaard/id=107",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeergarage",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "Parking The Beech",
    "slug": "the-beech",
    "stad": "eindhoven",
    "oudeId": 81,
    "oudePad": "/nl/locaties/eindhoven/parking-the-beech/id=81",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "Parking Cornelis Paradise",
    "slug": "cornelis-paradise",
    "stad": "eindhoven",
    "oudeId": 87,
    "oudePad": "/nl/locaties/eindhoven/parking-cornelis-paradise/id=87",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "ParkingYou P+R Schiedam Centrum",
    "slug": "p-r-schiedam-centrum",
    "stad": "regio-zuid-holland",
    "oudeId": 63,
    "oudePad": "/nl/locaties/regio-zuid-holland/parkingyou-p-r-schiedam-centrum/id=63",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "Parking Paradijslaan",
    "slug": "paradijslaan",
    "stad": "eindhoven",
    "oudeId": 99,
    "oudePad": "/nl/locaties/eindhoven/parking-paradijslaan/id=99",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "Parking City Tower",
    "slug": "city-tower",
    "stad": "eindhoven",
    "oudeId": 91,
    "oudePad": "/nl/locaties/eindhoven/parking-city-tower/id=91",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Ondergrondse garage",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "Parking At the Park",
    "slug": "at-the-park",
    "stad": "regio-zuid-holland",
    "oudeId": 53,
    "oudePad": "/nl/locaties/regio-zuid-holland/parking-at-the-park/id=53",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": true,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "Parking Hoog Bergen",
    "slug": "hoog-bergen",
    "stad": "eindhoven",
    "oudeId": 95,
    "oudePad": "/nl/locaties/eindhoven/parking-hoog-bergen/id=95",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "Parking BD7",
    "slug": "bd7",
    "stad": "eindhoven",
    "oudeId": 85,
    "oudePad": "/nl/locaties/eindhoven/parking-bd7-/id=85",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "Parking Mauritsstraat",
    "slug": "mauritsstraat",
    "stad": "eindhoven",
    "oudeId": 83,
    "oudePad": "/nl/locaties/eindhoven/parking-mauritsstraat/id=83",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "Parking Lichttoren",
    "slug": "lichttoren",
    "stad": "eindhoven",
    "oudeId": 93,
    "oudePad": "/nl/locaties/eindhoven/parking-lichttoren/id=93",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Ondergrondse garage",
    "leverancier": null,
    "googleMapsUrl": null
  },
  {
    "name": "ParkingYou Stationsweg / Ypenburg",
    "slug": "stationsweg-ypenburg",
    "stad": "regio-zuid-holland",
    "oudeId": 57,
    "oudePad": "/nl/locaties/regio-zuid-holland/parkingyou-stationsweg-ypenburg/id=57",
    "address": null,
    "spotsTotal": null,
    "reserveerbaar": false,
    "soort": "Parkeerterrein",
    "leverancier": null,
    "googleMapsUrl": null
  }
]

const STAD_NAAM: Record<string, string> = {
  eindhoven: 'Eindhoven', amsterdam: 'Amsterdam', rotterdam: 'Rotterdam', tilburg: 'Tilburg',
  'regio-zuid-holland': 'Regio Zuid-Holland', 'den-haag': 'Den Haag', 'regio-gelderland': 'Regio Gelderland',
  utrecht: 'Utrecht', heerhugowaard: 'Heerhugowaard', zoetermeer: 'Zoetermeer', almere: 'Almere',
}

// Placeholder values written by 20260924_215226_seed_parkingyou_basis.
const SEEDED: Record<string, Record<string, unknown>> = {
  'philips-stadion': { oudeId: 0, spotsTotal: 128, soort: 'Parkeerterrein', 'address.street': 'Frederiklaan', 'address.huisnummer': '10' },
  'dll-parkeerdek': { spotsTotal: 92 },
  'philips-bedrijfsschool': { spotsTotal: 138, 'address.street': 'Kastanjelaan', 'address.huisnummer': '400' },
}

const normName = (s: string) => s.toLowerCase().replace(/^(parkingyou|parking)\s+/, '').replace(/[^a-z0-9]/g, '')

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const common = { overrideAccess: true, req, depth: 0, context: { disableRevalidate: true } } as const

  // Steden: normally created by the seed migration; create any that are missing.
  const stadId = new Map<string, number | string>()
  for (const slug of new Set(LOCATIES.map((l) => l.stad))) {
    const found = await payload.find({ collection: 'steden', where: { slug: { equals: slug } }, limit: 1, draft: true, ...common })
    const doc =
      found.docs[0] ??
      (await payload.create({
        collection: 'steden',
        data: { naam: STAD_NAAM[slug] ?? slug, slug, isRegio: slug.startsWith('regio-'), _status: 'published' } as never,
        ...common,
      }))
    stadId.set(slug, doc.id)
  }

  const latest = (await payload.find({ collection: 'locations', draft: true, limit: 0, pagination: false, ...common })).docs as Location[]
  const published = (await payload.find({ collection: 'locations', draft: false, limit: 0, pagination: false, ...common })).docs as Location[]
  const mainStatus = new Map(published.map((d) => [d.id, d._status]))
  const byOudeId = new Map(latest.filter((d) => d.oudeId != null).map((d) => [d.oudeId, d]))
  const bySlug = new Map(latest.map((d) => [d.slug, d]))
  const byName = new Map(latest.map((d) => [normName(d.name), d]))

  let created = 0
  let updated = 0
  let skipped = 0

  for (const row of LOCATIES) {
    const existing =
      (row.oudeId != null ? byOudeId.get(row.oudeId) : undefined) ?? bySlug.get(row.slug) ?? byName.get(normName(row.name))

    const oudeSlugs = row.oudePad ? [{ slug: row.oudePad }] : []

    if (!existing) {
      await payload.create({
        collection: 'locations',
        draft: true,
        data: {
          name: row.name,
          slug: row.slug,
          city: row.stad,
          stad: stadId.get(row.stad),
          address: row.address ?? undefined,
          spotsTotal: row.spotsTotal ?? undefined,
          reserveerbaar: row.reserveerbaar,
          ...(row.soort ? { soort: row.soort } : {}),
          leverancier: row.leverancier ?? undefined,
          googleMapsUrl: row.googleMapsUrl ?? undefined,
          oudeId: row.oudeId ?? undefined,
          oudeSlugs,
          _status: 'draft',
        } as never,
        ...common,
      })
      created++
      continue
    }

    const isPublished = existing._status === 'published'
    if (!isPublished && mainStatus.get(existing.id) === 'published') {
      payload.logger.info(`import: ${existing.slug} has unpublished draft edits, left untouched`)
      skipped++
      continue
    }

    const seeded = SEEDED[existing.slug] ?? {}
    const replaceable = (path: string, current: unknown) =>
      current == null ||
      current === '' ||
      (typeof current === 'string' && current.includes('{{TODO-NL')) ||
      (path in seeded && seeded[path] === current)

    const patch: Record<string, unknown> = {}
    const isSeeded = (path: string, current: unknown) => path in seeded && seeded[path] === current
    const set = (path: string, current: unknown, value: unknown) => {
      if (value != null && value !== '' && replaceable(path, current)) patch[path] = value
      else if (isSeeded(path, current)) patch[path] = null
    }
    set('stad', existing.stad, stadId.get(row.stad))
    set('spotsTotal', existing.spotsTotal, row.spotsTotal)
    set('reserveerbaar', existing.reserveerbaar, row.reserveerbaar)
    set('soort', existing.soort, row.soort)
    set('leverancier', existing.leverancier, row.leverancier)
    set('googleMapsUrl', existing.googleMapsUrl, row.googleMapsUrl)
    set('oudeId', existing.oudeId, row.oudeId)

    const address = { ...(existing.address ?? {}) } as Record<string, unknown>
    let addressChanged = false
    for (const key of ['street', 'huisnummer', 'postalCode', 'cityName'] as const) {
      const value = row.address?.[key]
      if (value && replaceable(`address.${key}`, address[key])) {
        address[key] = value
        addressChanged = true
      } else if (isSeeded(`address.${key}`, address[key])) {
        address[key] = null
        addressChanged = true
      }
    }

    const knownPaths = new Set((existing.oudeSlugs ?? []).map((o) => o.slug))
    const addPaths = oudeSlugs.filter((o) => !knownPaths.has(o.slug))

    if (!Object.keys(patch).length && !addressChanged && !addPaths.length) {
      skipped++
      continue
    }

    const data: Record<string, unknown> = { ...patch }
    if (addressChanged) data.address = address
    if (addPaths.length) data.oudeSlugs = [...(existing.oudeSlugs ?? []), ...addPaths]

    try {
      await payload.update({ collection: 'locations', id: existing.id, data: data as never, draft: !isPublished, ...common })
      updated++
      payload.logger.info(`import: ${existing.slug} filled in (${Object.keys(data).join(', ')})`)
    } catch (err) {
      skipped++
      payload.logger.warn(`import: ${existing.slug} not updated: ${(err as Error).message}`)
    }
  }

  payload.logger.info(`import: ${created} created as draft, ${updated} filled in, ${skipped} unchanged`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content import: the locations are ordinary editable content now.
}
