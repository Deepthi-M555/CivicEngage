import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  Tag,
} from "lucide-react";

export default function CampaignDetailsModal({
  open,
  onClose,
  campaign,
  onEdit,
}) {
  if (!open || !campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="relative">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="h-72 w-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full bg-white p-2 shadow transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>
          <div className="absolute bottom-5 left-5 flex gap-3">
            <span className="rounded-full bg-white px-4 py-1 text-sm font-semibold text-primary shadow">
              {campaign.category}
            </span>
            <span
              className={`rounded-full px-4 py-1 text-sm font-semibold shadow ${
                campaign.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {campaign.status}
            </span>
          </div>
        </div>
        {/* Body */}
        <div className="space-y-8 p-8">
          <div>
            <h2 className="text-3xl font-bold">
              {campaign.title}
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              {campaign.description}
            </p>
          </div>
          {/* Campaign Information */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <Calendar className="text-primary" />
              <div>
                <p className="text-sm text-slate-500">
                  Date
                </p>
                <h4 className="font-semibold">
                  {campaign.date}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <Clock className="text-primary" />
              <div>
                <p className="text-sm text-slate-500">
                  Time
                </p>
                <h4 className="font-semibold">
                  {campaign.time}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <MapPin className="text-primary" />
              <div>
                <p className="text-sm text-slate-500">
                  Location
                </p>
                <h4 className="font-semibold">
                  {campaign.location}
                </h4>
              </div> 
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <Users className="text-primary" />

              <div>
                <p className="text-sm text-slate-500">
                  Volunteers
                </p>
                <h4 className="font-semibold">
                  {campaign.registered} / {campaign.capacity}
                </h4>
              </div>
            </div>
          </div>
          {/* Required Skills */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {(campaign.skills || [
                "Leadership",
                "Communication",
                "Teaching",
              ]).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Contact Information
            </h3>
            <div className="rounded-xl border bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <Phone
                  size={20}
                  className="text-primary"
                />
                <span>
                  {campaign.contact || "+91 9876543210"}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-end gap-4 border-t bg-slate-50 px-8 py-5">
          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-2.5 transition hover:bg-slate-100"
          >
            Close
          </button>
          <button
            onClick={onEdit}
            className="rounded-xl bg-primary px-6 py-2.5 font-medium text-white transition hover:bg-primary/90"
          >
            Edit Campaign
          </button>
        </div>
      </div>
    </div>
  );
}