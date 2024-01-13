import { getDictionary } from '@/app/get-dictionary'
import { Locale } from '@/app/i18n-config'
import AddLinkButton from '@/components/add-link-button'
import DashboardRow from '@/components/dashboard-row'
import SubmitButton from '@/components/ui/submit-button'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Database } from '@/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage ({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

  const { data: { user } } = await supabase
    .auth
    .getUser()

  if (!user) redirect('/login')

  const { data, error } = await supabase
    .from('short_codes')
    .select('*')
    .eq('user', user.id)

  if (error) console.error(error)

  const deleteLinks = async (formData: FormData) => {
    'use server'

    const ids = formData.getAll('id')
    const { error } = await supabase
      .from('short_codes')
      .delete()
      .in('id', ids)
    if (error) console.error(error)
    revalidatePath('/dashboard', 'page')
  }
  return (
    <div className='p-2'>
      <h1 className='text-3xl mb-2'>Dashboard</h1>
      <form action={deleteLinks} className='grid gap-4'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl'>Short links</h2>
          <div className='flex gap-2'>
            <AddLinkButton dictionary={dictionary} language={lang} userId={user.id} />
            <SubmitButton>
              Delete selected links
            </SubmitButton>
          </div>
        </div>
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
