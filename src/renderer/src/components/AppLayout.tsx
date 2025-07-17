// React aur Tailwind ke kuch features import kar rahe hain
import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge' // Tailwind classes ko intelligently merge karta hai (agar duplicates ho to resolve karta hai)

// ---------- RootLayout Component ----------
// Ye layout ka main wrapper hai (mostly full screen layout ke liye use hota hai)
// 'main' HTML element ka use ho raha hai, aur Tailwind ke classes merge ho rahe hain
export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

// ---------- Sidebar Component ----------
// Ye sidebar ke liye use ho raha hai (left ya right side panel)
// 'aside' HTML tag use ho raha hai jo semantic layout ke liye hota hai
// height ka logic thoda confusing hai: h-[100vh + 10px] valid Tailwind syntax nahi hai (ye error de sakta hai)
export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      className={twMerge('w-[250px] mt-10 h-[100vh + 10px] overflow-auto', className)} // NOTE: h-[100vh+10px] is NOT valid Tailwind; consider using `min-h-screen` or add custom class
      {...props}
    >
      {children}
    </aside>
  )
}

// ---------- Content Component ----------
// Ye forwardRef ka use karta hai, jisse parent component ref access kar sake (e.g., scroll control ya DOM manipulation ke liye)
// 'div' ke andar content scrollable bana diya hai (flex-1 se remaining space le raha hai)
export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge('flex-1 overflow-auto', className)} {...props}>
      {children}
    </div>
  )
)

// Component ka naam set karna zaroori hai jab forwardRef use karte ho (debugging aur dev tools ke liye helpful)
Content.displayName = 'Content'
