import { useFormStatus } from 'react-dom'

const SubmitButton = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { pending } = useFormStatus()
  return (
    <button
      type='submit'
      disabled={pending}
      className={pending
        ? 'flex items-center gap-2 bg-zinc-500 text-zinc-800 p-2 rounded-xl'
        : 'flex items-center gap-2 bg-zinc-200 text-zinc-800 p-2 rounded-xl hover:bg-zinc-700 active:bg-zinc-500 dark:bg-zinc-800 dark:text-zinc-200'}
    >
      {children}
    </button>
  )
}

export default SubmitButton
