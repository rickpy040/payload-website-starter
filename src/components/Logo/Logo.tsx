import clsx from 'clsx'
import React from 'react'

import { Brandmark } from '@/components/parkeren/Brandmark'

interface Props {
  className?: string
  dark?: boolean
}

export const Logo = ({ className, dark = false }: Props) => {
  return (
    <span className={clsx('inline-flex items-center gap-2.5', className)}>
      <Brandmark variant={dark ? 'duotone-white' : 'duotone'} className="h-[26px] w-[22px] flex-none" />
      <span className={clsx('text-[21px] leading-none tracking-tight', dark ? 'text-white' : 'text-py-blauw')}>
        <span className="font-medium">parking</span>
        <span className="font-bold">you</span>
      </span>
    </span>
  )
}
