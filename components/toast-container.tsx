'use client'

import { useToast } from '../app/lib/use-toast'

export default function ToastContainer (): JSX.Element {
  const { ToastContainer } = useToast()
  return (
    <div className='flex flex-col items-center fixed bottom-2 left-1/2 -translate-x-1/2 gap-2 max-h-40'>
      <ToastContainer />
    </div>
  )
}
