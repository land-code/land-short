'use server'

import { Database } from '@/database.types'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const logout = async (formData: FormData): Promise<void> => {
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
  await supabase
    .auth
    .signOut()
}
