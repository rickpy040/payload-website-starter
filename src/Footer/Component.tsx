import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'
import { PyLogo } from '@/components/py/Chrome'
import { cmsLinkHref } from '@/utilities/cmsLinkHref'

function FooterLink({ label, href }: { label: string; href: string }) {
  // tel:, mailto: and external links cannot go through next/link.
  if (/^(https?:|tel:|mailto:)/.test(href)) return <a href={href}>{label}</a>
  return <Link href={href}>{label}</Link>
}

/** The prototype footer (`PYFooter`): logo and text, link columns, bottom line. */
export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as FooterType

  let kolommen = (footerData?.kolommen ?? []).map((kolom) => ({
    titel: kolom.titel,
    links: (kolom.links ?? []).map((l) => ({ label: l.label, href: l.url })),
  }))
  if (kolommen.length === 0 && footerData?.navItems?.length) {
    kolommen = [
      {
        titel: 'Menu',
        links: footerData.navItems
          .map(({ link }) => ({ label: link?.label ?? '', href: cmsLinkHref(link) ?? '' }))
          .filter((l) => l.label && l.href),
      },
    ]
  }

  const onderregel = (
    footerData?.onderregelLinks ?? 'ParkingYou {jaar} - The other way of parking.'
  ).replace('{jaar}', String(new Date().getFullYear()))

  return (
    <footer className="py-scope py-footer">
      <div className="py-container py-footer__grid">
        <div>
          <PyLogo inverted />
          {footerData?.tekst ? <p>{footerData.tekst}</p> : null}
        </div>
        {kolommen.map((kolom, i) => (
          <nav key={i} aria-label={kolom.titel}>
            <strong>{kolom.titel}</strong>
            {kolom.links.map((l, j) => (
              <FooterLink key={j} label={l.label} href={l.href} />
            ))}
          </nav>
        ))}
      </div>
      <div className="py-container py-footer__bottom">
        <span>{onderregel}</span>
        {footerData?.onderregelRechts ? <span>{footerData.onderregelRechts}</span> : null}
      </div>
    </footer>
  )
}
