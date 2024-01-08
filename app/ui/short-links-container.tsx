import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
      <Table className='table-auto text-center w-full'>
        <TableHeader>
          <TableRow className='hidden sm:table-row text-xl [&>th]:font-normal'>
            <TableHead>{dictionary.savedLinksHeaders.name}</TableHead>
            <TableHead>{dictionary.savedLinksHeaders.content}</TableHead>
            <TableHead className='hidden sm:table-cell'>{dictionary.savedLinksHeaders.date}</TableHead>
            <TableHead className='hidden sm:table-cell'>{dictionary.savedLinksHeaders.time}</TableHead>
            <TableHead className='hidden sm:table-cell'>{dictionary.savedLinksHeaders.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </div>
  )
}

export default ShortLinksContainer
