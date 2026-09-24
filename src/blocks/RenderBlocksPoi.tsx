import React, { Fragment } from 'react'

import type { Pois } from '@/payload-types'

import { PoiHeroComponent } from '@/blocks/poi/Hero/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FaqBlokComponent } from '@/blocks/FaqBlok/Component'
import { CitaatComponent } from '@/blocks/Citaat/Component'

const blockComponents = {
  poiHero: PoiHeroComponent,
  content: ContentBlock,
  faqBlok: FaqBlokComponent,
  citaat: CitaatComponent,
} as const

export const RenderBlocksPoi: React.FC<{ blocks: Pois['secties']; poi: Pois }> = ({ blocks, poi }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0
  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks!.map((block, index) => {
        const { blockType } = block
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Block = (blockComponents as any)[blockType]
        if (!Block) return null
        if (blockType === 'poiHero') return <Block key={index} poi={poi} />
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <Block key={index} {...(block as any)} />
      })}
    </Fragment>
  )
}
