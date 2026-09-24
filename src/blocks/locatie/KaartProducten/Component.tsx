import React from 'react'

import type { LocatieKaartProductenBlock, Location } from '@/payload-types'
import { PySectionIntro } from '@/components/py/Chrome'
import { Icon } from '@/components/py/Icon'

type Props = LocatieKaartProductenBlock & { locatie: Location }

/**
 * Static rendering of the strippenkaart/waardekaart ordering cards. The
 * prototype's version (`legacy-prototype` in rick040/Parkingyou) is an inert
 * client-side form; porting the interactive submit state is a small, separate
 * follow-up ("use client" ordering form) rather than something this
 * server-rendered block does on its own.
 */
export const LocatieKaartProductenComponent: React.FC<Props> = ({
  titelVoor,
  titelNadruk,
  titelNa,
  locatie,
}) => {
  if (!locatie.strippenkaart && !locatie.waardekaart) return null

  return (
    <section className="py-section py-section--paper">
      <div className="py-container">
        <PySectionIntro titleBefore={titelVoor || ''} titleEmphasis={titelNadruk || ''} titleAfter={titelNa || ''}>
          {`Bestel een strippenkaart of waardekaart specifiek voor ${locatie.name} en bespaar op elk bezoek.`}
        </PySectionIntro>

        <div className="py-product-cards-row">
          {locatie.strippenkaart ? (
            <div className="py-product-card py-product-card--strips">
              <div className="py-product-card__header">
                <span>
                  <Icon name="ticket" size={22} />
                </span>
                <h3>Strippenkaart</h3>
                <p>{`Kies 10 of 25 parkeeracties voor ${locatie.name}. Ontvang de code per e-mail en reserveer wanneer het jou uitkomt.`}</p>
              </div>
            </div>
          ) : null}

          {locatie.waardekaart ? (
            <div className="py-product-card py-product-card--waarde">
              <div className="py-product-card__header">
                <span>
                  <Icon name="wallet" size={22} />
                </span>
                <h3>Waardekaart</h3>
                <p>{`Laad een tegoed op en gebruik het voor alle bezoeken aan ${locatie.name}. Ideaal voor zakelijk gebruik en frequente bezoekers.`}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
