'use client'

import { ThemeProvider } from 'next-themes'

function Providers ({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <ThemeProvider attribute='class'>
      {children}
    </ThemeProvider>
  )
}

export default Providers
