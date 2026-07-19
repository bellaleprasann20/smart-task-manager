import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh]">
    <h1 className="text-4xl font-bold mb-2">404</h1>
    <p className="text-gray-500 mb-4">Page not found</p>
    <Link to="/" className="text-indigo-600">Go home</Link>
  </div>
);

export default NotFound;