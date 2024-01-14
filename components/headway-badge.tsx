'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

export default function HeadwayComponent () {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (!loaded) return
    // @ts-expect-error
    Headway.init({
      selector: '#changelog',
      account: 'xG8667'
    })
  }, [loaded])
  return (
    <>
      <Script src='https://cdn.headwayapp.co/widget.js' onLoad={() => setLoaded(true)} />
      <div id='changelog' />
    </>
  )
}
