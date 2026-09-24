import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_usp_rij_items_icoon" AS ENUM('check', 'clock', 'shield', 'car', 'card', 'bolt');
  CREATE TYPE "public"."enum_pages_blocks_faq_blok_bron" AS ENUM('alles', 'categorie', 'handmatig');
  CREATE TYPE "public"."enum__pages_v_blocks_usp_rij_items_icoon" AS ENUM('check', 'clock', 'shield', 'car', 'card', 'bolt');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_blok_bron" AS ENUM('alles', 'categorie', 'handmatig');
  CREATE TYPE "public"."enum_steden_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_steden_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_steden_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_steden_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_steden_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_steden_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__steden_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__steden_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__steden_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__steden_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__steden_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__steden_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_locations_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_locations_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_locations_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_locations_soort" AS ENUM('Parkeerterrein', 'Parkeergarage', 'Ondergrondse garage', 'Parkeerdak');
  CREATE TYPE "public"."enum_locations_aeroparker_sync_sync_status" AS ENUM('ok', 'verouderd', 'vermist', 'fout');
  CREATE TYPE "public"."enum__locations_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__locations_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__locations_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__locations_v_version_soort" AS ENUM('Parkeerterrein', 'Parkeergarage', 'Ondergrondse garage', 'Parkeerdak');
  CREATE TYPE "public"."enum__locations_v_version_aeroparker_sync_sync_status" AS ENUM('ok', 'verouderd', 'vermist', 'fout');
  CREATE TYPE "public"."enum_pois_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pois_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pois_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pois_blocks_faq_blok_bron" AS ENUM('alles', 'categorie', 'handmatig');
  CREATE TYPE "public"."enum_pois_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pois_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pois_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pois_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pois_v_blocks_faq_blok_bron" AS ENUM('alles', 'categorie', 'handmatig');
  CREATE TYPE "public"."enum__pois_v_version_category" AS ENUM('restaurant', 'shop', 'hotel', 'attraction', 'transit', 'venue');
  CREATE TYPE "public"."enum__pois_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_nieuws_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__nieuws_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_evenementen_kleur" AS ENUM('orange', 'blue', 'aqua');
  CREATE TYPE "public"."enum_evenementen_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__evenementen_v_version_kleur" AS ENUM('orange', 'blue', 'aqua');
  CREATE TYPE "public"."enum__evenementen_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "pages_blocks_usp_rij_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"icoon" "enum_pages_blocks_usp_rij_items_icoon" DEFAULT 'check'
  );
  
  CREATE TABLE "pages_blocks_usp_rij" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_citaat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tekst" varchar,
  	"naam" varchar,
  	"functie" varchar,
  	"foto_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_blok" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Veelgestelde vragen',
  	"bron" "enum_pages_blocks_faq_blok_bron" DEFAULT 'alles',
  	"categorie_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_locatie_uitgelicht" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"locatie_id" integer,
  	"tekst" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_usp_rij_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"icoon" "enum__pages_v_blocks_usp_rij_items_icoon" DEFAULT 'check',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_usp_rij" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_citaat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tekst" varchar,
  	"naam" varchar,
  	"functie" varchar,
  	"foto_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_blok" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Veelgestelde vragen',
  	"bron" "enum__pages_v_blocks_faq_blok_bron" DEFAULT 'alles',
  	"categorie_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_locatie_uitgelicht" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"locatie_id" integer,
  	"tekst" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "steden_blocks_stad_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"intro" varchar,
  	"afbeelding_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "steden_blocks_stad_locaties_lijst" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lege_melding" varchar DEFAULT 'Er staan nog geen locaties in deze stad op de site.',
  	"block_name" varchar
  );
  
  CREATE TABLE "steden_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_steden_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_steden_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_steden_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "steden_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "steden_blocks_citaat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tekst" varchar,
  	"naam" varchar,
  	"functie" varchar,
  	"foto_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "steden_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_steden_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_steden_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "steden_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "steden" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"naam" varchar,
  	"slug" varchar,
  	"is_regio" boolean,
  	"provincie" varchar,
  	"coordinaten" geometry(Point),
  	"oude_cid" numeric,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_steden_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "steden_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_steden_v_blocks_stad_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"intro" varchar,
  	"afbeelding_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_steden_v_blocks_stad_locaties_lijst" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lege_melding" varchar DEFAULT 'Er staan nog geen locaties in deze stad op de site.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_steden_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__steden_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__steden_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__steden_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_steden_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_steden_v_blocks_citaat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tekst" varchar,
  	"naam" varchar,
  	"functie" varchar,
  	"foto_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_steden_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__steden_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__steden_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_steden_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_steden_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_naam" varchar,
  	"version_slug" varchar,
  	"version_is_regio" boolean,
  	"version_provincie" varchar,
  	"version_coordinaten" geometry(Point),
  	"version_oude_cid" numeric,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__steden_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_steden_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "locations_faciliteiten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tekst" varchar
  );
  
  CREATE TABLE "locations_betaalmogelijkheden" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tekst" varchar
  );
  
  CREATE TABLE "locations_pois_nabij" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"naam" varchar,
  	"soort" varchar,
  	"afstand" varchar
  );
  
  CREATE TABLE "locations_aeroparker_sync_tarieven" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"prijs" varchar
  );
  
  CREATE TABLE "locations_blocks_locatie_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"reserveer_label" varchar DEFAULT 'Reserveer nu',
  	"reserveer_url" varchar DEFAULT '/locaties',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_blocks_locatie_tarieven" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Tarieven overzicht',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_blocks_locatie_faciliteiten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Aanwezige faciliteiten',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_blocks_locatie_openingstijden" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Openingstijden',
  	"telefoon" varchar DEFAULT '085 4011647',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_blocks_locatie_pois_nabij" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Bezienswaardigheden & POI''s in de buurt',
  	"kaartbijschrift" varchar DEFAULT 'De kaart toont deze locatie en de looproute naar de bezienswaardigheden hierboven.',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_blocks_locatie_kaart_producten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel_voor" varchar DEFAULT 'Voordelig ',
  	"titel_nadruk" varchar DEFAULT 'vaker parkeren',
  	"titel_na" varchar DEFAULT ' hier.',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_blocks_locatie_evenementen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel_voor" varchar DEFAULT 'Evenementen ',
  	"titel_nadruk" varchar DEFAULT 'nabij',
  	"titel_na" varchar DEFAULT ' deze locatie.',
  	"tekst" varchar DEFAULT 'Reserveer al je parkeertickets voor aankomende evenementen in de buurt.',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_blocks_locatie_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Veelgestelde vragen',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_locations_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_locations_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_locations_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "locations_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_blocks_citaat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tekst" varchar,
  	"naam" varchar,
  	"functie" varchar,
  	"foto_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_oude_slugs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar
  );
  
  CREATE TABLE "_locations_v_version_faciliteiten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tekst" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_version_betaalmogelijkheden" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tekst" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_version_pois_nabij" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"naam" varchar,
  	"soort" varchar,
  	"afstand" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_version_aeroparker_sync_tarieven" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"prijs" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_blocks_locatie_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"reserveer_label" varchar DEFAULT 'Reserveer nu',
  	"reserveer_url" varchar DEFAULT '/locaties',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_locations_v_blocks_locatie_tarieven" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Tarieven overzicht',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_locations_v_blocks_locatie_faciliteiten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Aanwezige faciliteiten',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_locations_v_blocks_locatie_openingstijden" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Openingstijden',
  	"telefoon" varchar DEFAULT '085 4011647',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_locations_v_blocks_locatie_pois_nabij" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Bezienswaardigheden & POI''s in de buurt',
  	"kaartbijschrift" varchar DEFAULT 'De kaart toont deze locatie en de looproute naar de bezienswaardigheden hierboven.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_locations_v_blocks_locatie_kaart_producten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel_voor" varchar DEFAULT 'Voordelig ',
  	"titel_nadruk" varchar DEFAULT 'vaker parkeren',
  	"titel_na" varchar DEFAULT ' hier.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_locations_v_blocks_locatie_evenementen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel_voor" varchar DEFAULT 'Evenementen ',
  	"titel_nadruk" varchar DEFAULT 'nabij',
  	"titel_na" varchar DEFAULT ' deze locatie.',
  	"tekst" varchar DEFAULT 'Reserveer al je parkeertickets voor aankomende evenementen in de buurt.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_locations_v_blocks_locatie_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Veelgestelde vragen',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_locations_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__locations_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__locations_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__locations_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_locations_v_blocks_citaat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tekst" varchar,
  	"naam" varchar,
  	"functie" varchar,
  	"foto_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_locations_v_version_oude_slugs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "pois_blocks_poi_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pois_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pois_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_pois_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pois_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pois_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pois_blocks_faq_blok" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Veelgestelde vragen',
  	"bron" "enum_pois_blocks_faq_blok_bron" DEFAULT 'alles',
  	"categorie_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pois_blocks_citaat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tekst" varchar,
  	"naam" varchar,
  	"functie" varchar,
  	"foto_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pois_oude_slugs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar
  );
  
  CREATE TABLE "_pois_v_blocks_poi_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pois_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pois_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__pois_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pois_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pois_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pois_v_blocks_faq_blok" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Veelgestelde vragen',
  	"bron" "enum__pois_v_blocks_faq_blok_bron" DEFAULT 'alles',
  	"categorie_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pois_v_blocks_citaat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tekst" varchar,
  	"naam" varchar,
  	"functie" varchar,
  	"foto_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pois_v_version_oude_slugs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pois_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_titel" varchar,
  	"version_slug" varchar,
  	"version_category" "enum__pois_v_version_category",
  	"version_primaire_locatie_id" integer,
  	"version_loopafstand" numeric,
  	"version_intro" varchar,
  	"version_coordinaten" geometry(Point),
  	"version_address" varchar,
  	"version_image_id" integer,
  	"version_external_url" varchar,
  	"version_seo_titel" varchar,
  	"version_seo_omschrijving" varchar,
  	"version_seo_geen_index" boolean,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pois_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_pois_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locations_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"faq_id" integer
  );
  
  CREATE TABLE "faq_categorieen" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"naam" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"volgorde" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "nieuws" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"slug" varchar,
  	"publicatiedatum" timestamp(3) with time zone,
  	"auteur" varchar,
  	"samenvatting" varchar,
  	"inhoud" jsonb,
  	"hero_id" integer,
  	"seo_titel" varchar,
  	"seo_omschrijving" varchar,
  	"seo_afbeelding_id" integer,
  	"oude_id" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_nieuws_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "nieuws_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locations_id" integer,
  	"steden_id" integer
  );
  
  CREATE TABLE "_nieuws_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titel" varchar,
  	"version_slug" varchar,
  	"version_publicatiedatum" timestamp(3) with time zone,
  	"version_auteur" varchar,
  	"version_samenvatting" varchar,
  	"version_inhoud" jsonb,
  	"version_hero_id" integer,
  	"version_seo_titel" varchar,
  	"version_seo_omschrijving" varchar,
  	"version_seo_afbeelding_id" integer,
  	"version_oude_id" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__nieuws_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_nieuws_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locations_id" integer,
  	"steden_id" integer
  );
  
  CREATE TABLE "evenementen" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"naam" varchar,
  	"slug" varchar,
  	"soort" varchar,
  	"kleur" "enum_evenementen_kleur" DEFAULT 'orange',
  	"datums" varchar,
  	"afbeelding_id" integer,
  	"vanaf_prijs" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_evenementen_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "evenementen_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locations_id" integer
  );
  
  CREATE TABLE "_evenementen_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_naam" varchar,
  	"version_slug" varchar,
  	"version_soort" varchar,
  	"version_kleur" "enum__evenementen_v_version_kleur" DEFAULT 'orange',
  	"version_datums" varchar,
  	"version_afbeelding_id" integer,
  	"version_vanaf_prijs" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__evenementen_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_evenementen_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locations_id" integer
  );
  
  ALTER TABLE "pois" RENAME COLUMN "description" TO "intro";
  ALTER TABLE "pois" RENAME COLUMN "coordinates" TO "coordinaten";
  ALTER TABLE "faq" RENAME COLUMN "order" TO "volgorde";
  -- hasMany relationships renamed in the schema; carry existing links over.
  UPDATE "pois_rels" SET "path" = 'extraLocaties' WHERE "path" = 'locations';
  UPDATE "locations_rels" SET "path" = 'poiPaginas' WHERE "path" = 'pois';
  UPDATE "_locations_v_rels" SET "path" = 'version.poiPaginas' WHERE "path" = 'version.pois';
  ALTER TABLE "pois" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "pois" ALTER COLUMN "category" DROP NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "bovenliggende_pagina_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "faq_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_bovenliggende_pagina_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "faq_id" integer;
  ALTER TABLE "locations_images" ADD COLUMN "alt" varchar;
  ALTER TABLE "locations" ADD COLUMN "stad_id" integer;
  ALTER TABLE "locations" ADD COLUMN "address_huisnummer" varchar;
  ALTER TABLE "locations" ADD COLUMN "intro" varchar;
  ALTER TABLE "locations" ADD COLUMN "soort" "enum_locations_soort" DEFAULT 'Parkeerterrein';
  ALTER TABLE "locations" ADD COLUMN "loopafstand" varchar;
  ALTER TABLE "locations" ADD COLUMN "uren_open247" boolean;
  ALTER TABLE "locations" ADD COLUMN "uren_doordeweeks" varchar;
  ALTER TABLE "locations" ADD COLUMN "uren_zaterdag" varchar;
  ALTER TABLE "locations" ADD COLUMN "uren_zondag" varchar;
  ALTER TABLE "locations" ADD COLUMN "reserveerbaar" boolean;
  ALTER TABLE "locations" ADD COLUMN "waardekaart" boolean;
  ALTER TABLE "locations" ADD COLUMN "strippenkaart" boolean;
  ALTER TABLE "locations" ADD COLUMN "inrit" jsonb;
  ALTER TABLE "locations" ADD COLUMN "uitrit" jsonb;
  ALTER TABLE "locations" ADD COLUMN "route" jsonb;
  ALTER TABLE "locations" ADD COLUMN "aeroparker_sync_dagprijs" varchar;
  ALTER TABLE "locations" ADD COLUMN "aeroparker_sync_laatste_sync" timestamp(3) with time zone;
  ALTER TABLE "locations" ADD COLUMN "aeroparker_sync_sync_status" "enum_locations_aeroparker_sync_sync_status" DEFAULT 'ok';
  ALTER TABLE "locations" ADD COLUMN "aeroparker_sync_sync_melding" varchar;
  ALTER TABLE "locations" ADD COLUMN "seo_titel" varchar;
  ALTER TABLE "locations" ADD COLUMN "seo_omschrijving" varchar;
  ALTER TABLE "locations" ADD COLUMN "seo_afbeelding_id" integer;
  ALTER TABLE "locations" ADD COLUMN "seo_geen_index" boolean;
  ALTER TABLE "locations" ADD COLUMN "oude_id" numeric;
  ALTER TABLE "locations_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "locations_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_locations_v_version_images" ADD COLUMN "alt" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_stad_id" integer;
  ALTER TABLE "_locations_v" ADD COLUMN "version_address_huisnummer" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_intro" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_soort" "enum__locations_v_version_soort" DEFAULT 'Parkeerterrein';
  ALTER TABLE "_locations_v" ADD COLUMN "version_loopafstand" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_uren_open247" boolean;
  ALTER TABLE "_locations_v" ADD COLUMN "version_uren_doordeweeks" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_uren_zaterdag" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_uren_zondag" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_reserveerbaar" boolean;
  ALTER TABLE "_locations_v" ADD COLUMN "version_waardekaart" boolean;
  ALTER TABLE "_locations_v" ADD COLUMN "version_strippenkaart" boolean;
  ALTER TABLE "_locations_v" ADD COLUMN "version_inrit" jsonb;
  ALTER TABLE "_locations_v" ADD COLUMN "version_uitrit" jsonb;
  ALTER TABLE "_locations_v" ADD COLUMN "version_route" jsonb;
  ALTER TABLE "_locations_v" ADD COLUMN "version_aeroparker_sync_dagprijs" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_aeroparker_sync_laatste_sync" timestamp(3) with time zone;
  ALTER TABLE "_locations_v" ADD COLUMN "version_aeroparker_sync_sync_status" "enum__locations_v_version_aeroparker_sync_sync_status" DEFAULT 'ok';
  ALTER TABLE "_locations_v" ADD COLUMN "version_aeroparker_sync_sync_melding" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_seo_titel" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_seo_omschrijving" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_seo_afbeelding_id" integer;
  ALTER TABLE "_locations_v" ADD COLUMN "version_seo_geen_index" boolean;
  ALTER TABLE "_locations_v" ADD COLUMN "version_oude_id" numeric;
  ALTER TABLE "_locations_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_locations_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "pois" ADD COLUMN "titel" varchar;
  ALTER TABLE "pois" ADD COLUMN "slug" varchar;
  ALTER TABLE "pois" ADD COLUMN "primaire_locatie_id" integer;
  ALTER TABLE "pois" ADD COLUMN "loopafstand" numeric;
  ALTER TABLE "pois" ADD COLUMN "seo_titel" varchar;
  ALTER TABLE "pois" ADD COLUMN "seo_omschrijving" varchar;
  ALTER TABLE "pois" ADD COLUMN "seo_geen_index" boolean;
  ALTER TABLE "pois" ADD COLUMN "published_at" timestamp(3) with time zone;
  ALTER TABLE "pois" ADD COLUMN "_status" "enum_pois_status" DEFAULT 'draft';
  ALTER TABLE "pois_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pois_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "pois_rels" ADD COLUMN "faq_id" integer;
  ALTER TABLE "faq" ADD COLUMN "categorie_id" integer;
  ALTER TABLE "redirects_rels" ADD COLUMN "steden_id" integer;
  ALTER TABLE "redirects_rels" ADD COLUMN "locations_id" integer;
  ALTER TABLE "redirects_rels" ADD COLUMN "pois_id" integer;
  ALTER TABLE "redirects_rels" ADD COLUMN "nieuws_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "steden_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faq_categorieen_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "nieuws_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "evenementen_id" integer;
  ALTER TABLE "pages_blocks_usp_rij_items" ADD CONSTRAINT "pages_blocks_usp_rij_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_usp_rij"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_usp_rij" ADD CONSTRAINT "pages_blocks_usp_rij_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_citaat" ADD CONSTRAINT "pages_blocks_citaat_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_citaat" ADD CONSTRAINT "pages_blocks_citaat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_blok" ADD CONSTRAINT "pages_blocks_faq_blok_categorie_id_faq_categorieen_id_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."faq_categorieen"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_blok" ADD CONSTRAINT "pages_blocks_faq_blok_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_locatie_uitgelicht" ADD CONSTRAINT "pages_blocks_locatie_uitgelicht_locatie_id_locations_id_fk" FOREIGN KEY ("locatie_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_locatie_uitgelicht" ADD CONSTRAINT "pages_blocks_locatie_uitgelicht_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_usp_rij_items" ADD CONSTRAINT "_pages_v_blocks_usp_rij_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_usp_rij"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_usp_rij" ADD CONSTRAINT "_pages_v_blocks_usp_rij_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_citaat" ADD CONSTRAINT "_pages_v_blocks_citaat_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_citaat" ADD CONSTRAINT "_pages_v_blocks_citaat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_blok" ADD CONSTRAINT "_pages_v_blocks_faq_blok_categorie_id_faq_categorieen_id_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."faq_categorieen"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_blok" ADD CONSTRAINT "_pages_v_blocks_faq_blok_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_locatie_uitgelicht" ADD CONSTRAINT "_pages_v_blocks_locatie_uitgelicht_locatie_id_locations_id_fk" FOREIGN KEY ("locatie_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_locatie_uitgelicht" ADD CONSTRAINT "_pages_v_blocks_locatie_uitgelicht_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "steden_blocks_stad_hero" ADD CONSTRAINT "steden_blocks_stad_hero_afbeelding_id_media_id_fk" FOREIGN KEY ("afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "steden_blocks_stad_hero" ADD CONSTRAINT "steden_blocks_stad_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."steden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "steden_blocks_stad_locaties_lijst" ADD CONSTRAINT "steden_blocks_stad_locaties_lijst_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."steden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "steden_blocks_content_columns" ADD CONSTRAINT "steden_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."steden_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "steden_blocks_content" ADD CONSTRAINT "steden_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."steden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "steden_blocks_citaat" ADD CONSTRAINT "steden_blocks_citaat_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "steden_blocks_citaat" ADD CONSTRAINT "steden_blocks_citaat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."steden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "steden_blocks_cta_links" ADD CONSTRAINT "steden_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."steden_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "steden_blocks_cta" ADD CONSTRAINT "steden_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."steden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "steden_rels" ADD CONSTRAINT "steden_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."steden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "steden_rels" ADD CONSTRAINT "steden_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "steden_rels" ADD CONSTRAINT "steden_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_steden_v_blocks_stad_hero" ADD CONSTRAINT "_steden_v_blocks_stad_hero_afbeelding_id_media_id_fk" FOREIGN KEY ("afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_steden_v_blocks_stad_hero" ADD CONSTRAINT "_steden_v_blocks_stad_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_steden_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_steden_v_blocks_stad_locaties_lijst" ADD CONSTRAINT "_steden_v_blocks_stad_locaties_lijst_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_steden_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_steden_v_blocks_content_columns" ADD CONSTRAINT "_steden_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_steden_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_steden_v_blocks_content" ADD CONSTRAINT "_steden_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_steden_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_steden_v_blocks_citaat" ADD CONSTRAINT "_steden_v_blocks_citaat_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_steden_v_blocks_citaat" ADD CONSTRAINT "_steden_v_blocks_citaat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_steden_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_steden_v_blocks_cta_links" ADD CONSTRAINT "_steden_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_steden_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_steden_v_blocks_cta" ADD CONSTRAINT "_steden_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_steden_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_steden_v" ADD CONSTRAINT "_steden_v_parent_id_steden_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."steden"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_steden_v_rels" ADD CONSTRAINT "_steden_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_steden_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_steden_v_rels" ADD CONSTRAINT "_steden_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_steden_v_rels" ADD CONSTRAINT "_steden_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_faciliteiten" ADD CONSTRAINT "locations_faciliteiten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_betaalmogelijkheden" ADD CONSTRAINT "locations_betaalmogelijkheden_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_pois_nabij" ADD CONSTRAINT "locations_pois_nabij_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_aeroparker_sync_tarieven" ADD CONSTRAINT "locations_aeroparker_sync_tarieven_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_blocks_locatie_hero" ADD CONSTRAINT "locations_blocks_locatie_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_blocks_locatie_tarieven" ADD CONSTRAINT "locations_blocks_locatie_tarieven_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_blocks_locatie_faciliteiten" ADD CONSTRAINT "locations_blocks_locatie_faciliteiten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_blocks_locatie_openingstijden" ADD CONSTRAINT "locations_blocks_locatie_openingstijden_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_blocks_locatie_pois_nabij" ADD CONSTRAINT "locations_blocks_locatie_pois_nabij_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_blocks_locatie_kaart_producten" ADD CONSTRAINT "locations_blocks_locatie_kaart_producten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_blocks_locatie_evenementen" ADD CONSTRAINT "locations_blocks_locatie_evenementen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_blocks_locatie_faq" ADD CONSTRAINT "locations_blocks_locatie_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_blocks_content_columns" ADD CONSTRAINT "locations_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_blocks_content" ADD CONSTRAINT "locations_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_blocks_citaat" ADD CONSTRAINT "locations_blocks_citaat_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_blocks_citaat" ADD CONSTRAINT "locations_blocks_citaat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_oude_slugs" ADD CONSTRAINT "locations_oude_slugs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_faciliteiten" ADD CONSTRAINT "_locations_v_version_faciliteiten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_betaalmogelijkheden" ADD CONSTRAINT "_locations_v_version_betaalmogelijkheden_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_pois_nabij" ADD CONSTRAINT "_locations_v_version_pois_nabij_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_aeroparker_sync_tarieven" ADD CONSTRAINT "_locations_v_version_aeroparker_sync_tarieven_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_blocks_locatie_hero" ADD CONSTRAINT "_locations_v_blocks_locatie_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_blocks_locatie_tarieven" ADD CONSTRAINT "_locations_v_blocks_locatie_tarieven_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_blocks_locatie_faciliteiten" ADD CONSTRAINT "_locations_v_blocks_locatie_faciliteiten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_blocks_locatie_openingstijden" ADD CONSTRAINT "_locations_v_blocks_locatie_openingstijden_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_blocks_locatie_pois_nabij" ADD CONSTRAINT "_locations_v_blocks_locatie_pois_nabij_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_blocks_locatie_kaart_producten" ADD CONSTRAINT "_locations_v_blocks_locatie_kaart_producten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_blocks_locatie_evenementen" ADD CONSTRAINT "_locations_v_blocks_locatie_evenementen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_blocks_locatie_faq" ADD CONSTRAINT "_locations_v_blocks_locatie_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_blocks_content_columns" ADD CONSTRAINT "_locations_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_blocks_content" ADD CONSTRAINT "_locations_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_blocks_citaat" ADD CONSTRAINT "_locations_v_blocks_citaat_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v_blocks_citaat" ADD CONSTRAINT "_locations_v_blocks_citaat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_oude_slugs" ADD CONSTRAINT "_locations_v_version_oude_slugs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pois_blocks_poi_hero" ADD CONSTRAINT "pois_blocks_poi_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pois"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pois_blocks_content_columns" ADD CONSTRAINT "pois_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pois_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pois_blocks_content" ADD CONSTRAINT "pois_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pois"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pois_blocks_faq_blok" ADD CONSTRAINT "pois_blocks_faq_blok_categorie_id_faq_categorieen_id_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."faq_categorieen"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pois_blocks_faq_blok" ADD CONSTRAINT "pois_blocks_faq_blok_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pois"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pois_blocks_citaat" ADD CONSTRAINT "pois_blocks_citaat_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pois_blocks_citaat" ADD CONSTRAINT "pois_blocks_citaat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pois"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pois_oude_slugs" ADD CONSTRAINT "pois_oude_slugs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pois"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pois_v_blocks_poi_hero" ADD CONSTRAINT "_pois_v_blocks_poi_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pois_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pois_v_blocks_content_columns" ADD CONSTRAINT "_pois_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pois_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pois_v_blocks_content" ADD CONSTRAINT "_pois_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pois_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pois_v_blocks_faq_blok" ADD CONSTRAINT "_pois_v_blocks_faq_blok_categorie_id_faq_categorieen_id_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."faq_categorieen"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pois_v_blocks_faq_blok" ADD CONSTRAINT "_pois_v_blocks_faq_blok_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pois_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pois_v_blocks_citaat" ADD CONSTRAINT "_pois_v_blocks_citaat_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pois_v_blocks_citaat" ADD CONSTRAINT "_pois_v_blocks_citaat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pois_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pois_v_version_oude_slugs" ADD CONSTRAINT "_pois_v_version_oude_slugs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pois_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pois_v" ADD CONSTRAINT "_pois_v_parent_id_pois_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pois"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pois_v" ADD CONSTRAINT "_pois_v_version_primaire_locatie_id_locations_id_fk" FOREIGN KEY ("version_primaire_locatie_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pois_v" ADD CONSTRAINT "_pois_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pois_v_rels" ADD CONSTRAINT "_pois_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pois_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pois_v_rels" ADD CONSTRAINT "_pois_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pois_v_rels" ADD CONSTRAINT "_pois_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pois_v_rels" ADD CONSTRAINT "_pois_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pois_v_rels" ADD CONSTRAINT "_pois_v_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nieuws" ADD CONSTRAINT "nieuws_hero_id_media_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "nieuws" ADD CONSTRAINT "nieuws_seo_afbeelding_id_media_id_fk" FOREIGN KEY ("seo_afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "nieuws_rels" ADD CONSTRAINT "nieuws_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."nieuws"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nieuws_rels" ADD CONSTRAINT "nieuws_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nieuws_rels" ADD CONSTRAINT "nieuws_rels_steden_fk" FOREIGN KEY ("steden_id") REFERENCES "public"."steden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_nieuws_v" ADD CONSTRAINT "_nieuws_v_parent_id_nieuws_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."nieuws"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_nieuws_v" ADD CONSTRAINT "_nieuws_v_version_hero_id_media_id_fk" FOREIGN KEY ("version_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_nieuws_v" ADD CONSTRAINT "_nieuws_v_version_seo_afbeelding_id_media_id_fk" FOREIGN KEY ("version_seo_afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_nieuws_v_rels" ADD CONSTRAINT "_nieuws_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_nieuws_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_nieuws_v_rels" ADD CONSTRAINT "_nieuws_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_nieuws_v_rels" ADD CONSTRAINT "_nieuws_v_rels_steden_fk" FOREIGN KEY ("steden_id") REFERENCES "public"."steden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "evenementen" ADD CONSTRAINT "evenementen_afbeelding_id_media_id_fk" FOREIGN KEY ("afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "evenementen_rels" ADD CONSTRAINT "evenementen_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."evenementen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "evenementen_rels" ADD CONSTRAINT "evenementen_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_evenementen_v" ADD CONSTRAINT "_evenementen_v_parent_id_evenementen_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."evenementen"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_evenementen_v" ADD CONSTRAINT "_evenementen_v_version_afbeelding_id_media_id_fk" FOREIGN KEY ("version_afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_evenementen_v_rels" ADD CONSTRAINT "_evenementen_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_evenementen_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_evenementen_v_rels" ADD CONSTRAINT "_evenementen_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_usp_rij_items_order_idx" ON "pages_blocks_usp_rij_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_usp_rij_items_parent_id_idx" ON "pages_blocks_usp_rij_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_usp_rij_order_idx" ON "pages_blocks_usp_rij" USING btree ("_order");
  CREATE INDEX "pages_blocks_usp_rij_parent_id_idx" ON "pages_blocks_usp_rij" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_usp_rij_path_idx" ON "pages_blocks_usp_rij" USING btree ("_path");
  CREATE INDEX "pages_blocks_citaat_order_idx" ON "pages_blocks_citaat" USING btree ("_order");
  CREATE INDEX "pages_blocks_citaat_parent_id_idx" ON "pages_blocks_citaat" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_citaat_path_idx" ON "pages_blocks_citaat" USING btree ("_path");
  CREATE INDEX "pages_blocks_citaat_foto_idx" ON "pages_blocks_citaat" USING btree ("foto_id");
  CREATE INDEX "pages_blocks_faq_blok_order_idx" ON "pages_blocks_faq_blok" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_blok_parent_id_idx" ON "pages_blocks_faq_blok" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_blok_path_idx" ON "pages_blocks_faq_blok" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_blok_categorie_idx" ON "pages_blocks_faq_blok" USING btree ("categorie_id");
  CREATE INDEX "pages_blocks_locatie_uitgelicht_order_idx" ON "pages_blocks_locatie_uitgelicht" USING btree ("_order");
  CREATE INDEX "pages_blocks_locatie_uitgelicht_parent_id_idx" ON "pages_blocks_locatie_uitgelicht" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_locatie_uitgelicht_path_idx" ON "pages_blocks_locatie_uitgelicht" USING btree ("_path");
  CREATE INDEX "pages_blocks_locatie_uitgelicht_locatie_idx" ON "pages_blocks_locatie_uitgelicht" USING btree ("locatie_id");
  CREATE INDEX "_pages_v_blocks_usp_rij_items_order_idx" ON "_pages_v_blocks_usp_rij_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_usp_rij_items_parent_id_idx" ON "_pages_v_blocks_usp_rij_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_usp_rij_order_idx" ON "_pages_v_blocks_usp_rij" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_usp_rij_parent_id_idx" ON "_pages_v_blocks_usp_rij" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_usp_rij_path_idx" ON "_pages_v_blocks_usp_rij" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_citaat_order_idx" ON "_pages_v_blocks_citaat" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_citaat_parent_id_idx" ON "_pages_v_blocks_citaat" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_citaat_path_idx" ON "_pages_v_blocks_citaat" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_citaat_foto_idx" ON "_pages_v_blocks_citaat" USING btree ("foto_id");
  CREATE INDEX "_pages_v_blocks_faq_blok_order_idx" ON "_pages_v_blocks_faq_blok" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_blok_parent_id_idx" ON "_pages_v_blocks_faq_blok" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_blok_path_idx" ON "_pages_v_blocks_faq_blok" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_blok_categorie_idx" ON "_pages_v_blocks_faq_blok" USING btree ("categorie_id");
  CREATE INDEX "_pages_v_blocks_locatie_uitgelicht_order_idx" ON "_pages_v_blocks_locatie_uitgelicht" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_locatie_uitgelicht_parent_id_idx" ON "_pages_v_blocks_locatie_uitgelicht" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_locatie_uitgelicht_path_idx" ON "_pages_v_blocks_locatie_uitgelicht" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_locatie_uitgelicht_locatie_idx" ON "_pages_v_blocks_locatie_uitgelicht" USING btree ("locatie_id");
  CREATE INDEX "steden_blocks_stad_hero_order_idx" ON "steden_blocks_stad_hero" USING btree ("_order");
  CREATE INDEX "steden_blocks_stad_hero_parent_id_idx" ON "steden_blocks_stad_hero" USING btree ("_parent_id");
  CREATE INDEX "steden_blocks_stad_hero_path_idx" ON "steden_blocks_stad_hero" USING btree ("_path");
  CREATE INDEX "steden_blocks_stad_hero_afbeelding_idx" ON "steden_blocks_stad_hero" USING btree ("afbeelding_id");
  CREATE INDEX "steden_blocks_stad_locaties_lijst_order_idx" ON "steden_blocks_stad_locaties_lijst" USING btree ("_order");
  CREATE INDEX "steden_blocks_stad_locaties_lijst_parent_id_idx" ON "steden_blocks_stad_locaties_lijst" USING btree ("_parent_id");
  CREATE INDEX "steden_blocks_stad_locaties_lijst_path_idx" ON "steden_blocks_stad_locaties_lijst" USING btree ("_path");
  CREATE INDEX "steden_blocks_content_columns_order_idx" ON "steden_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "steden_blocks_content_columns_parent_id_idx" ON "steden_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "steden_blocks_content_order_idx" ON "steden_blocks_content" USING btree ("_order");
  CREATE INDEX "steden_blocks_content_parent_id_idx" ON "steden_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "steden_blocks_content_path_idx" ON "steden_blocks_content" USING btree ("_path");
  CREATE INDEX "steden_blocks_citaat_order_idx" ON "steden_blocks_citaat" USING btree ("_order");
  CREATE INDEX "steden_blocks_citaat_parent_id_idx" ON "steden_blocks_citaat" USING btree ("_parent_id");
  CREATE INDEX "steden_blocks_citaat_path_idx" ON "steden_blocks_citaat" USING btree ("_path");
  CREATE INDEX "steden_blocks_citaat_foto_idx" ON "steden_blocks_citaat" USING btree ("foto_id");
  CREATE INDEX "steden_blocks_cta_links_order_idx" ON "steden_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "steden_blocks_cta_links_parent_id_idx" ON "steden_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "steden_blocks_cta_order_idx" ON "steden_blocks_cta" USING btree ("_order");
  CREATE INDEX "steden_blocks_cta_parent_id_idx" ON "steden_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "steden_blocks_cta_path_idx" ON "steden_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "steden_slug_idx" ON "steden" USING btree ("slug");
  CREATE INDEX "steden_updated_at_idx" ON "steden" USING btree ("updated_at");
  CREATE INDEX "steden_created_at_idx" ON "steden" USING btree ("created_at");
  CREATE INDEX "steden__status_idx" ON "steden" USING btree ("_status");
  CREATE INDEX "steden_rels_order_idx" ON "steden_rels" USING btree ("order");
  CREATE INDEX "steden_rels_parent_idx" ON "steden_rels" USING btree ("parent_id");
  CREATE INDEX "steden_rels_path_idx" ON "steden_rels" USING btree ("path");
  CREATE INDEX "steden_rels_pages_id_idx" ON "steden_rels" USING btree ("pages_id");
  CREATE INDEX "steden_rels_posts_id_idx" ON "steden_rels" USING btree ("posts_id");
  CREATE INDEX "_steden_v_blocks_stad_hero_order_idx" ON "_steden_v_blocks_stad_hero" USING btree ("_order");
  CREATE INDEX "_steden_v_blocks_stad_hero_parent_id_idx" ON "_steden_v_blocks_stad_hero" USING btree ("_parent_id");
  CREATE INDEX "_steden_v_blocks_stad_hero_path_idx" ON "_steden_v_blocks_stad_hero" USING btree ("_path");
  CREATE INDEX "_steden_v_blocks_stad_hero_afbeelding_idx" ON "_steden_v_blocks_stad_hero" USING btree ("afbeelding_id");
  CREATE INDEX "_steden_v_blocks_stad_locaties_lijst_order_idx" ON "_steden_v_blocks_stad_locaties_lijst" USING btree ("_order");
  CREATE INDEX "_steden_v_blocks_stad_locaties_lijst_parent_id_idx" ON "_steden_v_blocks_stad_locaties_lijst" USING btree ("_parent_id");
  CREATE INDEX "_steden_v_blocks_stad_locaties_lijst_path_idx" ON "_steden_v_blocks_stad_locaties_lijst" USING btree ("_path");
  CREATE INDEX "_steden_v_blocks_content_columns_order_idx" ON "_steden_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_steden_v_blocks_content_columns_parent_id_idx" ON "_steden_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_steden_v_blocks_content_order_idx" ON "_steden_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_steden_v_blocks_content_parent_id_idx" ON "_steden_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_steden_v_blocks_content_path_idx" ON "_steden_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_steden_v_blocks_citaat_order_idx" ON "_steden_v_blocks_citaat" USING btree ("_order");
  CREATE INDEX "_steden_v_blocks_citaat_parent_id_idx" ON "_steden_v_blocks_citaat" USING btree ("_parent_id");
  CREATE INDEX "_steden_v_blocks_citaat_path_idx" ON "_steden_v_blocks_citaat" USING btree ("_path");
  CREATE INDEX "_steden_v_blocks_citaat_foto_idx" ON "_steden_v_blocks_citaat" USING btree ("foto_id");
  CREATE INDEX "_steden_v_blocks_cta_links_order_idx" ON "_steden_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_steden_v_blocks_cta_links_parent_id_idx" ON "_steden_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_steden_v_blocks_cta_order_idx" ON "_steden_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_steden_v_blocks_cta_parent_id_idx" ON "_steden_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_steden_v_blocks_cta_path_idx" ON "_steden_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_steden_v_parent_idx" ON "_steden_v" USING btree ("parent_id");
  CREATE INDEX "_steden_v_version_version_slug_idx" ON "_steden_v" USING btree ("version_slug");
  CREATE INDEX "_steden_v_version_version_updated_at_idx" ON "_steden_v" USING btree ("version_updated_at");
  CREATE INDEX "_steden_v_version_version_created_at_idx" ON "_steden_v" USING btree ("version_created_at");
  CREATE INDEX "_steden_v_version_version__status_idx" ON "_steden_v" USING btree ("version__status");
  CREATE INDEX "_steden_v_created_at_idx" ON "_steden_v" USING btree ("created_at");
  CREATE INDEX "_steden_v_updated_at_idx" ON "_steden_v" USING btree ("updated_at");
  CREATE INDEX "_steden_v_latest_idx" ON "_steden_v" USING btree ("latest");
  CREATE INDEX "_steden_v_rels_order_idx" ON "_steden_v_rels" USING btree ("order");
  CREATE INDEX "_steden_v_rels_parent_idx" ON "_steden_v_rels" USING btree ("parent_id");
  CREATE INDEX "_steden_v_rels_path_idx" ON "_steden_v_rels" USING btree ("path");
  CREATE INDEX "_steden_v_rels_pages_id_idx" ON "_steden_v_rels" USING btree ("pages_id");
  CREATE INDEX "_steden_v_rels_posts_id_idx" ON "_steden_v_rels" USING btree ("posts_id");
  CREATE INDEX "locations_faciliteiten_order_idx" ON "locations_faciliteiten" USING btree ("_order");
  CREATE INDEX "locations_faciliteiten_parent_id_idx" ON "locations_faciliteiten" USING btree ("_parent_id");
  CREATE INDEX "locations_betaalmogelijkheden_order_idx" ON "locations_betaalmogelijkheden" USING btree ("_order");
  CREATE INDEX "locations_betaalmogelijkheden_parent_id_idx" ON "locations_betaalmogelijkheden" USING btree ("_parent_id");
  CREATE INDEX "locations_pois_nabij_order_idx" ON "locations_pois_nabij" USING btree ("_order");
  CREATE INDEX "locations_pois_nabij_parent_id_idx" ON "locations_pois_nabij" USING btree ("_parent_id");
  CREATE INDEX "locations_aeroparker_sync_tarieven_order_idx" ON "locations_aeroparker_sync_tarieven" USING btree ("_order");
  CREATE INDEX "locations_aeroparker_sync_tarieven_parent_id_idx" ON "locations_aeroparker_sync_tarieven" USING btree ("_parent_id");
  CREATE INDEX "locations_blocks_locatie_hero_order_idx" ON "locations_blocks_locatie_hero" USING btree ("_order");
  CREATE INDEX "locations_blocks_locatie_hero_parent_id_idx" ON "locations_blocks_locatie_hero" USING btree ("_parent_id");
  CREATE INDEX "locations_blocks_locatie_hero_path_idx" ON "locations_blocks_locatie_hero" USING btree ("_path");
  CREATE INDEX "locations_blocks_locatie_tarieven_order_idx" ON "locations_blocks_locatie_tarieven" USING btree ("_order");
  CREATE INDEX "locations_blocks_locatie_tarieven_parent_id_idx" ON "locations_blocks_locatie_tarieven" USING btree ("_parent_id");
  CREATE INDEX "locations_blocks_locatie_tarieven_path_idx" ON "locations_blocks_locatie_tarieven" USING btree ("_path");
  CREATE INDEX "locations_blocks_locatie_faciliteiten_order_idx" ON "locations_blocks_locatie_faciliteiten" USING btree ("_order");
  CREATE INDEX "locations_blocks_locatie_faciliteiten_parent_id_idx" ON "locations_blocks_locatie_faciliteiten" USING btree ("_parent_id");
  CREATE INDEX "locations_blocks_locatie_faciliteiten_path_idx" ON "locations_blocks_locatie_faciliteiten" USING btree ("_path");
  CREATE INDEX "locations_blocks_locatie_openingstijden_order_idx" ON "locations_blocks_locatie_openingstijden" USING btree ("_order");
  CREATE INDEX "locations_blocks_locatie_openingstijden_parent_id_idx" ON "locations_blocks_locatie_openingstijden" USING btree ("_parent_id");
  CREATE INDEX "locations_blocks_locatie_openingstijden_path_idx" ON "locations_blocks_locatie_openingstijden" USING btree ("_path");
  CREATE INDEX "locations_blocks_locatie_pois_nabij_order_idx" ON "locations_blocks_locatie_pois_nabij" USING btree ("_order");
  CREATE INDEX "locations_blocks_locatie_pois_nabij_parent_id_idx" ON "locations_blocks_locatie_pois_nabij" USING btree ("_parent_id");
  CREATE INDEX "locations_blocks_locatie_pois_nabij_path_idx" ON "locations_blocks_locatie_pois_nabij" USING btree ("_path");
  CREATE INDEX "locations_blocks_locatie_kaart_producten_order_idx" ON "locations_blocks_locatie_kaart_producten" USING btree ("_order");
  CREATE INDEX "locations_blocks_locatie_kaart_producten_parent_id_idx" ON "locations_blocks_locatie_kaart_producten" USING btree ("_parent_id");
  CREATE INDEX "locations_blocks_locatie_kaart_producten_path_idx" ON "locations_blocks_locatie_kaart_producten" USING btree ("_path");
  CREATE INDEX "locations_blocks_locatie_evenementen_order_idx" ON "locations_blocks_locatie_evenementen" USING btree ("_order");
  CREATE INDEX "locations_blocks_locatie_evenementen_parent_id_idx" ON "locations_blocks_locatie_evenementen" USING btree ("_parent_id");
  CREATE INDEX "locations_blocks_locatie_evenementen_path_idx" ON "locations_blocks_locatie_evenementen" USING btree ("_path");
  CREATE INDEX "locations_blocks_locatie_faq_order_idx" ON "locations_blocks_locatie_faq" USING btree ("_order");
  CREATE INDEX "locations_blocks_locatie_faq_parent_id_idx" ON "locations_blocks_locatie_faq" USING btree ("_parent_id");
  CREATE INDEX "locations_blocks_locatie_faq_path_idx" ON "locations_blocks_locatie_faq" USING btree ("_path");
  CREATE INDEX "locations_blocks_content_columns_order_idx" ON "locations_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "locations_blocks_content_columns_parent_id_idx" ON "locations_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "locations_blocks_content_order_idx" ON "locations_blocks_content" USING btree ("_order");
  CREATE INDEX "locations_blocks_content_parent_id_idx" ON "locations_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "locations_blocks_content_path_idx" ON "locations_blocks_content" USING btree ("_path");
  CREATE INDEX "locations_blocks_citaat_order_idx" ON "locations_blocks_citaat" USING btree ("_order");
  CREATE INDEX "locations_blocks_citaat_parent_id_idx" ON "locations_blocks_citaat" USING btree ("_parent_id");
  CREATE INDEX "locations_blocks_citaat_path_idx" ON "locations_blocks_citaat" USING btree ("_path");
  CREATE INDEX "locations_blocks_citaat_foto_idx" ON "locations_blocks_citaat" USING btree ("foto_id");
  CREATE INDEX "locations_oude_slugs_order_idx" ON "locations_oude_slugs" USING btree ("_order");
  CREATE INDEX "locations_oude_slugs_parent_id_idx" ON "locations_oude_slugs" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_faciliteiten_order_idx" ON "_locations_v_version_faciliteiten" USING btree ("_order");
  CREATE INDEX "_locations_v_version_faciliteiten_parent_id_idx" ON "_locations_v_version_faciliteiten" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_betaalmogelijkheden_order_idx" ON "_locations_v_version_betaalmogelijkheden" USING btree ("_order");
  CREATE INDEX "_locations_v_version_betaalmogelijkheden_parent_id_idx" ON "_locations_v_version_betaalmogelijkheden" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_pois_nabij_order_idx" ON "_locations_v_version_pois_nabij" USING btree ("_order");
  CREATE INDEX "_locations_v_version_pois_nabij_parent_id_idx" ON "_locations_v_version_pois_nabij" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_aeroparker_sync_tarieven_order_idx" ON "_locations_v_version_aeroparker_sync_tarieven" USING btree ("_order");
  CREATE INDEX "_locations_v_version_aeroparker_sync_tarieven_parent_id_idx" ON "_locations_v_version_aeroparker_sync_tarieven" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_blocks_locatie_hero_order_idx" ON "_locations_v_blocks_locatie_hero" USING btree ("_order");
  CREATE INDEX "_locations_v_blocks_locatie_hero_parent_id_idx" ON "_locations_v_blocks_locatie_hero" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_blocks_locatie_hero_path_idx" ON "_locations_v_blocks_locatie_hero" USING btree ("_path");
  CREATE INDEX "_locations_v_blocks_locatie_tarieven_order_idx" ON "_locations_v_blocks_locatie_tarieven" USING btree ("_order");
  CREATE INDEX "_locations_v_blocks_locatie_tarieven_parent_id_idx" ON "_locations_v_blocks_locatie_tarieven" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_blocks_locatie_tarieven_path_idx" ON "_locations_v_blocks_locatie_tarieven" USING btree ("_path");
  CREATE INDEX "_locations_v_blocks_locatie_faciliteiten_order_idx" ON "_locations_v_blocks_locatie_faciliteiten" USING btree ("_order");
  CREATE INDEX "_locations_v_blocks_locatie_faciliteiten_parent_id_idx" ON "_locations_v_blocks_locatie_faciliteiten" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_blocks_locatie_faciliteiten_path_idx" ON "_locations_v_blocks_locatie_faciliteiten" USING btree ("_path");
  CREATE INDEX "_locations_v_blocks_locatie_openingstijden_order_idx" ON "_locations_v_blocks_locatie_openingstijden" USING btree ("_order");
  CREATE INDEX "_locations_v_blocks_locatie_openingstijden_parent_id_idx" ON "_locations_v_blocks_locatie_openingstijden" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_blocks_locatie_openingstijden_path_idx" ON "_locations_v_blocks_locatie_openingstijden" USING btree ("_path");
  CREATE INDEX "_locations_v_blocks_locatie_pois_nabij_order_idx" ON "_locations_v_blocks_locatie_pois_nabij" USING btree ("_order");
  CREATE INDEX "_locations_v_blocks_locatie_pois_nabij_parent_id_idx" ON "_locations_v_blocks_locatie_pois_nabij" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_blocks_locatie_pois_nabij_path_idx" ON "_locations_v_blocks_locatie_pois_nabij" USING btree ("_path");
  CREATE INDEX "_locations_v_blocks_locatie_kaart_producten_order_idx" ON "_locations_v_blocks_locatie_kaart_producten" USING btree ("_order");
  CREATE INDEX "_locations_v_blocks_locatie_kaart_producten_parent_id_idx" ON "_locations_v_blocks_locatie_kaart_producten" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_blocks_locatie_kaart_producten_path_idx" ON "_locations_v_blocks_locatie_kaart_producten" USING btree ("_path");
  CREATE INDEX "_locations_v_blocks_locatie_evenementen_order_idx" ON "_locations_v_blocks_locatie_evenementen" USING btree ("_order");
  CREATE INDEX "_locations_v_blocks_locatie_evenementen_parent_id_idx" ON "_locations_v_blocks_locatie_evenementen" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_blocks_locatie_evenementen_path_idx" ON "_locations_v_blocks_locatie_evenementen" USING btree ("_path");
  CREATE INDEX "_locations_v_blocks_locatie_faq_order_idx" ON "_locations_v_blocks_locatie_faq" USING btree ("_order");
  CREATE INDEX "_locations_v_blocks_locatie_faq_parent_id_idx" ON "_locations_v_blocks_locatie_faq" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_blocks_locatie_faq_path_idx" ON "_locations_v_blocks_locatie_faq" USING btree ("_path");
  CREATE INDEX "_locations_v_blocks_content_columns_order_idx" ON "_locations_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_locations_v_blocks_content_columns_parent_id_idx" ON "_locations_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_blocks_content_order_idx" ON "_locations_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_locations_v_blocks_content_parent_id_idx" ON "_locations_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_blocks_content_path_idx" ON "_locations_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_locations_v_blocks_citaat_order_idx" ON "_locations_v_blocks_citaat" USING btree ("_order");
  CREATE INDEX "_locations_v_blocks_citaat_parent_id_idx" ON "_locations_v_blocks_citaat" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_blocks_citaat_path_idx" ON "_locations_v_blocks_citaat" USING btree ("_path");
  CREATE INDEX "_locations_v_blocks_citaat_foto_idx" ON "_locations_v_blocks_citaat" USING btree ("foto_id");
  CREATE INDEX "_locations_v_version_oude_slugs_order_idx" ON "_locations_v_version_oude_slugs" USING btree ("_order");
  CREATE INDEX "_locations_v_version_oude_slugs_parent_id_idx" ON "_locations_v_version_oude_slugs" USING btree ("_parent_id");
  CREATE INDEX "pois_blocks_poi_hero_order_idx" ON "pois_blocks_poi_hero" USING btree ("_order");
  CREATE INDEX "pois_blocks_poi_hero_parent_id_idx" ON "pois_blocks_poi_hero" USING btree ("_parent_id");
  CREATE INDEX "pois_blocks_poi_hero_path_idx" ON "pois_blocks_poi_hero" USING btree ("_path");
  CREATE INDEX "pois_blocks_content_columns_order_idx" ON "pois_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "pois_blocks_content_columns_parent_id_idx" ON "pois_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "pois_blocks_content_order_idx" ON "pois_blocks_content" USING btree ("_order");
  CREATE INDEX "pois_blocks_content_parent_id_idx" ON "pois_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pois_blocks_content_path_idx" ON "pois_blocks_content" USING btree ("_path");
  CREATE INDEX "pois_blocks_faq_blok_order_idx" ON "pois_blocks_faq_blok" USING btree ("_order");
  CREATE INDEX "pois_blocks_faq_blok_parent_id_idx" ON "pois_blocks_faq_blok" USING btree ("_parent_id");
  CREATE INDEX "pois_blocks_faq_blok_path_idx" ON "pois_blocks_faq_blok" USING btree ("_path");
  CREATE INDEX "pois_blocks_faq_blok_categorie_idx" ON "pois_blocks_faq_blok" USING btree ("categorie_id");
  CREATE INDEX "pois_blocks_citaat_order_idx" ON "pois_blocks_citaat" USING btree ("_order");
  CREATE INDEX "pois_blocks_citaat_parent_id_idx" ON "pois_blocks_citaat" USING btree ("_parent_id");
  CREATE INDEX "pois_blocks_citaat_path_idx" ON "pois_blocks_citaat" USING btree ("_path");
  CREATE INDEX "pois_blocks_citaat_foto_idx" ON "pois_blocks_citaat" USING btree ("foto_id");
  CREATE INDEX "pois_oude_slugs_order_idx" ON "pois_oude_slugs" USING btree ("_order");
  CREATE INDEX "pois_oude_slugs_parent_id_idx" ON "pois_oude_slugs" USING btree ("_parent_id");
  CREATE INDEX "_pois_v_blocks_poi_hero_order_idx" ON "_pois_v_blocks_poi_hero" USING btree ("_order");
  CREATE INDEX "_pois_v_blocks_poi_hero_parent_id_idx" ON "_pois_v_blocks_poi_hero" USING btree ("_parent_id");
  CREATE INDEX "_pois_v_blocks_poi_hero_path_idx" ON "_pois_v_blocks_poi_hero" USING btree ("_path");
  CREATE INDEX "_pois_v_blocks_content_columns_order_idx" ON "_pois_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_pois_v_blocks_content_columns_parent_id_idx" ON "_pois_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_pois_v_blocks_content_order_idx" ON "_pois_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pois_v_blocks_content_parent_id_idx" ON "_pois_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pois_v_blocks_content_path_idx" ON "_pois_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pois_v_blocks_faq_blok_order_idx" ON "_pois_v_blocks_faq_blok" USING btree ("_order");
  CREATE INDEX "_pois_v_blocks_faq_blok_parent_id_idx" ON "_pois_v_blocks_faq_blok" USING btree ("_parent_id");
  CREATE INDEX "_pois_v_blocks_faq_blok_path_idx" ON "_pois_v_blocks_faq_blok" USING btree ("_path");
  CREATE INDEX "_pois_v_blocks_faq_blok_categorie_idx" ON "_pois_v_blocks_faq_blok" USING btree ("categorie_id");
  CREATE INDEX "_pois_v_blocks_citaat_order_idx" ON "_pois_v_blocks_citaat" USING btree ("_order");
  CREATE INDEX "_pois_v_blocks_citaat_parent_id_idx" ON "_pois_v_blocks_citaat" USING btree ("_parent_id");
  CREATE INDEX "_pois_v_blocks_citaat_path_idx" ON "_pois_v_blocks_citaat" USING btree ("_path");
  CREATE INDEX "_pois_v_blocks_citaat_foto_idx" ON "_pois_v_blocks_citaat" USING btree ("foto_id");
  CREATE INDEX "_pois_v_version_oude_slugs_order_idx" ON "_pois_v_version_oude_slugs" USING btree ("_order");
  CREATE INDEX "_pois_v_version_oude_slugs_parent_id_idx" ON "_pois_v_version_oude_slugs" USING btree ("_parent_id");
  CREATE INDEX "_pois_v_parent_idx" ON "_pois_v" USING btree ("parent_id");
  CREATE INDEX "_pois_v_version_version_slug_idx" ON "_pois_v" USING btree ("version_slug");
  CREATE INDEX "_pois_v_version_version_primaire_locatie_idx" ON "_pois_v" USING btree ("version_primaire_locatie_id");
  CREATE INDEX "_pois_v_version_version_image_idx" ON "_pois_v" USING btree ("version_image_id");
  CREATE INDEX "_pois_v_version_version_updated_at_idx" ON "_pois_v" USING btree ("version_updated_at");
  CREATE INDEX "_pois_v_version_version_created_at_idx" ON "_pois_v" USING btree ("version_created_at");
  CREATE INDEX "_pois_v_version_version__status_idx" ON "_pois_v" USING btree ("version__status");
  CREATE INDEX "_pois_v_created_at_idx" ON "_pois_v" USING btree ("created_at");
  CREATE INDEX "_pois_v_updated_at_idx" ON "_pois_v" USING btree ("updated_at");
  CREATE INDEX "_pois_v_latest_idx" ON "_pois_v" USING btree ("latest");
  CREATE INDEX "_pois_v_rels_order_idx" ON "_pois_v_rels" USING btree ("order");
  CREATE INDEX "_pois_v_rels_parent_idx" ON "_pois_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pois_v_rels_path_idx" ON "_pois_v_rels" USING btree ("path");
  CREATE INDEX "_pois_v_rels_locations_id_idx" ON "_pois_v_rels" USING btree ("locations_id");
  CREATE INDEX "_pois_v_rels_pages_id_idx" ON "_pois_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pois_v_rels_posts_id_idx" ON "_pois_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pois_v_rels_faq_id_idx" ON "_pois_v_rels" USING btree ("faq_id");
  CREATE UNIQUE INDEX "faq_categorieen_slug_idx" ON "faq_categorieen" USING btree ("slug");
  CREATE INDEX "faq_categorieen_updated_at_idx" ON "faq_categorieen" USING btree ("updated_at");
  CREATE INDEX "faq_categorieen_created_at_idx" ON "faq_categorieen" USING btree ("created_at");
  CREATE UNIQUE INDEX "nieuws_slug_idx" ON "nieuws" USING btree ("slug");
  CREATE INDEX "nieuws_hero_idx" ON "nieuws" USING btree ("hero_id");
  CREATE INDEX "nieuws_seo_seo_afbeelding_idx" ON "nieuws" USING btree ("seo_afbeelding_id");
  CREATE INDEX "nieuws_updated_at_idx" ON "nieuws" USING btree ("updated_at");
  CREATE INDEX "nieuws_created_at_idx" ON "nieuws" USING btree ("created_at");
  CREATE INDEX "nieuws__status_idx" ON "nieuws" USING btree ("_status");
  CREATE INDEX "nieuws_rels_order_idx" ON "nieuws_rels" USING btree ("order");
  CREATE INDEX "nieuws_rels_parent_idx" ON "nieuws_rels" USING btree ("parent_id");
  CREATE INDEX "nieuws_rels_path_idx" ON "nieuws_rels" USING btree ("path");
  CREATE INDEX "nieuws_rels_locations_id_idx" ON "nieuws_rels" USING btree ("locations_id");
  CREATE INDEX "nieuws_rels_steden_id_idx" ON "nieuws_rels" USING btree ("steden_id");
  CREATE INDEX "_nieuws_v_parent_idx" ON "_nieuws_v" USING btree ("parent_id");
  CREATE INDEX "_nieuws_v_version_version_slug_idx" ON "_nieuws_v" USING btree ("version_slug");
  CREATE INDEX "_nieuws_v_version_version_hero_idx" ON "_nieuws_v" USING btree ("version_hero_id");
  CREATE INDEX "_nieuws_v_version_seo_version_seo_afbeelding_idx" ON "_nieuws_v" USING btree ("version_seo_afbeelding_id");
  CREATE INDEX "_nieuws_v_version_version_updated_at_idx" ON "_nieuws_v" USING btree ("version_updated_at");
  CREATE INDEX "_nieuws_v_version_version_created_at_idx" ON "_nieuws_v" USING btree ("version_created_at");
  CREATE INDEX "_nieuws_v_version_version__status_idx" ON "_nieuws_v" USING btree ("version__status");
  CREATE INDEX "_nieuws_v_created_at_idx" ON "_nieuws_v" USING btree ("created_at");
  CREATE INDEX "_nieuws_v_updated_at_idx" ON "_nieuws_v" USING btree ("updated_at");
  CREATE INDEX "_nieuws_v_latest_idx" ON "_nieuws_v" USING btree ("latest");
  CREATE INDEX "_nieuws_v_rels_order_idx" ON "_nieuws_v_rels" USING btree ("order");
  CREATE INDEX "_nieuws_v_rels_parent_idx" ON "_nieuws_v_rels" USING btree ("parent_id");
  CREATE INDEX "_nieuws_v_rels_path_idx" ON "_nieuws_v_rels" USING btree ("path");
  CREATE INDEX "_nieuws_v_rels_locations_id_idx" ON "_nieuws_v_rels" USING btree ("locations_id");
  CREATE INDEX "_nieuws_v_rels_steden_id_idx" ON "_nieuws_v_rels" USING btree ("steden_id");
  CREATE UNIQUE INDEX "evenementen_slug_idx" ON "evenementen" USING btree ("slug");
  CREATE INDEX "evenementen_afbeelding_idx" ON "evenementen" USING btree ("afbeelding_id");
  CREATE INDEX "evenementen_updated_at_idx" ON "evenementen" USING btree ("updated_at");
  CREATE INDEX "evenementen_created_at_idx" ON "evenementen" USING btree ("created_at");
  CREATE INDEX "evenementen__status_idx" ON "evenementen" USING btree ("_status");
  CREATE INDEX "evenementen_rels_order_idx" ON "evenementen_rels" USING btree ("order");
  CREATE INDEX "evenementen_rels_parent_idx" ON "evenementen_rels" USING btree ("parent_id");
  CREATE INDEX "evenementen_rels_path_idx" ON "evenementen_rels" USING btree ("path");
  CREATE INDEX "evenementen_rels_locations_id_idx" ON "evenementen_rels" USING btree ("locations_id");
  CREATE INDEX "_evenementen_v_parent_idx" ON "_evenementen_v" USING btree ("parent_id");
  CREATE INDEX "_evenementen_v_version_version_slug_idx" ON "_evenementen_v" USING btree ("version_slug");
  CREATE INDEX "_evenementen_v_version_version_afbeelding_idx" ON "_evenementen_v" USING btree ("version_afbeelding_id");
  CREATE INDEX "_evenementen_v_version_version_updated_at_idx" ON "_evenementen_v" USING btree ("version_updated_at");
  CREATE INDEX "_evenementen_v_version_version_created_at_idx" ON "_evenementen_v" USING btree ("version_created_at");
  CREATE INDEX "_evenementen_v_version_version__status_idx" ON "_evenementen_v" USING btree ("version__status");
  CREATE INDEX "_evenementen_v_created_at_idx" ON "_evenementen_v" USING btree ("created_at");
  CREATE INDEX "_evenementen_v_updated_at_idx" ON "_evenementen_v" USING btree ("updated_at");
  CREATE INDEX "_evenementen_v_latest_idx" ON "_evenementen_v" USING btree ("latest");
  CREATE INDEX "_evenementen_v_rels_order_idx" ON "_evenementen_v_rels" USING btree ("order");
  CREATE INDEX "_evenementen_v_rels_parent_idx" ON "_evenementen_v_rels" USING btree ("parent_id");
  CREATE INDEX "_evenementen_v_rels_path_idx" ON "_evenementen_v_rels" USING btree ("path");
  CREATE INDEX "_evenementen_v_rels_locations_id_idx" ON "_evenementen_v_rels" USING btree ("locations_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_bovenliggende_pagina_id_pages_id_fk" FOREIGN KEY ("bovenliggende_pagina_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_bovenliggende_pagina_id_pages_id_fk" FOREIGN KEY ("version_bovenliggende_pagina_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_stad_id_steden_id_fk" FOREIGN KEY ("stad_id") REFERENCES "public"."steden"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_seo_afbeelding_id_media_id_fk" FOREIGN KEY ("seo_afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_stad_id_steden_id_fk" FOREIGN KEY ("version_stad_id") REFERENCES "public"."steden"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_seo_afbeelding_id_media_id_fk" FOREIGN KEY ("version_seo_afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pois" ADD CONSTRAINT "pois_primaire_locatie_id_locations_id_fk" FOREIGN KEY ("primaire_locatie_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pois_rels" ADD CONSTRAINT "pois_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pois_rels" ADD CONSTRAINT "pois_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pois_rels" ADD CONSTRAINT "pois_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq" ADD CONSTRAINT "faq_categorie_id_faq_categorieen_id_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."faq_categorieen"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_steden_fk" FOREIGN KEY ("steden_id") REFERENCES "public"."steden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pois_fk" FOREIGN KEY ("pois_id") REFERENCES "public"."pois"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_nieuws_fk" FOREIGN KEY ("nieuws_id") REFERENCES "public"."nieuws"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_steden_fk" FOREIGN KEY ("steden_id") REFERENCES "public"."steden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_categorieen_fk" FOREIGN KEY ("faq_categorieen_id") REFERENCES "public"."faq_categorieen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_nieuws_fk" FOREIGN KEY ("nieuws_id") REFERENCES "public"."nieuws"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_evenementen_fk" FOREIGN KEY ("evenementen_id") REFERENCES "public"."evenementen"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_bovenliggende_pagina_idx" ON "pages" USING btree ("bovenliggende_pagina_id");
  CREATE INDEX "pages_rels_faq_id_idx" ON "pages_rels" USING btree ("faq_id");
  CREATE INDEX "_pages_v_version_version_bovenliggende_pagina_idx" ON "_pages_v" USING btree ("version_bovenliggende_pagina_id");
  CREATE INDEX "_pages_v_rels_faq_id_idx" ON "_pages_v_rels" USING btree ("faq_id");
  CREATE INDEX "locations_stad_idx" ON "locations" USING btree ("stad_id");
  CREATE INDEX "locations_seo_seo_afbeelding_idx" ON "locations" USING btree ("seo_afbeelding_id");
  CREATE INDEX "locations_rels_pages_id_idx" ON "locations_rels" USING btree ("pages_id");
  CREATE INDEX "locations_rels_posts_id_idx" ON "locations_rels" USING btree ("posts_id");
  CREATE INDEX "_locations_v_version_version_stad_idx" ON "_locations_v" USING btree ("version_stad_id");
  CREATE INDEX "_locations_v_version_seo_version_seo_afbeelding_idx" ON "_locations_v" USING btree ("version_seo_afbeelding_id");
  CREATE INDEX "_locations_v_rels_pages_id_idx" ON "_locations_v_rels" USING btree ("pages_id");
  CREATE INDEX "_locations_v_rels_posts_id_idx" ON "_locations_v_rels" USING btree ("posts_id");
  CREATE UNIQUE INDEX "pois_slug_idx" ON "pois" USING btree ("slug");
  CREATE INDEX "pois_primaire_locatie_idx" ON "pois" USING btree ("primaire_locatie_id");
  CREATE INDEX "pois__status_idx" ON "pois" USING btree ("_status");
  CREATE INDEX "pois_rels_pages_id_idx" ON "pois_rels" USING btree ("pages_id");
  CREATE INDEX "pois_rels_posts_id_idx" ON "pois_rels" USING btree ("posts_id");
  CREATE INDEX "pois_rels_faq_id_idx" ON "pois_rels" USING btree ("faq_id");
  CREATE INDEX "faq_categorie_idx" ON "faq" USING btree ("categorie_id");
  CREATE INDEX "redirects_rels_steden_id_idx" ON "redirects_rels" USING btree ("steden_id");
  CREATE INDEX "redirects_rels_locations_id_idx" ON "redirects_rels" USING btree ("locations_id");
  CREATE INDEX "redirects_rels_pois_id_idx" ON "redirects_rels" USING btree ("pois_id");
  CREATE INDEX "redirects_rels_nieuws_id_idx" ON "redirects_rels" USING btree ("nieuws_id");
  CREATE INDEX "payload_locked_documents_rels_steden_id_idx" ON "payload_locked_documents_rels" USING btree ("steden_id");
  CREATE INDEX "payload_locked_documents_rels_faq_categorieen_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_categorieen_id");
  CREATE INDEX "payload_locked_documents_rels_nieuws_id_idx" ON "payload_locked_documents_rels" USING btree ("nieuws_id");
  CREATE INDEX "payload_locked_documents_rels_evenementen_id_idx" ON "payload_locked_documents_rels" USING btree ("evenementen_id");
  ALTER TABLE "pois" DROP COLUMN "distance_to_parking_meters";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "pois_rels" SET "path" = 'locations' WHERE "path" = 'extraLocaties';
  UPDATE "locations_rels" SET "path" = 'pois' WHERE "path" = 'poiPaginas';
  UPDATE "_locations_v_rels" SET "path" = 'version.pois' WHERE "path" = 'version.poiPaginas';
  ALTER TABLE "pages_blocks_usp_rij_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_usp_rij" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_citaat" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_blok" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_locatie_uitgelicht" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_usp_rij_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_usp_rij" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_citaat" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_blok" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_locatie_uitgelicht" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "steden_blocks_stad_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "steden_blocks_stad_locaties_lijst" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "steden_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "steden_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "steden_blocks_citaat" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "steden_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "steden_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "steden" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "steden_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_steden_v_blocks_stad_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_steden_v_blocks_stad_locaties_lijst" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_steden_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_steden_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_steden_v_blocks_citaat" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_steden_v_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_steden_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_steden_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_steden_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_faciliteiten" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_betaalmogelijkheden" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_pois_nabij" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_aeroparker_sync_tarieven" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_blocks_locatie_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_blocks_locatie_tarieven" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_blocks_locatie_faciliteiten" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_blocks_locatie_openingstijden" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_blocks_locatie_pois_nabij" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_blocks_locatie_kaart_producten" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_blocks_locatie_evenementen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_blocks_locatie_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_blocks_citaat" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_oude_slugs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_faciliteiten" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_betaalmogelijkheden" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_pois_nabij" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_aeroparker_sync_tarieven" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_blocks_locatie_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_blocks_locatie_tarieven" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_blocks_locatie_faciliteiten" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_blocks_locatie_openingstijden" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_blocks_locatie_pois_nabij" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_blocks_locatie_kaart_producten" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_blocks_locatie_evenementen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_blocks_locatie_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_blocks_citaat" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_oude_slugs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pois_blocks_poi_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pois_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pois_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pois_blocks_faq_blok" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pois_blocks_citaat" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pois_oude_slugs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pois_v_blocks_poi_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pois_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pois_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pois_v_blocks_faq_blok" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pois_v_blocks_citaat" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pois_v_version_oude_slugs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pois_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pois_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_categorieen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nieuws" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nieuws_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_nieuws_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_nieuws_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "evenementen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "evenementen_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_evenementen_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_evenementen_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_usp_rij_items" CASCADE;
  DROP TABLE "pages_blocks_usp_rij" CASCADE;
  DROP TABLE "pages_blocks_citaat" CASCADE;
  DROP TABLE "pages_blocks_faq_blok" CASCADE;
  DROP TABLE "pages_blocks_locatie_uitgelicht" CASCADE;
  DROP TABLE "_pages_v_blocks_usp_rij_items" CASCADE;
  DROP TABLE "_pages_v_blocks_usp_rij" CASCADE;
  DROP TABLE "_pages_v_blocks_citaat" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_blok" CASCADE;
  DROP TABLE "_pages_v_blocks_locatie_uitgelicht" CASCADE;
  DROP TABLE "steden_blocks_stad_hero" CASCADE;
  DROP TABLE "steden_blocks_stad_locaties_lijst" CASCADE;
  DROP TABLE "steden_blocks_content_columns" CASCADE;
  DROP TABLE "steden_blocks_content" CASCADE;
  DROP TABLE "steden_blocks_citaat" CASCADE;
  DROP TABLE "steden_blocks_cta_links" CASCADE;
  DROP TABLE "steden_blocks_cta" CASCADE;
  DROP TABLE "steden" CASCADE;
  DROP TABLE "steden_rels" CASCADE;
  DROP TABLE "_steden_v_blocks_stad_hero" CASCADE;
  DROP TABLE "_steden_v_blocks_stad_locaties_lijst" CASCADE;
  DROP TABLE "_steden_v_blocks_content_columns" CASCADE;
  DROP TABLE "_steden_v_blocks_content" CASCADE;
  DROP TABLE "_steden_v_blocks_citaat" CASCADE;
  DROP TABLE "_steden_v_blocks_cta_links" CASCADE;
  DROP TABLE "_steden_v_blocks_cta" CASCADE;
  DROP TABLE "_steden_v" CASCADE;
  DROP TABLE "_steden_v_rels" CASCADE;
  DROP TABLE "locations_faciliteiten" CASCADE;
  DROP TABLE "locations_betaalmogelijkheden" CASCADE;
  DROP TABLE "locations_pois_nabij" CASCADE;
  DROP TABLE "locations_aeroparker_sync_tarieven" CASCADE;
  DROP TABLE "locations_blocks_locatie_hero" CASCADE;
  DROP TABLE "locations_blocks_locatie_tarieven" CASCADE;
  DROP TABLE "locations_blocks_locatie_faciliteiten" CASCADE;
  DROP TABLE "locations_blocks_locatie_openingstijden" CASCADE;
  DROP TABLE "locations_blocks_locatie_pois_nabij" CASCADE;
  DROP TABLE "locations_blocks_locatie_kaart_producten" CASCADE;
  DROP TABLE "locations_blocks_locatie_evenementen" CASCADE;
  DROP TABLE "locations_blocks_locatie_faq" CASCADE;
  DROP TABLE "locations_blocks_content_columns" CASCADE;
  DROP TABLE "locations_blocks_content" CASCADE;
  DROP TABLE "locations_blocks_citaat" CASCADE;
  DROP TABLE "locations_oude_slugs" CASCADE;
  DROP TABLE "_locations_v_version_faciliteiten" CASCADE;
  DROP TABLE "_locations_v_version_betaalmogelijkheden" CASCADE;
  DROP TABLE "_locations_v_version_pois_nabij" CASCADE;
  DROP TABLE "_locations_v_version_aeroparker_sync_tarieven" CASCADE;
  DROP TABLE "_locations_v_blocks_locatie_hero" CASCADE;
  DROP TABLE "_locations_v_blocks_locatie_tarieven" CASCADE;
  DROP TABLE "_locations_v_blocks_locatie_faciliteiten" CASCADE;
  DROP TABLE "_locations_v_blocks_locatie_openingstijden" CASCADE;
  DROP TABLE "_locations_v_blocks_locatie_pois_nabij" CASCADE;
  DROP TABLE "_locations_v_blocks_locatie_kaart_producten" CASCADE;
  DROP TABLE "_locations_v_blocks_locatie_evenementen" CASCADE;
  DROP TABLE "_locations_v_blocks_locatie_faq" CASCADE;
  DROP TABLE "_locations_v_blocks_content_columns" CASCADE;
  DROP TABLE "_locations_v_blocks_content" CASCADE;
  DROP TABLE "_locations_v_blocks_citaat" CASCADE;
  DROP TABLE "_locations_v_version_oude_slugs" CASCADE;
  DROP TABLE "pois_blocks_poi_hero" CASCADE;
  DROP TABLE "pois_blocks_content_columns" CASCADE;
  DROP TABLE "pois_blocks_content" CASCADE;
  DROP TABLE "pois_blocks_faq_blok" CASCADE;
  DROP TABLE "pois_blocks_citaat" CASCADE;
  DROP TABLE "pois_oude_slugs" CASCADE;
  DROP TABLE "_pois_v_blocks_poi_hero" CASCADE;
  DROP TABLE "_pois_v_blocks_content_columns" CASCADE;
  DROP TABLE "_pois_v_blocks_content" CASCADE;
  DROP TABLE "_pois_v_blocks_faq_blok" CASCADE;
  DROP TABLE "_pois_v_blocks_citaat" CASCADE;
  DROP TABLE "_pois_v_version_oude_slugs" CASCADE;
  DROP TABLE "_pois_v" CASCADE;
  DROP TABLE "_pois_v_rels" CASCADE;
  DROP TABLE "faq_categorieen" CASCADE;
  DROP TABLE "nieuws" CASCADE;
  DROP TABLE "nieuws_rels" CASCADE;
  DROP TABLE "_nieuws_v" CASCADE;
  DROP TABLE "_nieuws_v_rels" CASCADE;
  DROP TABLE "evenementen" CASCADE;
  DROP TABLE "evenementen_rels" CASCADE;
  DROP TABLE "_evenementen_v" CASCADE;
  DROP TABLE "_evenementen_v_rels" CASCADE;
  ALTER TABLE "pois" RENAME COLUMN "coordinaten" TO "coordinates";
  ALTER TABLE "pois" RENAME COLUMN "intro" TO "description";
  ALTER TABLE "faq" RENAME COLUMN "volgorde" TO "order";
  ALTER TABLE "pages" DROP CONSTRAINT IF EXISTS "pages_bovenliggende_pagina_id_pages_id_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT IF EXISTS "pages_rels_faq_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT IF EXISTS "_pages_v_version_bovenliggende_pagina_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT IF EXISTS "_pages_v_rels_faq_fk";
  
  ALTER TABLE "locations" DROP CONSTRAINT IF EXISTS "locations_stad_id_steden_id_fk";
  
  ALTER TABLE "locations" DROP CONSTRAINT IF EXISTS "locations_seo_afbeelding_id_media_id_fk";
  
  ALTER TABLE "locations_rels" DROP CONSTRAINT IF EXISTS "locations_rels_pages_fk";
  
  ALTER TABLE "locations_rels" DROP CONSTRAINT IF EXISTS "locations_rels_posts_fk";
  
  ALTER TABLE "_locations_v" DROP CONSTRAINT IF EXISTS "_locations_v_version_stad_id_steden_id_fk";
  
  ALTER TABLE "_locations_v" DROP CONSTRAINT IF EXISTS "_locations_v_version_seo_afbeelding_id_media_id_fk";
  
  ALTER TABLE "_locations_v_rels" DROP CONSTRAINT IF EXISTS "_locations_v_rels_pages_fk";
  
  ALTER TABLE "_locations_v_rels" DROP CONSTRAINT IF EXISTS "_locations_v_rels_posts_fk";
  
  ALTER TABLE "pois" DROP CONSTRAINT IF EXISTS "pois_primaire_locatie_id_locations_id_fk";
  
  ALTER TABLE "pois_rels" DROP CONSTRAINT IF EXISTS "pois_rels_pages_fk";
  
  ALTER TABLE "pois_rels" DROP CONSTRAINT IF EXISTS "pois_rels_posts_fk";
  
  ALTER TABLE "pois_rels" DROP CONSTRAINT IF EXISTS "pois_rels_faq_fk";
  
  ALTER TABLE "faq" DROP CONSTRAINT IF EXISTS "faq_categorie_id_faq_categorieen_id_fk";
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT IF EXISTS "redirects_rels_steden_fk";
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT IF EXISTS "redirects_rels_locations_fk";
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT IF EXISTS "redirects_rels_pois_fk";
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT IF EXISTS "redirects_rels_nieuws_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_steden_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_faq_categorieen_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_nieuws_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_evenementen_fk";
  
  DROP INDEX IF EXISTS "pages_bovenliggende_pagina_idx";
  DROP INDEX IF EXISTS "pages_rels_faq_id_idx";
  DROP INDEX IF EXISTS "_pages_v_version_version_bovenliggende_pagina_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_faq_id_idx";
  DROP INDEX IF EXISTS "locations_stad_idx";
  DROP INDEX IF EXISTS "locations_seo_seo_afbeelding_idx";
  DROP INDEX IF EXISTS "locations_rels_pages_id_idx";
  DROP INDEX IF EXISTS "locations_rels_posts_id_idx";
  DROP INDEX IF EXISTS "_locations_v_version_version_stad_idx";
  DROP INDEX IF EXISTS "_locations_v_version_seo_version_seo_afbeelding_idx";
  DROP INDEX IF EXISTS "_locations_v_rels_pages_id_idx";
  DROP INDEX IF EXISTS "_locations_v_rels_posts_id_idx";
  DROP INDEX IF EXISTS "pois_slug_idx";
  DROP INDEX IF EXISTS "pois_primaire_locatie_idx";
  DROP INDEX IF EXISTS "pois__status_idx";
  DROP INDEX IF EXISTS "pois_rels_pages_id_idx";
  DROP INDEX IF EXISTS "pois_rels_posts_id_idx";
  DROP INDEX IF EXISTS "pois_rels_faq_id_idx";
  DROP INDEX IF EXISTS "faq_categorie_idx";
  DROP INDEX IF EXISTS "redirects_rels_steden_id_idx";
  DROP INDEX IF EXISTS "redirects_rels_locations_id_idx";
  DROP INDEX IF EXISTS "redirects_rels_pois_id_idx";
  DROP INDEX IF EXISTS "redirects_rels_nieuws_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_steden_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_faq_categorieen_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_nieuws_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_evenementen_id_idx";
  ALTER TABLE "pois" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "pois" ALTER COLUMN "category" SET NOT NULL;
  ALTER TABLE "pois" ADD COLUMN "distance_to_parking_meters" numeric;
  ALTER TABLE "pages" DROP COLUMN "bovenliggende_pagina_id";
  ALTER TABLE "pages_rels" DROP COLUMN "faq_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_bovenliggende_pagina_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "faq_id";
  ALTER TABLE "locations_images" DROP COLUMN "alt";
  ALTER TABLE "locations" DROP COLUMN "stad_id";
  ALTER TABLE "locations" DROP COLUMN "address_huisnummer";
  ALTER TABLE "locations" DROP COLUMN "intro";
  ALTER TABLE "locations" DROP COLUMN "soort";
  ALTER TABLE "locations" DROP COLUMN "loopafstand";
  ALTER TABLE "locations" DROP COLUMN "uren_open247";
  ALTER TABLE "locations" DROP COLUMN "uren_doordeweeks";
  ALTER TABLE "locations" DROP COLUMN "uren_zaterdag";
  ALTER TABLE "locations" DROP COLUMN "uren_zondag";
  ALTER TABLE "locations" DROP COLUMN "reserveerbaar";
  ALTER TABLE "locations" DROP COLUMN "waardekaart";
  ALTER TABLE "locations" DROP COLUMN "strippenkaart";
  ALTER TABLE "locations" DROP COLUMN "inrit";
  ALTER TABLE "locations" DROP COLUMN "uitrit";
  ALTER TABLE "locations" DROP COLUMN "route";
  ALTER TABLE "locations" DROP COLUMN "aeroparker_sync_dagprijs";
  ALTER TABLE "locations" DROP COLUMN "aeroparker_sync_laatste_sync";
  ALTER TABLE "locations" DROP COLUMN "aeroparker_sync_sync_status";
  ALTER TABLE "locations" DROP COLUMN "aeroparker_sync_sync_melding";
  ALTER TABLE "locations" DROP COLUMN "seo_titel";
  ALTER TABLE "locations" DROP COLUMN "seo_omschrijving";
  ALTER TABLE "locations" DROP COLUMN "seo_afbeelding_id";
  ALTER TABLE "locations" DROP COLUMN "seo_geen_index";
  ALTER TABLE "locations" DROP COLUMN "oude_id";
  ALTER TABLE "locations_rels" DROP COLUMN "pages_id";
  ALTER TABLE "locations_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_locations_v_version_images" DROP COLUMN "alt";
  ALTER TABLE "_locations_v" DROP COLUMN "version_stad_id";
  ALTER TABLE "_locations_v" DROP COLUMN "version_address_huisnummer";
  ALTER TABLE "_locations_v" DROP COLUMN "version_intro";
  ALTER TABLE "_locations_v" DROP COLUMN "version_soort";
  ALTER TABLE "_locations_v" DROP COLUMN "version_loopafstand";
  ALTER TABLE "_locations_v" DROP COLUMN "version_uren_open247";
  ALTER TABLE "_locations_v" DROP COLUMN "version_uren_doordeweeks";
  ALTER TABLE "_locations_v" DROP COLUMN "version_uren_zaterdag";
  ALTER TABLE "_locations_v" DROP COLUMN "version_uren_zondag";
  ALTER TABLE "_locations_v" DROP COLUMN "version_reserveerbaar";
  ALTER TABLE "_locations_v" DROP COLUMN "version_waardekaart";
  ALTER TABLE "_locations_v" DROP COLUMN "version_strippenkaart";
  ALTER TABLE "_locations_v" DROP COLUMN "version_inrit";
  ALTER TABLE "_locations_v" DROP COLUMN "version_uitrit";
  ALTER TABLE "_locations_v" DROP COLUMN "version_route";
  ALTER TABLE "_locations_v" DROP COLUMN "version_aeroparker_sync_dagprijs";
  ALTER TABLE "_locations_v" DROP COLUMN "version_aeroparker_sync_laatste_sync";
  ALTER TABLE "_locations_v" DROP COLUMN "version_aeroparker_sync_sync_status";
  ALTER TABLE "_locations_v" DROP COLUMN "version_aeroparker_sync_sync_melding";
  ALTER TABLE "_locations_v" DROP COLUMN "version_seo_titel";
  ALTER TABLE "_locations_v" DROP COLUMN "version_seo_omschrijving";
  ALTER TABLE "_locations_v" DROP COLUMN "version_seo_afbeelding_id";
  ALTER TABLE "_locations_v" DROP COLUMN "version_seo_geen_index";
  ALTER TABLE "_locations_v" DROP COLUMN "version_oude_id";
  ALTER TABLE "_locations_v_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_locations_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "pois" DROP COLUMN "titel";
  ALTER TABLE "pois" DROP COLUMN "slug";
  ALTER TABLE "pois" DROP COLUMN "primaire_locatie_id";
  ALTER TABLE "pois" DROP COLUMN "loopafstand";
  ALTER TABLE "pois" DROP COLUMN "seo_titel";
  ALTER TABLE "pois" DROP COLUMN "seo_omschrijving";
  ALTER TABLE "pois" DROP COLUMN "seo_geen_index";
  ALTER TABLE "pois" DROP COLUMN "published_at";
  ALTER TABLE "pois" DROP COLUMN "_status";
  ALTER TABLE "pois_rels" DROP COLUMN "pages_id";
  ALTER TABLE "pois_rels" DROP COLUMN "posts_id";
  ALTER TABLE "pois_rels" DROP COLUMN "faq_id";
  ALTER TABLE "faq" DROP COLUMN "categorie_id";
  ALTER TABLE "redirects_rels" DROP COLUMN "steden_id";
  ALTER TABLE "redirects_rels" DROP COLUMN "locations_id";
  ALTER TABLE "redirects_rels" DROP COLUMN "pois_id";
  ALTER TABLE "redirects_rels" DROP COLUMN "nieuws_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "steden_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faq_categorieen_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "nieuws_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "evenementen_id";
  DROP TYPE "public"."enum_pages_blocks_usp_rij_items_icoon";
  DROP TYPE "public"."enum_pages_blocks_faq_blok_bron";
  DROP TYPE "public"."enum__pages_v_blocks_usp_rij_items_icoon";
  DROP TYPE "public"."enum__pages_v_blocks_faq_blok_bron";
  DROP TYPE "public"."enum_steden_blocks_content_columns_size";
  DROP TYPE "public"."enum_steden_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_steden_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_steden_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_steden_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_steden_status";
  DROP TYPE "public"."enum__steden_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__steden_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__steden_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__steden_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__steden_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__steden_v_version_status";
  DROP TYPE "public"."enum_locations_blocks_content_columns_size";
  DROP TYPE "public"."enum_locations_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_locations_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_locations_soort";
  DROP TYPE "public"."enum_locations_aeroparker_sync_sync_status";
  DROP TYPE "public"."enum__locations_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__locations_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__locations_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__locations_v_version_soort";
  DROP TYPE "public"."enum__locations_v_version_aeroparker_sync_sync_status";
  DROP TYPE "public"."enum_pois_blocks_content_columns_size";
  DROP TYPE "public"."enum_pois_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_pois_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_pois_blocks_faq_blok_bron";
  DROP TYPE "public"."enum_pois_status";
  DROP TYPE "public"."enum__pois_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__pois_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__pois_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__pois_v_blocks_faq_blok_bron";
  DROP TYPE "public"."enum__pois_v_version_category";
  DROP TYPE "public"."enum__pois_v_version_status";
  DROP TYPE "public"."enum_nieuws_status";
  DROP TYPE "public"."enum__nieuws_v_version_status";
  DROP TYPE "public"."enum_evenementen_kleur";
  DROP TYPE "public"."enum_evenementen_status";
  DROP TYPE "public"."enum__evenementen_v_version_kleur";
  DROP TYPE "public"."enum__evenementen_v_version_status";`)
}
