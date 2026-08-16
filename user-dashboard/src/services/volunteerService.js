import api from "../lib/api";

export const getVolunteers = async () => {
  const { data } = await api.get("/volunteers");
  return data;
};

export const getPendingVolunteers = async () => {
  const { data } = await api.get("/volunteers/pending");
  return data;
};

export const getApprovedVolunteers = async () => {
  const { data } = await api.get("/volunteers/approved");
  return data;
};

export const getVolunteerById = async (id) => {
  const { data } = await api.get(`/volunteers/${id}`);
  return data;
};

export const approveVolunteer = async (id) => {
  const { data } = await api.put(`/volunteers/${id}/approve`);
  return data;
};

export const rejectVolunteer = async (id) => {
  const { data } = await api.put(`/volunteers/${id}/reject`);
  return data;
};

export const assignVolunteer = async (
  id,
  campaignId
) => {
  const { data } = await api.put(
    `/volunteers/${id}/assign`,
    { campaignId }
  );

  return data;
};

export const deleteVolunteer = async (id) => {
  const { data } = await api.delete(`/volunteers/${id}`);
  return data;
};

export const recommendVolunteer = async (
  payload
) => {
  const { data } = await api.post(
    "/volunteers/recommend",
    payload
  );

  return data;
};