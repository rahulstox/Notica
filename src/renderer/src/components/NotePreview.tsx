import { cn, formatDateFromMs } from '@renderer/utils' // cn = className merge utility, formatDateFromMs = date formatter
import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean // Currently selected note?
} & ComponentProps<'div'> // Allow div props (onClick, className, etc.)

export const NotePreview = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const date = formatDateFromMs(lastEditTime) // Format timestamp to readable date

  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75', // Basic styling
        {
          'bg-zinc-400/75': isActive, // Active note background
          'hover:bg-zinc-500/75': !isActive // Hover effect for inactive
        },
        className // Allow custom className
      )}
      {...props} // Other props like onClick
    >
      <h3 className="mb-1 font-bold truncate">{title}</h3> {/* Title with ellipsis if long */}
      <span className="inline-block w-full mb-2 text-xs font-light text-left">{date}</span>{' '}
      {/* Date below title */}
    </div>
  )
}
