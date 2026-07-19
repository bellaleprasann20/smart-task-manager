import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded ${isActive ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-100"}`;

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="w-56 bg-white border-r min-h-[calc(100vh-64px)] p-4 flex flex-col gap-1">
      <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
      <NavLink to="/tasks/new" className={linkClass}>New Task</NavLink>
      <NavLink to="/profile" className={linkClass}>Profile</NavLink>
      {user?.role === "admin" && (
        <NavLink to="/admin" className={linkClass}>Admin</NavLink>
      )}
    </aside>
  );
};

export default Sidebar;