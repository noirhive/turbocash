
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { downloadCSV } from '../../lib/csv'

export default function Reports() {
  const [data, setData] = useState([])

  useEffect(() => {
    supabase.from('transactions').select('*').then(r => setData(r.data || []))
  }, [])

  return (
    <div>
      <button onClick={() => downloadCSV(data, 'report.csv')}>Download CSV</button>
    </div>
  )
}
