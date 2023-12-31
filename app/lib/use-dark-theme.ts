/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export const useDarkTheme = (
  storageKey: string = 'useDarkTheme',
  darkClass: string = 'dark',
  lightClass: string = 'light'
): readonly[Theme, Dispatch<SetStateAction<Theme>>] => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem(storageKey) as Theme || 'light'
  })

  useEffect(() => {
    if (!window.matchMedia) return

    const localTheme = window.localStorage.getItem(storageKey) as Theme | null | undefined
    const listener = (e: MediaQueryListEvent): void => setTheme(e.matches ? 'dark' : 'light')

    const darkScheme = window.matchMedia('(prefers-color-scheme: dark)')
    darkScheme.addEventListener('change', listener)
    setTheme(localTheme ?? (darkScheme.matches ? 'dark' : 'light'))

    return () => {
      if (darkScheme) darkScheme.removeEventListener('change', listener)
    }
  }, [storageKey])

  const themeClass = theme === 'light' ? darkClass : lightClass

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove(themeClass)
    root.classList.add(theme)

    // Store the theme in localStorage
    localStorage.setItem(storageKey, theme)
  }, [theme, themeClass, storageKey])

  return [theme, setTheme] as const
}
