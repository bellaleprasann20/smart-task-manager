const Input = ({ label, error, className = "", ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm text-gray-600">{label}</label>}
    <input
      className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
        error ? "border-red-400" : "border-gray-300"
      } ${className}`}
      {...props}
    />
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export default Input;