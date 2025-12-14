
'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

const CHARGE = ['bKash','Nagad','Rocket']

export default function TransactionForm() {
  const [f, setF] = useState({date:'',phone:'',details:'bKash',amount:''})

  async function submit() {
    const amt = Number(f.amount)
    const charge = CHARGE.includes(f.details) ? amt*0.02 : 0
    await supabase.from('transactions').insert([{
      ...f,
      amount: amt,
      charge,
      total_amount: amt+charge
    }])
    alert('Saved')
  }

  return (
    <div>
      <input type="date" onChange={e=>setF({...f,date:e.target.value})} />
      <input placeholder="Phone" onChange={e=>setF({...f,phone:e.target.value})} />
      <select onChange={e=>setF({...f,details:e.target.value})}>
        {['bKash','Nagad','Rocket','Flexiload','Data','Bank Transfer'].map(i=><option key={i}>{i}</option>)}
      </select>
      <input type="number" placeholder="Amount" onChange={e=>setF({...f,amount:e.target.value})} />
      <button onClick={submit}>Add</button>
    </div>
  )
}
