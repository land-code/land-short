'use client'
import { useFormState } from "react-dom"
import { login } from "@/app/actions/login-action"
import SubmitButton from "./submit-button"
import { Locale } from "../i18n-config"

const initialState = {
    message: null
}

const LoginForm = ({dictionary, lang}: {
  dictionary: {
    email: {
        label: string;
        placeholder: string;
    };
    password: {
        label: string;
        placeholder: string;
    };
    submit: string;
  }
  lang: Locale
}) => {
  const [state, formAction] = useFormState(login, initialState)
    return (
      <form action={formAction} className="bg-zinc-800 text-zinc-200 p-4 rounded-xl flex flex-col items-center gap-2 w-[500px] max-w-full">
      <label className="w-full">
        <span>
          {dictionary.email.label}
        </span>
        <input
          type="email"
          autoComplete="username"
          required
          name="email"
          className="block p-2 rounded-xl bg-zinc-600 text-zinc-200 w-full"
          placeholder={dictionary.email.placeholder} />
      </label>
      <label className="w-full">
        <span>
          {dictionary.password.label}
        </span>
        <input
          required
          type="password"
          autoComplete="current-password"
          name="password"
          className="block p-2 rounded-xl bg-zinc-600 text-zinc-200 w-full"
          placeholder={dictionary.password.placeholder} />
      </label>
      <input type="text" className="hidden" name="language" value={lang} readOnly />
      <SubmitButton>{dictionary.submit}</SubmitButton>
      <p>{state?.message}</p>
    </form>
  )
}

export default LoginForm