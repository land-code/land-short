'use client'

import { useEffect, useRef, useState } from 'react'
import './toast.css'

export default function Toast ({
  onClose,
  message,
  duration = 3000,
  show = true
}:
{
  onClose: () => void
  message: string
  duration?: number
  show?: boolean
}): JSX.Element {
  const [isHover, setIsHover] = useState(false)
  const toastRef = useRef<HTMLDivElement>(null)
  const closeToast = (): void => {
    toastRef.current?.classList.add('animate-fade-out')
  }
  useEffect(() => {
    if (!isHover || !show) {
      const timer = setTimeout(() => {
        closeToast()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, isHover, show])
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      id='toast-success'
      className={`flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow hover:animated-pulse dark:text-gray-400 dark:bg-gray-800 ${show ? '' : 'hidden'}`}
      role='alert'
      ref={toastRef}
      onAnimationEnd={(e) => e.animationName === 'fadeOutAnimation' && onClose()}
    >
      <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200'>
        <svg className='w-5 h-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
        </svg>
        <span className='sr-only'>Check icon</span>
      </div>
      <div className='ml-3 text-sm font-normal'>{message}</div>
      <button onClick={closeToast} type='button' className='ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-full focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700' data-dismiss-target='#toast-success' aria-label='Close'>
        <span className='sr-only'>Close</span>
        <svg className='w-3 h-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
          <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
        </svg>
      </button>
    </div>
  )
}
