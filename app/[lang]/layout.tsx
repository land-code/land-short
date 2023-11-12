import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { Locale, i18n } from '../i18n-config'
import Link from 'next/link'
import LoginLogoutButton from '../components/login-logout-button'
import { getDictionary } from '../get-dictionary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Land shortener',
  description: 'An easy to use shortener by land-code'
}

export async function generateStaticParams (): Promise<Array<{ lang: Locale }>> {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout ({
  children,
  params: { lang }
}: {
  children: React.ReactNode
  params: { lang: Locale }
}): Promise<JSX.Element> {
  const dictionary = await getDictionary(lang)
  return (
    <html className='h-full' lang={lang}>
      <body className={`${inter.className} h-full`}>
        <header className='flex justify-between items-center bg-zinc-800 text-white p-4'>
          <Link href='/' className='flex items-center gap-2 bg-zinc-800 text-xl text-zinc-200 p-2 rounded-xl hover:bg-zinc-500 active:bg-zinc-400'>
            <h1 className='text-3xl'>
              Land shortener
            </h1>
          </Link>
          <LoginLogoutButton
            dictionary={{ login: dictionary.login, logout: dictionary.logout }}
          />
        </header>
        <main className='bg-zinc-200 min-h-full p-2'>
          {children}
        </main>
      </body>
    </html>
  )
}
