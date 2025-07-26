import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

// Define and export the props type so other components can use it.
export type ActionButtonProps = ComponentProps<'button'>

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          'px-2 py-1 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

ActionButton.displayName = 'ActionButton'
