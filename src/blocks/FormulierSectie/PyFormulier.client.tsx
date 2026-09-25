'use client'

import React, { useCallback, useState } from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import type { Form } from '@/payload-types'
import RichText from '@/components/RichText'
import { Icon } from '@/components/py/Icon'
import { PyButton } from '@/components/py/Button'
import { verstuurFormulier } from '@/blocks/py/verstuur'
import { meldKeuze, useKeuze } from '@/blocks/py/keuze'

export type KeuzeOpties = Record<string, { label: string; value: string }[]>

type Veld = NonNullable<Form['fields']>[number]

/** A select that follows (and announces) a shared choice, e.g. the ParkingPass "Aantal". */
function Keuzelijst({
  naam,
  opties,
  placeholder,
  required,
  standaard,
}: {
  naam: string
  opties: { label: string; value: string }[]
  placeholder?: string | null
  required?: boolean | null
  standaard?: string | null
}) {
  const [waarde, setWaarde] = useState(standaard ?? '')
  useKeuze(
    naam,
    useCallback((nieuw: string) => setWaarde(nieuw), []),
  )

  return (
    <select
      name={naam}
      required={Boolean(required)}
      value={waarde}
      onChange={(e) => {
        setWaarde(e.target.value)
        meldKeuze(naam, e.target.value)
      }}
    >
      {placeholder || !standaard ? (
        <option value="" disabled>
          {placeholder ?? 'Maak een keuze'}
        </option>
      ) : null}
      {opties.map((optie) => (
        <option key={optie.value} value={optie.value}>
          {optie.label}
        </option>
      ))}
    </select>
  )
}

function VeldInvoer({ veld, opties }: { veld: Veld; opties: KeuzeOpties }) {
  switch (veld.blockType) {
    case 'text':
    case 'email':
    case 'number':
      return (
        <label>
          {veld.label}
          <input
            name={veld.name}
            type={veld.blockType === 'text' ? 'text' : veld.blockType}
            required={Boolean(veld.required)}
            defaultValue={
              'defaultValue' in veld && veld.defaultValue != null
                ? String(veld.defaultValue)
                : undefined
            }
            placeholder={'placeholder' in veld ? (veld.placeholder ?? undefined) : undefined}
          />
        </label>
      )
    case 'textarea':
      return (
        <label>
          {veld.label}
          <textarea
            name={veld.name}
            required={Boolean(veld.required)}
            defaultValue={veld.defaultValue ?? undefined}
            placeholder={veld.placeholder ?? undefined}
          />
        </label>
      )
    case 'select':
      return (
        <label>
          {veld.label}
          <Keuzelijst
            naam={veld.name}
            opties={(veld.options ?? []).map((o) => ({ label: o.label, value: o.value }))}
            placeholder={veld.placeholder}
            required={veld.required}
            standaard={veld.defaultValue}
          />
        </label>
      )
    case 'locatieKeuze': {
      const lijst = opties[veld.name] ?? []
      // No published locations for this source yet: let the visitor type one.
      if (lijst.length === 0) {
        return (
          <label>
            {veld.label}
            <input
              name={veld.name}
              required={Boolean(veld.required)}
              placeholder={veld.placeholder ?? undefined}
            />
          </label>
        )
      }
      return (
        <label>
          {veld.label}
          <Keuzelijst
            naam={veld.name}
            opties={lijst}
            placeholder={veld.placeholder}
            required={veld.required}
          />
        </label>
      )
    }
    case 'checkbox':
      return (
        <label className="py-checkbox">
          <input
            type="checkbox"
            name={veld.name}
            required={Boolean(veld.required)}
            defaultChecked={Boolean(veld.defaultValue)}
          />
          {veld.label}
        </label>
      )
    case 'message':
      return veld.message ? (
        <RichText
          data={veld.message as DefaultTypedEditorState}
          enableGutter={false}
          enableProse={false}
        />
      ) : null
    default:
      return null
  }
}

export function PyFormulier({ form, opties }: { form: Form; opties: KeuzeOpties }) {
  const [status, setStatus] = useState<'open' | 'bezig' | 'klaar'>('open')
  const [fout, setFout] = useState<string | null>(null)

  const verstuur = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFout(null)
    setStatus('bezig')
    const data: Record<string, string> = {}
    new FormData(event.currentTarget).forEach((value, key) => {
      data[key] = typeof value === 'string' ? value : value.name
    })
    try {
      await verstuurFormulier(form.id, data)
      if (form.confirmationType === 'redirect' && form.redirect?.url) {
        window.location.assign(form.redirect.url)
        return
      }
      setStatus('klaar')
    } catch (err) {
      setFout((err as Error).message)
      setStatus('open')
    }
  }

  return (
    <form className="py-contact-form" onSubmit={verstuur}>
      {status === 'klaar' ? (
        <div className="py-success-state py-success-state--compact">
          <span>
            <Icon name="check" size={28} />
          </span>
          {form.confirmationMessage ? (
            <RichText
              data={form.confirmationMessage as DefaultTypedEditorState}
              enableGutter={false}
              enableProse={false}
            />
          ) : null}
        </div>
      ) : (
        <>
          {(form.fields ?? []).map((veld, i) => (
            <VeldInvoer key={veld.id ?? i} veld={veld} opties={opties} />
          ))}
          {fout ? <p className="py-form-error">{fout}</p> : null}
          <PyButton type="submit" variant="primary" disabled={status === 'bezig'}>
            {form.submitButtonLabel || 'Verstuur'}
          </PyButton>
        </>
      )}
    </form>
  )
}
