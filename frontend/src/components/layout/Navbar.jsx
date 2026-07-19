import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        Smart Task Manager
      </Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-gray-600">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-indigo-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-indigo-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;