import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { ComponentProps, memo } from 'react'
import { twMerge } from 'tailwind-merge'

// 🧠 FloatingNoteTitleComponent ko React.memo ke andar wrap kiya jayega
const FloatingNoteTitleComponent = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  // 🔍 Agar note selected nahi hai, toh kuch render nahi karenge
  if (!selectedNote) return null

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      {/* 📝 Note ka title show ho raha hai, aur agar nahi mila toh fallback "Untitled" */}
      <span className="text-gray-400" title={selectedNote.title || 'Untitled'}>
        {selectedNote.title || 'Untitled'}
      </span>
    </div>
  )
}

// ✅ React DevTools me better debugging ke liye displayName add kiya gaya
export const FloatingNoteTitle = memo(FloatingNoteTitleComponent)
FloatingNoteTitle.displayName = 'FloatingNoteTitle'
