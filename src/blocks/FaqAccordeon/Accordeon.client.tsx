'use client'

import React, { useState, type ReactNode } from 'react'

import { Icon } from '@/components/py/Icon'

export function Accordeon({ items }: { items: { vraag: string; antwoord: ReactNode }[] }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="py-faq__list">
      {items.map((item, index) => {
        const isOpen = open === index
        return (
          <article key={index} className={isOpen ? 'is-open' : ''}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              aria-expanded={isOpen}
            >
              <span>{item.vraag}</span>
              <Icon name="down" size={22} />
            </button>
            {isOpen ? item.antwoord : null}
          </article>
        )
      })}
    </div>
  )
}
