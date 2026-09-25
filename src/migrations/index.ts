import * as migration_20260918_151143_initial from './20260918_151143_initial';
import * as migration_20260924_190424_add_locations_pois_faq from './20260924_190424_add_locations_pois_faq';
import * as migration_20260924_193345_add_location_pricing_fields from './20260924_193345_add_location_pricing_fields';
import * as migration_20260924_211324_editable_page_sections from './20260924_211324_editable_page_sections';
import * as migration_20260924_215000_location_city_regios_leverancier from './20260924_215000_location_city_regios_leverancier';
import * as migration_20260924_215226_seed_parkingyou_basis from './20260924_215226_seed_parkingyou_basis';
import * as migration_20260924_220544_import_locaties_csv from './20260924_220544_import_locaties_csv';
import * as migration_20260924_230032_add_kaartenslider_stappenplan_cijfers_doelgroepen_apppromo from './20260924_230032_add_kaartenslider_stappenplan_cijfers_doelgroepen_apppromo';
import * as migration_20260924_234319_prototype_section_blocks from './20260924_234319_prototype_section_blocks';
import * as migration_20260924_234500_seed_prototype_paginas from './20260924_234500_seed_prototype_paginas';

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
    name: '20260924_193345_add_location_pricing_fields',
  },
  {
    up: migration_20260924_211324_editable_page_sections.up,
    down: migration_20260924_211324_editable_page_sections.down,
    name: '20260924_211324_editable_page_sections',
  },
  {
    up: migration_20260924_215000_location_city_regios_leverancier.up,
    down: migration_20260924_215000_location_city_regios_leverancier.down,
    name: '20260924_215000_location_city_regios_leverancier',
  },
  {
    up: migration_20260924_215226_seed_parkingyou_basis.up,
    down: migration_20260924_215226_seed_parkingyou_basis.down,
    name: '20260924_215226_seed_parkingyou_basis',
  },
  {
    up: migration_20260924_220544_import_locaties_csv.up,
    down: migration_20260924_220544_import_locaties_csv.down,
    name: '20260924_220544_import_locaties_csv',
  },
  {
    up: migration_20260924_230032_add_kaartenslider_stappenplan_cijfers_doelgroepen_apppromo.up,
    down: migration_20260924_230032_add_kaartenslider_stappenplan_cijfers_doelgroepen_apppromo.down,
    name: '20260924_230032_add_kaartenslider_stappenplan_cijfers_doelgroepen_apppromo',
  },
  {
    up: migration_20260924_234319_prototype_section_blocks.up,
    down: migration_20260924_234319_prototype_section_blocks.down,
    name: '20260924_234319_prototype_section_blocks',
  },
  {
    up: migration_20260924_234500_seed_prototype_paginas.up,
    down: migration_20260924_234500_seed_prototype_paginas.down,
    name: '20260924_234500_seed_prototype_paginas',
  },
];
