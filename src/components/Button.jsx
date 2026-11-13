
function Button({ children, onClick, type = "button", variant = "primary" }) {
  const styles = {
    primary: "bg-emerald-700 text-white hover:bg-emerald-800",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg px-4 py-2 font-medium transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${styles[variant]}`}
    >
      {children}
    </button>
  )
}

export default Button
