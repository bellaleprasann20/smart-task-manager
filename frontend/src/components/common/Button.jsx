const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  danger: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
};

const Button = ({ children, variant = "primary", className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded font-medium transition-colors disabled:opacity-50 ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;