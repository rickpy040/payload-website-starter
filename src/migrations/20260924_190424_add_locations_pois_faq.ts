import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_locations_amenities" AS ENUM('covered', 'ev-charging', 'disabled-access', '24-7', 'guarded');
  CREATE TYPE "public"."enum_locations_terminals_type" AS ENUM('inrit', 'uitrit', 'betaal');
  CREATE TYPE "public"."enum_locations_city" AS ENUM('eindhoven', 'rotterdam', 'amsterdam', 'den-haag', 'utrecht', 'tilburg', 'heerhugowaard', 'zoetermeer', 'almere');
  CREATE TYPE "public"."enum_locations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__locations_v_version_amenities" AS ENUM('covered', 'ev-charging', 'disabled-access', '24-7', 'guarded');
  CREATE TYPE "public"."enum__locations_v_version_terminals_type" AS ENUM('inrit', 'uitrit', 'betaal');
  CREATE TYPE "public"."enum__locations_v_version_city" AS ENUM('eindhoven', 'rotterdam', 'amsterdam', 'den-haag', 'utrecht', 'tilburg', 'heerhugowaard', 'zoetermeer', 'almere');
  CREATE TYPE "public"."enum__locations_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pois_category" AS ENUM('restaurant', 'shop', 'hotel', 'attraction', 'transit', 'venue');
  CREATE TYPE "public"."enum_faq_category" AS ENUM('algemeen', 'betalen', 'abonnementen', 'reserveren', 'zakelijk');
  CREATE TABLE "locations_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "locations_amenities" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_locations_amenities",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "locations_terminals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"type" "enum_locations_terminals_type"
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"city" "enum_locations_city",
  	"address_street" varchar,
  	"address_postal_code" varchar,
  	"address_city_name" varchar,
  	"coordinates" geometry(Point),
  	"aeroparker_product_id" varchar,
  	"description" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_locations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "locations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pois_id" integer,
  	"faq_id" integer
  );
  
  CREATE TABLE "_locations_v_version_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_version_amenities" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__locations_v_version_amenities",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_locations_v_version_terminals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"type" "enum__locations_v_version_terminals_type",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_city" "enum__locations_v_version_city",
  	"version_address_street" varchar,
  	"version_address_postal_code" varchar,
  	"version_address_city_name" varchar,
  	"version_coordinates" geometry(Point),
  	"version_aeroparker_product_id" varchar,
  	"version_description" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__locations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_locations_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pois_id" integer,
  	"faq_id" integer
  );
  
  CREATE TABLE "pois" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"category" "enum_pois_category" NOT NULL,
  	"coordinates" geometry(Point),
  	"address" varchar,
  	"distance_to_parking_meters" numeric,
  	"description" varchar,
  	"image_id" integer,
  	"external_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pois_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locations_id" integer
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"category" "enum_faq_category",
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locations_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "locations_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pois_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faq_id" integer;
  ALTER TABLE "locations_images" ADD CONSTRAINT "locations_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_images" ADD CONSTRAINT "locations_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_amenities" ADD CONSTRAINT "locations_amenities_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_terminals" ADD CONSTRAINT "locations_terminals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_pois_fk" FOREIGN KEY ("pois_id") REFERENCES "public"."pois"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_images" ADD CONSTRAINT "_locations_v_version_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v_version_images" ADD CONSTRAINT "_locations_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_amenities" ADD CONSTRAINT "_locations_v_version_amenities_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_terminals" ADD CONSTRAINT "_locations_v_version_terminals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_parent_id_locations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_pois_fk" FOREIGN KEY ("pois_id") REFERENCES "public"."pois"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pois" ADD CONSTRAINT "pois_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pois_rels" ADD CONSTRAINT "pois_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pois"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pois_rels" ADD CONSTRAINT "pois_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_rels" ADD CONSTRAINT "faq_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_rels" ADD CONSTRAINT "faq_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "locations_images_order_idx" ON "locations_images" USING btree ("_order");
  CREATE INDEX "locations_images_parent_id_idx" ON "locations_images" USING btree ("_parent_id");
  CREATE INDEX "locations_images_image_idx" ON "locations_images" USING btree ("image_id");
  CREATE INDEX "locations_amenities_order_idx" ON "locations_amenities" USING btree ("order");
  CREATE INDEX "locations_amenities_parent_idx" ON "locations_amenities" USING btree ("parent_id");
  CREATE INDEX "locations_terminals_order_idx" ON "locations_terminals" USING btree ("_order");
  CREATE INDEX "locations_terminals_parent_id_idx" ON "locations_terminals" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "locations_slug_idx" ON "locations" USING btree ("slug");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE INDEX "locations__status_idx" ON "locations" USING btree ("_status");
  CREATE INDEX "locations_rels_order_idx" ON "locations_rels" USING btree ("order");
  CREATE INDEX "locations_rels_parent_idx" ON "locations_rels" USING btree ("parent_id");
  CREATE INDEX "locations_rels_path_idx" ON "locations_rels" USING btree ("path");
  CREATE INDEX "locations_rels_pois_id_idx" ON "locations_rels" USING btree ("pois_id");
  CREATE INDEX "locations_rels_faq_id_idx" ON "locations_rels" USING btree ("faq_id");
  CREATE INDEX "_locations_v_version_images_order_idx" ON "_locations_v_version_images" USING btree ("_order");
  CREATE INDEX "_locations_v_version_images_parent_id_idx" ON "_locations_v_version_images" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_images_image_idx" ON "_locations_v_version_images" USING btree ("image_id");
  CREATE INDEX "_locations_v_version_amenities_order_idx" ON "_locations_v_version_amenities" USING btree ("order");
  CREATE INDEX "_locations_v_version_amenities_parent_idx" ON "_locations_v_version_amenities" USING btree ("parent_id");
  CREATE INDEX "_locations_v_version_terminals_order_idx" ON "_locations_v_version_terminals" USING btree ("_order");
  CREATE INDEX "_locations_v_version_terminals_parent_id_idx" ON "_locations_v_version_terminals" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_parent_idx" ON "_locations_v" USING btree ("parent_id");
  CREATE INDEX "_locations_v_version_version_slug_idx" ON "_locations_v" USING btree ("version_slug");
  CREATE INDEX "_locations_v_version_version_updated_at_idx" ON "_locations_v" USING btree ("version_updated_at");
  CREATE INDEX "_locations_v_version_version_created_at_idx" ON "_locations_v" USING btree ("version_created_at");
  CREATE INDEX "_locations_v_version_version__status_idx" ON "_locations_v" USING btree ("version__status");
  CREATE INDEX "_locations_v_created_at_idx" ON "_locations_v" USING btree ("created_at");
  CREATE INDEX "_locations_v_updated_at_idx" ON "_locations_v" USING btree ("updated_at");
  CREATE INDEX "_locations_v_latest_idx" ON "_locations_v" USING btree ("latest");
  CREATE INDEX "_locations_v_rels_order_idx" ON "_locations_v_rels" USING btree ("order");
  CREATE INDEX "_locations_v_rels_parent_idx" ON "_locations_v_rels" USING btree ("parent_id");
  CREATE INDEX "_locations_v_rels_path_idx" ON "_locations_v_rels" USING btree ("path");
  CREATE INDEX "_locations_v_rels_pois_id_idx" ON "_locations_v_rels" USING btree ("pois_id");
  CREATE INDEX "_locations_v_rels_faq_id_idx" ON "_locations_v_rels" USING btree ("faq_id");
  CREATE INDEX "pois_image_idx" ON "pois" USING btree ("image_id");
  CREATE INDEX "pois_updated_at_idx" ON "pois" USING btree ("updated_at");
  CREATE INDEX "pois_created_at_idx" ON "pois" USING btree ("created_at");
  CREATE INDEX "pois_rels_order_idx" ON "pois_rels" USING btree ("order");
  CREATE INDEX "pois_rels_parent_idx" ON "pois_rels" USING btree ("parent_id");
  CREATE INDEX "pois_rels_path_idx" ON "pois_rels" USING btree ("path");
  CREATE INDEX "pois_rels_locations_id_idx" ON "pois_rels" USING btree ("locations_id");
  CREATE INDEX "faq_updated_at_idx" ON "faq" USING btree ("updated_at");
  CREATE INDEX "faq_created_at_idx" ON "faq" USING btree ("created_at");
  CREATE INDEX "faq_rels_order_idx" ON "faq_rels" USING btree ("order");
  CREATE INDEX "faq_rels_parent_idx" ON "faq_rels" USING btree ("parent_id");
  CREATE INDEX "faq_rels_path_idx" ON "faq_rels" USING btree ("path");
  CREATE INDEX "faq_rels_locations_id_idx" ON "faq_rels" USING btree ("locations_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pois_fk" FOREIGN KEY ("pois_id") REFERENCES "public"."pois"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_locked_documents_rels_pois_id_idx" ON "payload_locked_documents_rels" USING btree ("pois_id");
  CREATE INDEX "payload_locked_documents_rels_faq_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_id");
  ALTER TABLE "media" DROP COLUMN "_objectkey";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_amenities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_terminals" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_amenities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_terminals" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pois" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pois_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "locations_images" CASCADE;
  DROP TABLE "locations_amenities" CASCADE;
  DROP TABLE "locations_terminals" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "locations_rels" CASCADE;
  DROP TABLE "_locations_v_version_images" CASCADE;
  DROP TABLE "_locations_v_version_amenities" CASCADE;
  DROP TABLE "_locations_v_version_terminals" CASCADE;
  DROP TABLE "_locations_v" CASCADE;
  DROP TABLE "_locations_v_rels" CASCADE;
  DROP TABLE "pois" CASCADE;
  DROP TABLE "pois_rels" CASCADE;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "faq_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_locations_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pois_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faq_fk";
  
  DROP INDEX "payload_locked_documents_rels_locations_id_idx";
  DROP INDEX "payload_locked_documents_rels_pois_id_idx";
  DROP INDEX "payload_locked_documents_rels_faq_id_idx";
  ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "locations_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pois_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faq_id";
  DROP TYPE "public"."enum_locations_amenities";
  DROP TYPE "public"."enum_locations_terminals_type";
  DROP TYPE "public"."enum_locations_city";
  DROP TYPE "public"."enum_locations_status";
  DROP TYPE "public"."enum__locations_v_version_amenities";
  DROP TYPE "public"."enum__locations_v_version_terminals_type";
  DROP TYPE "public"."enum__locations_v_version_city";
  DROP TYPE "public"."enum__locations_v_version_status";
  DROP TYPE "public"."enum_pois_category";
  DROP TYPE "public"."enum_faq_category";`)
}
