import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Locale } from '../app/i18n-config'

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
    <Table className='table-auto text-center w-full bg-zinc-600 rounded-xl text-slate-200'>
      <TableHeader>
        <TableRow className='hidden sm:table-row text-xl [&>th]:font-normal [&>th]:text-zinc-50 dark:[&>th]:text-zinc-50'>
          <TableHead className='text-center'>{dictionary.savedLinksHeaders.name}</TableHead>
          <TableHead className='text-center'>{dictionary.savedLinksHeaders.content}</TableHead>
          <TableHead className='hidden text-center sm:table-cell'>{dictionary.savedLinksHeaders.date}</TableHead>
          <TableHead className='hidden text-center sm:table-cell'>{dictionary.savedLinksHeaders.time}</TableHead>
          <TableHead className='hidden text-center sm:table-cell'>{dictionary.savedLinksHeaders.actions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {children}
      </TableBody>
    </Table>
  )
}

export default ShortLinksContainer
