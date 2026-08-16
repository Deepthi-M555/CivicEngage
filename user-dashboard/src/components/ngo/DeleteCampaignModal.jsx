import { Trash2, X } from "lucide-react";

export default function DeleteCampaignModal({
  open,
  onClose,
  campaign,
  onDelete,
}) {
  if (!open || !campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

          <Trash2 className="text-red-600" size={30} />

        </div>

        <h2 className="text-center text-2xl font-bold">
          Delete Campaign
        </h2>

        <p className="mt-4 text-center text-slate-500">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {campaign.title}
          </span>
          ?
        </p>

        <p className="mt-2 text-center text-sm text-red-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border py-3 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="flex-1 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}