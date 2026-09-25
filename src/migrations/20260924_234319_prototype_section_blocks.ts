import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_pagina_hero_knoppen_stijl" AS ENUM('primary', 'aqua', 'outline', 'ghost', 'on-dark');
  CREATE TYPE "public"."enum_pages_blocks_pagina_hero_knoppen_icoon" AS ENUM('geen', 'car', 'arrow', 'pin', 'calendar', 'clock', 'card', 'bolt', 'shield', 'ticket', 'wallet', 'phone', 'search', 'check', 'star', 'ev', 'map', 'info', 'trending', 'tag', 'user');
  CREATE TYPE "public"."enum_pages_blocks_pagina_hero_stijl" AS ENUM('licht', 'aqua', 'zacht', 'warm', 'evenementen');
  CREATE TYPE "public"."enum_pages_blocks_pagina_hero_visual" AS ENUM('kaart', 'paneel', 'cijfers', 'dashboard', 'evenementen', 'afbeelding', 'geen');
  CREATE TYPE "public"."enum_pages_blocks_product_keuze_producten_icoon" AS ENUM('car', 'arrow', 'pin', 'calendar', 'clock', 'card', 'bolt', 'shield', 'ticket', 'wallet', 'phone', 'search', 'check', 'star', 'ev', 'map', 'info', 'trending', 'tag', 'user');
  CREATE TYPE "public"."enum_pages_blocks_locatie_overzicht_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum_pages_blocks_locatie_overzicht_bron" AS ENUM('alle', 'abonnementen', 'parkingpass', 'handmatig');
  CREATE TYPE "public"."enum_pages_blocks_evenementen_overzicht_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum_pages_blocks_info_banden_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum_pages_blocks_info_banden_stijl" AS ENUM('banden', 'partner');
  CREATE TYPE "public"."enum_pages_blocks_stappen_sectie_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum_pages_blocks_stappen_sectie_stijl" AS ENUM('kaarten', 'flow');
  CREATE TYPE "public"."enum_pages_blocks_voordelen_split_voordelen_icoon" AS ENUM('car', 'arrow', 'pin', 'calendar', 'clock', 'card', 'bolt', 'shield', 'ticket', 'wallet', 'phone', 'search', 'check', 'star', 'ev', 'map', 'info', 'trending', 'tag', 'user');
  CREATE TYPE "public"."enum_pages_blocks_verhaal_kolommen_kolommen_stijl" AS ENUM('primary', 'aqua', 'outline', 'ghost', 'on-dark');
  CREATE TYPE "public"."enum_pages_blocks_verhaal_kolommen_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum_pages_blocks_steden_strip_bron" AS ENUM('automatisch', 'handmatig');
  CREATE TYPE "public"."enum_pages_blocks_steden_strip_link_naar" AS ENUM('locaties', 'stadspagina');
  CREATE TYPE "public"."enum_pages_blocks_app_callout_features_icoon" AS ENUM('car', 'arrow', 'pin', 'calendar', 'clock', 'card', 'bolt', 'shield', 'ticket', 'wallet', 'phone', 'search', 'check', 'star', 'ev', 'map', 'info', 'trending', 'tag', 'user');
  CREATE TYPE "public"."enum_pages_blocks_app_callout_knoppen_stijl" AS ENUM('primary', 'aqua', 'outline', 'ghost', 'on-dark');
  CREATE TYPE "public"."enum_pages_blocks_app_callout_knoppen_icoon" AS ENUM('geen', 'car', 'arrow', 'pin', 'calendar', 'clock', 'card', 'bolt', 'shield', 'ticket', 'wallet', 'phone', 'search', 'check', 'star', 'ev', 'map', 'info', 'trending', 'tag', 'user');
  CREATE TYPE "public"."enum_pages_blocks_banner_cta_actie" AS ENUM('knop', 'inschrijven');
  CREATE TYPE "public"."enum_pages_blocks_banner_cta_stijl" AS ENUM('primary', 'aqua', 'outline', 'ghost', 'on-dark');
  CREATE TYPE "public"."enum_pages_blocks_banner_cta_icoon" AS ENUM('geen', 'car', 'arrow', 'pin', 'calendar', 'clock', 'card', 'bolt', 'shield', 'ticket', 'wallet', 'phone', 'search', 'check', 'star', 'ev', 'map', 'info', 'trending', 'tag', 'user');
  CREATE TYPE "public"."enum_pages_blocks_faq_accordeon_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum_pages_blocks_faq_accordeon_bron" AS ENUM('handmatig', 'collectie');
  CREATE TYPE "public"."enum_pages_blocks_formulier_sectie_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum_pages_blocks_formulier_sectie_locatie_labels" AS ENUM('geen', 'abonnementen', 'parkingpass');
  CREATE TYPE "public"."enum_waardekaart_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum__pages_v_blocks_pagina_hero_knoppen_stijl" AS ENUM('primary', 'aqua', 'outline', 'ghost', 'on-dark');
  CREATE TYPE "public"."enum__pages_v_blocks_pagina_hero_knoppen_icoon" AS ENUM('geen', 'car', 'arrow', 'pin', 'calendar', 'clock', 'card', 'bolt', 'shield', 'ticket', 'wallet', 'phone', 'search', 'check', 'star', 'ev', 'map', 'info', 'trending', 'tag', 'user');
  CREATE TYPE "public"."enum__pages_v_blocks_pagina_hero_stijl" AS ENUM('licht', 'aqua', 'zacht', 'warm', 'evenementen');
  CREATE TYPE "public"."enum__pages_v_blocks_pagina_hero_visual" AS ENUM('kaart', 'paneel', 'cijfers', 'dashboard', 'evenementen', 'afbeelding', 'geen');
  CREATE TYPE "public"."enum__pages_v_blocks_product_keuze_producten_icoon" AS ENUM('car', 'arrow', 'pin', 'calendar', 'clock', 'card', 'bolt', 'shield', 'ticket', 'wallet', 'phone', 'search', 'check', 'star', 'ev', 'map', 'info', 'trending', 'tag', 'user');
  CREATE TYPE "public"."enum__pages_v_blocks_locatie_overzicht_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum__pages_v_blocks_locatie_overzicht_bron" AS ENUM('alle', 'abonnementen', 'parkingpass', 'handmatig');
  CREATE TYPE "public"."enum__pages_v_blocks_evenementen_overzicht_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum__pages_v_blocks_info_banden_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum__pages_v_blocks_info_banden_stijl" AS ENUM('banden', 'partner');
  CREATE TYPE "public"."enum__pages_v_blocks_stappen_sectie_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum__pages_v_blocks_stappen_sectie_stijl" AS ENUM('kaarten', 'flow');
  CREATE TYPE "public"."enum__pages_v_blocks_voordelen_split_voordelen_icoon" AS ENUM('car', 'arrow', 'pin', 'calendar', 'clock', 'card', 'bolt', 'shield', 'ticket', 'wallet', 'phone', 'search', 'check', 'star', 'ev', 'map', 'info', 'trending', 'tag', 'user');
  CREATE TYPE "public"."enum__pages_v_blocks_verhaal_kolommen_kolommen_stijl" AS ENUM('primary', 'aqua', 'outline', 'ghost', 'on-dark');
  CREATE TYPE "public"."enum__pages_v_blocks_verhaal_kolommen_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum__pages_v_blocks_steden_strip_bron" AS ENUM('automatisch', 'handmatig');
  CREATE TYPE "public"."enum__pages_v_blocks_steden_strip_link_naar" AS ENUM('locaties', 'stadspagina');
  CREATE TYPE "public"."enum__pages_v_blocks_app_callout_features_icoon" AS ENUM('car', 'arrow', 'pin', 'calendar', 'clock', 'card', 'bolt', 'shield', 'ticket', 'wallet', 'phone', 'search', 'check', 'star', 'ev', 'map', 'info', 'trending', 'tag', 'user');
  CREATE TYPE "public"."enum__pages_v_blocks_app_callout_knoppen_stijl" AS ENUM('primary', 'aqua', 'outline', 'ghost', 'on-dark');
  CREATE TYPE "public"."enum__pages_v_blocks_app_callout_knoppen_icoon" AS ENUM('geen', 'car', 'arrow', 'pin', 'calendar', 'clock', 'card', 'bolt', 'shield', 'ticket', 'wallet', 'phone', 'search', 'check', 'star', 'ev', 'map', 'info', 'trending', 'tag', 'user');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_cta_actie" AS ENUM('knop', 'inschrijven');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_cta_stijl" AS ENUM('primary', 'aqua', 'outline', 'ghost', 'on-dark');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_cta_icoon" AS ENUM('geen', 'car', 'arrow', 'pin', 'calendar', 'clock', 'card', 'bolt', 'shield', 'ticket', 'wallet', 'phone', 'search', 'check', 'star', 'ev', 'map', 'info', 'trending', 'tag', 'user');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_accordeon_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_accordeon_bron" AS ENUM('handmatig', 'collectie');
  CREATE TYPE "public"."enum__pages_v_blocks_formulier_sectie_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum__pages_v_blocks_formulier_sectie_locatie_labels" AS ENUM('geen', 'abonnementen', 'parkingpass');
  CREATE TYPE "public"."enum__waardekaart_v_achtergrond" AS ENUM('wit', 'papier');
  CREATE TYPE "public"."enum_forms_blocks_locatie_keuze_bron" AS ENUM('alle', 'abonnementen', 'parkingpass');
  CREATE TABLE "pages_blocks_home_hero_snelle_steden" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"naam" varchar
  );
  
  CREATE TABLE "pages_blocks_home_hero_cijfers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"waarde" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"zoekbalk_waar_label" varchar DEFAULT 'Waar',
  	"zoekbalk_waar_placeholder" varchar DEFAULT 'Stad, garage of adres',
  	"zoekbalk_wanneer_label" varchar DEFAULT 'Wanneer',
  	"zoekbalk_wanneer_waarde" varchar DEFAULT 'Vandaag 09:00 - 17:00',
  	"zoekbalk_knop_label" varchar DEFAULT 'Zoek plek',
  	"zoekbalk_doel" varchar DEFAULT '/locaties',
  	"zoekbalk_hint" varchar DEFAULT 'We tonen nu de beste matches voor {stad}.',
  	"afbeelding_id" integer,
  	"prijs" varchar DEFAULT '5',
  	"prijs_eenheid" varchar DEFAULT 'per dag',
  	"ticket_label" varchar DEFAULT 'Gereserveerd',
  	"ticket_titel" varchar DEFAULT 'Philips Stadion',
  	"ticket_tijd" varchar DEFAULT 'Vandaag 09:00 - 17:00',
  	"stat_waarde" varchar DEFAULT '40+',
  	"stat_label" varchar DEFAULT 'garages in Nederland',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pagina_hero_knoppen" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"stijl" "enum_pages_blocks_pagina_hero_knoppen_stijl" DEFAULT 'primary',
  	"icoon" "enum_pages_blocks_pagina_hero_knoppen_icoon" DEFAULT 'arrow'
  );
  
  CREATE TABLE "pages_blocks_pagina_hero_paneel_regels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"waarde" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_pagina_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stijl" "enum_pages_blocks_pagina_hero_stijl" DEFAULT 'licht',
  	"visual" "enum_pages_blocks_pagina_hero_visual" DEFAULT 'kaart',
  	"anker" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"toon_zoekbalk" boolean,
  	"zoekbalk_waar_label" varchar DEFAULT 'Waar',
  	"zoekbalk_waar_placeholder" varchar DEFAULT 'Stad, garage of adres',
  	"zoekbalk_wanneer_label" varchar DEFAULT 'Wanneer',
  	"zoekbalk_wanneer_waarde" varchar DEFAULT 'Vandaag 09:00 - 17:00',
  	"zoekbalk_knop_label" varchar DEFAULT 'Zoek plek',
  	"zoekbalk_doel" varchar DEFAULT '/locaties',
  	"zoekbalk_hint" varchar DEFAULT 'We tonen nu de beste matches voor {stad}.',
  	"afbeelding_id" integer,
  	"paneel_label" varchar,
  	"paneel_waarde" varchar,
  	"paneel_balken" varchar DEFAULT '44, 62, 78, 84, 71, 56, 38',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pass_hero_opties" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"waarde" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_pass_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"kaart_label" varchar DEFAULT 'ParkingPass',
  	"kaart_ondertitel" varchar DEFAULT 'flexibel parkeren',
  	"kaart_tekst" varchar,
  	"koppel_veld" varchar DEFAULT 'aantal',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_keuze_producten" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icoon" "enum_pages_blocks_product_keuze_producten_icoon" DEFAULT 'car',
  	"titel" varchar,
  	"tekst" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_product_keuze" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar DEFAULT 'Bekijk optie',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_locatie_overzicht" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"achtergrond" "enum_pages_blocks_locatie_overzicht_achtergrond" DEFAULT 'wit',
  	"anker" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"actie_label" varchar,
  	"actie_url" varchar,
  	"bron" "enum_pages_blocks_locatie_overzicht_bron" DEFAULT 'alle',
  	"stad_id" integer,
  	"max_aantal" numeric,
  	"toon_stad_filter" boolean DEFAULT true,
  	"toon_sortering" boolean DEFAULT true,
  	"toon_aantal" boolean DEFAULT true,
  	"eerste_uitgelicht" boolean DEFAULT true,
  	"knop_label" varchar DEFAULT 'Bekijk en reserveer',
  	"alle_steden_label" varchar DEFAULT 'Alle steden',
  	"aantal_tekst" varchar DEFAULT '{aantal} garages gevonden',
  	"lege_tekst" varchar DEFAULT 'Er zijn hier nog geen locaties gepubliceerd.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_evenementen_overzicht" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"achtergrond" "enum_pages_blocks_evenementen_overzicht_achtergrond" DEFAULT 'wit',
  	"anker" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"toon_filters" boolean DEFAULT true,
  	"toon_aantal" boolean DEFAULT true,
  	"max_aantal" numeric,
  	"knop_label" varchar DEFAULT 'Parkeerticket',
  	"alle_steden_label" varchar DEFAULT 'Alle steden',
  	"alle_types_label" varchar DEFAULT 'Alle types',
  	"aantal_tekst" varchar DEFAULT '{aantal} evenementen gevonden',
  	"lege_tekst" varchar DEFAULT 'Er staan op dit moment geen evenementen gepland.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_info_banden_kaarten" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar
  );
  
  CREATE TABLE "pages_blocks_info_banden" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"achtergrond" "enum_pages_blocks_info_banden_achtergrond" DEFAULT 'wit',
  	"anker" varchar,
  	"stijl" "enum_pages_blocks_info_banden_stijl" DEFAULT 'banden',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stappen_sectie_stappen" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nummer" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"uitgelicht" boolean
  );
  
  CREATE TABLE "pages_blocks_stappen_sectie" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"achtergrond" "enum_pages_blocks_stappen_sectie_achtergrond" DEFAULT 'wit',
  	"anker" varchar,
  	"stijl" "enum_pages_blocks_stappen_sectie_stijl" DEFAULT 'kaarten',
  	"titel" varchar,
  	"tekst" varchar,
  	"stap_label" varchar DEFAULT 'Stap',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_voordelen_split_voordelen" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icoon" "enum_pages_blocks_voordelen_split_voordelen_icoon" DEFAULT 'car',
  	"titel" varchar,
  	"tekst" varchar
  );
  
  CREATE TABLE "pages_blocks_voordelen_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anker" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_verhaal_kolommen_kolommen" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"knop_label" varchar,
  	"knop_url" varchar,
  	"stijl" "enum_pages_blocks_verhaal_kolommen_kolommen_stijl" DEFAULT 'outline'
  );
  
  CREATE TABLE "pages_blocks_verhaal_kolommen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"achtergrond" "enum_pages_blocks_verhaal_kolommen_achtergrond" DEFAULT 'wit',
  	"anker" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_steden_strip_steden" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"naam" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_steden_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bron" "enum_pages_blocks_steden_strip_bron" DEFAULT 'automatisch',
  	"max_aantal" numeric DEFAULT 5,
  	"link_naar" "enum_pages_blocks_steden_strip_link_naar" DEFAULT 'locaties',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_app_callout_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icoon" "enum_pages_blocks_app_callout_features_icoon" DEFAULT 'check',
  	"tekst" varchar
  );
  
  CREATE TABLE "pages_blocks_app_callout_knoppen" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"stijl" "enum_pages_blocks_app_callout_knoppen_stijl" DEFAULT 'primary',
  	"icoon" "enum_pages_blocks_app_callout_knoppen_icoon" DEFAULT 'arrow'
  );
  
  CREATE TABLE "pages_blocks_app_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anker" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"telefoon_zoek_tekst" varchar DEFAULT 'Waar parkeer je?',
  	"telefoon_label" varchar DEFAULT 'Beste keuze',
  	"telefoon_titel" varchar DEFAULT 'Parking Stadskantoor',
  	"telefoon_tekst" varchar DEFAULT '1 min lopen - vanaf EUR 2,55',
  	"telefoon_knop" varchar DEFAULT 'Reserveer',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_banner_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"actie" "enum_pages_blocks_banner_cta_actie" DEFAULT 'knop',
  	"knop_label" varchar,
  	"knop_url" varchar,
  	"stijl" "enum_pages_blocks_banner_cta_stijl" DEFAULT 'aqua',
  	"icoon" "enum_pages_blocks_banner_cta_icoon" DEFAULT 'arrow',
  	"inschrijven_placeholder" varchar DEFAULT 'jij@voorbeeld.nl',
  	"inschrijven_knop_label" varchar DEFAULT 'Inschrijven',
  	"inschrijven_formulier_id" integer,
  	"inschrijven_bedankt" varchar DEFAULT 'Bedankt! Je staat op de lijst.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_accordeon_vragen" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"vraag" varchar,
  	"antwoord" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_accordeon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"achtergrond" "enum_pages_blocks_faq_accordeon_achtergrond" DEFAULT 'papier',
  	"anker" varchar,
  	"titel" varchar DEFAULT 'Veelgestelde vragen.',
  	"tekst" varchar,
  	"bron" "enum_pages_blocks_faq_accordeon_bron" DEFAULT 'handmatig',
  	"categorie_id" integer,
  	"max_aantal" numeric DEFAULT 7,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_formulier_sectie" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"achtergrond" "enum_pages_blocks_formulier_sectie_achtergrond" DEFAULT 'wit',
  	"anker" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"locatie_labels" "enum_pages_blocks_formulier_sectie_locatie_labels" DEFAULT 'geen',
  	"formulier_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "waardekaart_info_kaarten" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar
  );
  
  CREATE TABLE "waardekaart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"achtergrond" "enum_waardekaart_achtergrond" DEFAULT 'wit',
  	"anker" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"wizard_stap1" varchar DEFAULT 'Keuze',
  	"wizard_stap2" varchar DEFAULT 'Gegevens',
  	"wizard_stap3" varchar DEFAULT 'Bevestiging',
  	"wizard_keuze_titel" varchar DEFAULT 'Kies het tegoed per kaart.',
  	"wizard_bedragen" varchar DEFAULT '25, 50, 100, 200, 500',
  	"wizard_standaard_bedrag" varchar DEFAULT '100',
  	"wizard_aantal_label" varchar DEFAULT 'Aantal kaarten',
  	"wizard_totaal_label" varchar DEFAULT 'Totaal',
  	"wizard_volgende_label" varchar DEFAULT 'Ga naar gegevens',
  	"wizard_gegevens_titel" varchar DEFAULT 'Bedrijfsgegevens.',
  	"wizard_terug_label" varchar DEFAULT 'Terug',
  	"wizard_bevestig_label" varchar DEFAULT 'Naar bevestiging',
  	"wizard_succes_titel" varchar DEFAULT 'Bestelling ontvangen!',
  	"wizard_succes_tekst" varchar DEFAULT '{aantal}x Waardekaart van € {bedrag} – totaal € {totaal}.
  Factuur en kaartgegevens worden gestuurd naar {email}.',
  	"formulier_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_hero_snelle_steden" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"naam" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_hero_cijfers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"waarde" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"zoekbalk_waar_label" varchar DEFAULT 'Waar',
  	"zoekbalk_waar_placeholder" varchar DEFAULT 'Stad, garage of adres',
  	"zoekbalk_wanneer_label" varchar DEFAULT 'Wanneer',
  	"zoekbalk_wanneer_waarde" varchar DEFAULT 'Vandaag 09:00 - 17:00',
  	"zoekbalk_knop_label" varchar DEFAULT 'Zoek plek',
  	"zoekbalk_doel" varchar DEFAULT '/locaties',
  	"zoekbalk_hint" varchar DEFAULT 'We tonen nu de beste matches voor {stad}.',
  	"afbeelding_id" integer,
  	"prijs" varchar DEFAULT '5',
  	"prijs_eenheid" varchar DEFAULT 'per dag',
  	"ticket_label" varchar DEFAULT 'Gereserveerd',
  	"ticket_titel" varchar DEFAULT 'Philips Stadion',
  	"ticket_tijd" varchar DEFAULT 'Vandaag 09:00 - 17:00',
  	"stat_waarde" varchar DEFAULT '40+',
  	"stat_label" varchar DEFAULT 'garages in Nederland',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pagina_hero_knoppen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"stijl" "enum__pages_v_blocks_pagina_hero_knoppen_stijl" DEFAULT 'primary',
  	"icoon" "enum__pages_v_blocks_pagina_hero_knoppen_icoon" DEFAULT 'arrow',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pagina_hero_paneel_regels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"waarde" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pagina_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"stijl" "enum__pages_v_blocks_pagina_hero_stijl" DEFAULT 'licht',
  	"visual" "enum__pages_v_blocks_pagina_hero_visual" DEFAULT 'kaart',
  	"anker" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"toon_zoekbalk" boolean,
  	"zoekbalk_waar_label" varchar DEFAULT 'Waar',
  	"zoekbalk_waar_placeholder" varchar DEFAULT 'Stad, garage of adres',
  	"zoekbalk_wanneer_label" varchar DEFAULT 'Wanneer',
  	"zoekbalk_wanneer_waarde" varchar DEFAULT 'Vandaag 09:00 - 17:00',
  	"zoekbalk_knop_label" varchar DEFAULT 'Zoek plek',
  	"zoekbalk_doel" varchar DEFAULT '/locaties',
  	"zoekbalk_hint" varchar DEFAULT 'We tonen nu de beste matches voor {stad}.',
  	"afbeelding_id" integer,
  	"paneel_label" varchar,
  	"paneel_waarde" varchar,
  	"paneel_balken" varchar DEFAULT '44, 62, 78, 84, 71, 56, 38',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pass_hero_opties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"waarde" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pass_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"kaart_label" varchar DEFAULT 'ParkingPass',
  	"kaart_ondertitel" varchar DEFAULT 'flexibel parkeren',
  	"kaart_tekst" varchar,
  	"koppel_veld" varchar DEFAULT 'aantal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_keuze_producten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icoon" "enum__pages_v_blocks_product_keuze_producten_icoon" DEFAULT 'car',
  	"titel" varchar,
  	"tekst" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_keuze" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar DEFAULT 'Bekijk optie',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_locatie_overzicht" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"achtergrond" "enum__pages_v_blocks_locatie_overzicht_achtergrond" DEFAULT 'wit',
  	"anker" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"actie_label" varchar,
  	"actie_url" varchar,
  	"bron" "enum__pages_v_blocks_locatie_overzicht_bron" DEFAULT 'alle',
  	"stad_id" integer,
  	"max_aantal" numeric,
  	"toon_stad_filter" boolean DEFAULT true,
  	"toon_sortering" boolean DEFAULT true,
  	"toon_aantal" boolean DEFAULT true,
  	"eerste_uitgelicht" boolean DEFAULT true,
  	"knop_label" varchar DEFAULT 'Bekijk en reserveer',
  	"alle_steden_label" varchar DEFAULT 'Alle steden',
  	"aantal_tekst" varchar DEFAULT '{aantal} garages gevonden',
  	"lege_tekst" varchar DEFAULT 'Er zijn hier nog geen locaties gepubliceerd.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_evenementen_overzicht" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"achtergrond" "enum__pages_v_blocks_evenementen_overzicht_achtergrond" DEFAULT 'wit',
  	"anker" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"toon_filters" boolean DEFAULT true,
  	"toon_aantal" boolean DEFAULT true,
  	"max_aantal" numeric,
  	"knop_label" varchar DEFAULT 'Parkeerticket',
  	"alle_steden_label" varchar DEFAULT 'Alle steden',
  	"alle_types_label" varchar DEFAULT 'Alle types',
  	"aantal_tekst" varchar DEFAULT '{aantal} evenementen gevonden',
  	"lege_tekst" varchar DEFAULT 'Er staan op dit moment geen evenementen gepland.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_info_banden_kaarten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_info_banden" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"achtergrond" "enum__pages_v_blocks_info_banden_achtergrond" DEFAULT 'wit',
  	"anker" varchar,
  	"stijl" "enum__pages_v_blocks_info_banden_stijl" DEFAULT 'banden',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stappen_sectie_stappen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"nummer" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"uitgelicht" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stappen_sectie" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"achtergrond" "enum__pages_v_blocks_stappen_sectie_achtergrond" DEFAULT 'wit',
  	"anker" varchar,
  	"stijl" "enum__pages_v_blocks_stappen_sectie_stijl" DEFAULT 'kaarten',
  	"titel" varchar,
  	"tekst" varchar,
  	"stap_label" varchar DEFAULT 'Stap',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_voordelen_split_voordelen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icoon" "enum__pages_v_blocks_voordelen_split_voordelen_icoon" DEFAULT 'car',
  	"titel" varchar,
  	"tekst" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_voordelen_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anker" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_verhaal_kolommen_kolommen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"knop_label" varchar,
  	"knop_url" varchar,
  	"stijl" "enum__pages_v_blocks_verhaal_kolommen_kolommen_stijl" DEFAULT 'outline',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_verhaal_kolommen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"achtergrond" "enum__pages_v_blocks_verhaal_kolommen_achtergrond" DEFAULT 'wit',
  	"anker" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_steden_strip_steden" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"naam" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_steden_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"bron" "enum__pages_v_blocks_steden_strip_bron" DEFAULT 'automatisch',
  	"max_aantal" numeric DEFAULT 5,
  	"link_naar" "enum__pages_v_blocks_steden_strip_link_naar" DEFAULT 'locaties',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_app_callout_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icoon" "enum__pages_v_blocks_app_callout_features_icoon" DEFAULT 'check',
  	"tekst" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_app_callout_knoppen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"stijl" "enum__pages_v_blocks_app_callout_knoppen_stijl" DEFAULT 'primary',
  	"icoon" "enum__pages_v_blocks_app_callout_knoppen_icoon" DEFAULT 'arrow',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_app_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anker" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"telefoon_zoek_tekst" varchar DEFAULT 'Waar parkeer je?',
  	"telefoon_label" varchar DEFAULT 'Beste keuze',
  	"telefoon_titel" varchar DEFAULT 'Parking Stadskantoor',
  	"telefoon_tekst" varchar DEFAULT '1 min lopen - vanaf EUR 2,55',
  	"telefoon_knop" varchar DEFAULT 'Reserveer',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_banner_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"actie" "enum__pages_v_blocks_banner_cta_actie" DEFAULT 'knop',
  	"knop_label" varchar,
  	"knop_url" varchar,
  	"stijl" "enum__pages_v_blocks_banner_cta_stijl" DEFAULT 'aqua',
  	"icoon" "enum__pages_v_blocks_banner_cta_icoon" DEFAULT 'arrow',
  	"inschrijven_placeholder" varchar DEFAULT 'jij@voorbeeld.nl',
  	"inschrijven_knop_label" varchar DEFAULT 'Inschrijven',
  	"inschrijven_formulier_id" integer,
  	"inschrijven_bedankt" varchar DEFAULT 'Bedankt! Je staat op de lijst.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordeon_vragen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"vraag" varchar,
  	"antwoord" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordeon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"achtergrond" "enum__pages_v_blocks_faq_accordeon_achtergrond" DEFAULT 'papier',
  	"anker" varchar,
  	"titel" varchar DEFAULT 'Veelgestelde vragen.',
  	"tekst" varchar,
  	"bron" "enum__pages_v_blocks_faq_accordeon_bron" DEFAULT 'handmatig',
  	"categorie_id" integer,
  	"max_aantal" numeric DEFAULT 7,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_formulier_sectie" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"achtergrond" "enum__pages_v_blocks_formulier_sectie_achtergrond" DEFAULT 'wit',
  	"anker" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"locatie_labels" "enum__pages_v_blocks_formulier_sectie_locatie_labels" DEFAULT 'geen',
  	"formulier_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_waardekaart_v_info_kaarten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_waardekaart_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"achtergrond" "enum__waardekaart_v_achtergrond" DEFAULT 'wit',
  	"anker" varchar,
  	"titel" varchar,
  	"tekst" varchar,
  	"wizard_stap1" varchar DEFAULT 'Keuze',
  	"wizard_stap2" varchar DEFAULT 'Gegevens',
  	"wizard_stap3" varchar DEFAULT 'Bevestiging',
  	"wizard_keuze_titel" varchar DEFAULT 'Kies het tegoed per kaart.',
  	"wizard_bedragen" varchar DEFAULT '25, 50, 100, 200, 500',
  	"wizard_standaard_bedrag" varchar DEFAULT '100',
  	"wizard_aantal_label" varchar DEFAULT 'Aantal kaarten',
  	"wizard_totaal_label" varchar DEFAULT 'Totaal',
  	"wizard_volgende_label" varchar DEFAULT 'Ga naar gegevens',
  	"wizard_gegevens_titel" varchar DEFAULT 'Bedrijfsgegevens.',
  	"wizard_terug_label" varchar DEFAULT 'Terug',
  	"wizard_bevestig_label" varchar DEFAULT 'Naar bevestiging',
  	"wizard_succes_titel" varchar DEFAULT 'Bestelling ontvangen!',
  	"wizard_succes_tekst" varchar DEFAULT '{aantal}x Waardekaart van € {bedrag} – totaal € {totaal}.
  Factuur en kaartgegevens worden gestuurd naar {email}.',
  	"formulier_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_kaart_labels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tekst" varchar
  );
  
  CREATE TABLE "_locations_v_version_kaart_labels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tekst" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "forms_blocks_locatie_keuze" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT 'locatie' NOT NULL,
  	"label" varchar DEFAULT 'Locatie',
  	"width" numeric,
  	"placeholder" varchar DEFAULT 'Kies locatie',
  	"bron" "enum_forms_blocks_locatie_keuze_bron" DEFAULT 'alle',
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_kolommen_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_kolommen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar NOT NULL
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "locations_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "locations_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "locations" ADD COLUMN "abonnementen" boolean;
  ALTER TABLE "locations" ADD COLUMN "parking_pass" boolean;
  ALTER TABLE "_locations_v" ADD COLUMN "version_abonnementen" boolean;
  ALTER TABLE "_locations_v" ADD COLUMN "version_parking_pass" boolean;
  ALTER TABLE "evenementen" ADD COLUMN "tagline" varchar;
  ALTER TABLE "evenementen" ADD COLUMN "plaats" varchar;
  ALTER TABLE "evenementen" ADD COLUMN "link" varchar;
  ALTER TABLE "_evenementen_v" ADD COLUMN "version_tagline" varchar;
  ALTER TABLE "_evenementen_v" ADD COLUMN "version_plaats" varchar;
  ALTER TABLE "_evenementen_v" ADD COLUMN "version_link" varchar;
  ALTER TABLE "forms_blocks_email" ADD COLUMN "placeholder" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN "placeholder" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "placeholder" varchar;
  ALTER TABLE "header" ADD COLUMN "telefoon" varchar;
  ALTER TABLE "header" ADD COLUMN "account_url" varchar;
  ALTER TABLE "header" ADD COLUMN "knop_label" varchar DEFAULT 'Direct reserveren';
  ALTER TABLE "header" ADD COLUMN "knop_url" varchar DEFAULT '/parkeren';
  ALTER TABLE "footer" ADD COLUMN "tekst" varchar;
  ALTER TABLE "footer" ADD COLUMN "onderregel_links" varchar DEFAULT 'ParkingYou {jaar} - The other way of parking.';
  ALTER TABLE "footer" ADD COLUMN "onderregel_rechts" varchar;
  ALTER TABLE "pages_blocks_home_hero_snelle_steden" ADD CONSTRAINT "pages_blocks_home_hero_snelle_steden_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_cijfers" ADD CONSTRAINT "pages_blocks_home_hero_cijfers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_afbeelding_id_media_id_fk" FOREIGN KEY ("afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pagina_hero_knoppen" ADD CONSTRAINT "pages_blocks_pagina_hero_knoppen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pagina_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pagina_hero_paneel_regels" ADD CONSTRAINT "pages_blocks_pagina_hero_paneel_regels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pagina_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pagina_hero" ADD CONSTRAINT "pages_blocks_pagina_hero_afbeelding_id_media_id_fk" FOREIGN KEY ("afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pagina_hero" ADD CONSTRAINT "pages_blocks_pagina_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pass_hero_opties" ADD CONSTRAINT "pages_blocks_pass_hero_opties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pass_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pass_hero" ADD CONSTRAINT "pages_blocks_pass_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_keuze_producten" ADD CONSTRAINT "pages_blocks_product_keuze_producten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_keuze"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_keuze" ADD CONSTRAINT "pages_blocks_product_keuze_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_locatie_overzicht" ADD CONSTRAINT "pages_blocks_locatie_overzicht_stad_id_steden_id_fk" FOREIGN KEY ("stad_id") REFERENCES "public"."steden"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_locatie_overzicht" ADD CONSTRAINT "pages_blocks_locatie_overzicht_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evenementen_overzicht" ADD CONSTRAINT "pages_blocks_evenementen_overzicht_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_info_banden_kaarten" ADD CONSTRAINT "pages_blocks_info_banden_kaarten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_info_banden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_info_banden" ADD CONSTRAINT "pages_blocks_info_banden_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stappen_sectie_stappen" ADD CONSTRAINT "pages_blocks_stappen_sectie_stappen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stappen_sectie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stappen_sectie" ADD CONSTRAINT "pages_blocks_stappen_sectie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_voordelen_split_voordelen" ADD CONSTRAINT "pages_blocks_voordelen_split_voordelen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_voordelen_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_voordelen_split" ADD CONSTRAINT "pages_blocks_voordelen_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_verhaal_kolommen_kolommen" ADD CONSTRAINT "pages_blocks_verhaal_kolommen_kolommen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_verhaal_kolommen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_verhaal_kolommen" ADD CONSTRAINT "pages_blocks_verhaal_kolommen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steden_strip_steden" ADD CONSTRAINT "pages_blocks_steden_strip_steden_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steden_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steden_strip" ADD CONSTRAINT "pages_blocks_steden_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_app_callout_features" ADD CONSTRAINT "pages_blocks_app_callout_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_app_callout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_app_callout_knoppen" ADD CONSTRAINT "pages_blocks_app_callout_knoppen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_app_callout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_app_callout" ADD CONSTRAINT "pages_blocks_app_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_banner_cta" ADD CONSTRAINT "pages_blocks_banner_cta_inschrijven_formulier_id_forms_id_fk" FOREIGN KEY ("inschrijven_formulier_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_banner_cta" ADD CONSTRAINT "pages_blocks_banner_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordeon_vragen" ADD CONSTRAINT "pages_blocks_faq_accordeon_vragen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_accordeon"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordeon" ADD CONSTRAINT "pages_blocks_faq_accordeon_categorie_id_faq_categorieen_id_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."faq_categorieen"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordeon" ADD CONSTRAINT "pages_blocks_faq_accordeon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_formulier_sectie" ADD CONSTRAINT "pages_blocks_formulier_sectie_formulier_id_forms_id_fk" FOREIGN KEY ("formulier_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_formulier_sectie" ADD CONSTRAINT "pages_blocks_formulier_sectie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "waardekaart_info_kaarten" ADD CONSTRAINT "waardekaart_info_kaarten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."waardekaart"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "waardekaart" ADD CONSTRAINT "waardekaart_formulier_id_forms_id_fk" FOREIGN KEY ("formulier_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "waardekaart" ADD CONSTRAINT "waardekaart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero_snelle_steden" ADD CONSTRAINT "_pages_v_blocks_home_hero_snelle_steden_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero_cijfers" ADD CONSTRAINT "_pages_v_blocks_home_hero_cijfers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero" ADD CONSTRAINT "_pages_v_blocks_home_hero_afbeelding_id_media_id_fk" FOREIGN KEY ("afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero" ADD CONSTRAINT "_pages_v_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pagina_hero_knoppen" ADD CONSTRAINT "_pages_v_blocks_pagina_hero_knoppen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pagina_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pagina_hero_paneel_regels" ADD CONSTRAINT "_pages_v_blocks_pagina_hero_paneel_regels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pagina_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pagina_hero" ADD CONSTRAINT "_pages_v_blocks_pagina_hero_afbeelding_id_media_id_fk" FOREIGN KEY ("afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pagina_hero" ADD CONSTRAINT "_pages_v_blocks_pagina_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pass_hero_opties" ADD CONSTRAINT "_pages_v_blocks_pass_hero_opties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pass_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pass_hero" ADD CONSTRAINT "_pages_v_blocks_pass_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_keuze_producten" ADD CONSTRAINT "_pages_v_blocks_product_keuze_producten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_keuze"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_keuze" ADD CONSTRAINT "_pages_v_blocks_product_keuze_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_locatie_overzicht" ADD CONSTRAINT "_pages_v_blocks_locatie_overzicht_stad_id_steden_id_fk" FOREIGN KEY ("stad_id") REFERENCES "public"."steden"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_locatie_overzicht" ADD CONSTRAINT "_pages_v_blocks_locatie_overzicht_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evenementen_overzicht" ADD CONSTRAINT "_pages_v_blocks_evenementen_overzicht_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_banden_kaarten" ADD CONSTRAINT "_pages_v_blocks_info_banden_kaarten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_info_banden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_banden" ADD CONSTRAINT "_pages_v_blocks_info_banden_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stappen_sectie_stappen" ADD CONSTRAINT "_pages_v_blocks_stappen_sectie_stappen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stappen_sectie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stappen_sectie" ADD CONSTRAINT "_pages_v_blocks_stappen_sectie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_voordelen_split_voordelen" ADD CONSTRAINT "_pages_v_blocks_voordelen_split_voordelen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_voordelen_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_voordelen_split" ADD CONSTRAINT "_pages_v_blocks_voordelen_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_verhaal_kolommen_kolommen" ADD CONSTRAINT "_pages_v_blocks_verhaal_kolommen_kolommen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_verhaal_kolommen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_verhaal_kolommen" ADD CONSTRAINT "_pages_v_blocks_verhaal_kolommen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_steden_strip_steden" ADD CONSTRAINT "_pages_v_blocks_steden_strip_steden_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_steden_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_steden_strip" ADD CONSTRAINT "_pages_v_blocks_steden_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_app_callout_features" ADD CONSTRAINT "_pages_v_blocks_app_callout_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_app_callout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_app_callout_knoppen" ADD CONSTRAINT "_pages_v_blocks_app_callout_knoppen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_app_callout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_app_callout" ADD CONSTRAINT "_pages_v_blocks_app_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner_cta" ADD CONSTRAINT "_pages_v_blocks_banner_cta_inschrijven_formulier_id_forms_id_fk" FOREIGN KEY ("inschrijven_formulier_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner_cta" ADD CONSTRAINT "_pages_v_blocks_banner_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordeon_vragen" ADD CONSTRAINT "_pages_v_blocks_faq_accordeon_vragen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_accordeon"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordeon" ADD CONSTRAINT "_pages_v_blocks_faq_accordeon_categorie_id_faq_categorieen_id_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."faq_categorieen"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordeon" ADD CONSTRAINT "_pages_v_blocks_faq_accordeon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_formulier_sectie" ADD CONSTRAINT "_pages_v_blocks_formulier_sectie_formulier_id_forms_id_fk" FOREIGN KEY ("formulier_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_formulier_sectie" ADD CONSTRAINT "_pages_v_blocks_formulier_sectie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_waardekaart_v_info_kaarten" ADD CONSTRAINT "_waardekaart_v_info_kaarten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_waardekaart_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_waardekaart_v" ADD CONSTRAINT "_waardekaart_v_formulier_id_forms_id_fk" FOREIGN KEY ("formulier_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_waardekaart_v" ADD CONSTRAINT "_waardekaart_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_kaart_labels" ADD CONSTRAINT "locations_kaart_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_kaart_labels" ADD CONSTRAINT "_locations_v_version_kaart_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_locatie_keuze" ADD CONSTRAINT "forms_blocks_locatie_keuze_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_kolommen_links" ADD CONSTRAINT "footer_kolommen_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_kolommen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_kolommen" ADD CONSTRAINT "footer_kolommen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_home_hero_snelle_steden_order_idx" ON "pages_blocks_home_hero_snelle_steden" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_snelle_steden_parent_id_idx" ON "pages_blocks_home_hero_snelle_steden" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_cijfers_order_idx" ON "pages_blocks_home_hero_cijfers" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_cijfers_parent_id_idx" ON "pages_blocks_home_hero_cijfers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_order_idx" ON "pages_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_parent_id_idx" ON "pages_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_path_idx" ON "pages_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_hero_afbeelding_idx" ON "pages_blocks_home_hero" USING btree ("afbeelding_id");
  CREATE INDEX "pages_blocks_pagina_hero_knoppen_order_idx" ON "pages_blocks_pagina_hero_knoppen" USING btree ("_order");
  CREATE INDEX "pages_blocks_pagina_hero_knoppen_parent_id_idx" ON "pages_blocks_pagina_hero_knoppen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pagina_hero_paneel_regels_order_idx" ON "pages_blocks_pagina_hero_paneel_regels" USING btree ("_order");
  CREATE INDEX "pages_blocks_pagina_hero_paneel_regels_parent_id_idx" ON "pages_blocks_pagina_hero_paneel_regels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pagina_hero_order_idx" ON "pages_blocks_pagina_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_pagina_hero_parent_id_idx" ON "pages_blocks_pagina_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pagina_hero_path_idx" ON "pages_blocks_pagina_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_pagina_hero_afbeelding_idx" ON "pages_blocks_pagina_hero" USING btree ("afbeelding_id");
  CREATE INDEX "pages_blocks_pass_hero_opties_order_idx" ON "pages_blocks_pass_hero_opties" USING btree ("_order");
  CREATE INDEX "pages_blocks_pass_hero_opties_parent_id_idx" ON "pages_blocks_pass_hero_opties" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pass_hero_order_idx" ON "pages_blocks_pass_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_pass_hero_parent_id_idx" ON "pages_blocks_pass_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pass_hero_path_idx" ON "pages_blocks_pass_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_keuze_producten_order_idx" ON "pages_blocks_product_keuze_producten" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_keuze_producten_parent_id_idx" ON "pages_blocks_product_keuze_producten" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_keuze_order_idx" ON "pages_blocks_product_keuze" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_keuze_parent_id_idx" ON "pages_blocks_product_keuze" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_keuze_path_idx" ON "pages_blocks_product_keuze" USING btree ("_path");
  CREATE INDEX "pages_blocks_locatie_overzicht_order_idx" ON "pages_blocks_locatie_overzicht" USING btree ("_order");
  CREATE INDEX "pages_blocks_locatie_overzicht_parent_id_idx" ON "pages_blocks_locatie_overzicht" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_locatie_overzicht_path_idx" ON "pages_blocks_locatie_overzicht" USING btree ("_path");
  CREATE INDEX "pages_blocks_locatie_overzicht_stad_idx" ON "pages_blocks_locatie_overzicht" USING btree ("stad_id");
  CREATE INDEX "pages_blocks_evenementen_overzicht_order_idx" ON "pages_blocks_evenementen_overzicht" USING btree ("_order");
  CREATE INDEX "pages_blocks_evenementen_overzicht_parent_id_idx" ON "pages_blocks_evenementen_overzicht" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_evenementen_overzicht_path_idx" ON "pages_blocks_evenementen_overzicht" USING btree ("_path");
  CREATE INDEX "pages_blocks_info_banden_kaarten_order_idx" ON "pages_blocks_info_banden_kaarten" USING btree ("_order");
  CREATE INDEX "pages_blocks_info_banden_kaarten_parent_id_idx" ON "pages_blocks_info_banden_kaarten" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_info_banden_order_idx" ON "pages_blocks_info_banden" USING btree ("_order");
  CREATE INDEX "pages_blocks_info_banden_parent_id_idx" ON "pages_blocks_info_banden" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_info_banden_path_idx" ON "pages_blocks_info_banden" USING btree ("_path");
  CREATE INDEX "pages_blocks_stappen_sectie_stappen_order_idx" ON "pages_blocks_stappen_sectie_stappen" USING btree ("_order");
  CREATE INDEX "pages_blocks_stappen_sectie_stappen_parent_id_idx" ON "pages_blocks_stappen_sectie_stappen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stappen_sectie_order_idx" ON "pages_blocks_stappen_sectie" USING btree ("_order");
  CREATE INDEX "pages_blocks_stappen_sectie_parent_id_idx" ON "pages_blocks_stappen_sectie" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stappen_sectie_path_idx" ON "pages_blocks_stappen_sectie" USING btree ("_path");
  CREATE INDEX "pages_blocks_voordelen_split_voordelen_order_idx" ON "pages_blocks_voordelen_split_voordelen" USING btree ("_order");
  CREATE INDEX "pages_blocks_voordelen_split_voordelen_parent_id_idx" ON "pages_blocks_voordelen_split_voordelen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_voordelen_split_order_idx" ON "pages_blocks_voordelen_split" USING btree ("_order");
  CREATE INDEX "pages_blocks_voordelen_split_parent_id_idx" ON "pages_blocks_voordelen_split" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_voordelen_split_path_idx" ON "pages_blocks_voordelen_split" USING btree ("_path");
  CREATE INDEX "pages_blocks_verhaal_kolommen_kolommen_order_idx" ON "pages_blocks_verhaal_kolommen_kolommen" USING btree ("_order");
  CREATE INDEX "pages_blocks_verhaal_kolommen_kolommen_parent_id_idx" ON "pages_blocks_verhaal_kolommen_kolommen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_verhaal_kolommen_order_idx" ON "pages_blocks_verhaal_kolommen" USING btree ("_order");
  CREATE INDEX "pages_blocks_verhaal_kolommen_parent_id_idx" ON "pages_blocks_verhaal_kolommen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_verhaal_kolommen_path_idx" ON "pages_blocks_verhaal_kolommen" USING btree ("_path");
  CREATE INDEX "pages_blocks_steden_strip_steden_order_idx" ON "pages_blocks_steden_strip_steden" USING btree ("_order");
  CREATE INDEX "pages_blocks_steden_strip_steden_parent_id_idx" ON "pages_blocks_steden_strip_steden" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steden_strip_order_idx" ON "pages_blocks_steden_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_steden_strip_parent_id_idx" ON "pages_blocks_steden_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steden_strip_path_idx" ON "pages_blocks_steden_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_app_callout_features_order_idx" ON "pages_blocks_app_callout_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_app_callout_features_parent_id_idx" ON "pages_blocks_app_callout_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_app_callout_knoppen_order_idx" ON "pages_blocks_app_callout_knoppen" USING btree ("_order");
  CREATE INDEX "pages_blocks_app_callout_knoppen_parent_id_idx" ON "pages_blocks_app_callout_knoppen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_app_callout_order_idx" ON "pages_blocks_app_callout" USING btree ("_order");
  CREATE INDEX "pages_blocks_app_callout_parent_id_idx" ON "pages_blocks_app_callout" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_app_callout_path_idx" ON "pages_blocks_app_callout" USING btree ("_path");
  CREATE INDEX "pages_blocks_banner_cta_order_idx" ON "pages_blocks_banner_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_banner_cta_parent_id_idx" ON "pages_blocks_banner_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_banner_cta_path_idx" ON "pages_blocks_banner_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_banner_cta_inschrijven_inschrijven_formulie_idx" ON "pages_blocks_banner_cta" USING btree ("inschrijven_formulier_id");
  CREATE INDEX "pages_blocks_faq_accordeon_vragen_order_idx" ON "pages_blocks_faq_accordeon_vragen" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordeon_vragen_parent_id_idx" ON "pages_blocks_faq_accordeon_vragen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordeon_order_idx" ON "pages_blocks_faq_accordeon" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordeon_parent_id_idx" ON "pages_blocks_faq_accordeon" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordeon_path_idx" ON "pages_blocks_faq_accordeon" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_accordeon_categorie_idx" ON "pages_blocks_faq_accordeon" USING btree ("categorie_id");
  CREATE INDEX "pages_blocks_formulier_sectie_order_idx" ON "pages_blocks_formulier_sectie" USING btree ("_order");
  CREATE INDEX "pages_blocks_formulier_sectie_parent_id_idx" ON "pages_blocks_formulier_sectie" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_formulier_sectie_path_idx" ON "pages_blocks_formulier_sectie" USING btree ("_path");
  CREATE INDEX "pages_blocks_formulier_sectie_formulier_idx" ON "pages_blocks_formulier_sectie" USING btree ("formulier_id");
  CREATE INDEX "waardekaart_info_kaarten_order_idx" ON "waardekaart_info_kaarten" USING btree ("_order");
  CREATE INDEX "waardekaart_info_kaarten_parent_id_idx" ON "waardekaart_info_kaarten" USING btree ("_parent_id");
  CREATE INDEX "waardekaart_order_idx" ON "waardekaart" USING btree ("_order");
  CREATE INDEX "waardekaart_parent_id_idx" ON "waardekaart" USING btree ("_parent_id");
  CREATE INDEX "waardekaart_path_idx" ON "waardekaart" USING btree ("_path");
  CREATE INDEX "waardekaart_formulier_idx" ON "waardekaart" USING btree ("formulier_id");
  CREATE INDEX "_pages_v_blocks_home_hero_snelle_steden_order_idx" ON "_pages_v_blocks_home_hero_snelle_steden" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_hero_snelle_steden_parent_id_idx" ON "_pages_v_blocks_home_hero_snelle_steden" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_cijfers_order_idx" ON "_pages_v_blocks_home_hero_cijfers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_hero_cijfers_parent_id_idx" ON "_pages_v_blocks_home_hero_cijfers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_order_idx" ON "_pages_v_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_hero_parent_id_idx" ON "_pages_v_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_path_idx" ON "_pages_v_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_hero_afbeelding_idx" ON "_pages_v_blocks_home_hero" USING btree ("afbeelding_id");
  CREATE INDEX "_pages_v_blocks_pagina_hero_knoppen_order_idx" ON "_pages_v_blocks_pagina_hero_knoppen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pagina_hero_knoppen_parent_id_idx" ON "_pages_v_blocks_pagina_hero_knoppen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pagina_hero_paneel_regels_order_idx" ON "_pages_v_blocks_pagina_hero_paneel_regels" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pagina_hero_paneel_regels_parent_id_idx" ON "_pages_v_blocks_pagina_hero_paneel_regels" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pagina_hero_order_idx" ON "_pages_v_blocks_pagina_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pagina_hero_parent_id_idx" ON "_pages_v_blocks_pagina_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pagina_hero_path_idx" ON "_pages_v_blocks_pagina_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pagina_hero_afbeelding_idx" ON "_pages_v_blocks_pagina_hero" USING btree ("afbeelding_id");
  CREATE INDEX "_pages_v_blocks_pass_hero_opties_order_idx" ON "_pages_v_blocks_pass_hero_opties" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pass_hero_opties_parent_id_idx" ON "_pages_v_blocks_pass_hero_opties" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pass_hero_order_idx" ON "_pages_v_blocks_pass_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pass_hero_parent_id_idx" ON "_pages_v_blocks_pass_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pass_hero_path_idx" ON "_pages_v_blocks_pass_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_keuze_producten_order_idx" ON "_pages_v_blocks_product_keuze_producten" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_keuze_producten_parent_id_idx" ON "_pages_v_blocks_product_keuze_producten" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_keuze_order_idx" ON "_pages_v_blocks_product_keuze" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_keuze_parent_id_idx" ON "_pages_v_blocks_product_keuze" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_keuze_path_idx" ON "_pages_v_blocks_product_keuze" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_locatie_overzicht_order_idx" ON "_pages_v_blocks_locatie_overzicht" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_locatie_overzicht_parent_id_idx" ON "_pages_v_blocks_locatie_overzicht" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_locatie_overzicht_path_idx" ON "_pages_v_blocks_locatie_overzicht" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_locatie_overzicht_stad_idx" ON "_pages_v_blocks_locatie_overzicht" USING btree ("stad_id");
  CREATE INDEX "_pages_v_blocks_evenementen_overzicht_order_idx" ON "_pages_v_blocks_evenementen_overzicht" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_evenementen_overzicht_parent_id_idx" ON "_pages_v_blocks_evenementen_overzicht" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_evenementen_overzicht_path_idx" ON "_pages_v_blocks_evenementen_overzicht" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_info_banden_kaarten_order_idx" ON "_pages_v_blocks_info_banden_kaarten" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_info_banden_kaarten_parent_id_idx" ON "_pages_v_blocks_info_banden_kaarten" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_info_banden_order_idx" ON "_pages_v_blocks_info_banden" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_info_banden_parent_id_idx" ON "_pages_v_blocks_info_banden" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_info_banden_path_idx" ON "_pages_v_blocks_info_banden" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stappen_sectie_stappen_order_idx" ON "_pages_v_blocks_stappen_sectie_stappen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stappen_sectie_stappen_parent_id_idx" ON "_pages_v_blocks_stappen_sectie_stappen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stappen_sectie_order_idx" ON "_pages_v_blocks_stappen_sectie" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stappen_sectie_parent_id_idx" ON "_pages_v_blocks_stappen_sectie" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stappen_sectie_path_idx" ON "_pages_v_blocks_stappen_sectie" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_voordelen_split_voordelen_order_idx" ON "_pages_v_blocks_voordelen_split_voordelen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_voordelen_split_voordelen_parent_id_idx" ON "_pages_v_blocks_voordelen_split_voordelen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_voordelen_split_order_idx" ON "_pages_v_blocks_voordelen_split" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_voordelen_split_parent_id_idx" ON "_pages_v_blocks_voordelen_split" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_voordelen_split_path_idx" ON "_pages_v_blocks_voordelen_split" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_verhaal_kolommen_kolommen_order_idx" ON "_pages_v_blocks_verhaal_kolommen_kolommen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_verhaal_kolommen_kolommen_parent_id_idx" ON "_pages_v_blocks_verhaal_kolommen_kolommen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_verhaal_kolommen_order_idx" ON "_pages_v_blocks_verhaal_kolommen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_verhaal_kolommen_parent_id_idx" ON "_pages_v_blocks_verhaal_kolommen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_verhaal_kolommen_path_idx" ON "_pages_v_blocks_verhaal_kolommen" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_steden_strip_steden_order_idx" ON "_pages_v_blocks_steden_strip_steden" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_steden_strip_steden_parent_id_idx" ON "_pages_v_blocks_steden_strip_steden" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_steden_strip_order_idx" ON "_pages_v_blocks_steden_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_steden_strip_parent_id_idx" ON "_pages_v_blocks_steden_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_steden_strip_path_idx" ON "_pages_v_blocks_steden_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_app_callout_features_order_idx" ON "_pages_v_blocks_app_callout_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_app_callout_features_parent_id_idx" ON "_pages_v_blocks_app_callout_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_app_callout_knoppen_order_idx" ON "_pages_v_blocks_app_callout_knoppen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_app_callout_knoppen_parent_id_idx" ON "_pages_v_blocks_app_callout_knoppen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_app_callout_order_idx" ON "_pages_v_blocks_app_callout" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_app_callout_parent_id_idx" ON "_pages_v_blocks_app_callout" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_app_callout_path_idx" ON "_pages_v_blocks_app_callout" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_banner_cta_order_idx" ON "_pages_v_blocks_banner_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_banner_cta_parent_id_idx" ON "_pages_v_blocks_banner_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_banner_cta_path_idx" ON "_pages_v_blocks_banner_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_banner_cta_inschrijven_inschrijven_formu_idx" ON "_pages_v_blocks_banner_cta" USING btree ("inschrijven_formulier_id");
  CREATE INDEX "_pages_v_blocks_faq_accordeon_vragen_order_idx" ON "_pages_v_blocks_faq_accordeon_vragen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordeon_vragen_parent_id_idx" ON "_pages_v_blocks_faq_accordeon_vragen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordeon_order_idx" ON "_pages_v_blocks_faq_accordeon" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordeon_parent_id_idx" ON "_pages_v_blocks_faq_accordeon" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordeon_path_idx" ON "_pages_v_blocks_faq_accordeon" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_accordeon_categorie_idx" ON "_pages_v_blocks_faq_accordeon" USING btree ("categorie_id");
  CREATE INDEX "_pages_v_blocks_formulier_sectie_order_idx" ON "_pages_v_blocks_formulier_sectie" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_formulier_sectie_parent_id_idx" ON "_pages_v_blocks_formulier_sectie" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_formulier_sectie_path_idx" ON "_pages_v_blocks_formulier_sectie" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_formulier_sectie_formulier_idx" ON "_pages_v_blocks_formulier_sectie" USING btree ("formulier_id");
  CREATE INDEX "_waardekaart_v_info_kaarten_order_idx" ON "_waardekaart_v_info_kaarten" USING btree ("_order");
  CREATE INDEX "_waardekaart_v_info_kaarten_parent_id_idx" ON "_waardekaart_v_info_kaarten" USING btree ("_parent_id");
  CREATE INDEX "_waardekaart_v_order_idx" ON "_waardekaart_v" USING btree ("_order");
  CREATE INDEX "_waardekaart_v_parent_id_idx" ON "_waardekaart_v" USING btree ("_parent_id");
  CREATE INDEX "_waardekaart_v_path_idx" ON "_waardekaart_v" USING btree ("_path");
  CREATE INDEX "_waardekaart_v_formulier_idx" ON "_waardekaart_v" USING btree ("formulier_id");
  CREATE INDEX "locations_kaart_labels_order_idx" ON "locations_kaart_labels" USING btree ("_order");
  CREATE INDEX "locations_kaart_labels_parent_id_idx" ON "locations_kaart_labels" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_kaart_labels_order_idx" ON "_locations_v_version_kaart_labels" USING btree ("_order");
  CREATE INDEX "_locations_v_version_kaart_labels_parent_id_idx" ON "_locations_v_version_kaart_labels" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_locatie_keuze_order_idx" ON "forms_blocks_locatie_keuze" USING btree ("_order");
  CREATE INDEX "forms_blocks_locatie_keuze_parent_id_idx" ON "forms_blocks_locatie_keuze" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_locatie_keuze_path_idx" ON "forms_blocks_locatie_keuze" USING btree ("_path");
  CREATE INDEX "footer_kolommen_links_order_idx" ON "footer_kolommen_links" USING btree ("_order");
  CREATE INDEX "footer_kolommen_links_parent_id_idx" ON "footer_kolommen_links" USING btree ("_parent_id");
  CREATE INDEX "footer_kolommen_order_idx" ON "footer_kolommen" USING btree ("_order");
  CREATE INDEX "footer_kolommen_parent_id_idx" ON "footer_kolommen" USING btree ("_parent_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_locations_id_idx" ON "pages_rels" USING btree ("locations_id");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX "_pages_v_rels_locations_id_idx" ON "_pages_v_rels" USING btree ("locations_id");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_home_hero_snelle_steden" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_home_hero_cijfers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_home_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pagina_hero_knoppen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pagina_hero_paneel_regels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pagina_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pass_hero_opties" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pass_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_keuze_producten" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_keuze" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_locatie_overzicht" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evenementen_overzicht" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_info_banden_kaarten" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_info_banden" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stappen_sectie_stappen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stappen_sectie" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_voordelen_split_voordelen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_voordelen_split" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_verhaal_kolommen_kolommen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_verhaal_kolommen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_steden_strip_steden" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_steden_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_app_callout_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_app_callout_knoppen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_app_callout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_banner_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_accordeon_vragen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_accordeon" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_formulier_sectie" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "waardekaart_info_kaarten" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "waardekaart" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_home_hero_snelle_steden" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_home_hero_cijfers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_home_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pagina_hero_knoppen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pagina_hero_paneel_regels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pagina_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pass_hero_opties" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pass_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_keuze_producten" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_keuze" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_locatie_overzicht" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evenementen_overzicht" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_info_banden_kaarten" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_info_banden" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stappen_sectie_stappen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stappen_sectie" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_voordelen_split_voordelen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_voordelen_split" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_verhaal_kolommen_kolommen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_verhaal_kolommen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_steden_strip_steden" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_steden_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_app_callout_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_app_callout_knoppen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_app_callout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_banner_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_accordeon_vragen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_accordeon" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_formulier_sectie" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_waardekaart_v_info_kaarten" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_waardekaart_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_kaart_labels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_kaart_labels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_locatie_keuze" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_kolommen_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_kolommen" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_home_hero_snelle_steden" CASCADE;
  DROP TABLE "pages_blocks_home_hero_cijfers" CASCADE;
  DROP TABLE "pages_blocks_home_hero" CASCADE;
  DROP TABLE "pages_blocks_pagina_hero_knoppen" CASCADE;
  DROP TABLE "pages_blocks_pagina_hero_paneel_regels" CASCADE;
  DROP TABLE "pages_blocks_pagina_hero" CASCADE;
  DROP TABLE "pages_blocks_pass_hero_opties" CASCADE;
  DROP TABLE "pages_blocks_pass_hero" CASCADE;
  DROP TABLE "pages_blocks_product_keuze_producten" CASCADE;
  DROP TABLE "pages_blocks_product_keuze" CASCADE;
  DROP TABLE "pages_blocks_locatie_overzicht" CASCADE;
  DROP TABLE "pages_blocks_evenementen_overzicht" CASCADE;
  DROP TABLE "pages_blocks_info_banden_kaarten" CASCADE;
  DROP TABLE "pages_blocks_info_banden" CASCADE;
  DROP TABLE "pages_blocks_stappen_sectie_stappen" CASCADE;
  DROP TABLE "pages_blocks_stappen_sectie" CASCADE;
  DROP TABLE "pages_blocks_voordelen_split_voordelen" CASCADE;
  DROP TABLE "pages_blocks_voordelen_split" CASCADE;
  DROP TABLE "pages_blocks_verhaal_kolommen_kolommen" CASCADE;
  DROP TABLE "pages_blocks_verhaal_kolommen" CASCADE;
  DROP TABLE "pages_blocks_steden_strip_steden" CASCADE;
  DROP TABLE "pages_blocks_steden_strip" CASCADE;
  DROP TABLE "pages_blocks_app_callout_features" CASCADE;
  DROP TABLE "pages_blocks_app_callout_knoppen" CASCADE;
  DROP TABLE "pages_blocks_app_callout" CASCADE;
  DROP TABLE "pages_blocks_banner_cta" CASCADE;
  DROP TABLE "pages_blocks_faq_accordeon_vragen" CASCADE;
  DROP TABLE "pages_blocks_faq_accordeon" CASCADE;
  DROP TABLE "pages_blocks_formulier_sectie" CASCADE;
  DROP TABLE "waardekaart_info_kaarten" CASCADE;
  DROP TABLE "waardekaart" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero_snelle_steden" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero_cijfers" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_pagina_hero_knoppen" CASCADE;
  DROP TABLE "_pages_v_blocks_pagina_hero_paneel_regels" CASCADE;
  DROP TABLE "_pages_v_blocks_pagina_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_pass_hero_opties" CASCADE;
  DROP TABLE "_pages_v_blocks_pass_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_product_keuze_producten" CASCADE;
  DROP TABLE "_pages_v_blocks_product_keuze" CASCADE;
  DROP TABLE "_pages_v_blocks_locatie_overzicht" CASCADE;
  DROP TABLE "_pages_v_blocks_evenementen_overzicht" CASCADE;
  DROP TABLE "_pages_v_blocks_info_banden_kaarten" CASCADE;
  DROP TABLE "_pages_v_blocks_info_banden" CASCADE;
  DROP TABLE "_pages_v_blocks_stappen_sectie_stappen" CASCADE;
  DROP TABLE "_pages_v_blocks_stappen_sectie" CASCADE;
  DROP TABLE "_pages_v_blocks_voordelen_split_voordelen" CASCADE;
  DROP TABLE "_pages_v_blocks_voordelen_split" CASCADE;
  DROP TABLE "_pages_v_blocks_verhaal_kolommen_kolommen" CASCADE;
  DROP TABLE "_pages_v_blocks_verhaal_kolommen" CASCADE;
  DROP TABLE "_pages_v_blocks_steden_strip_steden" CASCADE;
  DROP TABLE "_pages_v_blocks_steden_strip" CASCADE;
  DROP TABLE "_pages_v_blocks_app_callout_features" CASCADE;
  DROP TABLE "_pages_v_blocks_app_callout_knoppen" CASCADE;
  DROP TABLE "_pages_v_blocks_app_callout" CASCADE;
  DROP TABLE "_pages_v_blocks_banner_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordeon_vragen" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordeon" CASCADE;
  DROP TABLE "_pages_v_blocks_formulier_sectie" CASCADE;
  DROP TABLE "_waardekaart_v_info_kaarten" CASCADE;
  DROP TABLE "_waardekaart_v" CASCADE;
  DROP TABLE "locations_kaart_labels" CASCADE;
  DROP TABLE "_locations_v_version_kaart_labels" CASCADE;
  DROP TABLE "forms_blocks_locatie_keuze" CASCADE;
  DROP TABLE "footer_kolommen_links" CASCADE;
  DROP TABLE "footer_kolommen" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_locations_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_media_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_locations_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_media_fk";
  
  DROP INDEX "pages_rels_locations_id_idx";
  DROP INDEX "pages_rels_media_id_idx";
  DROP INDEX "_pages_v_rels_locations_id_idx";
  DROP INDEX "_pages_v_rels_media_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "locations_id";
  ALTER TABLE "pages_rels" DROP COLUMN "media_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "locations_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "media_id";
  ALTER TABLE "locations" DROP COLUMN "abonnementen";
  ALTER TABLE "locations" DROP COLUMN "parking_pass";
  ALTER TABLE "_locations_v" DROP COLUMN "version_abonnementen";
  ALTER TABLE "_locations_v" DROP COLUMN "version_parking_pass";
  ALTER TABLE "evenementen" DROP COLUMN "tagline";
  ALTER TABLE "evenementen" DROP COLUMN "plaats";
  ALTER TABLE "evenementen" DROP COLUMN "link";
  ALTER TABLE "_evenementen_v" DROP COLUMN "version_tagline";
  ALTER TABLE "_evenementen_v" DROP COLUMN "version_plaats";
  ALTER TABLE "_evenementen_v" DROP COLUMN "version_link";
  ALTER TABLE "forms_blocks_email" DROP COLUMN "placeholder";
  ALTER TABLE "forms_blocks_text" DROP COLUMN "placeholder";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN "placeholder";
  ALTER TABLE "header" DROP COLUMN "telefoon";
  ALTER TABLE "header" DROP COLUMN "account_url";
  ALTER TABLE "header" DROP COLUMN "knop_label";
  ALTER TABLE "header" DROP COLUMN "knop_url";
  ALTER TABLE "footer" DROP COLUMN "tekst";
  ALTER TABLE "footer" DROP COLUMN "onderregel_links";
  ALTER TABLE "footer" DROP COLUMN "onderregel_rechts";
  DROP TYPE "public"."enum_pages_blocks_pagina_hero_knoppen_stijl";
  DROP TYPE "public"."enum_pages_blocks_pagina_hero_knoppen_icoon";
  DROP TYPE "public"."enum_pages_blocks_pagina_hero_stijl";
  DROP TYPE "public"."enum_pages_blocks_pagina_hero_visual";
  DROP TYPE "public"."enum_pages_blocks_product_keuze_producten_icoon";
  DROP TYPE "public"."enum_pages_blocks_locatie_overzicht_achtergrond";
  DROP TYPE "public"."enum_pages_blocks_locatie_overzicht_bron";
  DROP TYPE "public"."enum_pages_blocks_evenementen_overzicht_achtergrond";
  DROP TYPE "public"."enum_pages_blocks_info_banden_achtergrond";
  DROP TYPE "public"."enum_pages_blocks_info_banden_stijl";
  DROP TYPE "public"."enum_pages_blocks_stappen_sectie_achtergrond";
  DROP TYPE "public"."enum_pages_blocks_stappen_sectie_stijl";
  DROP TYPE "public"."enum_pages_blocks_voordelen_split_voordelen_icoon";
  DROP TYPE "public"."enum_pages_blocks_verhaal_kolommen_kolommen_stijl";
  DROP TYPE "public"."enum_pages_blocks_verhaal_kolommen_achtergrond";
  DROP TYPE "public"."enum_pages_blocks_steden_strip_bron";
  DROP TYPE "public"."enum_pages_blocks_steden_strip_link_naar";
  DROP TYPE "public"."enum_pages_blocks_app_callout_features_icoon";
  DROP TYPE "public"."enum_pages_blocks_app_callout_knoppen_stijl";
  DROP TYPE "public"."enum_pages_blocks_app_callout_knoppen_icoon";
  DROP TYPE "public"."enum_pages_blocks_banner_cta_actie";
  DROP TYPE "public"."enum_pages_blocks_banner_cta_stijl";
  DROP TYPE "public"."enum_pages_blocks_banner_cta_icoon";
  DROP TYPE "public"."enum_pages_blocks_faq_accordeon_achtergrond";
  DROP TYPE "public"."enum_pages_blocks_faq_accordeon_bron";
  DROP TYPE "public"."enum_pages_blocks_formulier_sectie_achtergrond";
  DROP TYPE "public"."enum_pages_blocks_formulier_sectie_locatie_labels";
  DROP TYPE "public"."enum_waardekaart_achtergrond";
  DROP TYPE "public"."enum__pages_v_blocks_pagina_hero_knoppen_stijl";
  DROP TYPE "public"."enum__pages_v_blocks_pagina_hero_knoppen_icoon";
  DROP TYPE "public"."enum__pages_v_blocks_pagina_hero_stijl";
  DROP TYPE "public"."enum__pages_v_blocks_pagina_hero_visual";
  DROP TYPE "public"."enum__pages_v_blocks_product_keuze_producten_icoon";
  DROP TYPE "public"."enum__pages_v_blocks_locatie_overzicht_achtergrond";
  DROP TYPE "public"."enum__pages_v_blocks_locatie_overzicht_bron";
  DROP TYPE "public"."enum__pages_v_blocks_evenementen_overzicht_achtergrond";
  DROP TYPE "public"."enum__pages_v_blocks_info_banden_achtergrond";
  DROP TYPE "public"."enum__pages_v_blocks_info_banden_stijl";
  DROP TYPE "public"."enum__pages_v_blocks_stappen_sectie_achtergrond";
  DROP TYPE "public"."enum__pages_v_blocks_stappen_sectie_stijl";
  DROP TYPE "public"."enum__pages_v_blocks_voordelen_split_voordelen_icoon";
  DROP TYPE "public"."enum__pages_v_blocks_verhaal_kolommen_kolommen_stijl";
  DROP TYPE "public"."enum__pages_v_blocks_verhaal_kolommen_achtergrond";
  DROP TYPE "public"."enum__pages_v_blocks_steden_strip_bron";
  DROP TYPE "public"."enum__pages_v_blocks_steden_strip_link_naar";
  DROP TYPE "public"."enum__pages_v_blocks_app_callout_features_icoon";
  DROP TYPE "public"."enum__pages_v_blocks_app_callout_knoppen_stijl";
  DROP TYPE "public"."enum__pages_v_blocks_app_callout_knoppen_icoon";
  DROP TYPE "public"."enum__pages_v_blocks_banner_cta_actie";
  DROP TYPE "public"."enum__pages_v_blocks_banner_cta_stijl";
  DROP TYPE "public"."enum__pages_v_blocks_banner_cta_icoon";
  DROP TYPE "public"."enum__pages_v_blocks_faq_accordeon_achtergrond";
  DROP TYPE "public"."enum__pages_v_blocks_faq_accordeon_bron";
  DROP TYPE "public"."enum__pages_v_blocks_formulier_sectie_achtergrond";
  DROP TYPE "public"."enum__pages_v_blocks_formulier_sectie_locatie_labels";
  DROP TYPE "public"."enum__waardekaart_v_achtergrond";
  DROP TYPE "public"."enum_forms_blocks_locatie_keuze_bron";`)
}
