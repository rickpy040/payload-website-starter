export type AvailabilityStatus = 'ruim' | 'beperkt' | 'vol' | 'onbekend'

export const AVAILABILITY_LABEL: Record<AvailabilityStatus, string> = {
  ruim: 'Ruim beschikbaar',
  beperkt: 'Beperkt beschikbaar',
  vol: 'Bijna vol',
  onbekend: 'Beschikbaarheid onbekend',
}

export const AVAILABILITY_SHORT_LABEL: Record<AvailabilityStatus, string> = {
  ruim: 'Ruim',
  beperkt: 'Beperkt',
  vol: 'Bijna vol',
  onbekend: 'Onbekend',
}

export function getAvailabilityStatus(
  spotsFree?: number | null,
  spotsTotal?: number | null,
): AvailabilityStatus {
  if (!spotsTotal || spotsFree == null) return 'onbekend'
  const ratio = spotsFree / spotsTotal
  if (ratio <= 0.1) return 'vol'
  if (ratio <= 0.35) return 'beperkt'
  return 'ruim'
}

export function fmtPrice(n: number): string {
  return n.toFixed(2).replace('.', ',')
}
