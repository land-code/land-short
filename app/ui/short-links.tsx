import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/database.types'
import { Locale } from '../i18n-config'
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

  return (
    <div className='w-full border-zinc-600 border-2 rounded-xl sm:p-2 dark:border-0 dark:bg-zinc-600'>
      <table className='table-auto text-center w-full'>
        <thead>
          <tr className='hidden sm:table-row text-xl [&>th]:font-normal'>
            <th>{dictionary.code}</th>
            <th>{dictionary.content}</th>
            <th className='hidden sm:table-cell'>{dictionary.date}</th>
            <th className='hidden sm:table-cell'>{dictionary.time}</th>
            <th className='hidden sm:table-cell'>{dictionary.actions}</th>
          </tr>
        </thead>
        <tbody>
          <RealtimeShortCodes serverShortCodes={data ?? []} dictionary={dictionary} language={language} />
        </tbody>
      </table>
    </div>
  )
}
