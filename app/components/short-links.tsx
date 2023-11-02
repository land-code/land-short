import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import { Database } from "@/database.types";
import LinkToCopy from "./link-to-copy";

export default async function ShortLinks () {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {data, error} = await supabase
    .from('short_codes')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) console.error(error)
  return (
    <div className="w-full border-zinc-600 border-2 rounded-xl sm:p-2">
          <table className="table-auto text-center w-full">
            <thead>
              <tr className="hidden sm:table-row">
                <th>Name</th>
                <th>Content</th>
                <th className="hidden sm:table-cell">Date</th>
                <th className="hidden sm:table-cell">Time</th>
              </tr>
            </thead>
            <tbody>
              {
                data?.map(({id, name, created_at, content, is_url}) => {
                  const date = new Date(created_at)
                  return(
                    <tr key={id} className="flex flex-col sm:table-row">
                      <td className="font-bold sm:font-normal">{name}</td>
                      <td>
                        <div className="flex justify-center">
                          <LinkToCopy isUrl={is_url} content={content} />
                        </div>
                      </td>
                      <td>{date.toDateString()}</td>
                      <td className="border-b-2 border-zinc-800 sm:border-0">{date.toLocaleTimeString()}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
  )
}