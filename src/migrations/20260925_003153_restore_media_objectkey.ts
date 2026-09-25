import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Puts back `media._objectkey`, which the Vercel Blob plugin needs whenever
 * BLOB_READ_WRITE_TOKEN is set. 20260924_190424 dropped it because it was
 * generated without a token (the plugin then adds no field), and from then on
 * every media query in production failed. `IF NOT EXISTS`: some databases may
 * still have it.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DROP COLUMN IF EXISTS "_objectkey";`)
}
