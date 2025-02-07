// resources/js/Components/FormInput.jsx
export default function FormInput({ value, type = 'text', placeholder, onChange, className = '' }) {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
      onChange={onChange}
    />
  );
}
