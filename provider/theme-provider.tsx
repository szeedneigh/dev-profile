import React, { createContext, useContext, useState, useMemo } from "react"

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme: string;
  storageKey: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children, defaultTheme, storageKey }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(
    localStorage.getItem(storageKey) || defaultTheme
  )

  const value = useMemo(
    () => ({ theme, setTheme }), 
    [theme]
  )

  return (
    <ThemeContext.Provider value={value}>
      <div className={`${theme}`}>{children}</div>
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
