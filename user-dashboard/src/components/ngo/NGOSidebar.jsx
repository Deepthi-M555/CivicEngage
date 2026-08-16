import { Link, useLocation} from "react-router-dom";
import {
  LayoutDashboard,
  Megaphone,
  Users,
  Bell,
  Building2,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    path: "/ngo",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    path: "/ngo/campaigns",
    label: "Campaigns",
    icon: Megaphone,
  },
  {
    path: "/ngo/volunteers",
    label: "Volunteers",
    icon: Users,
  },
  {
    path: "/ngo/notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    path: "/ngo/organization",
    label: "Organization",
    icon: Building2,
  },
];
const landingUrl = import.meta.env.VITE_LANDING_URL;

export default function NGOSidebar() {
  const location = useLocation();
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 border-r border-border bg-card p-4">
      <div className="mb-8">
        <h2 className="px-4 text-xl font-semibold text-primary">
          CivicEngage
        </h2>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <button
           onClick={() => {
            localStorage.removeItem("ngoToken");
            window.location.href = landingUrl;
          }}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}