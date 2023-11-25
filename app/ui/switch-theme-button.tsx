'use client'
import { useDarkTheme } from '../lib/use-dark-theme'

export default function SwitchThemeButton (): JSX.Element {
  const [theme, setTheme] = useDarkTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  return (
    <button onClick={() => setTheme(nextTheme)} className='flex items-center gap-2 bg-zinc-800 text-zinc-200 p-2 rounded-xl hover:bg-zinc-500 active:bg-zinc-400 dark:bg-zinc-600'>
      <span className='sr-only sm:not-sr-only'>Switch to {nextTheme}</span>
      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
      </svg>
    </button>
  )
}
