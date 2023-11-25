'use server'

import { z } from 'zod'
import { getDictionary } from '../get-dictionary'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/database.types'
import { Locale } from '../i18n-config'
import { revalidatePath } from 'next/cache'

export interface DeleteShortLinkState {
  message: string | null
  language: Locale
}

export const deleteShortLink = async (prevState: any, formData: FormData): Promise<DeleteShortLinkState> => {
  const { language } = prevState
  const schema = z.object({
    id: z.string()
  })
  const validatedData = schema.safeParse({
    id: formData.get('id')
  })
  const dictionary = await getDictionary(language ?? 'en')

  if (!validatedData.success) {
    return {
      ...prevState,
      message: dictionary.shortLinkErrors.notFound
    }
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
  const { data: { session } } = await supabase
    .auth
    .getSession()
  if (session === null) {
    return {
      ...prevState,
      message: dictionary.sessionErrors.notSignedIn
    }
  }
  const { data } = await supabase
    .from('short_codes')
    .select()
    .eq('id', validatedData.data.id)
  if (data === null) {
    console.log(validatedData)
    return {
      ...prevState,
      message: dictionary.shortLinkErrors.notFound
    }
  }
  const { error } = await supabase
    .from('short_codes')
    .delete()
    .eq('id', validatedData.data.id)
  if (error !== null) {
    console.error(error)
    return {
      ...prevState,
      message: dictionary.shortLinkErrors.unknown
    }
  }
  revalidatePath('/', 'page')
  return {
    ...prevState,
    message: dictionary.deleteLinkErrors.success
  }
}
