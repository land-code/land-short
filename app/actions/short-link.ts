'use server'

import { Database } from '@/database.types'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { isValidUrl } from '@/app/lib/is-valid-url'
import { getDictionary } from '../get-dictionary'
import { Locale } from '../i18n-config'
import { z } from 'zod'
import { protectionOptions } from '../lib/consts'

interface FormState {
  message?: string | null
  link?: string | null
}

const ShortLinkSchema = z.object({
  name: z.string().min(1),
  content: z.string().min(1),
  protection: z.enum(protectionOptions)
})

export const shortLink = async (prevState: FormState | undefined, formData: FormData): Promise<FormState | undefined> => {
  const language = formData.get('language') as Locale | null ?? 'en'
  const dictionary = await getDictionary(language)

  try {
    const supabase = createServerActionClient<Database>({ cookies })

    const name = formData.get('code') as string | null
    const content = formData.get('long-link') as string | null
    const protection = formData.get('protection') as string | null
    const result = ShortLinkSchema.parse({
      name,
      content,
      protection
    })

    const { error } = await supabase
      .from('short_codes')
      .insert({
        content: result.content,
        is_url: isValidUrl(result.content),
        name: result.name,
        protection: result.protection
      })

    if (error?.code === '23505') {
      return {
        ...prevState,
        message: dictionary.shortLinkErrors.codeNotUnique
      }
    }
    if (error?.code === '42501') {
      return {
        ...prevState,
        message: dictionary.sessionErrors.notSignedIn
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
      link: `https://land-short.vercel.app/${result.name}`
    }
  } catch (error) {
    console.error(error)
    return {
      message: dictionary.shortLinkErrors.unknown ?? 'Failed to short'
    }
  }
}
