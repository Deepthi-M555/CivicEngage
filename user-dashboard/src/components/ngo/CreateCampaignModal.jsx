import { X, ImagePlus } from "lucide-react";
import { useState, useEffect } from "react";

export default function CreateCampaignModal({ 
  open, 
  onClose,
  mode = "create",
  campaign = null, }) {
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    category: "Environment",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    maxVolunteers: 50,
    deadline: "",
    contact: "",
  });

  const skills = [
    "Teaching",
    "Environmental Science",
    "Medical",
    "IT",
    "Leadership",
    "Communication",
    "Research",
    "Event Planning",
    "Marine Biology",
    "Public Health",
    "Nursing",
    "First Aid",
    "Physical Labor",
  ];

  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    if (mode === "edit" && campaign) {
      setForm({
        title: campaign.title || "",
        shortDescription: campaign.shortDescription || "",
        description: campaign.description || "",
        category: campaign.category || "Environment",
        date: campaign.date || "",
        startTime: campaign.startTime || "",
        endTime: campaign.endTime || "",
        location: campaign.location || "",
        maxVolunteers: campaign.capacity || 50,
        deadline: campaign.deadline || "",
        contact: campaign.contact || "",
      });
    }

    if (mode === "create") {
      setForm({
        title: "",
        shortDescription: "",
        description: "",
        category: "Environment",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        maxVolunteers: 50,
        deadline: "",
        contact: "",
      });
    }
  }, [campaign, mode]);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">

      <div className="max-h-[95vh] w-full max-w-7xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold">
             {mode === "edit"
              ? "Edit Campaign"
              : "Create Campaign"}
            </h2>

            <p className="mt-1 text-slate-500">
              Fill in the details and publish to find volunteers.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={26} />
          </button>

        </div>

        {/* Body */}

        <div className="grid grid-cols-3 gap-8 p-8">

          {/* LEFT */}

          <div className="col-span-2 space-y-6">

            <div className="grid grid-cols-2 gap-5">

              <div>

                <label className="mb-2 block font-medium">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border p-3"
                >
                  <option>Environment</option>
                  <option>Education</option>
                  <option>Health</option>
                  <option>Disaster Relief</option>
                  <option>Animal Welfare</option>
                </select>

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Campaign Date
                </label>

                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      date: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border p-3"
                />

              </div>

            </div>

            <div className="grid grid-cols-2 gap-5">

              <div>

                <label className="mb-2 block font-medium">
                  Start Time
                </label>

                <input
                  type="time"
                  value={form.startTime}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      startTime: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border p-3"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  End Time
                </label>

                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      endTime: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border p-3"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Campaign Title
              </label>

              <input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                placeholder="Enter campaign title"
                className="w-full rounded-xl border p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Short Description
              </label>

              <textarea
                rows={2}
                value={form.shortDescription}
                onChange={(e) =>
                  setForm({
                    ...form,
                    shortDescription: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Detailed Description
              </label>

              <textarea
                rows={5}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Location
              </label>

              <input
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
                placeholder="Full address"
                className="w-full rounded-xl border p-3"
              />

            </div>

            <div>

              <label className="mb-3 block font-medium">
                Required Skills
              </label>

              <div className="flex flex-wrap gap-2">

                {skills.map((skill) => (

                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      selectedSkills.includes(skill)
                        ? "bg-primary text-white"
                        : "bg-slate-100 hover:bg-slate-200"
                    }`}
                  >
                    {skill}
                  </button>

                ))}

              </div>

            </div>

            <div className="grid grid-cols-2 gap-5">

              <div>

                <label className="mb-2 block font-medium">
                  Maximum Volunteers
                </label>

                <input
                  type="number"
                  value={form.maxVolunteers}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      maxVolunteers: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border p-3"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Registration Deadline
                </label>

                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      deadline: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border p-3"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Contact Number
              </label>

              <input
                value={form.contact}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
              />

            </div>

            <div>
              <label className="mb-3 block font-medium">
                Campaign Banner
              </label>
              <div className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 transition hover:border-primary">
                <ImagePlus className="mb-3 h-10 w-10 text-slate-400" />
                <p className="font-semibold">
                  Drop image here or Browse Files
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  PNG / JPG (Maximum 5 MB)
                </p>
              </div>
            </div>
          </div>
          
          {/* RIGHT */}
          <div className="space-y-5">
            <div>
              <h3 className="text-2xl font-bold">
                Live Preview
              </h3>
              <p className="text-sm text-slate-500">
                As seen by volunteers
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="relative h-44 bg-gradient-to-r from-sky-500 to-emerald-500">
                <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary">
                  {form.category}
                </span>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <h4 className="text-xl font-bold">
                    {form.title || "Campaign Title"}
                  </h4>
                  <p className="mt-1 text-sm text-slate-500">
                    {form.shortDescription ||
                      "Short description will appear here..."}
                  </p>
                </div>

                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    📅 {form.date || "Campaign Date"}
                  </p>
                  <p>
                    🕒 {form.startTime || "09:00"} - {form.endTime || "17:00"}
                  </p>
                  <p>
                    📍 {form.location || "Location"}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold">
                    Required Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(selectedSkills.length
                      ? selectedSkills
                      : ["Teaching", "Leadership"]).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Volunteers</span>
                    <span>
                      0 / {form.maxVolunteers}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-0 rounded-full bg-primary" />
                  </div>
                </div>
                <button className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:bg-primary/90">
                  Participate
                </button>
              </div>

            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <h4 className="font-semibold text-primary">
                Preview Tips
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• A compelling title attracts more volunteers.</li>
                <li>• Mention required skills clearly.</li>
                <li>• Keep the description concise and informative.</li>
                <li>• Upload an attractive banner image.</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between border-t bg-slate-50 px-8 py-5">
          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-3 transition hover:bg-slate-100"
          >
            Cancel
          </button>
          <div className="flex gap-4">
            <button className="rounded-xl border px-6 py-3 transition hover:bg-slate-100">
              Save Draft
            </button>
            <button className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90">
              {mode === "edit"
              ? "Save Changes"
              : "Publish Campaign"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}