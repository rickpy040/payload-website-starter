import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { CheckoutForm } from '@/components/parkeren/CheckoutForm'

type Args = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ arrival?: string; departure?: string; price?: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  return { title: `Reservering afronden — ${slug} — parkingyou` }
}

export default async function BoekenPage({ params, searchParams }: Args) {
  const { slug } = await params
  const { arrival, departure, price } = await searchParams

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'locations',
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: { slug: { equals: slug } },
  })
  const location = result.docs[0]
  if (!location) notFound()

  return (
    <div className="mx-auto max-w-[1020px] px-6 md:px-10">
      <div className="mt-8 flex items-center gap-2">
        <span className="flex items-center gap-2 text-[12.5px] font-medium uppercase tracking-wider text-py-blauw">
          <i className="h-1.5 w-1.5 rounded-full bg-py-aqua" />
          Reserveren
        </span>
      </div>
      <h1 className="mt-1.5 text-[clamp(24px,3vw,32px)] font-bold text-py-blauw">
        Reservering afronden
      </h1>

      <CheckoutForm
        location={location}
        arrival={arrival}
        departure={departure}
        price={price ? Number(price) : undefined}
      />
    </div>
  )
}
