'use client'

import { shortLink } from "./short-link"
import { useFormState, useFormStatus } from "react-dom"

const initialValue = {
  message: null
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" aria-disabled={pending} className="bg-zinc-200 text-zinc-800 p-2 rounded-xl hover:bg-zinc-400 active:bg-zinc-500">Short</button>
  )
}

export default function ShortenerForm() {
  const [state, formAction] = useFormState(shortLink, initialValue)
  return (
    <form action={formAction} className="bg-zinc-800 text-zinc-200 p-4 rounded-xl flex flex-col items-center gap-2 w-[500px] max-w-full">
      <label className="w-full">
        <span>
          Link or code:
        </span>
        <input type="text" required name="long-link" className="block p-2 rounded-xl bg-zinc-600 text-zinc-200 w-full" placeholder="Introduce your long link or code" />
      </label>
      <label className="w-full">
        <span>
          Username:
        </span>
        <input required name="username" className="block p-2 rounded-xl bg-zinc-600 text-zinc-200 w-full" placeholder="Introduce your username" />
      </label>
      <button type="submit" className="bg-zinc-200 text-zinc-800 p-2 rounded-xl hover:bg-zinc-400 active:bg-zinc-500">Short</button>
      <p>{state?.message}</p>
    </form>
  )
}