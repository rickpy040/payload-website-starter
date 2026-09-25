import type { Block } from 'payload'

import { HomeHero } from '@/blocks/HomeHero/config'
import { PaginaHero } from '@/blocks/PaginaHero/config'
import { PassHero } from '@/blocks/PassHero/config'
import { ProductKeuze } from '@/blocks/ProductKeuze/config'
import { LocatieOverzicht } from '@/blocks/LocatieOverzicht/config'
import { EvenementenOverzicht } from '@/blocks/EvenementenOverzicht/config'
import { InfoBanden } from '@/blocks/InfoBanden/config'
import { StappenSectie } from '@/blocks/StappenSectie/config'
import { VoordelenSplit } from '@/blocks/VoordelenSplit/config'
import { VerhaalKolommen } from '@/blocks/VerhaalKolommen/config'
import { StedenStrip } from '@/blocks/StedenStrip/config'
import { AppCallout } from '@/blocks/AppCallout/config'
import { BannerCta } from '@/blocks/BannerCta/config'
import { FaqAccordeon } from '@/blocks/FaqAccordeon/config'
import { FormulierSectie } from '@/blocks/FormulierSectie/config'
import { WaardekaartBestellen } from '@/blocks/WaardekaartBestellen/config'

/**
 * The prototype section blocks, in the order they appear in the admin's block
 * picker (heroes first). Each is a full-width section with its own spacing
 * and background, so RenderBlocks renders them edge to edge.
 */
export const prototypeBlocks: Block[] = [
  HomeHero,
  PaginaHero,
  PassHero,
  ProductKeuze,
  LocatieOverzicht,
  EvenementenOverzicht,
  InfoBanden,
  StappenSectie,
  VoordelenSplit,
  VerhaalKolommen,
  StedenStrip,
  AppCallout,
  BannerCta,
  FaqAccordeon,
  FormulierSectie,
  WaardekaartBestellen,
].map((block) => ({ ...block, admin: { ...block.admin, group: 'Secties uit het prototype' } }))

export const prototypeBlockSlugs = new Set(prototypeBlocks.map((b) => b.slug))
