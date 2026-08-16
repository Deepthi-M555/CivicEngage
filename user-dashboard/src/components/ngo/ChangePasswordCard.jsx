import { useState } from "react";
import { Lock } from "lucide-react";

export default function ChangePasswordCard() {

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    console.log("Change Password API later");
  };

  return (

    <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3 border-b px-8 py-6">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">

          <Lock className="text-primary" size={22} />

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Change Password
          </h2>

          <p className="text-slate-500">
            Update your account password.
          </p>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-6 p-8">

        <div>

          <label className="mb-2 block font-medium">
            Current Password
          </label>

          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

          </div>

        </div>

        <div className="flex justify-end">

          <button
            onClick={handleUpdate}
            className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary/90"
          >
            Update Password
          </button>

        </div>

      </div>

    </div>

  );

}