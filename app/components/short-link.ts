'use server'

import { Database } from "@/database.types"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { isValidUrl } from "../utils/is-valid-url"
import { revalidatePath, revalidateTag } from "next/cache"

export const shortLink = async (prevState: any, formData: FormData) => {
  try {
    const supabase = createServerActionClient<Database>({ cookies })
    const longLink = formData.get('long-link') as string | null || ''
    const name = formData.get('username') as string | null || ''
    if (!longLink === null || !name) return { message: 'Name and long link are required'}
    const { data: { session } } = await supabase
      .auth
      .getSession()
    if (session === null) return { message: 'You are not signed in' }
    const { error } = await supabase
      .from('short_codes')
      .insert({
        content: longLink,
        is_url: isValidUrl(longLink),
        name,
      })
    if (error) console.error (error)
    revalidatePath('', 'page')
  } catch (err) {
    return {
      message: 'Failed to short'
    }
  }
}