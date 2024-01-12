import { Database } from '@/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { logout } from '@/app/actions/logout'
import Login from '@/app/icons/login'
import Logout from '@/app/icons/logout'
import Button from './button'

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
            <Button
              type='link'
              style='secondaryHeader'
              href='/login'
            >
              <Login />
              {dictionary.login}
            </Button>)
          : (
            <div className='flex justify-center items-center flex-wrap gap-4'>
              <Button type='link' href='dashboard'>
                {user.email}
              </Button>
              <form action={logout}>
                <Button
                  type='submit'
                  style='secondaryHeader'
                >
                  <Logout />
                  <span className='sr-only sm:not-sr-only'>
                    {dictionary.logout}
                  </span>
                </Button>
              </form>
            </div>
            )
      }
    </>
  )
}

export default LoginLogoutButton
