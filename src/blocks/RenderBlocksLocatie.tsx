import React, { Fragment } from 'react'

import type { Location, Steden } from '@/payload-types'

import { LocatieHeroComponent } from '@/blocks/locatie/Hero/Component'
import { LocatieTarievenComponent } from '@/blocks/locatie/Tarieven/Component'
import { LocatieFaciliteitenComponent } from '@/blocks/locatie/Faciliteiten/Component'
import { LocatieOpeningstijdenComponent } from '@/blocks/locatie/Openingstijden/Component'
import { LocatiePoisNabijComponent } from '@/blocks/locatie/PoisNabij/Component'
import { LocatieKaartProductenComponent } from '@/blocks/locatie/KaartProducten/Component'
import { LocatieEvenementenComponent } from '@/blocks/locatie/Evenementen/Component'
import { LocatieFaqComponent } from '@/blocks/locatie/Faq/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { CitaatComponent } from '@/blocks/Citaat/Component'

const blockComponents = {
  locatieHero: LocatieHeroComponent,
  locatieTarieven: LocatieTarievenComponent,
  locatieFaciliteiten: LocatieFaciliteitenComponent,
  locatieOpeningstijden: LocatieOpeningstijdenComponent,
  locatiePoisNabij: LocatiePoisNabijComponent,
  locatieKaartProducten: LocatieKaartProductenComponent,
  locatieEvenementen: LocatieEvenementenComponent,
  locatieFaq: LocatieFaqComponent,
  content: ContentBlock,
  citaat: CitaatComponent,
} as const

/**
 * Renders a location's `secties` blocks field. Every block gets the parent
 * `locatie` document (and its `stad`, when linked) as extra props alongside
 * its own fields, because most of these sections read their content straight
 * off the location rather than duplicating it into the block.
 */
export const RenderBlocksLocatie: React.FC<{
  blocks: Location['secties']
  locatie: Location
  stad: Steden | null
}> = ({ blocks, locatie, stad }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0
  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks!.map((block, index) => {
        const { blockType } = block
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Block = (blockComponents as any)[blockType]
        if (!Block) return null
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <Block key={index} {...(block as any)} locatie={locatie} stad={stad} />
      })}
    </Fragment>
  )
}
