import { DeleteNoteButton, NewNoteButton } from '@/components'

export const ActionButtonsRow = () => {
  return (
    <div className="flex justify-between mt-1">
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
