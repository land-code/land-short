import ShortLinks from '../ui/short-links'
import ShortenerForm from '../ui/shortener-form'
import { Locale } from '../i18n-config'
import { getDictionary } from '../get-dictionary'
import RefreshButton from '@/app/ui/refresh-button'

export default async function Home ({
  params: { lang }
}: {
  params: { lang: Locale }
}): Promise<JSX.Element> {
  const dictionary = await getDictionary(lang)
  return (
    <div className='flex flex-col items-center gap-4'>
      <section className='flex flex-col items-center max-w-full'>
        <h2 className='text-3xl'>{dictionary.saveLink}</h2>
        <ShortenerForm dictionary={dictionary.saveLinkForm} language={lang} />
      </section>
      <section className='flex flex-col items-center max-w-full'>
        <div className='flex items-center gap-4'>
          <h2 className='text-3xl'>{dictionary.savedLinks}</h2>
          <RefreshButton dictionary={{ refresh: dictionary.refresh }} />
        </div>
        <ShortLinks dictionary={dictionary.savedLinksHeaders} />
      </section>
    </div>
  )
}
