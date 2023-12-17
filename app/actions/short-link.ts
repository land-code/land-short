'use server'

import { Database } from '@/database.types'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { isValidUrl } from '@/app/lib/is-valid-url'
import { getDictionary } from '../get-dictionary'
import { Locale } from '../i18n-config'

interface FormState {
  message?: string | null
  link?: string | null
}
export const shortLink = async (prevState: FormState | undefined, formData: FormData): Promise<FormState | undefined> => {
  const language = formData.get('language') as Locale | null ?? 'en'
  const userId = formData.get('username') as string | null ?? ''
  const dictionary = await getDictionary(language)
  try {
    const supabase = createServerActionClient<Database>({ cookies })
    const longLink = formData.get('long-link') as string | null ?? ''
    const code = formData.get('code') as string | null ?? ''
    if (typeof longLink !== 'string' || typeof code !== 'string' || longLink === '' || code === '') {
      return {
        ...prevState,
        message: 'Name and long link are required'
      }
    }
    const { data: { session } } = await supabase
      .auth
      .getSession()
    if (session === null) {
      return {
        ...prevState,
        message: dictionary.sessionErrors.notSignedIn
      }
    }
    const { error } = await supabase
      .from('short_codes')
      .insert({
        content: longLink,
        is_url: isValidUrl(longLink),
        name: code,
        username: userId
      })
    if (error?.code === '23505') {
      return {
        ...prevState,
        message: dictionary.shortLinkErrors.codeNotUnique
      }
    }
    if (error !== null) {
      console.error(error)
      return {
        ...prevState,
        message: dictionary.shortLinkErrors.unknown
      }
    }
    return {
      link: `https://land-short.vercel.app/${code}`
    }
  } catch (err) {
    return {
      message: dictionary.shortLinkErrors.unknown ?? 'Failed to short'
    }
  }
}
