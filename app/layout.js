
'use client'
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Navbar from '../components/Navbar'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider attribute="class">
          <Navbar />
          <main style={{padding:'20px'}}>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
