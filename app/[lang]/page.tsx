import ShortLinks from "../components/short-links";
import ShortenerForm from "../components/shortener-form";
import { refresh } from "../components/refresh";
import { Locale } from "../i18n-config";
import { getDictionary } from "../get-dictionary";

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
          <form action={refresh}>
            <button
              type="submit"
              className="bg-zinc-800 text-zinc-200 p-2 rounded-xl hover:bg-zinc-500 active:bg-zinc-400"
            >
              {dictionary.refresh}
            </button>
          </form>
        </div>
        <ShortLinks dictionary={dictionary.savedLinksHeaders} />
      </section>
    </div>
  )
}
