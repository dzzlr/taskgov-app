export default function Input({ name, className = '', placeholder, value, onChange }) {
  return (
    <input
      name={name}
      className={`w-full p-2 border rounded mb-4 ` + className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}