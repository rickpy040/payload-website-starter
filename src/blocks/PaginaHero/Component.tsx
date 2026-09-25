import React from 'react'

import type { PaginaHeroBlock } from '@/payload-types'
import { Icon } from '@/components/py/Icon'
import { KnoppenRij, Nadruk, PyImage, isMedia } from '@/blocks/py/ui'
import { ZoekBalk } from '@/blocks/py/ZoekBalk'
import { MiniKaart, type KaartPin } from '@/blocks/py/MiniKaart'
import {
  haalEvenementen,
  haalLocaties,
  haalSteden,
  naarEvenementKaart,
  naarLocatieKaart,
} from '@/blocks/py/data'

const STIJL_CLASS: Record<string, string> = {
  licht: '',
  aqua: 'py-page-hero--business',
  zacht: 'py-page-hero--about',
  warm: 'py-page-hero--support',
  evenementen: 'py-page-hero--events',
}

/** One pin per city (its first location), so the map shows six places rather than one city six times. */
async function kaartPins(): Promise<KaartPin[]> {
  const perStad = new Map<string, KaartPin>()
  for (const l of (await haalLocaties({})).map(naarLocatieKaart)) {
    if (!perStad.has(l.stad)) perStad.set(l.stad, { label: l.stad, href: l.href })
  }
  if (perStad.size) return [...perStad.values()].slice(0, 6)
  const steden = await haalSteden(6)
  return steden.map((s) => ({ label: s.naam, href: `/parkeren/${s.slug}` }))
}

async function Visual({ block }: { block: PaginaHeroBlock }) {
  const { visual, paneel, afbeelding } = block
  const regels = paneel?.regels ?? []

  switch (visual) {
    case 'kaart':
      return <MiniKaart pins={await kaartPins()} />

    case 'paneel':
      return (
        <div className="py-premium-panel">
          {paneel?.label ? <span>{paneel.label}</span> : null}
          {regels.map((regel, i) => (
            <div key={regel.id ?? i}>
              <strong>{regel.waarde}</strong>
              <small>{regel.label}</small>
            </div>
          ))}
        </div>
      )

    case 'cijfers':
      return (
        <div className="py-about-metrics">
          {regels.map((regel, i) => (
            <div key={regel.id ?? i}>
              <strong>{regel.waarde}</strong>
              <span>{regel.label}</span>
            </div>
          ))}
        </div>
      )

    case 'dashboard': {
      const balken = (paneel?.balken ?? '')
        .split(',')
        .map((v) => Number(v.trim()))
        .filter((v) => Number.isFinite(v) && v > 0)
      return (
        <div className="py-business-panel">
          <div className="py-business-panel__top">
            <span>{paneel?.label}</span>
            <strong>{paneel?.waarde}</strong>
          </div>
          <div className="py-bars">
            {balken.map((hoogte, i) => (
              <i key={i} style={{ height: `${Math.min(hoogte, 100)}%` }} />
            ))}
          </div>
          <div className="py-business-panel__rows">
            {regels.map((regel, i) => (
              <span key={regel.id ?? i}>
                <Icon name="check" size={16} /> {regel.label}
              </span>
            ))}
          </div>
        </div>
      )
    }

    case 'evenementen': {
      const kaarten = (await haalEvenementen(3)).map(naarEvenementKaart)
      return (
        <div className="py-events-hero-visual">
          {kaarten.map((ev, i) => (
            <div key={ev.id} className={`py-event-thumb py-event-thumb--${i + 1}`}>
              {ev.afbeelding ? (
                <PyImage media={ev.afbeelding} alt={ev.naam} sizes="240px" />
              ) : (
                <div className="py-image-placeholder" />
              )}
              {ev.soort ? (
                <span className={`py-event-type py-event-type--${ev.kleur}`}>{ev.soort}</span>
              ) : null}
              <strong>{ev.naam}</strong>
            </div>
          ))}
        </div>
      )
    }

    case 'afbeelding':
      return isMedia(afbeelding) ? (
        <div className="py-detail-media">
          <PyImage media={afbeelding} sizes="(max-width: 980px) 100vw, 50vw" priority />
        </div>
      ) : null

    default:
      return null
  }
}

export const PaginaHeroComponent: React.FC<PaginaHeroBlock> = (block) => {
  const { stijl, anker, titel, tekst, knoppen, toonZoekbalk, zoekbalk } = block
  const className = ['py-page-hero', STIJL_CLASS[stijl ?? 'licht']].filter(Boolean).join(' ')

  return (
    <section className={className} id={anker || undefined}>
      <div className="py-container py-page-hero__grid">
        <div>
          <h1>
            <Nadruk tekst={titel} />
          </h1>
          {tekst ? <p>{tekst}</p> : null}
          {toonZoekbalk ? <ZoekBalk compact zoekbalk={zoekbalk} /> : null}
          <KnoppenRij knoppen={knoppen} />
        </div>
        <Visual block={block} />
      </div>
    </section>
  )
}
