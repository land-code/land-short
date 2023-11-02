'use client'

import { useState } from "react"
import Toast from "./toast"

export default function LinkToCopy ({
  isUrl,
  content
}: {
  isUrl: boolean
  content: string | null
}) {
  const [isToastShow, setIsToastShow] = useState(false)
  const copyLink = (link: string) => {
      navigator.clipboard.writeText(link)
      setIsToastShow(true)
      setTimeout(() => setIsToastShow(false), 3000)
  }
  return (
    <>
      {
        isUrl
          ? <a className="block max-w-xs w-max overflow-hidden whitespace-nowrap text-ellipsis text-zinc-600 underline" href={content ?? undefined}>{content}</a>
          : <button onClick={() => copyLink(content ?? '')} className="block max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">{content}</button>
      }
      <Toast show={isToastShow} message="Content copied to clipboard" />
    </>
  )
}