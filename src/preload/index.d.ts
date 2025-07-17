import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'

// TypeScript global declaration block
declare global {
  interface Window {
    // electron: ElectronAPI // Optional: you can define this if using ElectronAPI directly

    // Custom context object injected via Electron preload
    context: {
      locale: string // User locale (e.g., 'en-US')

      getNotes: GetNotes // Notes list lene wala function (fetches all notes)
      readNote: ReadNote // Ek note ka content padhne wala function
      writeNote: WriteNote // Ek note ko save/edit karne wala function
      createNote: CreateNote // Naya note banane wala function
      deleteNote: DeleteNote // Note delete karne ka function
    }
  }
}
