
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Papa from 'papaparse'

export default function Reports() {
  const [data, setData] = useState([])

  useEffect(() => {
    supabase.from('transactions').select('*').then(r=>setData(r.data||[]))
  }, [])

  function download() {
    const csv = Papa.unparse(data)
    const blob = new Blob([csv])
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'turbocash-transactions.csv'
    a.click()
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Reports</h2>
      <button className="btn" onClick={download}>Download CSV</button>
    </div>
  )
}
