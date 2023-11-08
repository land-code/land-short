import { Database } from "@/database.types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { logout } from "@/app/actions/logout"
import { materialSymbols } from "../fonts/material-symbols"

const LoginLogoutButton = async ({ dictionary }: {
  dictionary: {
    login: string
    logout: string
  }
}) => {
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
              className="bg-zinc-800 text-xl text-zinc-200 p-2 rounded-xl hover:bg-zinc-500 active:bg-zinc-400"
            >
              {dictionary.login}
            </Link>)
          : (
            <div className="flex items-center gap-4">
              <p className="text-zinc-200 text-lg">{user.email}</p>
              <form action={logout}>
                <button
                  className="flex items-center gap-2 bg-zinc-800 text-xl text-zinc-200 p-2 rounded-xl hover:bg-zinc-500 active:bg-zinc-400"
                >
                  <span className={materialSymbols.className}>logout</span>
                  {dictionary.logout}
                </button>
              </form>
            </div>
          )
      }
    </>
  )
}

export default LoginLogoutButton