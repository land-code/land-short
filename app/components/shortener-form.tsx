'use client'
import { shortLink } from "./shortLink"

export default function ShortenerForm() {
  return (
    <form action={shortLink} className="bg-zinc-800 text-zinc-200 p-4 rounded-xl flex flex-col items-center gap-2 w-max">
      <label>
        <span>
          Link or code:
        </span>
        <input required name="long-link" className="block p-2 rounded-xl bg-zinc-600 text-zinc-200 w-screen max-w-[560px]" placeholder="Introduce your long link or code" />
      </label>
      <button type="submit" className="bg-zinc-200 text-zinc-800 p-2 rounded-xl hover:bg-zinc-400 active:bg-zinc-500">Short</button>
    </form>
  )
}