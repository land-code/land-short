import { revalidatePath } from "next/cache"
import Refresh from "@/app/icons/refresh"

const refresh = async () => {
  'use server'
  revalidatePath('/', 'page')
}
const RefreshButton = ({ dictionary }: {
  dictionary: {
    refresh: string
    loading: string
  }
}) => {
  return (
    <form action={refresh}>
      <button
        type="submit"
        className="flex items-center gap-2 bg-zinc-800 text-zinc-200 p-2 rounded-xl hover:bg-zinc-500 active:bg-zinc-400"
      >
        <Refresh />
        {dictionary.loading}
      </button>
    </form>
  )
}
export default RefreshButton