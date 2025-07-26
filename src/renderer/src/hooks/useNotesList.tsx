import { notesAtom, selectedNoteIndexAtom } from '@/store'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const notes = useAtomValue(notesAtom)
  const setNotes = useSetAtom(notesAtom)
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  const handleNoteSelect = (index: number) => async () => {
    // ✅ FIX: Add a check to ensure notes is not undefined
    if (!notes) return

    const selectedNote = notes[index]

    if (!selectedNote) return

    // Update the timestamp of the selected note
    const updatedNotes = notes.map((note) => {
      if (note.fullPath === selectedNote.fullPath) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }
      return note
    })

    // Set the updated notes list in our global state
    setNotes(updatedNotes)

    // Set the selected index to 0
    setSelectedNoteIndex(0)

    if (onSelect) {
      onSelect()
    }
  }

  return {
    notes,
    selectedNoteIndex,
    handleNoteSelect
  }
}
