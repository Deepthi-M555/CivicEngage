import { useState, useEffect } from "react";
import {
  Mail,
  MapPin,
  Calendar,
  Edit,
  Award,
  Target,
  Users,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Loader2,
  Save,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../lib/api";
import Tag from "../components/tag";
import { updatePreferences } from "../services/settingsService";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Profile edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    location: "",
    skills: [],
    interests: [],
  });
  const [savingProfile, setSavingProfile] = useState(false);

  // Password edit states
  const [expandedSection, setExpandedSection] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [savingPassword, setSavingPassword] = useState(false);

  // Preferences states
  const [preferencesForm, setPreferencesForm] = useState({
    emailPreferences: true,
    privacyMode: "public",
  });
  const [savingPreferences, setSavingPreferences] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setProfile(res.data);
      setEditForm({
        name: res.data.name || "",
        location: res.data.location || "",
        skills: res.data.skills || [],
        interests: res.data.interests || [],
      });
      setPreferencesForm({
        emailPreferences: res.data.emailPreferences ?? true,
        privacyMode: res.data.privacyMode || "public",
      });
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileUpdate = async () => {
    setSavingProfile(true);
    try {
      await api.put("/auth/profile", editForm);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setSavingPassword(true);
    try {
      await api.put("/auth/change-password", {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success("Password changed successfully!");
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setExpandedSection(null);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  };

  const handlePreferencesUpdate = async () => {
    setSavingPreferences(true);
    try {
      await updatePreferences(preferencesForm);
      toast.success("Preferences updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update preferences");
    } finally {
      setSavingPreferences(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

  // Fallback state if the backend lacks specific stats layout yet
  const stats = profile?.stats || {
    activeTasks: 0,
    totalContributions: 0,
    impactScore: 0,
    badgesEarned: 0,
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Profile</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Edit className="h-4 w-4" /> Edit Profile
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" /> Cancel
          </button>
        )}
      </div>

      {/* Profile Header Block */}
      {isEditing ? (
        <div className="rounded-xl border border-primary bg-card p-8 shadow-md">
          <h2 className="text-xl font-semibold mb-6">Edit Profile Details</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="w-full rounded-lg border border-border bg-background px-4 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Location</label>
              <input
                type="text"
                value={editForm.location}
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
                className="w-full rounded-lg border border-border bg-background px-4 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              onClick={handleProfileUpdate}
              disabled={savingProfile}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 mt-4"
            >
              {savingProfile ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition-all">
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-4xl text-white font-semibold flex-shrink-0 uppercase">
              {profile?.name ? profile.name.substring(0, 2) : "U"}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">
                {profile?.name || "Anonymous User"}
              </h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{profile?.email}</span>
                </div>
                {profile?.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{profile?.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined recently</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
          <div className="inline-flex rounded-full bg-primary/10 p-3 mb-3">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Active Tasks</p>
          <p className="text-3xl font-semibold mt-1">{stats.activeTasks}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
          <div className="inline-flex rounded-full bg-secondary/10 p-3 mb-3">
            <Users className="h-6 w-6 text-secondary" />
          </div>
          <p className="text-sm text-muted-foreground">Total Contributions</p>
          <p className="text-3xl font-semibold mt-1">
            {stats.totalContributions}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
          <div className="inline-flex rounded-full bg-accent/10 p-3 mb-3">
            <Target className="h-6 w-6 text-accent" />
          </div>
          <p className="text-sm text-muted-foreground">Impact Score</p>
          <p className="text-3xl font-semibold mt-1">{stats.impactScore}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
          <div className="inline-flex rounded-full bg-success/10 p-3 mb-3">
            <Award className="h-6 w-6 text-success" />
          </div>
          <p className="text-sm text-muted-foreground">Badges Earned</p>
          <p className="text-3xl font-semibold mt-1">{stats.badgesEarned}</p>
        </div>
      </div>

      {/* Account Settings */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Preferences</h3>
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates about your activities and new opportunities.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={preferencesForm.emailPreferences}
                onChange={(e) => setPreferencesForm({...preferencesForm, emailPreferences: e.target.checked})}
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background">
            <div>
              <p className="font-medium">Profile Privacy</p>
              <p className="text-sm text-muted-foreground">Control who can view your profile and impact history.</p>
            </div>
            <select
              value={preferencesForm.privacyMode}
              onChange={(e) => setPreferencesForm({...preferencesForm, privacyMode: e.target.value})}
              className="rounded-lg border border-border bg-card px-3 py-1.5 outline-none focus:border-primary text-sm"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="flex justify-end mt-2">
            <button
              onClick={handlePreferencesUpdate}
              disabled={savingPreferences}
              className="flex items-center gap-2 rounded-lg bg-secondary px-6 py-2 text-primary-foreground hover:bg-secondary/90 transition-colors disabled:opacity-50"
            >
              {savingPreferences ? <Loader2 className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4" />}
              Save Preferences
            </button>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4">Account Security</h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background overflow-hidden">
            <button
              onClick={() => toggleSection("password")}
              className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors text-left"
            >
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Change Password
              </span>
              {expandedSection === "password" ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            {expandedSection === "password" && (
              <div className="p-4 border-t border-border space-y-4">
                <div>
                  <label className="block text-sm mb-2">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.oldPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          oldPassword: e.target.value,
                        })
                      }
                      placeholder="Enter current password"
                      className="w-full rounded-lg border border-border bg-card px-10 py-2.5 outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Enter new password"
                      className="w-full rounded-lg border border-border bg-card px-10 py-2.5 outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm new password"
                      className="w-full rounded-lg border border-border bg-card px-10 py-2.5 outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <button
                  onClick={handlePasswordUpdate}
                  disabled={savingPassword}
                  className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground flex justify-center items-center hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {savingPassword ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : (
                    "Update Password"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
