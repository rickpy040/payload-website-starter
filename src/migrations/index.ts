import * as migration_20260918_151143_initial from './20260918_151143_initial';
import * as migration_20260924_190424_add_locations_pois_faq from './20260924_190424_add_locations_pois_faq';
import * as migration_20260924_193345_add_location_pricing_fields from './20260924_193345_add_location_pricing_fields';

export const migrations = [
  {
    up: migration_20260918_151143_initial.up,
    down: migration_20260918_151143_initial.down,
    name: '20260918_151143_initial',
  },
  {
    up: migration_20260924_190424_add_locations_pois_faq.up,
    down: migration_20260924_190424_add_locations_pois_faq.down,
    name: '20260924_190424_add_locations_pois_faq',
  },
  {
    up: migration_20260924_193345_add_location_pricing_fields.up,
    down: migration_20260924_193345_add_location_pricing_fields.down,
    name: '20260924_193345_add_location_pricing_fields'
  },
];
