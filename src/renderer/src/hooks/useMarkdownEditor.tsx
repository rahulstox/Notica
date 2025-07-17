import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  // 📌 Currently selected note ko access kiya
  const selectedNote = useAtomValue(selectedNoteAtom)

  // 🧠 saveNote action ko use karne ke liye atom setter liya
  const saveNote = useSetAtom(saveNoteAtom)

  // ✏️ Editor methods (jaise getMarkdown) ke liye ref banaya
  const editorRef = useRef<MDXEditorMethods>(null)

  // 💾 Auto-save throttled function banaya jo delay ke saath content save karega
  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return

      console.info('Auto saving:', selectedNote.title)

      // ✅ Note content ko save kar diya
      await saveNote(content)
    },
    autoSavingTime, // 🕒 Delay constant (e.g., 2000ms)
    {
      leading: false, // 🛑 Start me call na ho
      trailing: true // ✅ End me call ho
    }
  )

  // 🔁 Jab editor blur ho (focus chhodega), tab save forcefully kara lo
  const handleBlur = async () => {
    if (!selectedNote) return

    // 🧹 Pehle throttled auto-save cancel karo
    handleAutoSaving.cancel()

    // 📝 Markdown content get karo from editor
    const content = editorRef.current?.getMarkdown()

    if (content != null) {
      await saveNote(content) // 💾 Save final content
    }
  }

  // 📦 Return useful references and handlers
  return {
    editorRef, // 🖊️ Editor ref to control programmatically
    selectedNote, // 📑 Currently selected note
    handleAutoSaving, // 🔁 Auto-save throttled handler
    handleBlur // 🖱️ Blur pe save handler
  }
}
