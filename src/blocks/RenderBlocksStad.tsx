import React, { Fragment } from 'react'

import type { Steden } from '@/payload-types'

import { StadHeroComponent } from '@/blocks/stad/Hero/Component'
import { StadLocatiesLijstComponent } from '@/blocks/stad/LocatiesLijst/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { CitaatComponent } from '@/blocks/Citaat/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'

const blockComponents = {
  stadHero: StadHeroComponent,
  stadLocatiesLijst: StadLocatiesLijstComponent,
  content: ContentBlock,
  citaat: CitaatComponent,
  cta: CallToActionBlock,
} as const

export const RenderBlocksStad: React.FC<{
  blocks: Steden['secties']
  stad: Steden
}> = ({ blocks, stad }) => {
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
        return <Block key={index} {...(block as any)} stad={stad} />
      })}
    </Fragment>
  )
}
