import api from "../lib/api";

export const loginNGO = async (credentials) => {
  const response = await api.post("/ngo/login", credentials);
  return response.data;
};

export const signupNGO = async (payload) => {
  const response = await api.post("/ngo/signup", payload);
  return response.data;
};

export const getNGOProfile = async () => {
  const response = await api.get("/ngo/profile");
  return response.data;
};