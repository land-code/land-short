import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { i18n } from '../i18n-config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Land shortener',
  description: 'An easy to use shortener by land-code',
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { lang: string }
}) {
  return (
    <html className='h-full' lang={params.lang}>
      <body className={`${inter.className} h-full`}>
        <header className='bg-zinc-800 text-white p-4'>
          <h1 className='text-3xl'>
            Land shortener
          </h1>
        </header>
        <main className='bg-zinc-200 min-h-full p-2'>
          {children}
        </main>
      </body>
    </html>
  )
}
