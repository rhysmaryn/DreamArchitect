// Theme context provider
// This context manages the light/dark theme preference for the entire app.
// It persists the theme choice in localStorage and applies the appropriate CSS classes.

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

// Provider component that wraps the app and provides theme state
export function ThemeProvider({ children }) {
  // Initialize theme from localStorage or default to dark mode
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored ? stored === 'dark' : true;
  });

  // Apply theme changes to document and save to localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Toggle between light and dark mode
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to access theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
