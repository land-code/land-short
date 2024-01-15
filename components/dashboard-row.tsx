'use client'

import EditIcon from '@/app/icons/edit'
import DeleteIcon from '@/app/icons/delete'
import Button from './ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { deleteLink, editLink } from '@/app/actions'
import { useToast } from '@/app/lib/use-toast'
import { useState } from 'react'
import { Input } from './ui/input'
import DoneIcon from '@/app/icons/done'

export default function DashboardRow ({ id, name, content, createdAt }: { id: number, name: string, content: string | null, createdAt: string }) {
  const { showToast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [nameValue, setNameValue] = useState(name)
  const [contentValue, setContentValue] = useState(content)
  return (
    <TableRow>
      <TableCell><Checkbox name='id' value={id} /></TableCell>
      <TableCell>
        {isEditing
          ? <Input name='name' value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
          : nameValue}
      </TableCell>
      <TableCell>{isEditing
        ? <Input name='content' value={contentValue ?? ''} onChange={(e) => setContentValue(e.target.value)} />
        : contentValue}
      </TableCell>
      <TableCell>{createdAt}</TableCell>
      <TableCell className='flex'>
        <Button
          style='primaryTransparent'
          className='bg-transparent hover:text-zinc-50 active:text-zinc-50 text-zinc-950 dark:text-zinc-50'
          title='Edit'
          onClick={async () => {
            if (isEditing) {
              const response = await editLink(id, nameValue, contentValue)
              showToast(response)
              if (response === 'Link updated successfully') {
                setIsEditing(false)
              }
              return
            }
            setIsEditing(true)
          }}
        >
          {isEditing
            ? <DoneIcon />
            : <EditIcon />}
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
