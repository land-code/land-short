'use client'
import { DeleteShortLinkState, deleteShortLink } from '@/app/actions/delete-short-link'
import { useFormState, useFormStatus } from 'react-dom'
import DeleteIcon from '../icons/delete'
import { useToast } from '../lib/use-toast'
import { useEffect } from 'react'
import { Locale } from '../i18n-config'

export default function DeleteLinkButton ({
  id,
  dictionary,
  language
}: {
  id: number
  dictionary: {
    delete: string
  }
  language: Locale
}): JSX.Element {
  const initialValue: DeleteShortLinkState = {
    message: null,
    language
  }

  const [state, action] = useFormState(deleteShortLink, initialValue)
  const { pending } = useFormStatus()
  const { showToast } = useToast()

  useEffect(() => {
    if (state.message !== null && !pending) {
      showToast(state.message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, pending])

  return (
    <form action={action}>
      <input className='hidden' name='id' value={id} readOnly />
      <input className='hidden' name='language' value={language} readOnly />
      <button className='flex p-1 rounded-xl hover:bg-zinc-500 active:bg-zinc-400' type='submit'>
        <DeleteIcon />
        {dictionary.delete}
      </button>
    </form>
  )
}
