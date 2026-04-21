import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Initialize state directly from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    // If no saved preference, use system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // This effect ONLY applies the class to <html> and saves to localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);   // Runs whenever isDark changes

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;