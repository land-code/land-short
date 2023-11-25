'use client'

import { useToast } from '../lib/use-toast'

export default function LinkToCopy ({
  isUrl,
  content,
  dictionary
}: {
  isUrl: boolean
  content: string | null
  dictionary: {
    copiedToClipboard: string
  }
}): JSX.Element {
  const { showToast } = useToast()
  const copyLink = (link: string): void => {
    navigator.clipboard.writeText(link)
      .then(() => {
        showToast(dictionary.copiedToClipboard, { duration: 3000 })
      })
      .catch(error => console.error(error))
  }
  return (
    <>
      {
        isUrl
          ? <a className='block max-w-xs w-max overflow-hidden whitespace-nowrap text-ellipsis text-zinc-600 underline dark:text-zinc-300' href={content ?? undefined}>{content}</a>
          : <button onClick={() => copyLink(content ?? '')} className='block max-w-xs overflow-hidden whitespace-nowrap text-ellipsis'>{content}</button>
      }
    </>
  )
}
