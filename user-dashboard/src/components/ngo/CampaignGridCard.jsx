import {
  Calendar,
  MapPin,
  Users,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function CampaignGridCard({
  title,
  description,
  location,
  date,
  volunteers,
  status = "Active",
  category = "Environment",
  image,
  registered = 0,
  capacity = 1,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Image */}

      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary shadow">
          {category}
        </span>

        <span className="absolute bottom-4 left-4 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 shadow-sm">
          {status}
        </span>

      </div>

      {/* Content */}

      <div className="space-y-5 p-6">

        <div>

          <h3 className="text-xl font-bold">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {description}
          </p>

        </div>

        <div className="space-y-3 text-sm text-slate-600">

          <div className="flex items-center gap-2">

            <Calendar size={18} />

            {date}

          </div>

          <div className="flex items-center gap-2">

            <MapPin size={18} />

            {location}

          </div>

          <div className="flex items-center gap-2">

            <Users size={18} />

            {volunteers} Volunteers

          </div>

        </div>

        {/* Progress */}

        <div className="mt-4">

          <div className="mb-2 flex justify-between text-sm">

            <span className="text-slate-500">
              Registration
            </span>

            <span className="font-semibold">
              {registered} / {capacity}
            </span>

          </div>

          <div className="h-2 rounded-full bg-slate-100">

            <div
              className="h-2 rounded-full bg-primary"
              style={{
                width: `${(registered / capacity) * 100}%`,
              }}
            />

          </div>

        </div>

        {/* Action Buttons */}

        <div className="mt-5 flex items-center gap-3">

        <button
            onClick={onView}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
        >
            <Eye size={17} />
            View Details
        </button>

        <button
            onClick={onEdit}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white py-2.5 text-sm font-medium text-blue-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50"
        >
            <Pencil size={17} />
            Edit
        </button>

        <button
            onClick={onDelete}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 bg-white text-red-500 transition-all duration-200 hover:border-red-300 hover:bg-red-50"
        >
            <Trash2 size={18} />
        </button>

        </div>

      </div>

    </div>
  );
}