
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <div className="border-b dark:border-gray-700">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <h1 className="font-bold text-xl text-brand">TurboCash</h1>
        <div className="flex items-center gap-6 font-medium">
          <Link href="/">Transactions</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/reports">Reports</Link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
