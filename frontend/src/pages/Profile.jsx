import React, { useState, useEffect } from "react";
import { authService } from "../services/authService.js";
import Input from "../components/common/Input.jsx";
import Button from "../components/common/Button.jsx";
import Loader from "../components/common/Loader.jsx";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  
  // Dedicated UI States
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  
  // Localized alerts for each form: { type: 'success' | 'error', text: '' }
  const [profileAlert, setProfileAlert] = useState(null);
  const [passwordAlert, setPasswordAlert] = useState(null);

  useEffect(() => {
    authService.getProfile()
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setProfileAlert({ type: 'error', text: err.message || "Failed to load profile data." });
        setLoading(false);
      });
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileAlert(null);
    setSavingProfile(true);
    
    try {
      const updated = await authService.updateProfile(profile);
      setProfile(updated);
      setProfileAlert({ type: 'success', text: "Profile updated successfully." });
    } catch (err) {
      setProfileAlert({ type: 'error', text: err.response?.data?.message || "Profile update failed." });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordAlert(null);
    setSavingPassword(true);
    
    try {
      await authService.changePassword(passwords.currentPassword, passwords.newPassword);
      setPasswords({ currentPassword: "", newPassword: "" });
      setPasswordAlert({ type: 'success', text: "Password changed successfully." });
    } catch (err) {
      setPasswordAlert({ type: 'error', text: err.response?.data?.message || "Password change failed." });
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account details and security preferences.</p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* --- Card 1: Account Details --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-800">Account Details</h2>
          </div>
          
          <form onSubmit={handleProfileUpdate} className="p-6 flex flex-col gap-5">
            
            {profileAlert && (
              <div className={`p-3 text-sm rounded-lg border ${
                profileAlert.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                {profileAlert.text}
              </div>
            )}

            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full text-2xl font-bold">
                {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <p className="font-medium text-gray-900">{profile.name || "User"}</p>
                <p className="text-sm text-gray-500">Personal Information</p>
              </div>
            </div>

            <Input
              label="Full Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              required
            />
            
            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={savingProfile}>
                {savingProfile ? (
                  <div className="flex items-center gap-2">
                    <Loader size="sm" color="white" centered={false} /> Saving...
                  </div>
                ) : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>

        {/* --- Card 2: Security & Password --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-800">Security</h2>
          </div>
          
          <form onSubmit={handlePasswordChange} className="p-6 flex flex-col gap-5">
            
            {passwordAlert && (
              <div className={`p-3 text-sm rounded-lg border ${
                passwordAlert.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                {passwordAlert.text}
              </div>
            )}

            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              required
            />
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              required
            />
            
            <div className="flex justify-end pt-2">
              <Button type="submit" variant="outline" disabled={savingPassword}>
                 {savingPassword ? (
                  <div className="flex items-center gap-2">
                    <Loader size="sm" color="gray" centered={false} /> Updating...
                  </div>
                ) : "Update Password"}
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;