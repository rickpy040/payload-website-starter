import React from 'react'

import type { AppPromoBlokBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { Icon } from '@/components/py/Icon'
import { PyButton } from '@/components/py/Button'

export const AppPromoBlokComponent: React.FC<AppPromoBlokBlock> = ({
  titel,
  subtitel,
  afbeelding,
  features,
  knoppen,
}) => {
  return (
    <section className="py-container">
      <div className="py-app-promo">
        <div className="py-app-promo__body">
          <h2>{titel}</h2>
          {subtitel ? <p className="py-lead">{subtitel}</p> : null}

          {features?.length ? (
            <ul className="py-app-promo__features">
              {features.map((feature, i) => (
                <li key={feature.id ?? i}>
                  <span className="py-app-promo__feature-icon">
                    <Icon name="check" size={16} />
                  </span>
                  <div>
                    <strong>{feature.titel}</strong>
                    {feature.tekst ? <p>{feature.tekst}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : null}

          {knoppen?.length ? (
            <div className="py-app-promo__buttons">
              {knoppen.map((knop, i) => (
                <PyButton key={knop.id ?? i} href={knop.url} variant="outline">
                  {knop.label}
                </PyButton>
              ))}
            </div>
          ) : null}
        </div>

        {afbeelding && typeof afbeelding === 'object' ? (
          <Media resource={afbeelding} imgClassName="py-app-promo__image" />
        ) : null}
      </div>
    </section>
  )
}
