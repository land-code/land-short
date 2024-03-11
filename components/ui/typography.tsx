import { madimiOne } from '@/app/fonts/madimi-one'
import clsx from 'clsx'

interface TypographyProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  children: React.ReactNode
  isTitle?: boolean
  className?: string
}

export function Typography ({ as: Tag, children, isTitle, className }: TypographyProps) {
  const isHeading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(Tag) || isTitle
  const titleClass = isHeading ? `${madimiOne.className} text-3xl` : ''
  return (
    <Tag className={clsx(titleClass, className)}>{children}</Tag>
  )
}
