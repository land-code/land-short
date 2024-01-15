'use server'

import { Database } from '@/database.types'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { z } from 'zod'

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

const LinkSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  content: z.string().min(1)
})

export async function editLink (rawId: number, rawName: string | null, rawContent: string | null) {
  console.log(rawId, rawName, rawContent)
  try {
    const { name, content, id } = LinkSchema.parse({
      id: rawId,
      name: rawName,
      content: rawContent
    })

    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })

    const { error } = await supabase
      .from('short_codes')
      .update({
        name,
        content
      })
      .eq('id', id)
    if (error) {
      throw new Error(error.message)
    }
    return 'Link updated successfully'
  } catch (error) {
    console.error(error)
    return 'Something went wrong. Please try again later'
  }
}
