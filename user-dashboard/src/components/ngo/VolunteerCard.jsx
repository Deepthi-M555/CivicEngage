import React from "react";
import { User, Mail, Phone } from "lucide-react";

export default function VolunteerCard({
  name,
  email,
  phone,
  skills = [],
  status = "Available",
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-lg transition-all">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <User className="h-7 w-7 text-primary" />
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            {name}
          </h3>

          <span className="text-sm text-green-600 font-medium">
            {status}
          </span>
        </div>

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          {email}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          {phone}
        </div>

      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
          >
            {skill}
          </span>
        ))}
      </div>

      <button className="mt-6 w-full rounded-lg border border-primary py-2 text-primary hover:bg-primary hover:text-white transition-colors">
        View Profile
      </button>

    </div>
  );
}