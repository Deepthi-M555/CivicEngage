import {
  Mail,
  Phone,
  Users,
  Eye,
  UserPlus,
  Trash2,
} from "lucide-react";

export default function VolunteerGridCard({
  name,
  email,
  phone,
  skills,
  status,
  campaign,
  onView,
  onAssign,
  onApprove,
  onReject,
  onRemove,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Profile */}

      <div className="flex items-center gap-4">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
          {name.charAt(0)}
        </div>

        <div>

          <h3 className="text-xl font-semibold">
            {name}
          </h3>

          <span
            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
              status === "approved"
                ? "bg-green-100 text-green-700"
                : status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>

        </div>

      </div>

      {/* Contact */}

      <div className="mt-6 space-y-3 text-sm text-slate-600">

        <div className="flex items-center gap-2">
          <Mail size={17} />
          {email}
        </div>

        <div className="flex items-center gap-2">
          <Phone size={17} />
          {phone}
        </div>

        <div className="flex items-center gap-2">
          <Users size={17} />
          {campaign}
        </div>

      </div>

      {/* Skills */}

      <div className="mt-6">

        <p className="mb-2 text-sm font-semibold">
          Skills
        </p>

        <div className="flex flex-wrap gap-2">

          {skills.map((skill) => (

            <span
              key={skill}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {skill}
            </span>

          ))}

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-6 flex items-center gap-3">

        <button
          onClick={onView}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm transition hover:bg-slate-50"
        >
          <Eye size={16} />
          View
        </button>

        <button
          onClick={onAssign}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 py-2.5 text-sm text-blue-600 transition hover:bg-blue-50"
        >
          <UserPlus size={16} />
          Assign
        </button>

        <button
          onClick={onApprove}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-green-200 py-2.5 text-sm text-green-600 transition hover:bg-green-50"
        >
          Approve
        </button>

        <button
          onClick={onReject}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-amber-200 py-2.5 text-sm text-amber-600 transition hover:bg-amber-50"
        >
          Reject
        </button>

        <button
          onClick={onRemove}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50"
        >
          <Trash2 size={17} />
        </button>

      </div>

    </div>
  );
}
