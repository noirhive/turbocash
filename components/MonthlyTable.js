
export default function MonthlyTable({ data }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Date</th><th>Phone</th><th>Details</th><th>Amount</th><th>Charge</th><th>Total</th>
        </tr>
      </thead>
      <tbody>
        {data.map(r=>(
          <tr key={r.id}>
            <td>{r.date}</td>
            <td>{r.phone}</td>
            <td>{r.details}</td>
            <td>{r.amount}</td>
            <td>{r.charge}</td>
            <td>{r.total_amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
