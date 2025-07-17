import { NotePreview } from '@/components' // Single note preview item
import { useNotesList } from '@/hooks/useNotesList' // Custom hook for notes logic
import { isEmpty } from 'lodash' // Utility to check if notes array is empty
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void // Optional callback when a note is selected
}

// ✅ Note list component
export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({ onSelect }) // Notes & handlers from custom hook

  if (!notes) return null // Agar notes null hai, to kuch render mat karo

  if (isEmpty(notes)) {
    // Agar notes empty hai, to message dikhao
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      {/* Map each note to a NotePreview item */}
      {notes.map((note, index) => (
        <NotePreview
          key={note.title + note.lastEditTime} // Unique key
          isActive={selectedNoteIndex === index} // Highlight if selected
          onClick={handleNoteSelect(index)} // Select handler
          {...note} // Pass note data as props
        />
      ))}
    </ul>
  )
}
