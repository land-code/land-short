import Link from 'next/link'
import { ReactNode } from 'react'

const Button = ({
  type = 'button',
  style = 'primary',
  title = '',
  href = '#',
  onClick,
  pending = false,
  pendingChildren,
  children
}: {
  type?: 'button' | 'submit' | 'reset' | 'link'
  style?: 'neutral' | 'primary' | 'secondary' | 'secondaryHeader' | 'shortLink' | 'linkToCopy' | 'smallPrimary'
  title?: string
  href?: string
  onClick?: () => void
  pendingChildren?: ReactNode
  pending?: boolean

  children: ReactNode
}): JSX.Element => {
  const styles = {
    neutral: 'underline',
    primary: 'flex items-center gap-2 p-2 rounded-full bg-zinc-800 text-zinc-50 transition-colors hover:bg-zinc-600 active:bg-zinc-500 disabled:bg-zinc-400 dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:active:bg-zinc-600 dark:disabled:bg-zinc-900',
    smallPrimary: 'flex items-center gap-1 p-1 rounded-full bg-zinc-800 text-zinc-50 transition-colors hover:bg-zinc-600 active:bg-zinc-500 disabled:bg-zinc-400 dark:hover:bg-zinc-900 dark:active:bg-zinc-950 dark:disabled:bg-zinc-900',
    secondaryHeader: 'flex items-center gap-2 p-2 rounded-full bg-zinc-200 text-zinc-800 border-2 border-zinc-500 transition-colors hover:bg-zinc-400 active:bg-zinc-500 disabled:bg-zinc-500 dark:bg-zinc-800 dark:border-0 dark:text-zinc-50 dark:hover:bg-zinc-600 dark:active:bg-zinc-500 dark:disabled:bg-zinc-500 dark:disabled:text-zinc-300',
    secondary: 'flex items-center gap-2 p-2 rounded-full bg-zinc-200 text-zinc-800 border-2 border-zinc-500 transition-colors hover:bg-zinc-400 active:bg-zinc-500 disabled:bg-zinc-500 dark:bg-zinc-900 dark:border-0 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:active:bg-zinc-700 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-300',
    linkToCopy: 'block max-w-[15rem] overflow-hidden whitespace-nowrap text-ellipsis sm:max-w-xs',
    shortLink: 'block max-w-[15rem] w-max overflow-hidden whitespace-nowrap text-ellipsis text-zinc-600 underline sm:max-w-xs dark:text-zinc-300'
  }
  return (
    <>
      {type === 'link'
        ? (
          <Link
            title={title}
            className={styles[style]}
            href={href}
          >
            {children}
          </Link>
          )
        : (
          <button
            title={title}
            disabled={pending}
            onClick={onClick}
            className={styles[style]}
            type={type}
          >
            {pending
              ? pendingChildren
              : children}
          </button>
          )}
    </>
  )
}

export default Button
