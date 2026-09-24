import React from 'react'

import type { CitaatBlock } from '@/payload-types'
import { Media } from '@/components/Media'

export const CitaatComponent: React.FC<CitaatBlock> = ({ tekst, naam, functie, foto }) => {
  return (
    <section className="py-container">
      <blockquote className="py-quote">
        <p>&ldquo;{tekst}&rdquo;</p>
        {(naam || functie) && (
          <footer className="py-quote__footer">
            {foto && typeof foto === 'object' ? (
              <Media resource={foto} imgClassName="py-quote__avatar" />
            ) : null}
            <span>
              {naam ? <strong>{naam}</strong> : null}
              {functie ? <span>{functie}</span> : null}
            </span>
          </footer>
        )}
      </blockquote>
    </section>
  )
}
