import {
  Award,
  Star,
  Trophy,
  Target,
  Heart,
  Zap,
  Users,
  Crown,
} from "lucide-react";

const badges = [
  {
    icon: Star,
    title: "First Steps",
    description: "Complete your first volunteer activity",
    unlocked: true,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Heart,
    title: "Community Hero",
    description: "Contribute 100+ hours to the community",
    unlocked: true,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Trophy,
    title: "Top Contributor",
    description: "Rank in top 10% of volunteers",
    unlocked: true,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Target,
    title: "Goal Achiever",
    description: "Complete 10 campaigns successfully",
    unlocked: true,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Quick Responder",
    description: "Join 5 urgent campaigns within 24 hours",
    unlocked: true,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Users,
    title: "Team Leader",
    description: "Lead a team of 10+ volunteers",
    unlocked: true,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Award,
    title: "Consistency Champion",
    description: "Volunteer every month for 6 consecutive months",
    unlocked: true,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Crown,
    title: "Impact Master",
    description: "Reach an impact score of 1000+",
    unlocked: false,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Star,
    title: "Multi-Skilled",
    description: "Participate in campaigns across 5 different categories",
    unlocked: false,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

export default function Badges() {
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Badges & Achievements</h1>
        <p className="mt-2 text-muted-foreground">
          Celebrate your milestones and track your progress
        </p>
      </div>

      {/* Progress Summary */}
      <div className="rounded-xl border border-border bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              Your Achievement Progress
            </h2>
            <p className="mt-2 text-white/90">
              You've unlocked {unlockedCount} out of {badges.length} badges
            </p>
          </div>
          <div className="text-right">
            <p className="text-6xl font-bold">{unlockedCount}</p>
            <p className="text-white/80">Badges</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="h-3 w-full rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${(unlockedCount / badges.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div
              key={index}
              className={`rounded-xl border border-border bg-card p-6 shadow-sm transition-all ${
                badge.unlocked ? "hover:shadow-lg" : "opacity-60"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`rounded-lg ${badge.bgColor} p-3 flex-shrink-0`}
                >
                  <Icon className={`h-8 w-8 ${badge.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{badge.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                  {badge.unlocked ? (
                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-500">
                      <Award className="h-3 w-3" />
                      <span>Unlocked</span>
                    </div>
                  ) : (
                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <span>🔒 Locked</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
