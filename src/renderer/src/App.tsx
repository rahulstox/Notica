import {
  ActionButtonsRow, // New / Delete note buttons
  Content, // Main content area
  DraggableTopBar, // Top drag area (Electron window)
  FloatingNoteTitle, // Title input field for current note
  MarkdownEditor, // Markdown text editor
  NotePreviewList, // List of saved notes (left panel)
  RootLayout, // Main flex layout
  Sidebar // Sidebar wrapper
} from '@/components'

import { useRef } from 'react'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null) // Ref for scrolling content area to top

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0) // Scroll to top when note selected
  }

  return (
    <>
      <DraggableTopBar /> {/* Window drag area at top */}
      <RootLayout>
        {/* Sidebar with buttons and note list */}
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" /> {/* New/Delete buttons */}
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />{' '}
          {/* List of notes */}
        </Sidebar>

        {/* Main content area for editing notes */}
        <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
          <FloatingNoteTitle className="pt-2" /> {/* Editable note title */}
          <MarkdownEditor /> {/* Markdown content editor */}
        </Content>
      </RootLayout>
    </>
  )
}

export default App
