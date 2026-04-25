import {
  Target,
  Users,
  TrendingUp,
  Award,
  MapPin,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Badge from "../components/badge";
import Tag from "../components/tag";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { getScore, getBadges } from "../services/impactService";
import { getRecommendations } from "../services/aiService";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    {
      icon: Target,
      title: "Active Tasks",
      value: "0",
      trend: "Loading...",
      color: "text-primary",
    },
    {
      icon: Users,
      title: "Total Contributions",
      value: "0",
      trend: "Loading...",
      color: "text-secondary",
    },
    {
      icon: TrendingUp,
      title: "Impact Score",
      value: "0",
      trend: "Loading...",
      color: "text-accent",
    },
    {
      icon: Award,
      title: "Badges Earned",
      value: "0",
      trend: "Loading...",
      color: "text-success",
    },
  ]);
  const [opportunities, setOpportunities] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, eventRes, scoreRes, badgesRes, aiRes] =
          await Promise.all([
            api.get("/auth/dashboard").catch(() => ({ data: {} })),
            api.get("/events").catch(() => ({ data: { events: [] } })),
            getScore().catch(() => ({ score: 0 })),
            getBadges().catch(() => ({ badges: [] })),
            getRecommendations(user?.interests?.[0] || "disaster").catch(
              () => [],
            ),
          ]);

        const d = dashRes.data;
        const statsObj = d.stats || {};
        const total = statsObj.totalTasks || 0;
        const completed = statsObj.completedTasks || 0;
        const active = total - completed > 0 ? total - completed : 0;

        const impact =
          scoreRes?.score ?? scoreRes?.impactScore ?? statsObj.impactScore ?? 0;
        const badgesCount = Array.isArray(badgesRes)
          ? badgesRes.length
          : badgesRes?.badges?.length || 0;

        const aiRecs = Array.isArray(aiRes)
          ? aiRes
          : aiRes?.recommendations || [];
        setAiRecommendations(aiRecs);

        setStats([
          {
            icon: Target,
            title: "Active Tasks",
            value: active.toString(),
            trend: "Current",
            color: "text-primary",
            bgColor: "bg-primary/10",
          },
          {
            icon: Users,
            title: "Total Contributions",
            value: completed.toString(),
            trend: "Overall",
            color: "text-primary",
            bgColor: "bg-primary/10",
          },
          {
            icon: TrendingUp,
            title: "Impact Score",
            value: impact.toString(),
            trend: "Top 10%",
            color: "text-primary",
            bgColor: "bg-primary/10",
          },
          {
            icon: Award,
            title: "Badges Earned",
            value: badgesCount.toString(),
            trend: "2 new",
            color: "text-primary",
            bgColor: "bg-primary-500/10",
          },
        ]);

        // Take up to 4 opportunities for the dashboard widget
        const opps = eventRes.data.events?.slice(0, 4) || [];
        setOpportunities(opps);
      } catch (error) {
        console.log(error);
        console.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h1 className="text-3xl font-semibold">
          Good Evening, {user?.name || "Volunteer"} 👋
        </h1>
        <p className="mt-2 text-white/90">
          You've made an incredible impact this month! Keep up the great work.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.trend}
                  </p>
                </div>
                <div
                  className={`rounded-lg ${stat.bgColor || "bg-muted"} p-3 ${stat.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommended Opportunities */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recommended Opportunities</h2>
          <Link
            to="/opportunities"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {aiRecommendations.length > 0 && (
          <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <h3 className="mb-2 font-semibold text-primary flex items-center gap-2">
              ✨ AI Suggested Tasks for You
            </h3>
            <div className="flex flex-wrap gap-2">
              {aiRecommendations.map((rec, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {rec}
                </span>
              ))}
            </div>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center p-10">
            <Loader2 className="animate-spin text-primary w-8 h-8" />
          </div>
        ) : opportunities.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
            No opportunities found right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {opportunities.map((opp, index) => (
              <div
                key={opp._id || index}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary"
              >
                <div className="mb-4 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold line-clamp-2">{opp.title}</h3>
                    <Badge variant={"success"}>{opp.urgency || "Open"}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {opp.ngo || opp.organizer || "Community Event"}
                  </p>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {(opp.skills || []).slice(0, 2).map((skill, i) => (
                    <Tag key={i}>{skill}</Tag>
                  ))}
                </div>
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{opp.location || "Online"}</span>
                </div>
                <Link
                  to={`/opportunities/${opp._id}`}
                  className="block text-center w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
