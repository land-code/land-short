import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Land shortener',
  description: 'An easy to use shortener by land-code',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='h-full' lang="es">
      <body className={`${inter.className} h-full`}>
        <header className='bg-zinc-800 text-white p-4'>
          <h1 className='text-3xl'>
            Land shortener
          </h1>
        </header>
        <main className='bg-zinc-200 h-full p-2'>
          {children}
        </main>
      </body>
    </html>
  )
}
