'use client'

import Button, { buttonStyles } from './ui/button'
import { Dialog, DialogContent } from './ui/dialog'
import ShortenerForm from './shortener-form'
import { Dictionary } from '@/app/get-dictionary'
import { Locale } from '@/app/i18n-config'
import { DialogTrigger } from '@radix-ui/react-dialog'

export default function AddLinkButton ({
  dictionary,
  language,
  userId
}: {
  dictionary: Dictionary
  language: Locale
  userId: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          style='primary' title='Add new link' type='button' className={buttonStyles.primary}
        >
          Add new link
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-zinc-50'>
        <ShortenerForm dictionary={dictionary.saveLinkForm} language='es' userId={userId} className='bg-zinc-50 text-zinc-950 dark:text-zinc-50 dark:bg-zinc-950' />
      </DialogContent>
    </Dialog>
  )
}
