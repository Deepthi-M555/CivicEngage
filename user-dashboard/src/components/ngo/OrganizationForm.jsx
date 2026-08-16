import { useEffect, useState } from "react";
import { Upload } from "lucide-react";

export default function OrganizationForm({
  organization: organizationData,
  editing,
  setEditing,
  onSave,
}) {
  const [organization, setOrganization] = useState(
    organizationData || {
      organizationName: "",
      registrationNumber: "",
      email: "",
      phone: "",
      website: "",
      address: "",
      mission: "",
    }
  );

  useEffect(() => {
    if (organizationData) {
      setOrganization(organizationData);
    }
  }, [organizationData]);

  const handleChange = (e) => {
    setOrganization({
      ...organization,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = () => {
    onSave(organization);
  };

  return (

    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b px-8 py-6">

        <div>

          <h2 className="text-2xl font-bold">
            Organization Profile
          </h2>

          <p className="mt-1 text-slate-500">
            Manage your NGO information and public profile.
          </p>

        </div>

        {!editing ? (

          <button
            onClick={() => setEditing(true)}
            className="rounded-xl bg-primary px-5 py-2.5 font-medium text-white transition hover:bg-primary/90"
          >
            Edit Profile
          </button>

        ) : (

          <div className="flex gap-3">

            <button
              onClick={handleCancel}
              className="rounded-xl border border-slate-300 px-5 py-2.5 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="rounded-xl bg-primary px-5 py-2.5 font-medium text-white transition hover:bg-primary/90"
            >
              Save Changes
            </button>

          </div>

        )}

      </div>

      {/* Body */}

      <div className="space-y-8 p-8">

        {/* Logo */}

        <div className="flex items-center gap-6">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">

            G

          </div>

          {editing && (

            <button className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 transition hover:bg-slate-50">

              <Upload size={18} />

              Upload Logo

            </button>

          )}

        </div>

        {/* Form */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Organization Name
            </label>

            <input
              name="organizationName"
              value={organization?.organizationName ?? ""}
              onChange={handleChange}
              disabled={!editing}
              className="w-full rounded-xl border border-slate-300 p-3 disabled:bg-slate-50"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Registration Number
            </label>

            <input
              name="registrationNumber"
              value={organization?.registrationNumber ?? ""}
              onChange={handleChange}
              disabled={!editing}
              className="w-full rounded-xl border border-slate-300 p-3 disabled:bg-slate-50"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              name="email"
              value={organization?.email ?? ""}
              onChange={handleChange}
              disabled={!editing}
              className="w-full rounded-xl border border-slate-300 p-3 disabled:bg-slate-50"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Phone
            </label>

            <input
              name="phone"
              value={organization?.phone ?? ""}
              onChange={handleChange}
              disabled={!editing}
              className="w-full rounded-xl border border-slate-300 p-3 disabled:bg-slate-50"
            />

          </div>
                    <div>

            <label className="mb-2 block font-medium">
              Website
            </label>

            <input
              name="website"
              value={organization?.website ?? ""}
              onChange={handleChange}
              disabled={!editing}
              placeholder="https://yourngo.org"
              className="w-full rounded-xl border border-slate-300 p-3 disabled:bg-slate-50"
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block font-medium">
              Address
            </label>

            <textarea
              rows={3}
              name="address"
              value={organization?.address ?? ""}
              onChange={handleChange}
              disabled={!editing}
              className="w-full rounded-xl border border-slate-300 p-3 disabled:bg-slate-50"
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block font-medium">
              Mission Statement
            </label>

            <textarea
              rows={5}
              name="mission"
              value={organization?.mission ?? ""}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Describe your organization's mission..."
              className="w-full rounded-xl border border-slate-300 p-3 disabled:bg-slate-50"
            />

          </div>

        </div>

      </div>

    </div>

  );
}