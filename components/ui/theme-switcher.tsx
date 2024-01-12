'use client'

import Button from './button'
import DarkMode from '../../app/icons/dark_mode'
import LightMode from '../../app/icons/light_mode'
import { ReactNode, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeSwitcher (): ReactNode {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Button
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      type='button'
      style='primary'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <span className='text-zinc-200'>
        {theme === 'light'
          ? <DarkMode />
          : <LightMode />}
      </span>
    </Button>
  )
}
