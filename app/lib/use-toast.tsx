'use client'

import { useState } from 'react'
import Toast from '../ui/toast'

interface ToastProps {
  message: string
  options: {
    duration?: number
  }
}

interface ToastNotification {
  showToast: (message: string, options: { duration: number }) => void
  ToastContainer: () => JSX.Element
}

export const useToast = (): ToastNotification => {
  const [toasts, setToasts] = useState<ToastProps[]>([])
  const showToast = (message: string, options: { duration: number } = { duration: 3000 }): void => {
    const newToast: ToastProps = { message, options: { duration: options.duration } }
    setToasts(prevToasts => [...prevToasts, newToast])
  }
  const hideToast = (index: number): void => {
    setToasts(prevToasts => prevToasts.filter((_, i) => i !== index))
  }
  const ToastContainer = (): JSX.Element => (
    <div>
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          message={toast.message}
          onClose={() => hideToast(index)}
        />
      ))}
    </div>
  )
  return {
    showToast,
    ToastContainer
  }
}
