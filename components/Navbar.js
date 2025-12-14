
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav style={{display:'flex',gap:20}}>
      <Link href="/">Transactions</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/reports">Reports</Link>
      <ThemeToggle />
    </nav>
  )
}
