'use client'

import EditIcon from '@/app/icons/edit'
import DeleteIcon from '@/app/icons/delete'
import Button from './ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { deleteLink } from '@/app/actions'
import { useToast } from '@/app/lib/use-toast'

export default function DashboardRow ({ id, name, content, createdAt }: { id: number, name: string, content: string | null, createdAt: string }) {
  const { showToast } = useToast()
  return (
    <TableRow>
      <TableCell><Checkbox name='id' value={id} /></TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{content}</TableCell>
      <TableCell>{createdAt}</TableCell>
      <TableCell className='flex'>
        <Button
          style='primaryTransparent'
          className='bg-transparent hover:text-zinc-50 active:text-zinc-50 text-zinc-950 dark:text-zinc-50'
          title='Edit'
        >
          <EditIcon />
        </Button>
        <Button
          style='primaryTransparent'
          className='bg-transparent hover:text-zinc-50 active:text-zinc-50 text-zinc-950 dark:text-zinc-50'
          title='Delete'
          onClick={() => {
            void deleteLink(id)
              .then(message => {
                if (message) {
                  return showToast(message)
                }
                showToast('Link deleted')
              })
          }}
        >
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}
