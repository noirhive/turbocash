
import { supabase } from '../../lib/supabase'

export default async function Dashboard() {
  const { data } = await supabase.from('transactions').select('*').order('date')

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th>Date</th><th>Phone</th><th>Type</th><th>Amount</th><th>Charge</th><th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(t=>(
            <tr key={t.id} className="border-b last:border-0">
              <td>{t.date}</td>
              <td>{t.phone}</td>
              <td>{t.details}</td>
              <td>৳{t.amount}</td>
              <td className="text-orange-500">৳{t.charge}</td>
              <td className="font-semibold">৳{t.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
