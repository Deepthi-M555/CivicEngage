import api from "../lib/api";

// Get all organization profiles
export const getOrganizations = async () => {
  const { data } = await api.get("/organization");
  return data;
};

// Get organization profile by ID
export const getOrganizationById = async (id) => {
  const { data } = await api.get(`/organization/${id}`);
  return data;
};

// Create organization profile
export const createOrganization = async (organization) => {
  const { data } = await api.post("/organization", organization);
  return data;
};

// Update organization profile
export const updateOrganization = async (id, organization) => {
  const { data } = await api.put(
    `/organization/${id}`,
    organization
  );
  return data;
};

// Delete organization profile
export const deleteOrganization = async (id) => {
  const { data } = await api.delete(`/organization/${id}`);
  return data;
};