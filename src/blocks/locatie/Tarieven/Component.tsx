import React from 'react'

import type { LocatieOpeningstijdenBlock, LocatieTarievenBlock, Location } from '@/payload-types'
import { Icon } from '@/components/py/Icon'

type Props = LocatieTarievenBlock & { locatie: Location }

/**
 * Tarieven with the opening hours beside them. The hours heading stays
 * editable in the Openingstijden block (which now holds payment methods and
 * service), so it is read from that sibling block when the location has one.
 */
export const LocatieTarievenComponent: React.FC<Props> = ({ titel, locatie }) => {
  const tarieven = locatie.aeroparkerSync?.tarieven ?? []
  const sync = locatie.aeroparkerSync
  const uren = locatie.uren
  const urenTitel =
    locatie.secties?.find(
      (b): b is LocatieOpeningstijdenBlock => b.blockType === 'locatieOpeningstijden',
    )?.titel || 'Openingstijden'

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
        <div id="openingstijden">
          <h3>{urenTitel}</h3>
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
      </div>
    </section>
  )
}
