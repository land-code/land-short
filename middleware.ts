import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from './app/i18n-config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { Database } from './database.types'

function getLocale (request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-expect-error locales are readonly
  const locales: string[] = i18n.locales

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  )

  const locale = matchLocale(languages.reverse(), locales, i18n.defaultLocale)

  return locale
}

export async function middleware (request: NextRequest, response: NextResponse): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  if (
    [
      '/manifest.json',
      '/favicon.ico',
      '/diamante-edixgal.zip',
      'google24c567986bf3abaa.html'
    ].includes(pathname)
  ) {
    return NextResponse.next()
  }
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale ?? 'en'}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req: request, res })
  await supabase.auth.getSession()
  return res
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
