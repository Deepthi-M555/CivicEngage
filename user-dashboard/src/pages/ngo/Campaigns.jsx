import { Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import {
  getCampaigns,
  deleteCampaign,
} from "../../services/campaignService";
import CampaignGridCard from "../../components/ngo/CampaignGridCard";
import CampaignDetailsModal from "../../components/ngo/CampaignDetailsModal";
import DeleteCampaignModal from "../../components/ngo/DeleteCampaignModal";
import CreateCampaignModal from "../../components/ngo/CreateCampaignModal";

export default function Campaigns() {
  const [search, setSearch] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [deletingCampaign, setDeletingCampaign] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);

      const response = await getCampaigns();

      setCampaigns(response.campaigns || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    (campaign.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-900">
            Campaigns
          </h1>

          <p className="mt-2 text-slate-500">
            Manage and track all your NGO campaigns.
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="relative">

        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search campaigns..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

      </div>

      {/* Cards */}

      {loading ? (

        <div className="py-20 text-center">Loading campaigns...</div>

      ) : (

        <div className="grid gap-7 xl:grid-cols-3 lg:grid-cols-2">

          {filteredCampaigns.map((campaign) => (

            <CampaignGridCard
              key={campaign._id}
              {...campaign}
              onView={() => setSelectedCampaign(campaign)}
              onEdit={() => setEditingCampaign(campaign)}
              onDelete={() => setDeletingCampaign(campaign)}
            />

          ))}

        </div>

      )}
     <CampaignDetailsModal
        campaign={selectedCampaign}
        open={selectedCampaign !== null}
        onClose={() => setSelectedCampaign(null)}
        onEdit={() => {
          setEditingCampaign(selectedCampaign);
          setSelectedCampaign(null);
        }}
      />
      <CreateCampaignModal
          open={showCreateModal}
          mode="create"
          onClose={() => setShowCreateModal(false)}
      />
      <CreateCampaignModal
        open={editingCampaign !== null}
        mode="edit"
        campaign={editingCampaign}
        onClose={() => setEditingCampaign(null)}
      />
      <DeleteCampaignModal
        open={deletingCampaign !== null}
        campaign={deletingCampaign}
        onClose={() => setDeletingCampaign(null)}
        onDelete={async () => {
          if (!deletingCampaign?._id) return;

          await deleteCampaign(deletingCampaign._id);

          await loadCampaigns();

          setDeletingCampaign(null);
        }}
      />
    </div>
    
    
  );
}