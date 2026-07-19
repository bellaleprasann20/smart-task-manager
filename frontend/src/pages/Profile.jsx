import { useState, useEffect } from "react";
import { authService } from "../services/authService.js";
import Input from "../components/common/Input.jsx";
import Button from "../components/common/Button.jsx";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    authService.getProfile().then(setProfile).catch((err) => setError(err.message));
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    try {
      const updated = await authService.updateProfile(profile);
      setProfile(updated);
      setMessage("Profile updated");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    try {
      await authService.changePassword(passwords.currentPassword, passwords.newPassword);
      setPasswords({ currentPassword: "", newPassword: "" });
      setMessage("Password changed");
    } catch (err) {
      setError(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Profile</h1>
      {message && <p className="text-green-600 text-sm">{message}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form onSubmit={handleProfileUpdate} className="flex flex-col gap-3">
        <h2 className="font-semibold">Account Details</h2>
        <Input
          label="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
        <Button type="submit">Save Changes</Button>
      </form>

      <form onSubmit={handlePasswordChange} className="flex flex-col gap-3">
        <h2 className="font-semibold">Change Password</h2>
        <Input
          label="Current Password"
          type="password"
          value={passwords.currentPassword}
          onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
        />
        <Input
          label="New Password"
          type="password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
        />
        <Button type="submit" variant="outline">Update Password</Button>
      </form>
    </div>
  );
};

export default Profile;