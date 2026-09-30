'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} })

export function ThemeProvider({ children }) {
  // Always start at 'dark' so the first render matches the server. The real
  // theme is read in the effect below, after the inline script in the layout
  // has already applied the stored value to <html>. Reading the DOM in a
  // useState initializer instead would hydrate differently from the server
  // for anyone whose stored theme is not the default.
  const [theme, setTheme] = useState('dark')
  const isFirstApply = useRef(true)

  useEffect(() => {
    const root = document.documentElement
    const stored = root.classList.contains('dark') ? 'dark' : 'light'
    setTheme((current) => (current === stored ? current : stored))
  }, [])

  useEffect(() => {
    // The inline script in the layout has already applied the stored theme to
    // <html>. Both effects run in the same commit, so this one must skip its
    // own first pass, otherwise it would stamp the default theme over the
    // stored one and flash it before state catches up.
    if (isFirstApply.current) {
      isFirstApply.current = false
      return
    }
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // storage unavailable (private mode)-theme still applies for the session
    }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#05060b' : '#f4f5f9')
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    []
  )

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
