'use client'

import React, { useEffect, useRef } from 'react'
import type { Location } from '@/payload-types'
import { fmtPrice } from './availability'
import 'leaflet/dist/leaflet.css'

export function LocationsMap({
  locations,
  activeSlug,
  onSelect,
}: {
  locations: Location[]
  activeSlug?: string | null
  onSelect?: (slug: string) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<import('leaflet').Map | null>(null)
  const markersRef = useRef<Record<string, import('leaflet').Marker>>({})

  const withCoords = locations.filter(
    (l): l is Location & { coordinates: [number, number] } => Array.isArray(l.coordinates),
  )

  useEffect(() => {
    let cancelled = false

    import('leaflet').then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return

      const center = withCoords[0]
        ? ([withCoords[0].coordinates[1], withCoords[0].coordinates[0]] as [number, number])
        : ([52.1, 5.1] as [number, number])

      const map = L.map(containerRef.current, { zoomControl: false }).setView(center, 13)
      mapRef.current = map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)
      L.control.zoom({ position: 'topright' }).addTo(map)

      function pinIcon(price: number, active: boolean) {
        const bg = active ? '#32B9CD' : '#1A3580'
        const fg = active ? '#14285F' : '#FFFFFF'
        return L.divIcon({
          className: '',
          iconSize: [76, 42],
          iconAnchor: [38, 42],
          html:
            `<div style="display:flex;flex-direction:column;align-items:center">` +
            `<div style="height:30px;padding:0 12px;border-radius:100px;background:${bg};color:${fg};box-shadow:0 0 0 2px #fff,0 4px 10px rgba(20,40,95,0.22);display:flex;align-items:center;font:700 13px Ubuntu,Arial,sans-serif;white-space:nowrap">&euro;&nbsp;${fmtPrice(price)}</div>` +
            `<div style="width:2px;height:9px;background:${bg}"></div></div>`,
        })
      }

      withCoords.forEach((loc) => {
        const marker = L.marker([loc.coordinates[1], loc.coordinates[0]], {
          icon: pinIcon(loc.pricePerHour, loc.slug === activeSlug),
          title: loc.name,
        }).addTo(map)
        marker.on('click', () => onSelect?.(loc.slug))
        markersRef.current[loc.slug] = marker
      })

      setTimeout(() => map.invalidateSize(), 80)
    })

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
      markersRef.current = {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    import('leaflet').then((L) => {
      Object.entries(markersRef.current).forEach(([slug, marker]) => {
        const loc = withCoords.find((l) => l.slug === slug)
        if (!loc) return
        marker.setIcon(
          L.divIcon({
            className: '',
            iconSize: [76, 42],
            iconAnchor: [38, 42],
            html:
              `<div style="display:flex;flex-direction:column;align-items:center">` +
              `<div style="height:30px;padding:0 12px;border-radius:100px;background:${slug === activeSlug ? '#32B9CD' : '#1A3580'};color:${slug === activeSlug ? '#14285F' : '#FFFFFF'};box-shadow:0 0 0 2px #fff,0 4px 10px rgba(20,40,95,0.22);display:flex;align-items:center;font:700 13px Ubuntu,Arial,sans-serif;white-space:nowrap">&euro;&nbsp;${fmtPrice(loc.pricePerHour)}</div>` +
              `<div style="width:2px;height:9px;background:${slug === activeSlug ? '#32B9CD' : '#1A3580'}"></div></div>`,
          }),
        )
      })
      const active = withCoords.find((l) => l.slug === activeSlug)
      if (active && mapRef.current) {
        mapRef.current.panTo([active.coordinates[1], active.coordinates[0]])
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlug])

  if (withCoords.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-py-paper text-sm text-py-grijs-txt">
        Geen locaties met kaartcoördinaten.
      </div>
    )
  }

  return <div ref={containerRef} className="h-full w-full" />
}
