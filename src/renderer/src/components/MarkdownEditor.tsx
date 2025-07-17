// Importing MDXEditor and some useful plugins for editing markdown content
import {
  MDXEditor,
  headingsPlugin, // For headings (#, ##, ###)
  listsPlugin, // For bullet & numbered lists
  markdownShortcutPlugin, // Allows markdown shortcuts like *, # etc.
  quotePlugin // For blockquotes
} from '@mdxeditor/editor'

// Custom hook se markdown editor ke functions le rahe hain
import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'

// MarkdownEditor component jo ek note ko edit karne ka editor show karta hai
export const MarkdownEditor = () => {
  // Hook se editor ka reference, selected note, auto save aur blur handler mile
  const { editorRef, selectedNote, handleAutoSaving, handleBlur } = useMarkdownEditor()

  // Agar koi note selected nahi hai, toh kuch render na karo
  if (!selectedNote) return null

  // Editor render karo with the selected note's content
  return (
    <MDXEditor
      ref={editorRef} // Editor DOM ref
      key={selectedNote.title} // React ko unique key dena zaroori hai
      markdown={selectedNote.content} // Note content as markdown
      onChange={handleAutoSaving} // Jab bhi content change ho, auto save karo
      onBlur={handleBlur} // Editor se bahar click karein toh handle karo
      plugins={[
        headingsPlugin(), // Heading plugin
        listsPlugin(), // List plugin
        quotePlugin(), // Blockquote plugin
        markdownShortcutPlugin() // Markdown shortcuts plugin
      ]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
      // TailwindCSS + @tailwind/typography (prose) classes for styling
    />
  )
}
