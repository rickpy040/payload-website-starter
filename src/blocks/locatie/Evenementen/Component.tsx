import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { LocatieEvenementenBlock, Location } from '@/payload-types'
import { PySectionIntro } from '@/components/py/Chrome'
import { Icon } from '@/components/py/Icon'
import { Media } from '@/components/Media'

type Props = LocatieEvenementenBlock & { locatie: Location }

export const LocatieEvenementenComponent: React.FC<Props> = async ({
  titelVoor,
  titelNadruk,
  titelNa,
  tekst,
  locatie,
}) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'evenementen',
    draft: false,
    overrideAccess: false,
    limit: 10,
    where: { locaties: { equals: locatie.id } },
  })

  if (result.docs.length === 0) return null

  return (
    <section className="py-section">
      <div className="py-container">
        <PySectionIntro titleBefore={titelVoor || ''} titleEmphasis={titelNadruk || ''} titleAfter={titelNa || ''}>
          {tekst}
        </PySectionIntro>
        <div className="py-event-strip">
          {result.docs.map((evenement) => (
            <Link key={evenement.id} href={`/evenementen/${evenement.slug}`} className="py-event-mini-card">
              {evenement.afbeelding && typeof evenement.afbeelding === 'object' ? (
                <Media resource={evenement.afbeelding} imgClassName="w-full" />
              ) : null}
              <div>
                <span className={`py-event-type py-event-type--${evenement.kleur}`}>{evenement.soort}</span>
                <strong>{evenement.naam}</strong>
                {evenement.datums ? (
                  <small>
                    <Icon name="calendar" size={13} /> {evenement.datums}
                  </small>
                ) : null}
                {evenement.vanafPrijs ? <small>Vanaf € {evenement.vanafPrijs}</small> : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
