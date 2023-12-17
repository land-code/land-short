import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { Locale, i18n } from '../i18n-config'
import LoginLogoutButton from '../ui/login-logout-button'
import { getDictionary } from '../get-dictionary'
import ToastContainer from '../ui/toast-container'
import { ToastProvider } from '../lib/use-toast'
import Button from '@/app/ui/button'
import { ThemeProvider } from 'next-themes'
import ThemeSwitcher from '../ui/theme-switcher'

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
      <body className={`${inter.className} flex flex-col h-full`}>
        <ToastProvider>
          <header className='flex flex-wrap justify-center items-center bg-zinc-800 text-white p-2 sm:justify-between dark:bg-zinc-900'>
            <Button href='/' style='primary'>
              <h1 className='text-3xl'>
                Land shortener
              </h1>
            </Button>
            <div className='flex items-center gap-2 text-lg'>
              <ThemeSwitcher />
              <LoginLogoutButton
                dictionary={{ login: dictionary.login, logout: dictionary.logout }}
              />
            </div>
          </header>
          <main className='bg-zinc-200 flex-grow p-2 dark:bg-zinc-800 dark:text-zinc-200'>
            {children}
            <ToastContainer />
          </main>
        </ToastProvider>
      </body>
    </html>
  )
}
