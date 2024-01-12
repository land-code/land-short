'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { login } from '@/app/actions/login-action'
import { Locale } from '../../app/i18n-config'
import Login from '@/app/icons/login'
import { ReactNode } from 'react'
import Button from './button'

const initialState = {
  message: null
}

const SubmitButton = ({ dictionary }: {
  dictionary: {
    default: string
    pending: string
  }
}): ReactNode => {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' style='secondary' pending={pending} pendingChildren={<><Login />{dictionary.pending}</>}>
      <Login />
      {dictionary.default}
    </Button>
  )
}

const LoginForm = ({ dictionary, lang }: {
  dictionary: {
    email: {
      label: string
      placeholder: string
    }
    password: {
      label: string
      placeholder: string
    }
    submit: {
      default: string
      pending: string
    }
  }
  lang: Locale
}): JSX.Element => {
  const [state, formAction] = useFormState(login, initialState)
  return (
    <form action={formAction} className='bg-zinc-800 text-zinc-200 p-4 rounded-xl flex flex-col items-center gap-2 w-[500px] max-w-full dark:bg-zinc-600'>
      <label className='w-full'>
        <span>
          {dictionary.email.label}
        </span>
        <input
          type='email'
          autoComplete='email'
          required
          name='email'
          className='block p-2 rounded-xl bg-zinc-600 text-zinc-200 w-full dark:bg-zinc-800'
          placeholder={dictionary.email.placeholder}
        />
      </label>
      <label className='w-full'>
        <span>
          {dictionary.password.label}
        </span>
        <input
          required
          type='password'
          autoComplete='current-password'
          name='password'
          className='block p-2 rounded-xl bg-zinc-600 text-zinc-200 w-full dark:bg-zinc-800'
          placeholder={dictionary.password.placeholder}
        />
      </label>
      <input type='text' className='hidden' name='language' value={lang} readOnly />
      <SubmitButton dictionary={dictionary.submit} />
      <p>{state?.message}</p>
    </form>
  )
}

export default LoginForm
