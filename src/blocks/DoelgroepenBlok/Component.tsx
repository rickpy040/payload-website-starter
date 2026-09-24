import React from 'react'

import type { DoelgroepenBlokBlock } from '@/payload-types'
import { Icon } from '@/components/py/Icon'
import { PyButton } from '@/components/py/Button'

export const DoelgroepenBlokComponent: React.FC<DoelgroepenBlokBlock> = ({ titel, groepen }) => {
  if (!groepen?.length) return null

  return (
    <section className="py-container">
      {titel ? <h2>{titel}</h2> : null}
      <div className="py-doelgroepen">
        {groepen.map((groep, i) => (
          <div className="py-doelgroep" key={groep.id ?? i}>
            <span className="py-doelgroep__badge">{i + 1}</span>
            <h3>{groep.titel}</h3>
            {groep.tekst ? <p>{groep.tekst}</p> : null}
            {groep.punten?.length ? (
              <ul className="py-doelgroep__punten">
                {groep.punten.map((punt, j) => (
                  <li key={punt.id ?? j}>
                    <Icon name="check" size={16} />
                    <span>{punt.tekst}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {groep.link?.url && groep.link?.label ? (
              <PyButton href={groep.link.url} variant="ghost">
                {groep.link.label}
              </PyButton>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
