import React from 'react'

import type { KaartenSliderBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { Slider } from './Slider.client'

export const KaartenSliderComponent: React.FC<KaartenSliderBlock> = ({ titel, kaarten }) => {
  const items = (kaarten ?? []).filter((item) => item?.afbeelding)

  if (items.length === 0) return null

  return (
    <section className="py-container">
      {titel ? <h2>{titel}</h2> : null}
      <Slider>
        {items.map((item, i) => (
          <div className="py-slider__card" key={item.id ?? i}>
            {typeof item.afbeelding === 'object' && item.afbeelding ? (
              <Media resource={item.afbeelding} imgClassName="py-slider__image" />
            ) : null}
            <div className="py-slider__body">
              <h3>{item.titel}</h3>
              {item.tekst ? <p>{item.tekst}</p> : null}
            </div>
          </div>
        ))}
      </Slider>
    </section>
  )
}
