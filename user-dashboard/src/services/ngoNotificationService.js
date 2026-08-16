import api from "../lib/api";

// Get all NGO notifications
export const getNGONotifications = async (
  page = 1,
  limit = 10
) => {
  const { data } = await api.get(
    `/notifications?page=${page}&limit=${limit}`
  );
  return data;
};

// Mark one notification as read
export const markNotificationAsRead = async (id) => {
  const { data } = await api.put(
    `/notifications/${id}/read`
  );
  return data;
};

// Delete notification
export const deleteNotification = async (id) => {
  const { data } = await api.delete(
    `/notifications/${id}`
  );
  return data;
};

// Clear all notifications
export const clearAllNotifications = async () => {
  const { data } = await api.delete(
    "/notifications/clear/all"
  );
  return data;
};

// Create notification (optional)
export const createNotification = async (payload) => {
  const { data } = await api.post(
    "/notifications",
    payload
  );
  return data;
};