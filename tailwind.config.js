/** @type {import('tailwindcss').Config} */
// Yeh TypeScript ke liye hint hai — taaki autocomplete aur type safety mile in editors

module.exports = {
  // Yeh batata hai Tailwind ko ki kaha kaha classes scan karni hai
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'], // ✅ Sirf renderer ke andar ke files target ho rahe hain

  theme: {
    extend: {} // Apna custom theme ya colors future me yahan add kar sakte ho
  },

  // Tailwind plugins — yahan humne sirf Typography plugin use kiya hai
  plugins: [require('@tailwindcss/typography')] // ✅ prose classes jese ki markdown styling ke liye kaam aata hai
}
