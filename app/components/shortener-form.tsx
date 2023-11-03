'use client'

import { shortLink } from "./short-link"
import { useFormState, useFormStatus } from "react-dom"

const initialValue = {
  message: null
}

function SubmitButton({ children }: { children: JSX.Element | string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={pending
        ? 'bg-zinc-500 text-zinc-800 p-2 rounded-xl'
        : 'bg-zinc-200 text-zinc-800 p-2 rounded-xl hover:bg-zinc-400 active:bg-zinc-500'
      }>
        {children}
      </button>
  )
}

export default function ShortenerForm({
  dictionary
}: {
  dictionary: {
    longLink: {
      label: string
      placeholder: string
    }
    username: {
      label: string
      placeholder: string
    }
    submit: string
  }
}) {
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
      <SubmitButton>{dictionary.submit}</SubmitButton>
      <p>{state?.message}</p>
    </form>
  )
}