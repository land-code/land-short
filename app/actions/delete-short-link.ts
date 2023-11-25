'use server'

import { z } from 'zod'
import { getDictionary } from '../get-dictionary'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/database.types'

export interface DeleteShortLinkState {
  message: string | null
}

export const deleteShortLink = async (prevState: any, formData: FormData): Promise<DeleteShortLinkState> => {
  const dictionary = await getDictionary('en')
  const schema = z.object({
    id: z.string()
  })
  const validatedData = schema.safeParse({
    id: formData.get('id')
  })
  if (!validatedData.success) {
    return { message: dictionary.shortLinkErrors.notFound }
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
  const { data: { session } } = await supabase
    .auth
    .getSession()
  if (session === null) {
    return { message: dictionary.sessionErrors.notSignedIn }
  }
  const { data } = await supabase
    .from('short_codes')
    .select()
    .eq('id', validatedData.data.id)
  if (data === null) {
    console.log(validatedData)
    return { message: dictionary.shortLinkErrors.notFound }
  }
  const { error } = await supabase
    .from('short_codes')
    .delete()
    .eq('id', validatedData.data.id)
  if (error !== null) {
    console.error(error)
    return { message: dictionary.shortLinkErrors.unknown }
  }
  return { message: 'Successfully deleted short link.' }
}
