const SearchBar = ({ value, onChange, placeholder = "Search tasks..." }) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="border rounded px-3 py-2 flex-1"
  />
);

export default SearchBar;