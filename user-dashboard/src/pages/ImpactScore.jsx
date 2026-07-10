import { TrendingUp, Award, Target, Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { getScore, getBadges } from "../services/impactService";

const monthlyData = [
  { month: "Jan", score: 120 },
  { month: "Feb", score: 245 },
  { month: "Mar", score: 380 },
  { month: "Apr", score: 847 },
];

const categoryData = [
  { category: "Participation", score: 320 },
  { category: "Consistency", score: 280 },
  { category: "Leadership", score: 147 },
  { category: "Impact", score: 100 },
];

export default function ImpactScore() {
  const [scoreData, setScoreData] = useState({ score: 0, totalHours: 0 });
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scoreRes, badgesRes] = await Promise.all([
          getScore().catch(() => ({ score: 0, totalHours: 0 })),
          getBadges().catch(() => []),
        ]);
        setScoreData({
          score: scoreRes.score || 0,
          totalHours: scoreRes.totalHours || 0,
        });
        setBadges(
          Array.isArray(badgesRes) ? badgesRes : badgesRes.badges || [],
        );
      } catch (error) {
        console.error("Error fetching impact score", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const currentScore = scoreData.score;
  const nextMilestone = Math.ceil((currentScore + 1) / 1000) * 1000;
  const pointsToGo = nextMilestone - currentScore;

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Impact Score</h1>
        <p className="mt-2 text-muted-foreground">
          Track your contribution and see how you're making a difference
        </p>
      </div>

      {/* Score Highlight */}
      <div className="rounded-xl border border-border bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-lg">Your Current Score</p>
            <p className="text-6xl font-bold mt-2">{currentScore}</p>
            <p className="text-white/90 mt-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span>Based on {scoreData.totalHours} total hours</span>
            </p>
          </div>
          <div className="text-right">
            <div className="rounded-lg bg-white/20 p-6 backdrop-blur-sm">
              <Award className="h-16 w-16 mb-2" />
              <p className="text-sm">Top 10%</p>
              <p className="text-xs text-white/80">in your region</p>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
          <div className="space-y-4">
            {categoryData.map((item) => {
              const percentage = (item.score / 847) * 100;
              return (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.score}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Score Distribution */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="score" fill="#7C3AED" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Score Growth Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#7C3AED"
              strokeWidth={3}
              dot={{ fill: "#7C3AED", r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
          <div className="inline-flex rounded-full bg-primary/10 p-4 mb-3">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <h4 className="font-semibold mb-1">Next Milestone</h4>
          <p className="text-2xl font-bold text-primary">{nextMilestone}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {pointsToGo} points to go
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
          <div className="inline-flex rounded-full bg-secondary/10 p-4 mb-3">
            <Award className="h-8 w-8 text-secondary" />
          </div>
          <h4 className="font-semibold mb-1">Badges Earned</h4>
          <p className="text-2xl font-bold text-secondary">{badges.length}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Keep contributing!
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
          <div className="inline-flex rounded-full bg-accent/10 p-4 mb-3">
            <TrendingUp className="h-8 w-8 text-accent" />
          </div>
          <h4 className="font-semibold mb-1">Monthly Average</h4>
          <p className="text-2xl font-bold text-accent">212</p>
          <p className="text-sm text-muted-foreground mt-1">points per month</p>
        </div>
      </div>
    </div>
  );
}
