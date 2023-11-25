'use client'

import { useToast } from '../lib/use-toast'

export default function ToastContainer (): JSX.Element {
  const { ToastContainer } = useToast()
  return (
    <div className='flex flex-col items-center fixed bottom-2 w-full gap-2 max-h-40'>
      <ToastContainer />
    </div>
  )
}
