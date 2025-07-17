// DraggableTopBar ek simple React functional component hai
// Jo ek transparent top bar (header) create karta hai — mostly Electron apps mein drag area banane ke liye use hota hai

export const DraggableTopBar = () => {
  return (
    // 'absolute inset-0' ka matlab: parent ke top-left se full stretch karo
    // 'h-8' means height 2rem (~32px), typical for window title bar
    // 'bg-transparent' se background visible nahi hoga (transparent)
    // NOTE: Electron mein is header pe CSS property `-webkit-app-region: drag` dena hota hai for drag support
    <header className="absolute inset-0 h-8 bg-transparent" />
  )
}
