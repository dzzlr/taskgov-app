export default function Button({ onClick, className = '', children }) {
  return (
    <button
      onClick={onClick}
      className={
        `px-4 py-2 ` + className
      }
    >
      {children}
    </button>
  )
}