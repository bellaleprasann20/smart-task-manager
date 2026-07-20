import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import Loader from "../components/common/Loader.jsx";
import Button from "../components/common/Button.jsx";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Added 'silent' parameter to prevent full-page loading spinners on background updates
  const fetchData = async (silent = false) => {
    if (!silent) setLoading(true);
    setError("");
    
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
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    
    try {
      // Optimistic update: instantly remove the user from the UI for a snappy feel
      setUsers((prev) => prev.filter(user => user._id !== id));
      
      // Perform the actual deletion
      await api.delete(`/admin/user/${id}`);
      
      // Silently refresh stats in the background so the numbers update without a loading screen
      fetchData(true); 
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user. Please try again.");
      // If it failed, fetch the real data again to restore the user in the list
      fetchData(true);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Loader size="lg" />
    </div>
  );
  
  if (error) return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block border border-red-200">
        {error}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Platform overview and user management.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center transition-shadow hover:shadow-md">
          <p className="text-3xl font-black text-indigo-600">{stats?.totalUsers ?? "-"}</p>
          <p className="text-gray-500 text-sm font-medium mt-1 uppercase tracking-wider">Active Users</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center transition-shadow hover:shadow-md">
          <p className="text-3xl font-black text-blue-600">{stats?.totalTasks ?? "-"}</p>
          <p className="text-gray-500 text-sm font-medium mt-1 uppercase tracking-wider">Total Tasks</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center transition-shadow hover:shadow-md">
          <p className="text-3xl font-black text-emerald-600">{stats?.completedTasks ?? "-"}</p>
          <p className="text-gray-500 text-sm font-medium mt-1 uppercase tracking-wider">Completed Tasks</p>
        </div>
      </div>

      {/* User Management Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Manage Users</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
          {users.length} Total
        </span>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No users found.</div>
          ) : (
            users.map((u) => (
              <div key={u._id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 hover:bg-gray-50 transition-colors gap-4">
                
                {/* User Info with Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full font-bold text-lg">
                    {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">{u.name}</span>
                    <span className="text-sm text-gray-500">{u.email}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center shrink-0">
                  <Button 
                    variant="danger" 
                    onClick={() => handleDeleteUser(u._id)}
                    className="text-sm py-1.5 px-3"
                  >
                    Delete Account
                  </Button>
                </div>
                
              </div>
            ))
          )}
        </div>
      </div>
      
    </div>
  );
};

export default AdminDashboard;