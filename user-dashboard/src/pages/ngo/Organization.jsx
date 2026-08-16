import { useEffect, useState } from "react";
import OrganizationForm from "../../components/ngo/OrganizationForm";
import ChangePasswordCard from "../../components/ngo/ChangePasswordCard";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { getOrganizations, updateOrganization } from "../../services/organizationService";

export default function Organization() {
  const { user } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadOrganization();
  }, []);

  const loadOrganization = async () => {
    try {
      const organizations = await getOrganizations();

      if (organizations.length > 0) {
        setOrganization(organizations[0]);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load organization.");
    }
  };

  const handleSave = async (updatedOrganization) => {
    try {
      const data = await updateOrganization(
        updatedOrganization._id,
        updatedOrganization
      );

      setOrganization(data);
      setEditing(false);

      toast.success("Organization updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update organization.");
    }
  };

  if (!organization) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}

      <div>
        <h1 className="text-4xl font-bold">Organization</h1>

        <p className="mt-2 text-slate-500">
          Manage your organization profile and account settings.
        </p>
      </div>

      {/* Organization Information */}

      <OrganizationForm
        organization={organization}
        editing={editing}
        setEditing={setEditing}
        onSave={handleSave}
        setOrganization={setOrganization}
      />

      {/* Change Password */}

      <ChangePasswordCard />
    </div>
  );
}