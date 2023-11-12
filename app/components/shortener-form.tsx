'use client'

import { shortLink } from '../actions/short-link'
import { useFormState } from 'react-dom'
import SubmitButton from './submit-button'
import AddLink from '../icons/add_link'

const initialState = {
  message: null,
  link: null
}

export default function ShortenerForm ({
  dictionary,
  language
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
    submit: string
  }
  language: string
}): JSX.Element {
  const [state, formAction] = useFormState(shortLink, initialState)
  return (
    <form action={formAction} className='bg-zinc-800 text-zinc-200 p-4 rounded-xl flex flex-col items-center gap-2 w-[500px] max-w-full'>
      <label className='w-full'>
        <span>
          {dictionary.longLink.label}
        </span>
        <input type='text' required name='long-link' className='block p-2 rounded-xl bg-zinc-600 text-zinc-200 w-full' placeholder={dictionary.longLink.placeholder} />
      </label>
      <label className='w-full'>
        <span>
          {dictionary.code.label}
        </span>
        <div className='flex items-center'>
          <span>https://land-short.vercel.app/</span>
          <input required name='code' className='block p-2 rounded-xl bg-zinc-600 text-zinc-200' placeholder={dictionary.code.placeholder} />
        </div>
        <input readOnly className='hidden' type='text' name='language' value={language} />
      </label>
      <SubmitButton>
        <AddLink />
        {dictionary.submit}
      </SubmitButton>
      <p className='text-red-300'>{state?.message}</p>
      {(state?.link !== null && state?.link !== '') &&
        <p>
          <span>Link: </span>
          <a href={state?.link ?? '#'}>
            {state?.link}
          </a>
        </p>}
    </form>
  )
}
