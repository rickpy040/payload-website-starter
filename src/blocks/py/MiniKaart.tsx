import React from 'react'
import Link from 'next/link'

import { Icon } from '@/components/py/Icon'

/** A pin without href is decorative (the phone mockup). */
export type KaartPin = { label: string; href?: string }

/** The prototype's stylised map (`PYMiniMap`): four white roads and up to six pins. */
export function MiniKaart({ pins, compact = false }: { pins: KaartPin[]; compact?: boolean }) {
  return (
    <div
      className={`py-mini-map ${compact ? 'py-mini-map--compact' : ''}`.trim()}
      aria-label="Kaart preview"
    >
      <svg viewBox="0 0 520 420" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 90 C100 140 120 45 230 95 S400 135 550 75" />
        <path d="M-20 250 C120 310 170 210 275 260 S430 315 550 245" />
        <path d="M95 -20 C125 90 85 170 125 260 S150 345 130 450" />
        <path d="M365 -20 C330 110 395 195 350 315 S305 375 330 450" />
      </svg>
      {pins.slice(0, compact ? 4 : 6).map((pin, index) => {
        const className = `py-map-pin py-map-pin--${index + 1}`
        const inhoud = (
          <>
            <Icon name="pin" size={24} stroke={2.3} />
            {!compact && pin.label ? <span>{pin.label}</span> : null}
          </>
        )
        return pin.href ? (
          <Link
            key={`${pin.href}-${index}`}
            href={pin.href}
            className={className}
            title={pin.label}
          >
            {inhoud}
          </Link>
        ) : (
          <span key={index} className={className}>
            {inhoud}
          </span>
        )
      })}
    </div>
  )
}
