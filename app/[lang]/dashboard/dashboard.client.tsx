'use client'

import { deleteLinks } from '@/app/actions'
import { Dictionary } from '@/app/get-dictionary'
import { Locale } from '@/app/i18n-config'
import AddLinkButton from '@/components/add-link-button'
import DashboardRow from '@/components/dashboard-row'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Database } from '@/database.types'
import { useFormState } from 'react-dom'

export default function DashboardClientPage ({
  dictionary,
  data,
  userId,
  lang
}: {
  dictionary: Dictionary
  data: Array<Database['public']['Tables']['short_codes']['Row']> | null
  userId: string
  lang: Locale
}) {
  const [state, dispatch] = useFormState(deleteLinks, null)
  return (
    <div className='p-2'>
      <h1 className='text-3xl mb-2'>Dashboard</h1>
      <form action={dispatch} className='grid gap-4'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl'>Short links</h2>
          <div className='flex gap-2'>
            <AddLinkButton dictionary={dictionary} language={lang} userId={userId} />
            <button type='submit' className='flex items-center gap-2 bg-zinc-200 text-zinc-800 p-2 rounded-full hover:bg-zinc-500 active:bg-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'>
              Delete all selected links
            </button>
          </div>
        </div>
        {state && <p className='text-zinc-700 dark:text-zinc-400'>{state}</p>}
        <Table className='bg-zinc-300 rounded-xl p-4 dark:text-zinc-50 dark:bg-zinc-950'>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead className='text-zinc-700 dark:text-zinc-400'>Link</TableHead>
              <TableHead className='text-zinc-700 dark:text-zinc-400'>Content</TableHead>
              <TableHead className='text-zinc-700 dark:text-zinc-400'>Created at</TableHead>
              <TableHead className='text-end text-zinc-700 dark:text-zinc-400'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data?.map(({ id, content, name, created_at: createdAt }) => (
                <DashboardRow
                  key={id}
                  id={id}
                  name={name}
                  content={content}
                  createdAt={new Date(createdAt.toString()).toLocaleDateString()}
                />
              ))
            }
          </TableBody>
        </Table>
      </form>
    </div>
  )
}
