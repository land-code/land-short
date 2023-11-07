import { useFormStatus } from "react-dom"

const SubmitButton = ({ children }: { children: JSX.Element | string }) => {
    const { pending } = useFormStatus()
    return (
      <button
        type="submit"
        disabled={pending}
        className={pending
          ? 'bg-zinc-500 text-zinc-800 p-2 rounded-xl'
          : 'bg-zinc-200 text-zinc-800 p-2 rounded-xl hover:bg-zinc-400 active:bg-zinc-500'
        }>
          {children}
        </button>
    )
}

export default SubmitButton