import { useEffect, useState } from "react";
import api from "../services/api.js";
import Loader from "../components/common/Loader.jsx";
import Button from "../components/common/Button.jsx";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dashRes, usersRes] = await Promise.all([
        api.get("/admin/dashboard"),
        api.get("/admin/users"),
      ]);
      setStats(dashRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await api.delete(`/admin/user/${id}`);
    fetchData();
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold">{stats?.totalUsers ?? "-"}</p>
          <p className="text-gray-500 text-sm">Active Users</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold">{stats?.totalTasks ?? "-"}</p>
          <p className="text-gray-500 text-sm">Total Tasks</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold">{stats?.completedTasks ?? "-"}</p>
          <p className="text-gray-500 text-sm">Completed</p>
        </div>
      </div>

      <h2 className="font-semibold mb-3">Users</h2>
      <div className="bg-white rounded-lg shadow divide-y">
        {users.map((u) => (
          <div key={u._id} className="flex justify-between items-center p-3">
            <span>{u.name} ({u.email})</span>
            <Button variant="danger" onClick={() => handleDeleteUser(u._id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;