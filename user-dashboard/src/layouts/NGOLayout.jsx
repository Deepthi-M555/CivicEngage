import { Outlet } from "react-router-dom";
import { useState } from "react";

import NGOSidebar from "../components/ngo/NGOSidebar";
import NGONavbar from "../components/ngo/NGONavbar";
import CreateCampaignModal from "../components/ngo/CreateCampaignModal";

export default function NGOLayout() {

  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">

      <NGOSidebar />

      <div className="ml-60 flex-1">

        <NGONavbar
          onCreateCampaign={() => setShowCreateModal(true)}
        />

        <main className="p-6">
          <Outlet />
        </main>

      </div>

      <CreateCampaignModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

    </div>
  );
}