// 🔄 Importing global atoms (state) for notes and selected note index
import { notesAtom, selectedNoteIndexAtom } from '@/store'

// 🧠 Jotai hooks for using and reading atom state
import { useAtom, useAtomValue } from 'jotai'

/**
 * 🧩 Custom hook: useNotesList
 * Iska kaam hai:
 * - Notes list ko access karna
 * - Currently selected note index ko track karna
 * - Note select hone par state update karna
 *
 * @param onSelect (optional callback) - jab bhi user koi note select kare
 */
export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  // 📄 Get the list of all notes (readonly)
  const notes = useAtomValue(notesAtom)

  // 🔢 Get and set the currently selected note index
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  // 🖱️ Note select karne ka handler (closure return karta hai)
  const handleNoteSelect = (index: number) => async () => {
    // Selected note index update karo
    setSelectedNoteIndex(index)

    // Optional callback agar diya gaya hai toh usse call karo
    if (onSelect) {
      onSelect()
    }
  }

  // 🔙 Return values from hook for use in components
  return {
    notes, // list of notes
    selectedNoteIndex, // currently selected note index
    handleNoteSelect // function to handle note selection
  }
}

// Gives you:

// notes: full list of notes (readonly)

// selectedNoteIndex: index of selected note

// handleNoteSelect: function to change selected note