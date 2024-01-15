'use client'
import { Database } from '@/database.types'
import { ReactNode, useEffect, useState } from 'react'
import LinkToCopy from './link-to-copy'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { TableCell, TableRow } from '@/components/ui/table'
import DeleteLinkButton from './delete-link-button'

const RealtimeShortCodes = ({
  serverShortCodes,
  dictionary,
  language,
  userId
}: {
  serverShortCodes: Array<Database['public']['Tables']['short_codes']['Row']>
  dictionary: { copiedToClipboard: string, delete: string }
  language: 'en' | 'es'
  userId: string | undefined
}): ReactNode => {
  const [shortCodes, setShortCodes] = useState(serverShortCodes)

  const supabase = createClientComponentClient<Database>()
  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'short_codes'
        },
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            setShortCodes((data) => [payload.new, ...data])
          }
          if (payload.eventType === 'UPDATE') {
            setShortCodes((data) =>
              data.map((shortCode) => {
                if (shortCode.id === payload.new.id) return payload.new
                return shortCode
              })
            )
          }
          if (payload.eventType === 'DELETE') {
            setShortCodes((data) =>
              data.filter(({ id }) => id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()
    return () => {
      void supabase.removeChannel(channel)
    }
  }, [supabase])

  return (
    <>
      {shortCodes?.map(
        ({ id, name, created_at: createdAt, content, is_url: isUrl }) => {
          const date = new Date(createdAt)
          return (
            <TableRow key={id} className='flex flex-col sm:table-row'>
              <TableCell className='font-bold sm:font-normal'>{name}</TableCell>
              <TableCell>
                <div className='flex justify-center'>
                  <LinkToCopy
                    isUrl={isUrl}
                    content={content}
                    dictionary={{
                      copiedToClipboard: dictionary.copiedToClipboard
                    }}
                  />
                </div>
              </TableCell>
              <TableCell>{date.toDateString()}</TableCell>
              <TableCell>{date.toLocaleTimeString(language)}
              </TableCell>
              {userId != null && (
                <TableCell className='flex justify-center border-b-2 border-zinc-800 sm:border-0'>
                  <DeleteLinkButton
                    language={language}
                    dictionary={{ delete: dictionary.delete }}
                    id={id}
                  />
                </TableCell>
              )}
            </TableRow>
          )
        }
      )}
    </>
  )
}

export default RealtimeShortCodes
