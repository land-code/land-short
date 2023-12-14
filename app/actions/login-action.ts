'use server'

import { Database } from '@/database.types'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getDictionary } from '../get-dictionary'
import { Locale } from '../i18n-config'

export const login = async (prevState: any, formData: FormData): Promise<{ message: string | null } | undefined> => {
  const email = formData.get('email')
  const password = formData.get('password')
  const language = formData.get('language') ?? 'en'
  const { loginErrors } = await getDictionary(language as Locale ?? 'en')
  if (typeof email !== 'string' || typeof password !== 'string' || email === '' || password === '') {
    return {
      message: loginErrors.notValid
    }
  }
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
  const { data, error } = await supabase
    .auth
    .signInWithPassword({
      email,
      password
    })
  if (data.user === null) {
    return {
      message: loginErrors.incorrect
    }
  }

  if (error !== null) {
    console.error(error)
    return {
      message: loginErrors.unknown
    }
  }
  return redirect(`/${language as string}`)
}
