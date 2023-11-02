import { revalidatePath } from "next/cache";
import ShortLinks from "./components/short-links";
import ShortenerForm from "./components/shortener-form";
import { refresh } from "./components/refresh";


export default async function Home() {
  return (
    <div className="flex flex-col items-center gap-4">
      <section className="flex flex-col items-center max-w-full">
        <h2 className="text-3xl">Save your link</h2>
        <ShortenerForm />
      </section>
      <section className="flex flex-col items-center max-w-full">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl">Saved links</h2>
          <form action={refresh}>
            <button type="submit" className="bg-zinc-800 text-zinc-200 p-2 rounded-xl hover:bg-zinc-500 active:bg-zinc-400">Refresh</button>
          </form>
        </div>
        <ShortLinks />
      </section>
    </div>
  )
}
