import { ComponentProps } from 'react' // HTML component props le raha hai
import { twMerge } from 'tailwind-merge' // Tailwind classes merge karta hai (conflict resolve)

export type ActionButtonProps = ComponentProps<'button'> // Button ke liye prop type bana diya

export const ActionButton = ({ className, children, ...props }: ActionButtonProps) => {
  return (
    <button
      className={twMerge(
        'px-2 py-1 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100',
        className // Custom classes allow karega
      )}
      {...props} // Baaki sab props pass kar diye (onClick, disabled, etc.)
    >
      {children} {/* Button ke andar ka content */}
    </button>
  )
}
