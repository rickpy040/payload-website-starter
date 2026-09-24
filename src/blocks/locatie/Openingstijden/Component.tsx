import React from 'react'

import type { LocatieOpeningstijdenBlock, Location } from '@/payload-types'
import { Icon } from '@/components/py/Icon'
import { PyButton } from '@/components/py/Button'

type Props = LocatieOpeningstijdenBlock & { locatie: Location }

export const LocatieOpeningstijdenComponent: React.FC<Props> = ({ titel, telefoon, locatie }) => {
  const uren = locatie.uren
  const adres = locatie.address

  return (
    <section className="py-info-section" id="openingstijden">
      <div className="py-container py-detail-two-col">
        <div>
          <h3>{titel}</h3>
          {uren?.open247 ? (
            <div className="py-247-badge">
              <Icon name="check" size={20} />
              <div>
                <strong>24/7 geopend</strong>
                <p>Deze locatie is altijd toegankelijk, ook op feestdagen.</p>
              </div>
            </div>
          ) : (
            <table className="py-hours-table">
              <tbody>
                <tr>
                  <td>Maandag – Vrijdag</td>
                  <td>
                    <strong>{uren?.doordeweeks ?? 'Onbekend'}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Zaterdag</td>
                  <td>
                    <strong>{uren?.zaterdag ?? 'Onbekend'}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Zondag</td>
                  <td>
                    <strong>{uren?.zondag ?? 'Onbekend'}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <div>
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
