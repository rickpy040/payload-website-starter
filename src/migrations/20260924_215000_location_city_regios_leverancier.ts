import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_locations_city" ADD VALUE 'regio-zuid-holland';
  ALTER TYPE "public"."enum_locations_city" ADD VALUE 'regio-gelderland';
  ALTER TYPE "public"."enum__locations_v_version_city" ADD VALUE 'regio-zuid-holland';
  ALTER TYPE "public"."enum__locations_v_version_city" ADD VALUE 'regio-gelderland';
  ALTER TABLE "locations" ADD COLUMN "leverancier" varchar;
  ALTER TABLE "locations" ADD COLUMN "google_maps_url" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_leverancier" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_google_maps_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations" ALTER COLUMN "city" SET DATA TYPE text;
  DROP TYPE "public"."enum_locations_city";
  CREATE TYPE "public"."enum_locations_city" AS ENUM('eindhoven', 'rotterdam', 'amsterdam', 'den-haag', 'utrecht', 'tilburg', 'heerhugowaard', 'zoetermeer', 'almere');
  ALTER TABLE "locations" ALTER COLUMN "city" SET DATA TYPE "public"."enum_locations_city" USING "city"::"public"."enum_locations_city";
  ALTER TABLE "_locations_v" ALTER COLUMN "version_city" SET DATA TYPE text;
  DROP TYPE "public"."enum__locations_v_version_city";
  CREATE TYPE "public"."enum__locations_v_version_city" AS ENUM('eindhoven', 'rotterdam', 'amsterdam', 'den-haag', 'utrecht', 'tilburg', 'heerhugowaard', 'zoetermeer', 'almere');
  ALTER TABLE "_locations_v" ALTER COLUMN "version_city" SET DATA TYPE "public"."enum__locations_v_version_city" USING "version_city"::"public"."enum__locations_v_version_city";
  ALTER TABLE "locations" DROP COLUMN "leverancier";
  ALTER TABLE "locations" DROP COLUMN "google_maps_url";
  ALTER TABLE "_locations_v" DROP COLUMN "version_leverancier";
  ALTER TABLE "_locations_v" DROP COLUMN "version_google_maps_url";`)
}
