// NoteInfo type define kar raha hai note ka basic meta data
export type NoteInfo = {
  title: string // Note ka title (unique ho sakta hai)
  lastEditTime: number // Last edited time in milliseconds (Unix timestamp)
}

// NoteContent sirf ek plain string type hai — poora note ka content
export type NoteContent = string
