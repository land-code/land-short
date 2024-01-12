'use client'
import { DeleteShortLinkState, deleteShortLink } from '@/app/actions/delete-short-link'
import { useFormState, useFormStatus } from 'react-dom'
import DeleteIcon from '../../app/icons/delete'
import { useToast } from '../../app/lib/use-toast'
import { useEffect } from 'react'
import { Locale } from '../../app/i18n-config'
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, pending])

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
