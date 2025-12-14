
import { supabase } from '../../lib/supabase'
import MonthlyTable from '../../components/MonthlyTable'

export default async function Dashboard() {
  const { data } = await supabase.from('transactions').select('*').order('date')
  return <MonthlyTable data={data || []} />
}
