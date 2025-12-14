
'use client'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-3 py-1 rounded-lg border dark:border-gray-700"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
