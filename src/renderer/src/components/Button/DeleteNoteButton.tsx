import { ActionButton, ActionButtonProps } from '@/components/Button/ActionButton'
import { deleteNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'
import { Trash2 } from 'lucide-react'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDelete = () => {
    deleteNote()
  }

  return (
    <ActionButton onClick={handleDelete} {...props}>
      <Trash2 className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
