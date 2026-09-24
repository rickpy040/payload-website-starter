import React from 'react'

import type { UspRijBlock } from '@/payload-types'
import { Icon, type IconName } from '@/components/py/Icon'

export const UspRijComponent: React.FC<UspRijBlock> = ({ items }) => {
  if (!items?.length) return null

  return (
    <section className="py-container">
      <div className="py-usp-row">
        {items.map((item, i) => (
          <div className="py-usp-item" key={i}>
            <span className="py-usp-icon">
              <Icon name={(item.icoon as IconName) || 'check'} size={20} />
            </span>
            <div>
              <strong>{item.titel}</strong>
              {item.tekst ? <p>{item.tekst}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
