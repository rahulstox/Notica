import { ActionButton, ActionButtonProps } from '@/components' // Reusable button component import
import { createEmptyNoteAtom } from '@renderer/store' // Jotai atom for creating a new note
import { useSetAtom } from 'jotai' // Hook to update atom state
import { LuSignature } from 'react-icons/lu' // Icon for the button

// NewNoteButton ek wrapper hai ActionButton ka, jo naya note create karta hai
export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom) // Atom set karne ke liye hook

  const handleCreation = async () => {
    await createEmptyNote() // Note create karna onClick pe
  }

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LuSignature className="w-4 h-4 text-zinc-300" /> {/* Icon inside the button */}
    </ActionButton>
  )
}
