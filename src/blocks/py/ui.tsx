import React, { type ReactNode } from 'react'
import NextImage from 'next/image'

import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { PyButton, type ButtonVariant } from '@/components/py/Button'
import type { IconName } from '@/components/py/Icon'

/**
 * Renders "Aankomende *evenementen*." as text with the starred part in <em>,
 * the prototype's italic accent. Editors type plain text; no HTML is ever
 * injected (the prototype used dangerouslySetInnerHTML for this).
 */
export function Nadruk({ tekst }: { tekst?: string | null }) {
  if (!tekst) return null
  const parts = tekst.split(/\*([^*]+)\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <em key={i}>{part}</em> : <React.Fragment key={i}>{part}</React.Fragment>,
      )}
    </>
  )
}

export function sectieClass(achtergrond?: string | null, extra = ''): string {
  return ['py-section', achtergrond === 'papier' ? 'py-section--paper' : '', extra]
    .filter(Boolean)
    .join(' ')
}

export function SectieIntro({
  titel,
  tekst,
  actie,
  align = 'left',
}: {
  titel?: string | null
  tekst?: string | null
  actie?: ReactNode
  align?: 'left' | 'center'
}) {
  if (!titel && !tekst && !actie) return null
  return (
    <div className={`py-section-intro py-section-intro--${align}`}>
      <div>
        {titel ? (
          <h2>
            <Nadruk tekst={titel} />
          </h2>
        ) : null}
        {tekst ? <p>{tekst}</p> : null}
      </div>
      {actie}
    </div>
  )
}

export type Knop = {
  label?: string | null
  url?: string | null
  stijl?: string | null
  icoon?: string | null
  id?: string | null
}

export function knopIcon(icoon?: string | null): IconName | null {
  if (icoon === 'geen') return null
  return (icoon as IconName) || 'arrow'
}

export function PyKnop({ knop, className }: { knop: Knop; className?: string }) {
  if (!knop.label || !knop.url) return null
  return (
    <PyButton
      href={knop.url}
      variant={(knop.stijl as ButtonVariant) || 'primary'}
      icon={knopIcon(knop.icoon)}
      className={className}
    >
      {knop.label}
    </PyButton>
  )
}

export function KnoppenRij({ knoppen }: { knoppen?: Knop[] | null }) {
  const lijst = (knoppen ?? []).filter((k) => k.label && k.url)
  if (lijst.length === 0) return null
  return (
    <div className="py-action-row">
      {lijst.map((knop, i) => (
        <PyKnop key={knop.id ?? i} knop={knop} />
      ))}
    </div>
  )
}

export function isMedia(value: unknown): value is Media {
  return Boolean(value && typeof value === 'object' && 'url' in (value as Media))
}

/**
 * A single <img> for a Payload upload. The shared <Media> component wraps its
 * image in a <picture>, which breaks the prototype's `height: 100%` image
 * rules; this keeps the prototype's markup (one img inside the frame) while
 * still going through next/image.
 */
export function PyImage({
  media,
  alt,
  className,
  sizes = '(max-width: 720px) 100vw, 33vw',
  priority = false,
}: {
  media: Media
  alt?: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  const src = getMediaUrl(media.url, media.updatedAt)
  if (!src) return null
  return (
    <NextImage
      src={src}
      alt={alt ?? media.alt ?? ''}
      width={media.width ?? 1200}
      height={media.height ?? 800}
      sizes={sizes}
      quality={100}
      priority={priority}
      className={className}
    />
  )
}
