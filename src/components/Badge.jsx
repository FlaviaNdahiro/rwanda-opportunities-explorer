
function Badge({ children, color = "gray" }) {
  const colors = {
    gray: "bg-slate-100 text-slate-700",
    green: "bg-emerald-100 text-emerald-800",
    blue: "bg-blue-100 text-blue-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-amber-100 text-amber-800",
  }

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[color]}`}>
      {children}
    </span>
  )
}

export default Badge
