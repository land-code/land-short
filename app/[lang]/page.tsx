import ShortLinks from '../ui/short-links'
import ShortenerForm from '../ui/shortener-form'
import { Locale } from '../i18n-config'
import { getDictionary } from '../get-dictionary'
import { Database } from '@/database.types'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function Home ({
  params: { lang }
}: {
  params: { lang: Locale }
}): Promise<JSX.Element> {
  const dictionary = await getDictionary(lang)
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data: { user } } = await supabase
    .auth
    .getUser()
  return (
    <div className='flex flex-col items-center gap-4'>
      <section className='flex flex-col items-center w-full max-w-[800px]'>
        <h2 className='text-3xl mb-2'>{dictionary.saveLink}</h2>
        <ShortenerForm userId={user?.id ?? ''} dictionary={dictionary.saveLinkForm} language={lang} />
      </section>
      <section className='flex flex-col items-center w-full max-w-[800px]'>
        <h2 className='text-3xl'>{dictionary.savedLinks}</h2>
        <p className='text-zinc-600 dark:text-zinc-400 mb-2'>{dictionary.autoRefreshEnabled}</p>
        <ShortLinks
          dictionary={{
            ...dictionary.savedLinksHeaders,
            copiedToClipboard: dictionary.copiedToClipboard
          }}
          language={lang}
        />
      </section>
    </div>
  )
}
