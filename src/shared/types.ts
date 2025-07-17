import { NoteContent, NoteInfo } from './models' // Note se related models import kar rahe hain

// Function type jo sabhi notes return karta hai (asynchronously)
export type GetNotes = () => Promise<NoteInfo[]>

// Function type jo ek note padhta hai title ke base pe
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>

// Function type jo ek note ko likhta hai (ya update karta hai)
export type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>

// Function type jo ek naya note banata hai — title return karta hai ya false agar fail ho
export type CreateNote = () => Promise<NoteInfo['title'] | false>

// Function type jo ek note ko delete karta hai — success/fail boolean return karta hai
export type DeleteNote = (title: NoteInfo['title']) => Promise<boolean>
