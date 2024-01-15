import { getDictionary } from '@/app/get-dictionary'
import { Locale } from '@/app/i18n-config'
import { Database } from '@/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import DashboardClientPage from './dashboard.client'

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
  return (
    <DashboardClientPage dictionary={dictionary} data={data} lang={lang} userId={user.id} />
  )
}
