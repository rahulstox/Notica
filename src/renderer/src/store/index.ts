import { NoteContent, NoteInfo } from '@shared/models'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

const loadNotes = async () => {
  const notes = await window.context.getNotes()

  // sort them by most recently edited
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null || !notes) return null

  const selectedNote = notes[selectedNoteIndex]

  // ✅ FIX: Use the full path to read the note's content
  const noteContent = await window.context.readNote(selectedNote.fullPath)

  return {
    ...selectedNote,
    content: noteContent
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEditTime: Date.now(),
      fullPath: '' // ✅ FIX: Add fullPath to the default object
    }
)

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  // ✅ FIX: Use the full path to write the note to disk
  await window.context.writeNote(selectedNote.fullPath, newContent)

  // update the saved note's last edit time
  set(
    notesAtom,
    notes.map((note) => {
      // ✅ FIX: Use the full path to find the note to update
      if (note.fullPath === selectedNote.fullPath) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }

      return note
    })
  )
})

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)

  if (!notes) return

  // ✅ FIX: The backend now returns a full file path
  const filePath = await window.context.createNote()

  if (!filePath) return

  // ✅ FIX: Create a proper NoteInfo object from the new file path
  const newNote: NoteInfo = {
    // A simple way to get the title from the path
    title: filePath.split(/[/\\]/).pop()?.replace(/\.md$/, '') || 'Untitled',
    fullPath: filePath,
    lastEditTime: Date.now()
  }

  // ✅ FIX: Add the new note and use fullPath to ensure no duplicates
  set(notesAtom, [newNote, ...notes.filter((note) => note.fullPath !== newNote.fullPath)])

  // ✅ FIX: Select the newly created note
  set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  // ✅ FIX: Use the full path to delete the note
  const isDeleted = await window.context.deleteNote(selectedNote.fullPath)

  if (!isDeleted) return

  // ✅ FIX: Use the full path to filter out the deleted note
  set(
    notesAtom,
    notes.filter((note) => note.fullPath !== selectedNote.fullPath)
  )

  // de-select any note
  set(selectedNoteIndexAtom, null)
})
