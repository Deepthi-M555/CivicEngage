import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import VolunteerDetailsModal from "../../components/ngo/VolunteerDetailsModal";
import VolunteerGridCard from "../../components/ngo/VolunteerGridCard";
import RemoveVolunteerModal from "../../components/ngo/RemoveVolunteerModal";
import {
  getVolunteers,
  approveVolunteer,
  rejectVolunteer,
  deleteVolunteer,
} from "../../services/volunteerService";

export default function Volunteers() {

  const [search, setSearch] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [removingVolunteer, setRemovingVolunteer] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVolunteers();
  }, []);

  const loadVolunteers = async () => {
    try {
      setLoading(true);

      const data = await getVolunteers();

      setVolunteers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveVolunteer(id);
      await loadVolunteers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectVolunteer(id);
      await loadVolunteers();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredVolunteers = volunteers.filter((volunteer) =>
    (volunteer.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold">
          Volunteers
        </h1>

        <p className="mt-2 text-slate-500">
          Manage volunteers and assign them to your campaigns.
        </p>

      </div>

      {/* Search */}

      <div className="relative">

        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search volunteers..."
          className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

      </div>

      {/* Cards */}

      {loading ? (
        <div className="py-20 text-center">
          Loading volunteers...
        </div>
      ) : (
        <div className="grid gap-7 lg:grid-cols-2 xl:grid-cols-3">

          {filteredVolunteers.map((volunteer) => (

            <VolunteerGridCard
              key={volunteer._id || volunteer.id}
              {...volunteer}
              onView={() => setSelectedVolunteer(volunteer)}
              onAssign={() => console.log("Assign")}
              onApprove={() => handleApprove(volunteer._id)}
              onReject={() => handleReject(volunteer._id)}
              onRemove={() => setRemovingVolunteer(volunteer)}
            />

          ))}

        </div>
      )}
      {/* Volunteer Details Modal */}

      <VolunteerDetailsModal
        open={selectedVolunteer !== null}
        volunteer={selectedVolunteer}
        onClose={() => setSelectedVolunteer(null)}
      />

      <RemoveVolunteerModal
        open={removingVolunteer !== null}
        volunteer={removingVolunteer}
        onClose={() => setRemovingVolunteer(null)}
        onRemove={async () => {
          if (!removingVolunteer?._id) return;

          await deleteVolunteer(removingVolunteer._id);
          await loadVolunteers();
          setRemovingVolunteer(null);
        }}
      />
    </div>
  );
}