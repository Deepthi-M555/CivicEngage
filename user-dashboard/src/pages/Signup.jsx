import { Link, useNavigate } from "react-router-dom";
import { User, Calendar, MapPin, Mail, Lock, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const skillOptions = [
  "Teaching",
  "Healthcare",
  "Technology",
  "Marketing",
  "Design",
  "Writing",
  "Event Planning",
  "Photography",
];

const interestOptions = [
  "Education",
  "Environment",
  "Healthcare",
  "Animal Welfare",
  "Social Justice",
  "Arts & Culture",
  "Community Development",
  "Disaster Relief",
];

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    location: "",
    email: "",
    password: "",
  });

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        skills: selectedSkills,
        interests: selectedInterests,
      };
      await signup(payload);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-semibold text-primary">CivicEngage</h1>
          <h2 className="text-2xl font-semibold">Create Your Account</h2>
          <p className="mt-2 text-muted-foreground">Join our community and start making an impact</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="dob" className="mb-2 block text-sm">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="mb-2 block text-sm">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, State"
                      className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${
                      selectedSkills.includes(skill)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {skill}
                    {selectedSkills.includes(skill) && (
                      <X className="ml-1 inline h-3 w-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${
                      selectedInterests.includes(interest)
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {interest}
                    {selectedInterests.includes(interest) && (
                      <X className="ml-1 inline h-3 w-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Account Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-3 text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
