import ShortLinks from "../components/short-links";
import ShortenerForm from "../components/shortener-form";
import { refresh } from "../components/refresh";
import { Locale } from "../i18n-config";
import { getDictionary } from "../get-dictionary";
import { MaterialSymbol } from "../icons/material-symbols";
import RefreshButton from "@/app/components/refresh-button"

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)
  return (
    <div className="flex flex-col items-center gap-4">
      <section className="flex flex-col items-center max-w-full">
        <h2 className="text-3xl">{dictionary.saveLink}</h2>
        <ShortenerForm dictionary={dictionary.saveLinkForm} />
      </section>
      <section className="flex flex-col items-center max-w-full">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl">{dictionary.savedLinks}</h2>
          <RefreshButton dictionary={{refresh: dictionary.refresh, loading: 'Refreshing'}} />
        </div>
        <ShortLinks dictionary={dictionary.savedLinksHeaders} />
      </section>
    </div>
  )
}
