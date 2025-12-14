
'use client'
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Navbar from '../components/Navbar'

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          <main className="max-w-6xl mx-auto p-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
