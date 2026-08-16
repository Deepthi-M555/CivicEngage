import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import NotificationCard from "../../components/ngo/NotificationCard";
import {
  getNGONotifications,
  markNotificationAsRead,
  deleteNotification,
  clearAllNotifications,
} from "../../services/ngoNotificationService";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNGONotifications();
      setNotifications(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const dismissAll = async () => {
    try {
      await clearAllNotifications();
      await loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const markAllAsRead = async () => {
    for (const notification of notifications) {
      if (!notification.isRead) {
        await markNotificationAsRead(notification._id);
      }
    }

    await loadNotifications();
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      await loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Notifications
          </h1>

          <p className="mt-2 text-slate-500">
            Stay updated with volunteer activity and campaign changes.
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium transition hover:bg-slate-50"
        >
          <Check size={18} />
          Mark all as read
        </button>

      </div>

      {/* Dismiss */}

      {notifications.length > 0 && (
        <div className="flex justify-end">

          <button
            onClick={dismissAll}
            className="text-sm font-medium text-slate-500 transition hover:text-red-500"
          >
            Dismiss all
          </button>

        </div>
      )}

      {/* Cards */}

      <div className="space-y-5">

        {loading ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
            <h3 className="text-lg font-semibold text-slate-700">Loading notifications...</h3>
          </div>
        ) : notifications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
            <h3 className="text-lg font-semibold text-slate-700">No Notifications</h3>
            <p className="mt-2 text-slate-500">You're all caught up.</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              key={notification._id || notification.id}
              id={notification._id || notification.id}
              title={notification.title || notification.type}
              message={notification.message}
              time={new Date(notification.createdAt || notification.time).toLocaleString()}
              type={notification.type}
              onDelete={handleDelete}
            />
          ))
        )}

      </div>
    </div>
  );
}
