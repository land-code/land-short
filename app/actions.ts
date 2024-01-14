'use server'

import { Database } from '@/database.types'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

class SupabaseError extends Error {}

export const deleteLink = async (id: number) => {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
    const { error } = await supabase
      .from('short_codes')
      .delete()
      .eq('id', id)
    if (error !== null) throw new SupabaseError(error?.message)
    revalidatePath('/', 'page')
    return null
  } catch (error) {
    console.error(error)
    return 'Something went wrong. Please try again later.'
  }
}

export async function deleteLinks (prevState: any, formData: FormData) {
  'use server'
  const ids = formData.getAll('id')
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
  const { error } = await supabase
    .from('short_codes')
    .delete()
    .in('id', ids)
  if (error) {
    console.error(error)
    return 'Something went wrong. Please try again later.'
  }
  revalidatePath('/dashboard', 'page')
  return null
}
