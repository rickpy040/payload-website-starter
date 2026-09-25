import { revalidatePath } from 'next/cache'

/**
 * `revalidatePath` throws ("Invariant: static generation store missing") when
 * called outside an active Next.js request — which is exactly what happens
 * when a collection hook fires from a standalone script (a seed script run
 * with `tsx`, a migration, a one-off data fix) rather than from the admin UI
 * or an API route. The existing `revalidatePage`/`revalidatePost` hooks in
 * this template only ever ran from inside a request, so they never hit this;
 * the new `steden`/`locations`/`pois`/`nieuws`/`evenementen` hooks are also
 * used by this repo's `scripts/seed-*.ts`, so they wrap every call here
 * instead of calling `revalidatePath` directly.
 */
export function safeRevalidatePath(path: string, type?: 'layout' | 'page'): void {
  try {
    revalidatePath(path, type)
  } catch {
    // No active Next.js request (e.g. a standalone seed script). Nothing to
    // revalidate outside a running server, so this is a no-op, not an error.
  }
}

/**
 * Marks every page stale (they rebuild on their next visit). For documents
 * that prototype section blocks show on arbitrary CMS pages: a Locatie-
 * overzicht, the map pins, the event collage, the city strip or a form can
 * sit on any page, so there is no single path to revalidate.
 */
export function revalidateAllePaginas(): void {
  safeRevalidatePath('/', 'layout')
}
