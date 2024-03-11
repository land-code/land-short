import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/database.types'
import { Locale } from '../app/i18n-config'
import RealtimeShortCodes from './realtime-short-links'

export default async function ShortLinks ({
  dictionary,
  language
}: {
  dictionary: {
    name: string
    content: string
    date: string
    time: string
    code: string
    copiedToClipboard: string
    actions: string
    delete: string
  }
  language: Locale
}): Promise<JSX.Element> {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data, error } = await supabase
    .from('short_codes')
    .select('*')
    .order('created_at', { ascending: false })
  if (error != null) console.error(error)

  const { data: { user } } = await supabase
    .auth
    .getUser()

  return (
    <RealtimeShortCodes serverShortCodes={data ?? []} dictionary={dictionary} language={language} userId={user?.id} />
  )
}
