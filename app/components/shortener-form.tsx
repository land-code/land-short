'use client'

import { shortLink } from "./short-link"
import { useFormState } from "react-dom"
import SubmitButton from "./submit-button"

const initialValue = {
  message: null
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