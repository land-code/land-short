'use client'

import { shortLink } from '../../app/actions/short-link'
import { useFormState, useFormStatus } from 'react-dom'
import AddLink from '../../app/icons/add_link'
import { BASE_URL, protectionOptions } from '../../app/lib/consts'
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
  className = '',
  page = '/'
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
    protection: {
      label: string
      placeholder: string
      options: {
        public: string
        private: string
      }
    }
    submit: {
      default: string
      pending: string
    }
  }
  language: string
  userId: string
  className?: string
  page?: string
}): ReactNode {
  const [state, formAction] = useFormState(shortLink, initialState)
  return (
    <form action={formAction} className={`bg-zinc-800 text-zinc-200 p-4 rounded-xl flex flex-col items-center gap-2 w-full dark:bg-zinc-600 ${className}`}>
      <label className='w-full'>
        <span>
          {dictionary.longLink.label}
        </span>
        <input type='text' required name='long-link' className='block p-2 rounded-xl bg-zinc-600 text-zinc-200 w-full dark:bg-zinc-800' placeholder={dictionary.longLink.placeholder} />
      </label>
      <label className='w-full'>
        <span>
          {dictionary.code.label}
        </span>
        <div className='flex items-center flex-wrap'>
          <span className='w-max text-zinc-300'>{BASE_URL}</span>
          <input autoComplete='off' required name='code' className='flex-grow p-2 rounded-xl bg-zinc-600 text-zinc-200 dark:bg-zinc-800' placeholder={dictionary.code.placeholder} />
        </div>
      </label>
      <label className='flex w-full gap-4 items-center'>
        {dictionary.protection.label}
        <select required name='protection' className='p-2 rounded-xl bg-zinc-600 text-zinc-200 flex-1 dark:bg-zinc-800'>
          <option value={protectionOptions[0]}>{dictionary.protection.options.public}</option>
          <option value={protectionOptions[1]}>{dictionary.protection.options.private}</option>
        </select>
      </label>
      <input autoComplete='off' readOnly hidden type='text' name='language' value={language} />
      <input autoComplete='off' readOnly hidden type='text' name='username' value={userId} />
      <input autoComplete='off' readOnly hidden type='text' name='page' value={page} />
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
