import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/database.types'
import LinkToCopy from './link-to-copy'
import DeleteLinkButton from './delete-link-button'
import { Locale } from '../i18n-config'

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
          <tr className='hidden sm:table-row'>
            <th>{dictionary.code}</th>
            <th>{dictionary.content}</th>
            <th className='hidden sm:table-cell'>{dictionary.date}</th>
            <th className='hidden sm:table-cell'>{dictionary.time}</th>
            <th className='hidden sm:table-cell'>{dictionary.actions}</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.map(({ id, name, created_at: createdAt, content, is_url: isUrl }) => {
              const date = new Date(createdAt)
              return (
                <tr key={id} className='flex flex-col sm:table-row'>
                  <td className='font-bold sm:font-normal'>{name}</td>
                  <td>
                    <div className='flex justify-center'>
                      <LinkToCopy isUrl={isUrl} content={content} dictionary={{ copiedToClipboard: dictionary.copiedToClipboard }} />
                    </div>
                  </td>
                  <td>{date.toDateString()}</td>
                  <td>{date.toLocaleTimeString()}</td>
                  <td className='flex justify-center border-b-2 border-zinc-800 sm:border-0'>
                    <DeleteLinkButton language={language} dictionary={{ delete: dictionary.delete }} id={id} />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
