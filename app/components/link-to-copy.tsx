'use client'

import { useState } from 'react'
import Toast from './toast'

export default function LinkToCopy ({
  isUrl,
  content
}: {
  isUrl: boolean
  content: string | null
}): JSX.Element {
  const [isToastShow, setIsToastShow] = useState(false)
  const copyLink = (link: string): void => {
    navigator.clipboard.writeText(link)
      .then(() => {
        setIsToastShow(true)
        setTimeout(() => setIsToastShow(false), 3000)
      })
      .catch(error => console.error(error))
  }
  return (
    <>
      {
        isUrl
          ? <a className='block max-w-xs w-max overflow-hidden whitespace-nowrap text-ellipsis text-zinc-600 underline' href={content ?? undefined}>{content}</a>
          : <button onClick={() => copyLink(content ?? '')} className='block max-w-xs overflow-hidden whitespace-nowrap text-ellipsis'>{content}</button>
      }
      <Toast show={isToastShow} message='Content copied to clipboard' />
    </>
  )
}
