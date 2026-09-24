import React from 'react'

import type { CijfersRijBlock } from '@/payload-types'

export const CijfersRijComponent: React.FC<CijfersRijBlock> = ({ cijfers }) => {
  if (!cijfers?.length) return null

  return (
    <section className="py-container">
      <div className="py-stats">
        {cijfers.map((cijfer, i) => (
          <div className="py-stat" key={cijfer.id ?? i}>
            <strong>{cijfer.waarde}</strong>
            <span>{cijfer.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
