import { isValidUrl } from '@/app/lib/is-valid-url'
import { Database } from '@/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getDictionary } from '@/app/get-dictionary'
import { Locale } from '@/app/i18n-config'

const Code = async ({
  params: { lang, code }
}: {
  params: {
    lang: Locale
    code: string
  }
}): Promise<JSX.Element> => {
  const dictionary = await getDictionary(lang)
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data, error } = await supabase
    .from('short_codes')
    .select('content')
    .eq('name', code)
    .single()
  if (error?.code === 'PGRST116' || data?.content === null) {
    return (
      <span>{dictionary.shortLinkErrors.notFound}</span>
    )
  }
  if (error !== null) {
    console.error(error)
    return (
      <span>error</span>
    )
  }
  if (isValidUrl(data.content)) {
    redirect(data.content)
    return (
      <div>
        <span>{dictionary.shortLinkErrors.redirectingTo}</span>
        <a>{data?.content}</a>
      </div>
    )
  }
  return (
    <span className='text-lg'>
      The code is:
      <strong className='text-2xl'>{data.content}</strong>
    </span>
  )
}
export default Code
