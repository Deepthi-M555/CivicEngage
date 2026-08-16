import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginNGO } from "../../services/ngoAuthService";
import { useAuth } from "../../context/AuthContext";

export default function NGOLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await loginNGO(formData);

      localStorage.setItem("ngoToken", data.token);

      toast.success("Login Successful");

      navigate("/ngo");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-lg">

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-semibold text-primary">
            CivicEngage
          </h1>

          <h2 className="text-xl font-semibold">
            NGO Portal Login
          </h2>

          <p className="mt-2 text-muted-foreground">
            Sign in to manage campaigns, volunteers and your organization.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm"
            >
              Organization Email
            </label>

            <div className="relative">

              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>

              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter organization email"
                className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />

            </div>
          </div>

          <div>

            <label
              htmlFor="password"
              className="mb-2 block text-sm"
            >
              Password
            </label>

            <div className="relative">

              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>

              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />

            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-3 text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login to NGO Dashboard"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an NGO account?{" "}
          <Link
            to="/ngo/signup"
            className="text-primary hover:underline"
          >
            Register Organization
          </Link>
        </p>

      </div>
    </div>
  );
}