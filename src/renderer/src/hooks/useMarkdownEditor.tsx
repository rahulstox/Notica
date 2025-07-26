import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
// ✅ 1. IMPORT useEffect FROM REACT
import { useEffect, useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return

      console.info('Auto saving:', selectedNote.fullPath) // Use fullPath for better logging

      await saveNote(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedNote) return

    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()

    if (content != null) {
      await saveNote(content)
    }
  }

  // ✅ 2. ADD THIS ENTIRE useEffect HOOK
  useEffect(() => {
    const finalSave = () => {
      // Ensure there's a note selected to save
      if (!selectedNote?.fullPath) return

      // Cancel any pending throttled saves
      handleAutoSaving.cancel()

      const content = editorRef.current?.getMarkdown()

      if (content != null) {
        console.info('Final save on close:', selectedNote.fullPath)
        saveNote(content)
      }
    }

    // Listen for the message from the main process
    const cleanup = window.context.onSaveOnClose(finalSave)

    // Optional but good practice: clean up the listener when the component unmounts
    return cleanup
  }, [selectedNote, saveNote, handleAutoSaving])

  return {
    editorRef,
    selectedNote,
    handleAutoSaving,
    handleBlur
  }
}
