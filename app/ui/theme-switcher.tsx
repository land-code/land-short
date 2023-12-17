'use client'

import { useDarkTheme } from '@/app/lib/use-dark-theme'
import Button from './button'
import DarkMode from '../icons/dark_mode'
import LightMode from '../icons/light_mode'
import { cookies } from 'next/headers'

export default function ThemeSwitcher () {
  const cookies = cookies().
  const [theme, setTheme] = useDarkTheme()
  return (
    <Button
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      type="button"
      style='primary'
      onClick={() => setTheme(theme => theme === 'dark' ? 'light' : 'dark')}
    >
      <span className='text-zinc-200'>
        {theme === 'light'
          ? <DarkMode />
          : <LightMode />
        }
      </span>
    </Button>
  )
}