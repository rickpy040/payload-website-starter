import React from 'react'

import type { LocatieOpeningstijdenBlock, Location } from '@/payload-types'
import { Icon } from '@/components/py/Icon'
import { PyButton } from '@/components/py/Button'

type Props = LocatieOpeningstijdenBlock & { locatie: Location }

/**
 * Payment methods above service & bereikbaarheid. The opening hours this
 * block is named after are shown beside the tarieven; its `titel` is the
 * heading there (see the Tarieven component).
 */
export const LocatieOpeningstijdenComponent: React.FC<Props> = ({ telefoon, locatie }) => {
  const betaalmogelijkheden = locatie.betaalmogelijkheden ?? []
  const adres = locatie.address

  return (
    <section className="py-info-section" id="betaalmogelijkheden">
      <div className="py-container py-detail-stack">
        <div>
          <h3>Betaalmogelijkheden</h3>
          {betaalmogelijkheden.length > 0 ? (
            <div className="py-payment-grid">
              {betaalmogelijkheden.map((m, i) => (
                <span key={i} className="py-payment-badge">
                  <Icon name="card" size={16} />
                  {m.tekst}
                </span>
              ))}
            </div>
          ) : null}
          <div className="py-pricing-tip">
            <Icon name="trending" size={18} color="var(--py-orange)" />
            <div>
              <strong>Bespaar tot 33%</strong>
              <p>Reserveer vooraf en profiteer van vroegboekkortingen en gereserveerde dagprijzen.</p>
            </div>
          </div>
        </div>
        <div id="service">
          <h3>Service &amp; bereikbaarheid</h3>
          <div className="py-access-info">
            <div>
              <span>Telefonische service</span>
              <strong>24/7 bereikbaar</strong>
            </div>
            <div>
              <span>Adres</span>
              <strong>
                {[adres?.street, adres?.huisnummer].filter(Boolean).join(' ')}
                {adres?.cityName ? `, ${adres.cityName}` : ''}
              </strong>
            </div>
            {locatie.loopafstand ? (
              <div>
                <span>Loopafstand centrum</span>
                <strong>{locatie.loopafstand}</strong>
              </div>
            ) : null}
          </div>
          {telefoon ? (
            <div className="py-contact-cta">
              <PyButton href={`tel:${telefoon.replace(/\s+/g, '')}`} variant="outline" icon="phone">
                {telefoon}
              </PyButton>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
