import { Search, Bell, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function NGONavbar({
  onCreateCampaign,
}) {
  return (
    <header className="sticky top-0 z-10 flex h-[70px] items-center justify-between border-b border-border bg-card px-6">

      <div className="max-w-xl flex-1">

        <div className="relative">

          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search campaigns..."
            className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

        </div>

      </div>

      <div className="flex items-center gap-4">

        <button onClick={onCreateCampaign} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90" >

          <Plus className="h-4 w-4" />

          Create Campaign

        </button>

        <Link
          to="/ngo/notifications"
          className="relative rounded-lg p-2 hover:bg-muted"
        >

          <Bell className="h-5 w-5" />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive"></span>

        </Link>

        <Link to="/ngo/organization">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">

            N

          </div>

        </Link>

      </div>

    </header>
  );
}