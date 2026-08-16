import {
  Bell,
  UserPlus,
  CheckCircle,
  Clock,
  X,
} from "lucide-react";

export default function NotificationCard({
  id,
  title,
  message,
  time,
  type,
  onDelete,
}) {
  const icons = {
    volunteer: UserPlus,
    success: CheckCircle,
    reminder: Clock,
    default: Bell,
  };

  const colors = {
    volunteer: "bg-blue-100 text-blue-600",
    success: "bg-green-100 text-green-600",
    reminder: "bg-yellow-100 text-yellow-600",
    default: "bg-slate-100 text-slate-600",
  };

  const Icon = icons[type] || Bell;

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${
          colors[type] || colors.default
        }`}
      >
        <Icon size={22} />
      </div>

      <div className="flex-1">

        <div className="flex items-center justify-between">

          <h3 className="font-semibold text-slate-900">
            {title}
          </h3>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">
              {time}
            </span>
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
                className="text-slate-400 hover:text-red-500"
                aria-label="Delete notification"
              >
                <X size={18} />
              </button>
            )}
          </div>

        </div>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {message}
        </p>

      </div>

    </div>
  );
}