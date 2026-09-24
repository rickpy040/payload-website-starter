'use client'

import React, { useRef } from 'react'

import { Icon } from '@/components/py/Icon'

export function Slider({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scroll(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return

    const card = track.querySelector<HTMLElement>('.py-slider__card')
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24
    const step = (card?.getBoundingClientRect().width ?? track.clientWidth) + gap

    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <div className="py-slider">
      <button
        type="button"
        className="py-slider__arrow py-slider__arrow--prev"
        aria-label="Vorige"
        onClick={() => scroll(-1)}
      >
        <Icon name="chevron" className="py-slider__arrow-icon py-slider__arrow-icon--prev" />
      </button>

      <div className="py-slider__track" ref={trackRef}>
        {children}
      </div>

      <button
        type="button"
        className="py-slider__arrow py-slider__arrow--next"
        aria-label="Volgende"
        onClick={() => scroll(1)}
      >
        <Icon name="chevron" className="py-slider__arrow-icon" />
      </button>
    </div>
  )
}
