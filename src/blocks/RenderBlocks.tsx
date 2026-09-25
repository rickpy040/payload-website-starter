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
import { HomeHeroComponent } from '@/blocks/HomeHero/Component'
import { PaginaHeroComponent } from '@/blocks/PaginaHero/Component'
import { PassHeroComponent } from '@/blocks/PassHero/Component'
import { ProductKeuzeComponent } from '@/blocks/ProductKeuze/Component'
import { LocatieOverzichtComponent } from '@/blocks/LocatieOverzicht/Component'
import { EvenementenOverzichtComponent } from '@/blocks/EvenementenOverzicht/Component'
import { InfoBandenComponent } from '@/blocks/InfoBanden/Component'
import { StappenSectieComponent } from '@/blocks/StappenSectie/Component'
import { VoordelenSplitComponent } from '@/blocks/VoordelenSplit/Component'
import { VerhaalKolommenComponent } from '@/blocks/VerhaalKolommen/Component'
import { StedenStripComponent } from '@/blocks/StedenStrip/Component'
import { AppCalloutComponent } from '@/blocks/AppCallout/Component'
import { BannerCtaComponent } from '@/blocks/BannerCta/Component'
import { FaqAccordeonComponent } from '@/blocks/FaqAccordeon/Component'
import { FormulierSectieComponent } from '@/blocks/FormulierSectie/Component'
import { WaardekaartBestellenComponent } from '@/blocks/WaardekaartBestellen/Component'
import { prototypeBlockSlugs } from '@/blocks/py/registry'

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
  homeHero: HomeHeroComponent,
  paginaHero: PaginaHeroComponent,
  passHero: PassHeroComponent,
  productKeuze: ProductKeuzeComponent,
  locatieOverzicht: LocatieOverzichtComponent,
  evenementenOverzicht: EvenementenOverzichtComponent,
  infoBanden: InfoBandenComponent,
  stappenSectie: StappenSectieComponent,
  voordelenSplit: VoordelenSplitComponent,
  verhaalKolommen: VerhaalKolommenComponent,
  stedenStrip: StedenStripComponent,
  appCallout: AppCalloutComponent,
  bannerCta: BannerCtaComponent,
  faqAccordeon: FaqAccordeonComponent,
  formulierSectie: FormulierSectieComponent,
  waardekaartBestellen: WaardekaartBestellenComponent,
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

            if (Block && prototypeBlockSlugs.has(blockType)) {
              // Prototype sections carry their own padding and background and
              // sit edge to edge, like the sections of the prototype pages.
              return (
                <Fragment key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} />
                </Fragment>
              )
            }

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
