import { Locale } from '../i18n-config'

interface ShortLinksContainerProps {
  children: React.ReactNode
  dictionary: {
    savedLinksHeaders: {
      name: string
      content: string
      date: string
      time: string
      code: string
      actions: string
      delete: string
    }
    copiedToClipboard: string
  }
  lang: Locale
}

const ShortLinksContainer = ({
  children,
  dictionary,
  lang
}: ShortLinksContainerProps): JSX.Element => {
  return (
    <div className='w-full border-zinc-600 border-2 rounded-xl sm:p-2 dark:border-0 dark:bg-zinc-600'>
      <table className='table-auto text-center w-full'>
        <thead>
          <tr className='hidden sm:table-row text-xl [&>th]:font-normal'>
            <th>{dictionary.savedLinksHeaders.name}</th>
            <th>{dictionary.savedLinksHeaders.content}</th>
            <th className='hidden sm:table-cell'>{dictionary.savedLinksHeaders.date}</th>
            <th className='hidden sm:table-cell'>{dictionary.savedLinksHeaders.time}</th>
            <th className='hidden sm:table-cell'>{dictionary.savedLinksHeaders.actions}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  )
}

export default ShortLinksContainer
