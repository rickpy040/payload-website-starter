import React from 'react'

import type { LocatieFaciliteitenBlock, Location } from '@/payload-types'
import { Icon, type IconName } from '@/components/py/Icon'

type Props = LocatieFaciliteitenBlock & { locatie: Location }

function faciliteitIcon(naam: string): IconName {
  if (naam.startsWith('Laadpalen')) return 'ev'
  if (naam.startsWith('Lift')) return 'elevator'
  if (naam.startsWith('Camera')) return 'camera'
  if (naam.startsWith('Bewaking')) return 'shield'
  if (naam.startsWith('Fiets')) return 'bicycle'
  if (naam.startsWith('Toilet')) return 'info'
  if (naam.includes('OV') || naam.includes('loket')) return 'map'
  return 'check'
}

export const LocatieFaciliteitenComponent: React.FC<Props> = ({ titel, locatie }) => {
  const faciliteiten = locatie.faciliteiten ?? []

  return (
    <section className="py-info-section" id="faciliteiten">
      <div className="py-container py-detail-stack">
        <div>
          <h3>{titel}</h3>
          {faciliteiten.length > 0 ? (
            <div className="py-facility-grid">
              {faciliteiten.map((f, i) => (
                <div key={i} className="py-facility-item">
                  <span className="py-facility-icon">
                    <Icon name={faciliteitIcon(f.tekst)} size={18} />
                  </span>
                  <span>{f.tekst}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div id="toegang">
          <h3>Toegang &amp; type</h3>
          <div className="py-access-info">
            <div>
              <span>Type locatie</span>
              <strong>{locatie.soort ?? 'Niet opgegeven'}</strong>
            </div>
            <div>
              <span>Maximale voertuighoogte</span>
              <strong>{locatie.maxHeight ?? 'Niet opgegeven'}</strong>
            </div>
            <div>
              <span>Beschikbare plekken</span>
              <strong>{locatie.spotsTotal != null ? `${locatie.spotsTotal} (indicatief)` : 'Niet opgegeven'}</strong>
            </div>
            <div>
              <span>Kentekentoegang</span>
              <strong>{locatie.reserveerbaar ? 'Ja, bij reservering' : 'Niet beschikbaar'}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
