'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex items-center justify-between gap-6">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/parkeren" className="text-sm font-medium text-py-blauw">
            Parkeren
          </Link>
          <HeaderNav data={data} />
          <Link
            href="/parkeren"
            className="hidden min-h-[42px] items-center rounded-full bg-py-blauw px-5 text-sm font-bold text-white transition-colors hover:bg-py-blauw-ink sm:inline-flex"
          >
            Reserveer
          </Link>
        </div>
      </div>
    </header>
  )
}
