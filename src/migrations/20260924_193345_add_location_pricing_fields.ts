import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations" ADD COLUMN "price_per_hour" numeric;
  ALTER TABLE "locations" ADD COLUMN "rating" numeric;
  ALTER TABLE "locations" ADD COLUMN "opening_hours" varchar;
  ALTER TABLE "locations" ADD COLUMN "max_height" varchar;
  ALTER TABLE "locations" ADD COLUMN "spots_total" numeric;
  ALTER TABLE "locations" ADD COLUMN "spots_free" numeric;
  ALTER TABLE "_locations_v" ADD COLUMN "version_price_per_hour" numeric;
  ALTER TABLE "_locations_v" ADD COLUMN "version_rating" numeric;
  ALTER TABLE "_locations_v" ADD COLUMN "version_opening_hours" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_max_height" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_spots_total" numeric;
  ALTER TABLE "_locations_v" ADD COLUMN "version_spots_free" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations" DROP COLUMN "price_per_hour";
  ALTER TABLE "locations" DROP COLUMN "rating";
  ALTER TABLE "locations" DROP COLUMN "opening_hours";
  ALTER TABLE "locations" DROP COLUMN "max_height";
  ALTER TABLE "locations" DROP COLUMN "spots_total";
  ALTER TABLE "locations" DROP COLUMN "spots_free";
  ALTER TABLE "_locations_v" DROP COLUMN "version_price_per_hour";
  ALTER TABLE "_locations_v" DROP COLUMN "version_rating";
  ALTER TABLE "_locations_v" DROP COLUMN "version_opening_hours";
  ALTER TABLE "_locations_v" DROP COLUMN "version_max_height";
  ALTER TABLE "_locations_v" DROP COLUMN "version_spots_total";
  ALTER TABLE "_locations_v" DROP COLUMN "version_spots_free";`)
}
