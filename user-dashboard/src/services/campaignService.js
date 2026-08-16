import api from "../lib/api";

export const getCampaigns = async () => {
  const { data } = await api.get("/campaigns");
  return data;
};

export const getCampaignById = async (id) => {
  const { data } = await api.get(`/campaigns/${id}`);
  return data;
};

export const createCampaign = async (payload) => {
  const { data } = await api.post("/campaigns/create", payload);
  return data;
};

export const updateCampaign = async (id, payload) => {
  const { data } = await api.put(`/campaigns/${id}`, payload);
  return data;
};

export const deleteCampaign = async (id) => {
  const { data } = await api.delete(`/campaigns/${id}`);
  return data;
};