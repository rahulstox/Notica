import { NoteContent, NoteInfo } from '@shared/models' // Types for note info and content
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

// ✅ Load and sort notes from disk (most recently edited first)
const loadNotes = async () => {
  const notes = await window.context.getNotes()
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

// ✅ Atom for loading notes (can be promise initially)
const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

// ✅ Convert async atom to sync using unwrap (once loaded)
export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

// ✅ Index of selected note (null if none selected)
export const selectedNoteIndexAtom = atom<number | null>(null)

// ✅ Atom to get selected note with content
const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null || !notes) return null

  const selectedNote = notes[selectedNoteIndex]
  const noteContent = await window.context.readNote(selectedNote.title)

  return {
    ...selectedNote,
    content: noteContent
  }
})

// ✅ Make selected note available synchronously (with fallback if null)
export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEditTime: Date.now()
    }
)

// ✅ Save currently selected note
export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  // Save content to disk
  await window.context.writeNote(selectedNote.title, newContent)

  // Update lastEditTime in notesAtom
  set(
    notesAtom,
    notes.map((note) =>
      note.title === selectedNote.title ? { ...note, lastEditTime: Date.now() } : note
    )
  )
})

// ✅ Create a new note and select it
export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  if (!notes) return

  const title = await window.context.createNote()
  if (!title) return

  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now()
  }

  // Add new note to top of list (prevent duplicate titles)
  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])
  set(selectedNoteIndexAtom, 0) // Select new note
})

// ✅ Delete currently selected note
export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  const isDeleted = await window.context.deleteNote(selectedNote.title)
  if (!isDeleted) return

  // Remove deleted note from list
  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )

  set(selectedNoteIndexAtom, null) // Deselect note
})
