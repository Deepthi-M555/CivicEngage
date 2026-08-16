import {
  X,
  Mail,
  Phone,
  Briefcase,
  Award,
} from "lucide-react";

export default function VolunteerDetailsModal({
  open,
  volunteer,
  onClose,
}) {
  if (!open || !volunteer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">

      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">
              {volunteer.name.charAt(0)}
            </div>

            <div>

              <h2 className="text-3xl font-bold">
                {volunteer.name}
              </h2>

              <p className="text-slate-500">
                Active Volunteer
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-6 p-8">

          <div className="grid grid-cols-2 gap-6">

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <Mail className="text-primary" />
              <span>{volunteer.email}</span>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <Phone className="text-primary" />
              <span>{volunteer.phone}</span>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <Briefcase className="text-primary" />
              <span>{volunteer.campaignAssigned || "Not Assigned"}</span>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <Award className="text-primary" />
              <span>{volunteer.status}</span>
            </div>

          </div>

          <div>

            <h3 className="mb-3 text-xl font-semibold">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {(volunteer.skills || []).map((skill) => (

                <span
                  key={skill}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t p-6">

          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-2 hover:bg-slate-100"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}