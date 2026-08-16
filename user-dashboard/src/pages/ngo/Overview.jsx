import { Link } from "react-router-dom";
import { Megaphone, Users, Clock } from "lucide-react";
import { useState } from "react";
import CreateCampaignModal from "../../components/ngo/CreateCampaignModal";
import StatCard from "../../components/ngo/StatCard";
import CampaignCard from "../../components/ngo/CampaignCard";
import VolunteerCard from "../../components/ngo/VolunteerCard";

export default function Overview() {
  return (
    <div className="space-y-10">

      {/* Welcome Banner */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-900">
          Overview
        </h1>

        <p className="mt-2 text-lg text-slate-500">
          Welcome back, GreenFuture PH · Here's what's happening today.
          Volunteers matched to your active campaigns by skill and availability
        </p>

      </div>

      {/* Statistics */}

      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          <StatCard
            title="Active Campaigns"
            value="12"
            subtitle="+2 this month"
            icon={Megaphone}
          />

          <StatCard
            title="Active Volunteers"
            value="248"
            subtitle="+18 this week"
            icon={Users}
          />

          <StatCard
            title="Pending Requests"
            value="19"
            subtitle="Awaiting approval"
            icon={Clock}
          />

        </div>

      </section>

      {/* Campaigns */}

      <section className="rounded-2xl bg-slate-50 p-6">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Recent Campaigns
          </h2>

          <Link
            to="/ngo/campaigns"
            className="font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
          >
            View All →
          </Link>

        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          <CampaignCard
            title="Tree Plantation Drive"
            location="Bengaluru"
            date="20 July 2026"
            volunteers={48}
          />

          <CampaignCard
            title="Food Distribution"
            location="Mysuru"
            date="28 July 2026"
            volunteers={82}
          />

          <CampaignCard
            title="Blood Donation Camp"
            location="Hubli"
            date="04 August 2026"
            volunteers={65}
          />

        </div>

      </section>

      {/* Volunteers */}

      <section className="rounded-2xl bg-blue-50/40 p-6">

        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Recommended Volunteers
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Skilled volunteers who best match your active campaigns.
            </p>
          </div>
          <button
            className="text-sm font-semibold text-primary hover:underline"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          <VolunteerCard
            name="Rahul Sharma"
            email="rahul@gmail.com"
            phone="+91 9876543210"
            skills={[
              "Teaching",
              "Leadership",
              "Fundraising",
            ]}
          />

          <VolunteerCard
            name="Priya Nair"
            email="priya@gmail.com"
            phone="+91 9876501234"
            skills={[
              "Healthcare",
              "Event Planning",
            ]}
          />

          <VolunteerCard
            name="Arjun Patel"
            email="arjun@gmail.com"
            phone="+91 9988776655"
            skills={[
              "Environment",
              "Photography",
              "Management",
            ]}
          />

        </div>

      </section>
    </div>
  );
}