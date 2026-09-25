import React from 'react'
import Link from 'next/link'

import type { StedenStripBlock } from '@/payload-types'
import { Icon } from '@/components/py/Icon'
import { haalSteden } from '@/blocks/py/data'

export const StedenStripComponent: React.FC<StedenStripBlock> = async ({
  bron,
  maxAantal,
  linkNaar,
  steden,
}) => {
  const links =
    bron === 'handmatig'
      ? (steden ?? []).map((s) => ({ naam: s.naam, url: s.url }))
      : (await haalSteden(maxAantal ?? 5)).map((s) => ({
          naam: s.naam,
          url:
            linkNaar === 'stadspagina'
              ? `/parkeren/${s.slug}`
              : `/locaties?stad=${encodeURIComponent(s.naam)}`,
        }))

  if (links.length === 0) return null

  return (
    <section className="py-city-strip">
      <div className="py-container">
        <div className="py-city-strip__inner">
          {links.map((link) => (
            <Link key={link.url} href={link.url}>
              <span>{link.naam}</span>
              <Icon name="chevron" size={18} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
