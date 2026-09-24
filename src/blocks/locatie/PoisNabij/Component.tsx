import React from 'react'

import type { LocatiePoisNabijBlock, Location } from '@/payload-types'
import { Icon } from '@/components/py/Icon'

type Props = LocatiePoisNabijBlock & { locatie: Location }

export const LocatiePoisNabijComponent: React.FC<Props> = ({ titel, kaartbijschrift, locatie }) => {
  const pois = locatie.poisNabij ?? []
  if (pois.length === 0) return null

  return (
    <section className="py-info-section" id="omgeving">
      <div className="py-container">
        <h3>{titel}</h3>
        <div className="py-poi-grid">
          {pois.map((poi, i) => (
            <div key={i} className="py-poi-card">
              <span className="py-poi-icon">
                <Icon name="pin" size={20} />
              </span>
              <div>
                <strong>{poi.naam}</strong>
                {poi.soort ? <span>{poi.soort}</span> : null}
                {poi.afstand ? (
                  <span className="py-poi-distance">
                    <Icon name="clock" size={14} /> {poi.afstand}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        {locatie.coordinates ? (
          <div className="py-detail-map-card" style={{ marginTop: 32 }}>
            <iframe
              title={`Kaart van ${locatie.name}`}
              className="py-detail-map-card__kaart"
              style={{ width: '100%', height: 320, border: 0, borderRadius: 'var(--py-radius)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${locatie.coordinates[0] - 0.01}%2C${locatie.coordinates[1] - 0.01}%2C${locatie.coordinates[0] + 0.01}%2C${locatie.coordinates[1] + 0.01}&layer=mapnik&marker=${locatie.coordinates[1]}%2C${locatie.coordinates[0]}`}
            />
            {kaartbijschrift ? <p>{kaartbijschrift}</p> : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
