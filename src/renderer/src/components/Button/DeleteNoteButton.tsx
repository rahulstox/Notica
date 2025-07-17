import { ActionButton, ActionButtonProps } from '@/components' // Reusable styled button
import { deleteNoteAtom } from '@/store' // Atom for deleting a note
import { useSetAtom } from 'jotai' // Hook to trigger atom actions
import { FaRegTrashCan } from 'react-icons/fa6' // Trash icon for delete button

// DeleteNoteButton - note delete karne ke liye button component
export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom) // Atom set hook le rahe

  const handleDelete = async () => {
    await deleteNote() // Note delete karna
  }

  return (
    <ActionButton onClick={handleDelete} {...props}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" /> {/* Delete icon */}
    </ActionButton>
  )
}
