'use client'
import { Database } from '@/database.types'
import { ReactNode, useEffect, useState } from 'react'
import DeleteLinkButton from './delete-link-button'
import LinkToCopy from './link-to-copy'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const RealtimeShortCodes = ({
  serverShortCodes,
  dictionary,
  language
}: {
  serverShortCodes: Array<Database['public']['Tables']['short_codes']['Row']>
  dictionary: { copiedToClipboard: string, delete: string }
  language: 'en' | 'es'
}): ReactNode => {
  const [shortCodes, setShortCodes] = useState(serverShortCodes)

  const supabase = createClientComponentClient<Database>()
  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'short_codes'
      }, (payload: any) => {
        setShortCodes(data => [payload.new, ...data])
      })
      .subscribe()
    return () => {
      void supabase.removeChannel(channel)
    }
  }, [supabase])

  return (
    <>{
        shortCodes?.map(({ id, name, created_at: createdAt, content, is_url: isUrl }) => {
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
    </>
  )
}

export default RealtimeShortCodes
