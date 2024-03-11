'use client'

import { useToast } from '../app/lib/use-toast'
import Button from './ui/button'

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
          ? <Button type='link' style='shortLink' href={content ?? undefined}>{content}</Button>
          : <Button type='button' style='linkToCopy' onClick={() => copyLink(content ?? '')}>{content}</Button>
      }
    </>
  )
}
