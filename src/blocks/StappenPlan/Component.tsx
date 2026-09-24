import React from 'react'

import type { StappenPlanBlock } from '@/payload-types'

export const StappenPlanComponent: React.FC<StappenPlanBlock> = ({ titel, stappen }) => {
  if (!stappen?.length) return null

  return (
    <section className="py-container">
      {titel ? <h2>{titel}</h2> : null}
      <ol className="py-steps">
        {stappen.map((stap, i) => (
          <li className="py-step" key={stap.id ?? i}>
            <span className="py-step__badge">{i + 1}</span>
            <div className="py-step__body">
              <strong>{stap.titel}</strong>
              {stap.tekst ? <p>{stap.tekst}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
