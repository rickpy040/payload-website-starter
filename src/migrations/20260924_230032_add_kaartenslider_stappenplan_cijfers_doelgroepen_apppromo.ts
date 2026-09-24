import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_kaarten_slider_kaarten" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"afbeelding_id" integer,
  	"titel" varchar,
  	"tekst" varchar
  );
  
  CREATE TABLE "pages_blocks_kaarten_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stappen_plan_stappen" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar
  );
  
  CREATE TABLE "pages_blocks_stappen_plan" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cijfers_rij_cijfers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"waarde" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_cijfers_rij" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_doelgroepen_blok_groepen_punten" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tekst" varchar
  );
  
  CREATE TABLE "pages_blocks_doelgroepen_blok_groepen" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_doelgroepen_blok" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_app_promo_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar
  );
  
  CREATE TABLE "pages_blocks_app_promo_knoppen" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_app_promo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"subtitel" varchar,
  	"afbeelding_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_kaarten_slider_kaarten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"afbeelding_id" integer,
  	"titel" varchar,
  	"tekst" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_kaarten_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stappen_plan_stappen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stappen_plan" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cijfers_rij_cijfers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"waarde" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cijfers_rij" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_doelgroepen_blok_groepen_punten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tekst" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_doelgroepen_blok_groepen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"link_label" varchar,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_doelgroepen_blok" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_app_promo_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"tekst" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_app_promo_knoppen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_app_promo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"subtitel" varchar,
  	"afbeelding_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_kaarten_slider_kaarten" ADD CONSTRAINT "pages_blocks_kaarten_slider_kaarten_afbeelding_id_media_id_fk" FOREIGN KEY ("afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_kaarten_slider_kaarten" ADD CONSTRAINT "pages_blocks_kaarten_slider_kaarten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_kaarten_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_kaarten_slider" ADD CONSTRAINT "pages_blocks_kaarten_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stappen_plan_stappen" ADD CONSTRAINT "pages_blocks_stappen_plan_stappen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stappen_plan"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stappen_plan" ADD CONSTRAINT "pages_blocks_stappen_plan_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cijfers_rij_cijfers" ADD CONSTRAINT "pages_blocks_cijfers_rij_cijfers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cijfers_rij"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cijfers_rij" ADD CONSTRAINT "pages_blocks_cijfers_rij_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_doelgroepen_blok_groepen_punten" ADD CONSTRAINT "pages_blocks_doelgroepen_blok_groepen_punten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_doelgroepen_blok_groepen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_doelgroepen_blok_groepen" ADD CONSTRAINT "pages_blocks_doelgroepen_blok_groepen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_doelgroepen_blok"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_doelgroepen_blok" ADD CONSTRAINT "pages_blocks_doelgroepen_blok_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_app_promo_features" ADD CONSTRAINT "pages_blocks_app_promo_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_app_promo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_app_promo_knoppen" ADD CONSTRAINT "pages_blocks_app_promo_knoppen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_app_promo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_app_promo" ADD CONSTRAINT "pages_blocks_app_promo_afbeelding_id_media_id_fk" FOREIGN KEY ("afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_app_promo" ADD CONSTRAINT "pages_blocks_app_promo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_kaarten_slider_kaarten" ADD CONSTRAINT "_pages_v_blocks_kaarten_slider_kaarten_afbeelding_id_media_id_fk" FOREIGN KEY ("afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_kaarten_slider_kaarten" ADD CONSTRAINT "_pages_v_blocks_kaarten_slider_kaarten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_kaarten_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_kaarten_slider" ADD CONSTRAINT "_pages_v_blocks_kaarten_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stappen_plan_stappen" ADD CONSTRAINT "_pages_v_blocks_stappen_plan_stappen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stappen_plan"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stappen_plan" ADD CONSTRAINT "_pages_v_blocks_stappen_plan_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cijfers_rij_cijfers" ADD CONSTRAINT "_pages_v_blocks_cijfers_rij_cijfers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cijfers_rij"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cijfers_rij" ADD CONSTRAINT "_pages_v_blocks_cijfers_rij_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_doelgroepen_blok_groepen_punten" ADD CONSTRAINT "_pages_v_blocks_doelgroepen_blok_groepen_punten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_doelgroepen_blok_groepen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_doelgroepen_blok_groepen" ADD CONSTRAINT "_pages_v_blocks_doelgroepen_blok_groepen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_doelgroepen_blok"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_doelgroepen_blok" ADD CONSTRAINT "_pages_v_blocks_doelgroepen_blok_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_app_promo_features" ADD CONSTRAINT "_pages_v_blocks_app_promo_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_app_promo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_app_promo_knoppen" ADD CONSTRAINT "_pages_v_blocks_app_promo_knoppen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_app_promo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_app_promo" ADD CONSTRAINT "_pages_v_blocks_app_promo_afbeelding_id_media_id_fk" FOREIGN KEY ("afbeelding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_app_promo" ADD CONSTRAINT "_pages_v_blocks_app_promo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_kaarten_slider_kaarten_order_idx" ON "pages_blocks_kaarten_slider_kaarten" USING btree ("_order");
  CREATE INDEX "pages_blocks_kaarten_slider_kaarten_parent_id_idx" ON "pages_blocks_kaarten_slider_kaarten" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_kaarten_slider_kaarten_afbeelding_idx" ON "pages_blocks_kaarten_slider_kaarten" USING btree ("afbeelding_id");
  CREATE INDEX "pages_blocks_kaarten_slider_order_idx" ON "pages_blocks_kaarten_slider" USING btree ("_order");
  CREATE INDEX "pages_blocks_kaarten_slider_parent_id_idx" ON "pages_blocks_kaarten_slider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_kaarten_slider_path_idx" ON "pages_blocks_kaarten_slider" USING btree ("_path");
  CREATE INDEX "pages_blocks_stappen_plan_stappen_order_idx" ON "pages_blocks_stappen_plan_stappen" USING btree ("_order");
  CREATE INDEX "pages_blocks_stappen_plan_stappen_parent_id_idx" ON "pages_blocks_stappen_plan_stappen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stappen_plan_order_idx" ON "pages_blocks_stappen_plan" USING btree ("_order");
  CREATE INDEX "pages_blocks_stappen_plan_parent_id_idx" ON "pages_blocks_stappen_plan" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stappen_plan_path_idx" ON "pages_blocks_stappen_plan" USING btree ("_path");
  CREATE INDEX "pages_blocks_cijfers_rij_cijfers_order_idx" ON "pages_blocks_cijfers_rij_cijfers" USING btree ("_order");
  CREATE INDEX "pages_blocks_cijfers_rij_cijfers_parent_id_idx" ON "pages_blocks_cijfers_rij_cijfers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cijfers_rij_order_idx" ON "pages_blocks_cijfers_rij" USING btree ("_order");
  CREATE INDEX "pages_blocks_cijfers_rij_parent_id_idx" ON "pages_blocks_cijfers_rij" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cijfers_rij_path_idx" ON "pages_blocks_cijfers_rij" USING btree ("_path");
  CREATE INDEX "pages_blocks_doelgroepen_blok_groepen_punten_order_idx" ON "pages_blocks_doelgroepen_blok_groepen_punten" USING btree ("_order");
  CREATE INDEX "pages_blocks_doelgroepen_blok_groepen_punten_parent_id_idx" ON "pages_blocks_doelgroepen_blok_groepen_punten" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_doelgroepen_blok_groepen_order_idx" ON "pages_blocks_doelgroepen_blok_groepen" USING btree ("_order");
  CREATE INDEX "pages_blocks_doelgroepen_blok_groepen_parent_id_idx" ON "pages_blocks_doelgroepen_blok_groepen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_doelgroepen_blok_order_idx" ON "pages_blocks_doelgroepen_blok" USING btree ("_order");
  CREATE INDEX "pages_blocks_doelgroepen_blok_parent_id_idx" ON "pages_blocks_doelgroepen_blok" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_doelgroepen_blok_path_idx" ON "pages_blocks_doelgroepen_blok" USING btree ("_path");
  CREATE INDEX "pages_blocks_app_promo_features_order_idx" ON "pages_blocks_app_promo_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_app_promo_features_parent_id_idx" ON "pages_blocks_app_promo_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_app_promo_knoppen_order_idx" ON "pages_blocks_app_promo_knoppen" USING btree ("_order");
  CREATE INDEX "pages_blocks_app_promo_knoppen_parent_id_idx" ON "pages_blocks_app_promo_knoppen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_app_promo_order_idx" ON "pages_blocks_app_promo" USING btree ("_order");
  CREATE INDEX "pages_blocks_app_promo_parent_id_idx" ON "pages_blocks_app_promo" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_app_promo_path_idx" ON "pages_blocks_app_promo" USING btree ("_path");
  CREATE INDEX "pages_blocks_app_promo_afbeelding_idx" ON "pages_blocks_app_promo" USING btree ("afbeelding_id");
  CREATE INDEX "_pages_v_blocks_kaarten_slider_kaarten_order_idx" ON "_pages_v_blocks_kaarten_slider_kaarten" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_kaarten_slider_kaarten_parent_id_idx" ON "_pages_v_blocks_kaarten_slider_kaarten" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_kaarten_slider_kaarten_afbeelding_idx" ON "_pages_v_blocks_kaarten_slider_kaarten" USING btree ("afbeelding_id");
  CREATE INDEX "_pages_v_blocks_kaarten_slider_order_idx" ON "_pages_v_blocks_kaarten_slider" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_kaarten_slider_parent_id_idx" ON "_pages_v_blocks_kaarten_slider" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_kaarten_slider_path_idx" ON "_pages_v_blocks_kaarten_slider" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stappen_plan_stappen_order_idx" ON "_pages_v_blocks_stappen_plan_stappen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stappen_plan_stappen_parent_id_idx" ON "_pages_v_blocks_stappen_plan_stappen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stappen_plan_order_idx" ON "_pages_v_blocks_stappen_plan" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stappen_plan_parent_id_idx" ON "_pages_v_blocks_stappen_plan" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stappen_plan_path_idx" ON "_pages_v_blocks_stappen_plan" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cijfers_rij_cijfers_order_idx" ON "_pages_v_blocks_cijfers_rij_cijfers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cijfers_rij_cijfers_parent_id_idx" ON "_pages_v_blocks_cijfers_rij_cijfers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cijfers_rij_order_idx" ON "_pages_v_blocks_cijfers_rij" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cijfers_rij_parent_id_idx" ON "_pages_v_blocks_cijfers_rij" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cijfers_rij_path_idx" ON "_pages_v_blocks_cijfers_rij" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_doelgroepen_blok_groepen_punten_order_idx" ON "_pages_v_blocks_doelgroepen_blok_groepen_punten" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_doelgroepen_blok_groepen_punten_parent_id_idx" ON "_pages_v_blocks_doelgroepen_blok_groepen_punten" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_doelgroepen_blok_groepen_order_idx" ON "_pages_v_blocks_doelgroepen_blok_groepen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_doelgroepen_blok_groepen_parent_id_idx" ON "_pages_v_blocks_doelgroepen_blok_groepen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_doelgroepen_blok_order_idx" ON "_pages_v_blocks_doelgroepen_blok" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_doelgroepen_blok_parent_id_idx" ON "_pages_v_blocks_doelgroepen_blok" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_doelgroepen_blok_path_idx" ON "_pages_v_blocks_doelgroepen_blok" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_app_promo_features_order_idx" ON "_pages_v_blocks_app_promo_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_app_promo_features_parent_id_idx" ON "_pages_v_blocks_app_promo_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_app_promo_knoppen_order_idx" ON "_pages_v_blocks_app_promo_knoppen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_app_promo_knoppen_parent_id_idx" ON "_pages_v_blocks_app_promo_knoppen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_app_promo_order_idx" ON "_pages_v_blocks_app_promo" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_app_promo_parent_id_idx" ON "_pages_v_blocks_app_promo" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_app_promo_path_idx" ON "_pages_v_blocks_app_promo" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_app_promo_afbeelding_idx" ON "_pages_v_blocks_app_promo" USING btree ("afbeelding_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_kaarten_slider_kaarten" CASCADE;
  DROP TABLE "pages_blocks_kaarten_slider" CASCADE;
  DROP TABLE "pages_blocks_stappen_plan_stappen" CASCADE;
  DROP TABLE "pages_blocks_stappen_plan" CASCADE;
  DROP TABLE "pages_blocks_cijfers_rij_cijfers" CASCADE;
  DROP TABLE "pages_blocks_cijfers_rij" CASCADE;
  DROP TABLE "pages_blocks_doelgroepen_blok_groepen_punten" CASCADE;
  DROP TABLE "pages_blocks_doelgroepen_blok_groepen" CASCADE;
  DROP TABLE "pages_blocks_doelgroepen_blok" CASCADE;
  DROP TABLE "pages_blocks_app_promo_features" CASCADE;
  DROP TABLE "pages_blocks_app_promo_knoppen" CASCADE;
  DROP TABLE "pages_blocks_app_promo" CASCADE;
  DROP TABLE "_pages_v_blocks_kaarten_slider_kaarten" CASCADE;
  DROP TABLE "_pages_v_blocks_kaarten_slider" CASCADE;
  DROP TABLE "_pages_v_blocks_stappen_plan_stappen" CASCADE;
  DROP TABLE "_pages_v_blocks_stappen_plan" CASCADE;
  DROP TABLE "_pages_v_blocks_cijfers_rij_cijfers" CASCADE;
  DROP TABLE "_pages_v_blocks_cijfers_rij" CASCADE;
  DROP TABLE "_pages_v_blocks_doelgroepen_blok_groepen_punten" CASCADE;
  DROP TABLE "_pages_v_blocks_doelgroepen_blok_groepen" CASCADE;
  DROP TABLE "_pages_v_blocks_doelgroepen_blok" CASCADE;
  DROP TABLE "_pages_v_blocks_app_promo_features" CASCADE;
  DROP TABLE "_pages_v_blocks_app_promo_knoppen" CASCADE;
  DROP TABLE "_pages_v_blocks_app_promo" CASCADE;`)
}
