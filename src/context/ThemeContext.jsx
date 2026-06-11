/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useEffect,
  useState
} from "react"

export const ThemeContext =
  createContext()

function ThemeProvider({ children }) {

  const [darkMode, setDarkMode] =
    useState(() => {
      const saved = localStorage.getItem('darkMode')
      return saved !== null ? JSON.parse(saved) : true
    })

  // 🔥 Save theme
  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    )

    if(darkMode) {

      document.body.classList.add("dark")

    } else {

      document.body.classList.remove("dark")

    }

    // set hero background variable for light/dark (can be overridden by CSS or public/hero.jpg)
    try {
      const root = document.documentElement
      const light = "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1974&auto=format&fit=crop')"
      const dark = "url('https://images.unsplash.com/photo-1514512364185-1f9b5bf8f5d4?q=80&w=1974&auto=format&fit=crop')"
      root.style.setProperty('--hero-bg', darkMode ? dark : light)
    } catch {
      // ignore
    }
  }, [darkMode])

  // Toggle
  const toggleTheme = () => {

    setDarkMode(!darkMode)

  }

  return (

    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme
      }}
    >

      {children}

    </ThemeContext.Provider>

  )

}

export default ThemeProvider