import { revalidatePath } from 'next/cache'
import Refresh from '@/app/icons/refresh'

const refresh = async (): Promise<void> => {
  'use server'
  revalidatePath('/', 'page')
}
const RefreshButton = ({ dictionary }: {
  dictionary: {
    refresh: string
  }
}): JSX.Element => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form action={refresh}>
      <button
        type='submit'
        className='flex items-center gap-2 bg-zinc-800 text-zinc-200 p-2 rounded-xl hover:bg-zinc-500 active:bg-zinc-400 dark:bg-zinc-600'
      >
        <Refresh />
        {dictionary.refresh}
      </button>
    </form>
  )
}
export default RefreshButton
