
'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

const CHARGE_TYPES = ['bKash', 'Nagad', 'Rocket']

export default function TransactionForm() {
  const [f, setF] = useState({ date:'', phone:'', details:'bKash', amount:'' })

  async function submit() {
    const amount = Number(f.amount)
    const charge = CHARGE_TYPES.includes(f.details) ? amount * 0.02 : 0

    await supabase.from('transactions').insert([{
      ...f,
      amount,
      charge,
      total_amount: amount + charge
    }])

    window.location.reload()
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Add New Transaction</h2>
      <div className="space-y-3">
        <input type="date" className="input" onChange={e=>setF({...f,date:e.target.value})} />
        <input placeholder="Phone Number" className="input" onChange={e=>setF({...f,phone:e.target.value})} />
        <select className="input" onChange={e=>setF({...f,details:e.target.value})}>
          {['bKash','Nagad','Rocket','Flexiload','Data','Bank Transfer'].map(i=><option key={i}>{i}</option>)}
        </select>
        <input type="number" placeholder="Amount (BDT)" className="input" onChange={e=>setF({...f,amount:e.target.value})} />
        <button className="btn w-full" onClick={submit}>Add Transaction</button>
      </div>
    </div>
  )
}
