'use client'
import { DeleteShortLinkState, deleteShortLink } from '@/app/actions/delete-short-link'
import { useFormState, useFormStatus } from 'react-dom'
import DeleteIcon from '../icons/delete'
import { useToast } from '../lib/use-toast'
import { useEffect } from 'react'

const initialValue: DeleteShortLinkState = {
  message: null
}

export default function DeleteLinkButton ({
  id,
  dictionary
}: {
  id: number
  dictionary: {
    delete: string
  }
}): JSX.Element {
  const [state, action] = useFormState(deleteShortLink, initialValue)
  const { pending } = useFormStatus()
  const { showToast } = useToast()
  // show toast when message is not null
  useEffect(() => {
    if (state.message !== null && !pending) showToast(state.message)
    console.log()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, pending])

  return (
    <form action={action}>
      <input className='hidden' name='id' value={id} readOnly />
      <button className='flex' type='submit'>
        <DeleteIcon />
        {dictionary.delete}
      </button>
    </form>
  )
}
