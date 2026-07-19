import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Smart Task Manager</h1>
      <p className="text-gray-600 max-w-md mb-6">
        Organize your tasks, track priorities, and stay on top of deadlines — all in one place.
      </p>
      <Link
        to={user ? "/dashboard" : "/register"}
        className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
      >
        {user ? "Go to Dashboard" : "Get Started"}
      </Link>
    </div>
  );
};

export default Home;