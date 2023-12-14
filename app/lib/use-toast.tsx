'use client'

import { ReactNode, createContext, useContext, useState } from 'react'
import Toast from '../ui/toast'

interface ToastProps {
  message: string
  options: {
    duration?: number
  }
}

interface ToastNotification {
  showToast: (message: string, options?: { duration: number }) => void
  ToastContainer: ({ maxItems }: { maxItems?: number }) => JSX.Element
}

export const ToastContext = createContext<ToastNotification | null>(null)

export const useToast = (): ToastNotification => {
  const context = useContext(ToastContext)
  if (context === null) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])
  const showToast = (message: string, options: { duration: number } = { duration: 3000 }): void => {
    const newToast: ToastProps = { message, options: { duration: options.duration } }
    setToasts(prevToasts => [...prevToasts, newToast])
  }
  const hideToast = (index: number): void => {
    setToasts(prevToasts => prevToasts.filter((_, i) => i !== index))
  }
  const ToastContainer = ({ maxItems = 2 }: { maxItems?: number }): JSX.Element => (
    <>
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          message={toast.message}
          onClose={() => hideToast(index)}
          duration={toast.options.duration}
          show={index < maxItems}
        />
      ))}
    </>
  )
  return (
    <ToastContext.Provider value={{ showToast, ToastContainer }}>
      {children}
    </ToastContext.Provider>
  )
}
