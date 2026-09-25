import React from 'react'
import Link from 'next/link'

import type { ProductKeuzeBlock } from '@/payload-types'
import { Icon, type IconName } from '@/components/py/Icon'

export const ProductKeuzeComponent: React.FC<ProductKeuzeBlock> = ({ linkLabel, producten }) => {
  if (!producten?.length) return null

  return (
    <section className="py-product-chooser">
      <div className="py-container py-product-chooser__grid">
        {producten.map((product, i) => (
          <Link href={product.url} key={product.id ?? i}>
            <span>
              <Icon name={(product.icoon as IconName) || 'car'} size={24} />
            </span>
            <h3>{product.titel}</h3>
            {product.tekst ? <p>{product.tekst}</p> : null}
            <strong>
              {linkLabel} <Icon name="arrow" size={16} />
            </strong>
          </Link>
        ))}
      </div>
    </section>
  )
}
