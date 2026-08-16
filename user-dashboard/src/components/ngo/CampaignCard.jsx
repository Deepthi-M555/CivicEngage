import React from "react";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
} from "lucide-react";

export default function CampaignCard({
  title,
  location,
  date,
  volunteers,
  status = "Active",
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-lg transition-all">
      <div className="flex items-start justify-between">

        <div>
          <h3 className="text-lg font-semibold">
            {title}
          </h3>

          <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {status}
          </span>
        </div>

      </div>

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {location}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {date}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          {volunteers} Volunteers
        </div>

      </div>

      <button
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        View Campaign
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}