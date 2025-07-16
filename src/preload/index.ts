// Yeh shared types import kiye gaye hain jo IPC calls me type safety ke kaam aate hain
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'

// Electron ke do core modules import kiye:
// contextBridge — secure tarike se renderer ko functionality dene ke liye
// ipcRenderer — backend (main process) se baat karne ke liye
import { contextBridge, ipcRenderer } from 'electron'

// Security check: agar contextIsolation off hai to app vulnerable ho sakta hai — isliye yahan error throw kar rahe
if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  // contextBridge ke through renderer process me ek safe API expose kar rahe hain — naam hai 'context'
  contextBridge.exposeInMainWorld('context', {
    // User ka browser language (jaise en-US, hi-IN)
    locale: navigator.language,

    // Neeche saare IPC functions hain jo renderer se main process ko call karenge
    // Arguments ke types maintain kar rahe with Parameters<> (TypeScript ka feature)

    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
    deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args)
  })
} catch (error) {
  // Agar kuch bhi galat hota hai to console me dikha denge for debugging
  console.error(error)
}
