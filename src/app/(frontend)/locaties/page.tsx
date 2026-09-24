import { redirect } from 'next/navigation'

/**
 * docs/IA.md defines `/locaties` as "all 37, filterable, map view" — exactly
 * the job the existing /parkeren search-and-map page already does (built in
 * PR #2, before this rebuild). Rather than duplicate that page under a second
 * URL, `/locaties` redirects to it. `/parkeren/{stad}` remains the distinct,
 * per-city SEO page.
 */
export default function LocatiesPage() {
  redirect('/parkeren')
}
