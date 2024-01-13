'use client'

import { shortLink } from '../../app/actions/short-link'
import { useFormState, useFormStatus } from 'react-dom'
import AddLink from '../../app/icons/add_link'
import { BASE_URL } from '../../app/lib/consts'
import Button from './button'
import { ReactNode } from 'react'

const initialState = {
  message: null,
  link: null
}

const SubmitButton = ({ dictionary }: {
  dictionary: {
    default: string
    pending: string
  }
}): ReactNode => {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' style='secondary' pending={pending} pendingChildren={<><AddLink />{dictionary.pending}</>}>
      <AddLink />
      {dictionary.default}
    </Button>
  )
}

export default function ShortenerForm ({
  dictionary,
  language,
  userId,
  className = ''
}: {
  dictionary: {
    longLink: {
      label: string
      placeholder: string
    }
    code: {
      label: string
      placeholder: string
    }
    submit: {
      default: string
      pending: string
    }
  }
  language: string
  userId: string
  className?: string
}): ReactNode {
  const [state, formAction] = useFormState(shortLink, initialState)
  return (
    <form action={formAction} className={`bg-zinc-800 text-zinc-200 p-4 rounded-xl flex flex-col items-center gap-2 w-full dark:bg-zinc-600 ${className}`}>
      <label className='w-full'>
        <span>
          {dictionary.longLink.label}
        </span>
        <input autoComplete='off' type='text' required name='long-link' className='block p-2 rounded-xl bg-zinc-600 text-zinc-200 w-full dark:bg-zinc-800' placeholder={dictionary.longLink.placeholder} />
      </label>
      <label className='w-full'>
        <span>
          {dictionary.code.label}
        </span>
        <div className='flex items-center flex-wrap'>
          <span className='w-max'>{BASE_URL}</span>
          <input required name='code' className='flex-grow p-2 rounded-xl bg-zinc-600 text-zinc-200 dark:bg-zinc-800' placeholder={dictionary.code.placeholder} />
        </div>
        <input autoComplete='off' readOnly className='hidden' type='text' name='language' value={language} />
        <input autoComplete='off' readOnly className='hidden' type='text' name='username' value={userId} />
      </label>
      <SubmitButton dictionary={dictionary.submit} />
      <p className='text-red-300'>{state?.message}</p>
      {(state?.link !== null && state?.link !== '') &&
        <p>
          <span>Link: </span>
          <Button type='link' style='neutral' href={state?.link ?? '#'}>
            {state?.link}
          </Button>
        </p>}
    </form>
  )
}
