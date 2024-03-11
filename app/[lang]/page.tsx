import ShortLinks from '../../components/ui/short-links'
import ShortenerForm from '../../components/ui/shortener-form'
import { Locale } from '../i18n-config'
import { getDictionary } from '../get-dictionary'
import { Database } from '@/database.types'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import ShortLinksContainer from '../../components/ui/short-links-container'
import { Suspense } from 'react'
import ShortLinksPlaceholder from '../../components/ui/short-links-placeholder'
import { Typography } from '@/components/ui/typography'

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
        <Typography as='h2' className='mb-2'>{dictionary.saveLink}</Typography>
        <ShortenerForm userId={user?.id ?? ''} dictionary={dictionary.saveLinkForm} language={lang} />
      </section>
      <section className='flex flex-col items-center w-full max-w-[800px]'>
        <Typography as='h2' className='mb-2'>{dictionary.savedLinks}</Typography>
        <p className='text-zinc-600 dark:text-zinc-400 mb-2'>{dictionary.autoRefreshEnabled}</p>
        <ShortLinksContainer
          lang={lang}
          dictionary={{
            savedLinksHeaders: dictionary.savedLinksHeaders,
            copiedToClipboard: dictionary.copiedToClipboard
          }}
        >
          <Suspense
            fallback={
              <ShortLinksPlaceholder />
}
          >
            <ShortLinks
              dictionary={{
                ...dictionary.savedLinksHeaders,
                copiedToClipboard: dictionary.copiedToClipboard
              }}
              language={lang}
            />
          </Suspense>
        </ShortLinksContainer>
      </section>
    </div>
  )
}
