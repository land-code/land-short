import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/database.types'
import LinkToCopy from './link-to-copy'
import { revalidatePath } from 'next/cache'
import DeleteIcon from '../icons/delete'

export default async function ShortLinks ({
  dictionary
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
}): Promise<JSX.Element> {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data, error } = await supabase
    .from('short_codes')
    .select('*')
    .order('created_at', { ascending: false })
  if (error != null) console.error(error)

  const deleteShortLink = async (formData: FormData): Promise<void> => {
    'use server'
    console.log('hello')
    const id = formData.get('id') ?? '' as string
    const cookieStore = cookies()
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
    const { error } = await supabase
      .from('short_codes')
      .delete()
      .eq('id', id)
    if (error !== null) console.error(error)
    revalidatePath('/', 'page')
  }
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
                  <td className='border-b-2 border-zinc-800 sm:border-0'>{date.toLocaleTimeString()}</td>
                  <td>
                    <form action={deleteShortLink}>
                      <input className='hidden' name='id' value={id} readOnly />
                      <button className='flex' type='submit'>
                        <DeleteIcon />
                        {dictionary.delete}
                      </button>
                    </form>
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
