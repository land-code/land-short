'use client'
import { DeleteShortLinkState, deleteShortLink } from '@/app/actions/delete-short-link'
import { useFormState, useFormStatus } from 'react-dom'
import DeleteIcon from '../icons/delete'
import { useToast } from '../lib/use-toast'
import { useEffect } from 'react'
import { Locale } from '../i18n-config'
import Button from './button'

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
  }, [state, pending, showToast])

  return (
    <form action={action}>
      <input className='hidden' name='id' value={id} readOnly />
      <input className='hidden' name='language' value={language} readOnly />
      <Button type='submit' style='smallPrimary'>
        <DeleteIcon />
        {dictionary.delete}
      </Button>
    </form>
  )
}
