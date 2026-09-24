import React from 'react'

import type { LocatieTarievenBlock, Location } from '@/payload-types'
import { Icon } from '@/components/py/Icon'

type Props = LocatieTarievenBlock & { locatie: Location }

export const LocatieTarievenComponent: React.FC<Props> = ({ titel, locatie }) => {
  const tarieven = locatie.aeroparkerSync?.tarieven ?? []
  const betaalmogelijkheden = locatie.betaalmogelijkheden ?? []
  const sync = locatie.aeroparkerSync

  return (
    <section className="py-info-section" id="tarieven">
      <div className="py-container py-detail-two-col">
        <div>
          <h3>{titel}</h3>
          {tarieven.length > 0 ? (
            <table className="py-tariff-table">
              <tbody>
                {tarieven.map((t, i) => (
                  <tr key={i}>
                    <td>{t.label}</td>
                    <td>
                      <strong>€ {t.prijs}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="py-tariff-note">Tarieven volgen zodra deze locatie is gekoppeld aan Aeroparker.</p>
          )}
          <p className="py-tariff-note">
            Tarieven zijn inclusief BTW. Vroegboekkorting geldt bij reservering minimaal 24u van tevoren.
          </p>
          {sync?.syncStatus && sync.syncStatus !== 'ok' && sync.syncMelding ? (
            <p className="py-tariff-note" role="status">
              {sync.syncMelding}
            </p>
          ) : null}
        </div>
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
      </div>
    </section>
  )
}
