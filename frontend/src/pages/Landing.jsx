import React from "react";
import { Link } from "react-router-dom";
import { Users, Building2, Landmark, Shield } from "lucide-react";
const userDashboardUrl = import.meta.env.VITE_USER_DASHBOARD_URL;
const roles = [
  {
    icon: Users,
    title: "Volunteer",
    description: "Join campaigns and make a difference in your community",
    color: "bg-primary",
    link: userDashboardUrl,
  },
  {
    icon: Building2,
    title: "NGO",
    description: "Create campaigns and engage volunteers for your cause",
    color: "bg-sky-800",
    link: "/login",
  },
  {
    icon: Landmark,
    title: "Government",
    description: "Launch civic initiatives and gather public participation",
    color: "bg-teal-800",
    link: "/login",
  },
  {
    icon: Shield,
    title: "Admin",
    description: "Manage platform operations and oversee activities",
    color: "bg-destructive",
    link: "/login",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-primary">CivicEngage</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="mb-6 text-5xl font-bold text-foreground">
          Empowering Communities Through
          <br />
          <span className="text-primary">Smart Civic Engagement</span>
        </h1>

        <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect volunteers, NGOs, and government initiatives in one powerful
          platform. Make an impact, track your contributions, and build a better
          community together.
        </p>

        <p className="inline-flex rounded-lg bg-primary px-8 py-3.5 text-lg text-primary-foreground hover:bg-primary/90 transition-colors">
          Get Started Now!!!
        </p>
      </section>

      {/* Role Selection */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <h2 className="mb-8 text-center text-3xl font-semibold">
          Choose Your Role
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => {
            return (
              <Link
                key={role.title}
                to={role.link}
                className="group rounded-xl border border-border bg-card p-6
                shadow-sm transition-all hover:shadow-lg hover:border-primary"
              >
                <div
                  className={`mb-4 inline-flex rounded-lg ${role.color} p-3 text-white`}
                >
                  <role.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{role.title}</h3>
                <p className="mb-4 text-muted-foreground">{role.description}</p>
                <div className="w-full rounded-lg border border-primary bg-transparent px-4 py-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-center">
                  Continue
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
