import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { UspRijComponent } from '@/blocks/UspRij/Component'
import { CitaatComponent } from '@/blocks/Citaat/Component'
import { FaqBlokComponent } from '@/blocks/FaqBlok/Component'
import { LocatieUitgelichtComponent } from '@/blocks/LocatieUitgelicht/Component'
import { KaartenSliderComponent } from '@/blocks/KaartenSlider/Component'
import { StappenPlanComponent } from '@/blocks/StappenPlan/Component'
import { CijfersRijComponent } from '@/blocks/CijfersRij/Component'
import { DoelgroepenBlokComponent } from '@/blocks/DoelgroepenBlok/Component'
import { AppPromoBlokComponent } from '@/blocks/AppPromoBlok/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  uspRij: UspRijComponent,
  citaat: CitaatComponent,
  faqBlok: FaqBlokComponent,
  locatieUitgelicht: LocatieUitgelichtComponent,
  kaartenSlider: KaartenSliderComponent,
  stappenPlan: StappenPlanComponent,
  cijfersRij: CijfersRijComponent,
  doelgroepenBlok: DoelgroepenBlokComponent,
  appPromo: AppPromoBlokComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
