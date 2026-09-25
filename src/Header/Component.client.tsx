'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Icon } from '@/components/py/Icon'
import { PyButton } from '@/components/py/Button'
import { PyLogo } from '@/components/py/Chrome'
import { cmsLinkHref } from '@/utilities/cmsLinkHref'

interface HeaderClientProps {
  data: Header
}

/** The prototype header (`PYHeader`): logo, menu, phone, account icon and the reserve button. */
export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const items = (data?.navItems ?? [])
    .map(({ link }) => ({
      label: link?.label ?? '',
      href: cmsLinkHref(link),
      newTab: Boolean(link?.newTab),
    }))
    .filter((item): item is { label: string; href: string; newTab: boolean } =>
      Boolean(item.href && item.label),
    )

  const knopLabel = data?.knopLabel || 'Direct reserveren'
  const knopUrl = data?.knopUrl || '/parkeren'
  const telefoon = data?.telefoon

  const navLink = (item: (typeof items)[number], className?: string) => (
    <Link
      key={item.href}
      href={item.href}
      className={className}
      {...(item.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
    >
      {item.label}
    </Link>
  )

  return (
    <header className={`py-scope py-header ${scrolled ? 'is-scrolled' : ''}`.trim()}>
      <div className="py-container py-header__inner">
        <Link href="/" className="py-header__brand" aria-label="ParkingYou home">
          <PyLogo />
        </Link>
        <nav className="py-header__nav" aria-label="Hoofdmenu">
          {items.map((item) =>
            navLink(
              item,
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? 'is-active'
                : undefined,
            ),
          )}
        </nav>
        <div className="py-header__actions">
          {telefoon ? (
            <a className="py-header__phone" href={`tel:${telefoon.replace(/[^\d+]/g, '')}`}>
              <Icon name="phone" size={16} />
              <span>{telefoon}</span>
            </a>
          ) : null}
          {data?.accountUrl ? (
            <Link href={data.accountUrl} className="py-header__icon-btn" title="Mijn account">
              <Icon name="user" size={20} />
            </Link>
          ) : null}
          <PyButton href={knopUrl} variant="primary">
            {knopLabel}
          </PyButton>
        </div>
        <button
          type="button"
          className="py-menu-button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          <Icon name={open ? 'x' : 'menu'} size={28} stroke={2.3} />
        </button>
      </div>
      {open ? (
        <div className="py-mobile-nav">
          {items.map((item) => navLink(item))}
          <PyButton href={knopUrl} variant="primary">
            {knopLabel}
          </PyButton>
        </div>
      ) : null}
    </header>
  )
}
