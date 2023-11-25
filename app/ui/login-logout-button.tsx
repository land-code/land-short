import { Database } from '@/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { logout } from '@/app/actions/logout'
import Login from '@/app/icons/login'
import Logout from '@/app/icons/logout'

const LoginLogoutButton = async ({ dictionary }: {
  dictionary: {
    login: string
    logout: string
  }
}): Promise<JSX.Element> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data: { user } } = await supabase
    .auth
    .getUser()
  return (
    <>
      {
          user === null
            ? (
              <Link
                href='/login'
                className='flex items-center gap-2 text-xl text-zinc-200 p-2 rounded-xl hover:bg-zinc-500 active:bg-zinc-400'
              >
                <Login />
                {dictionary.login}
              </Link>)
            : (
              <div className='flex justify-center items-center flex-wrap gap-4'>
                <p className='text-zinc-200 text-lg'>{user.email}</p>
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <form action={logout}>
                  <button
                    className='flex items-center gap-2 text-xl text-zinc-200 p-2 rounded-xl hover:bg-zinc-500 active:bg-zinc-400'
                  >
                    <Logout />
                    <span className='sr-only sm:not-sr-only'>
                      {dictionary.logout}
                    </span>
                  </button>
                </form>
              </div>
              )
      }
    </>
  )
}

export default LoginLogoutButton
