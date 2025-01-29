export default function Badge({ className, children }) {
  return (
    <span
      className={`font-medium text-center px-2.5 py-0.5 rounded ${className}`}>
      {children}
    </span>
  )
}