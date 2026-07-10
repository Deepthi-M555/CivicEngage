import { Calendar, Building2, FileText, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getParticipations, getHostedEvents } from "../services/historyService";

export default function History() {
  const [participations, setParticipations] = useState([]);
  const [hostedEvents, setHostedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("participations");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [partData, hostData] = await Promise.all([
          getParticipations().catch(() => []),
          getHostedEvents().catch(() => [])
        ]);
        setParticipations(Array.isArray(partData) ? partData : (partData.participations || partData || []));
        setHostedEvents(Array.isArray(hostData) ? hostData : (hostData.events || hostData || []));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalHours = participations.reduce((acc, p) => acc + (p.hoursWorked || 0), 0);
  const uniqueNGOs = new Set(participations.map(p => p.event?.ngo || p.event?.organizer).filter(Boolean)).size;

  const displayList = activeTab === "participations" ? participations : hostedEvents;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">
          Participation History
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your journey of making a difference in the community
        </p>
      </div>

      {/* Total Impact Summary */}
      <div className="rounded-xl border border-border bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h2 className="text-2xl font-semibold">Total Impact</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/80 text-sm">
              Total Activities
            </p>
            <p className="text-3xl font-bold">
              {participations.length}
            </p>
          </div>
          <div>
            <p className="text-white/80 text-sm">
              Hours Contributed
            </p>
            <p className="text-3xl font-bold">{totalHours > 0 ? `${totalHours}+` : "0"}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm">
              NGOs Partnered
            </p>
            <p className="text-3xl font-bold">{uniqueNGOs}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border pb-2">
        <button
          onClick={() => setActiveTab("participations")}
          className={`text-lg font-medium px-4 py-2 border-b-2 transition-colors ${
            activeTab === "participations"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          My Participations
        </button>
        <button
          onClick={() => setActiveTab("hosted")}
          className={`text-lg font-medium px-4 py-2 border-b-2 transition-colors ${
            activeTab === "hosted"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Events Hosted
        </button>
      </div>

      {/* History List */}
      {loading ? (
        <div className="flex justify-center p-10">
          <Loader2 className="animate-spin text-primary w-8 h-8" />
        </div>
      ) : displayList.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
          No records found.
        </div>
      ) : (
        <div className="space-y-4">
          {displayList.map((item, index) => {
            const isHosted = activeTab === "hosted";
            const eventData = isHosted ? item : (item.event || {});
            const title = eventData.title || "Unknown Event";
            const ngo = eventData.ngo || eventData.organizer || "Community Event";
            const date = eventData.date || item.createdAt;
            const contribution = isHosted ? "Hosted this event" : `Status: ${item.status || 'Completed'}`;
            const impact = isHosted ? "Event Creator" : `${item.hoursWorked || 0} hours contributed`;

            return (
              <div
                key={item._id || index}
                className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Building2 className="h-4 w-4" />
                      <span>{ngo}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
                      <FileText className="h-4 w-4 mt-0.5" />
                      <span>{contribution}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {date ? new Date(date).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                      <span className="text-primary font-medium">
                        {impact}
                      </span>
                    </div>
                  </div>
                  <button className="rounded-lg border border-primary bg-transparent px-4 py-2 text-primary hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
