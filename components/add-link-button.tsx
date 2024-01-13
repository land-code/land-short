'use client'

import Button, { buttonStyles } from './ui/button'
import { Dialog, DialogContent } from './ui/dialog'
import ShortenerForm from './ui/shortener-form'
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
          style='primary' title='Add new link' className={buttonStyles.primary}
        >
          Add new link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <ShortenerForm dictionary={dictionary.saveLinkForm} language='es' userId={userId} className='bg-transparent dark:bg-transparent' />
      </DialogContent>
    </Dialog>
  )
}
