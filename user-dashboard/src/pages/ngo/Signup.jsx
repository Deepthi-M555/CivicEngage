import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  FileText,
  Mail,
  Lock,
  Phone,
  MapPin,
  Globe,
  User,
  Upload,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "react-toastify";
import { signupNGO } from "../../services/ngoAuthService";

const orgTypes = [
  "Education",
  "Healthcare",
  "Environment",
  "Animal Welfare",
  "Disaster Relief",
  "Community Development",
  "Government Partner",
  "Other",
];

const categoryOptions = [
  "Education",
  "Healthcare",
  "Women Empowerment",
  "Child Welfare",
  "Environment",
  "Disaster Relief",
  "Rural Development",
  "Technology",
  "Food Distribution",
  "Animal Welfare",
  "Community Service",
];

const operationOptions = [
  "Volunteering",
  "Donations",
  "Awareness Campaigns",
  "Medical Camps",
  "Plantation Drives",
  "Fundraising",
  "Skill Development",
  "Blood Donation",
];

export default function Signup() {
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedOperations, setSelectedOperations] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [certFileName, setCertFileName] = useState("");
  const [logoFileName, setLogoFileName] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    ngoName: "",
    registrationNumber: "",
    organizationType: "",
    mission: "",
    contactPerson: "",
    designation: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const toggleOperation = (operation) => {
    setSelectedOperations((prev) =>
      prev.includes(operation)
        ? prev.filter((item) => item !== operation)
        : [...prev, operation]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {

      const payload = {
        name: formData.ngoName,
        email: formData.email,
        password: formData.password,
      };

      await signupNGO(payload);

      toast.success("Registration Successful");

      navigate("/ngo/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-semibold text-primary">
            CivicEngage
          </h1>

          <h2 className="text-2xl font-semibold">
            Register Your Organization
          </h2>

          <p className="mt-2 text-muted-foreground">
            Join CivicEngage and connect with volunteers to create meaningful
            social impact.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-lg">

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Organization Information */}

            <div>
              <h3 className="mb-5 text-lg font-semibold">
                Organization Information
              </h3>

              <div className="space-y-4">

                <div>

                  <label
                    htmlFor="ngoName"
                    className="mb-2 block text-sm"
                  >
                    Organization Name
                  </label>

                  <div className="relative">

                    <Building2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>

                    <input
                      id="ngoName"
                      type="text"
                      value={formData.ngoName}
                      onChange={handleChange}
                      placeholder="Enter organization name"
                      className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      required
                    />

                  </div>

                </div>

                <div>

                  <label
                    htmlFor="registrationNumber"
                    className="mb-2 block text-sm"
                  >
                    Registration Number
                  </label>

                  <div className="relative">

                    <FileText className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>

                    <input
                      id="registrationNumber"
                      type="text"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      placeholder="Enter registration number"
                      className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      required
                    />

                  </div>

                </div>

                <div>

                  <label
                    htmlFor="organizationType"
                    className="mb-2 block text-sm"
                  >
                    Organization Type
                  </label>

                  <select
                    id="organizationType"
                    value={formData.organizationType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="">Select Organization Type</option>

                    {orgTypes.map((type) => (
                      <option
                        key={type}
                        value={type}
                      >
                        {type}
                      </option>
                    ))}

                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-sm">
                    Registration Certificate
                  </label>

                  <label className="flex h-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border transition hover:border-primary hover:bg-primary/5">

                    <Upload className="mb-2 h-5 w-5 text-muted-foreground"/>

                    <span className="text-sm text-muted-foreground">
                      {certFileName || "Upload Registration Certificate"}
                    </span>

                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        setCertFileName(
                          e.target.files?.[0]?.name || ""
                        )
                      }
                    />

                  </label>

                </div>

                <div>

                  <label className="mb-2 block text-sm">
                    Organization Logo
                  </label>

                  <label className="flex h-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border transition hover:border-primary hover:bg-primary/5">

                    <Upload className="mb-2 h-5 w-5 text-muted-foreground"/>

                    <span className="text-sm text-muted-foreground">
                      {logoFileName || "Upload Organization Logo"}
                    </span>

                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        setLogoFileName(
                          e.target.files?.[0]?.name || ""
                        )
                      }
                    />

                  </label>

                </div>

                <div>

                  <label
                    htmlFor="mission"
                    className="mb-2 block text-sm"
                  >
                    Mission Statement
                  </label>

                  <textarea
                    id="mission"
                    rows="4"
                    value={formData.mission}
                    onChange={handleChange}
                    placeholder="Describe your NGO's mission..."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />

                </div>

              </div>
            </div>

            {/* Contact Information */}

            <div>

              <h3 className="mb-5 text-lg font-semibold">
                Contact Information
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 <div>
    <label htmlFor="contactPerson" className="mb-2 block text-sm">
      Contact Person
    </label>

    <div className="relative">
      <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

      <input
        id="contactPerson"
        type="text"
        value={formData.contactPerson}
        onChange={handleChange}
        placeholder="Contact Person"
        className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        required
      />
    </div>
  </div>

  <div>
    <label htmlFor="designation" className="mb-2 block text-sm">
      Designation
    </label>

    <input
      id="designation"
      type="text"
      value={formData.designation}
      onChange={handleChange}
      placeholder="Executive Director"
      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      required
    />
  </div>
</div>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2">

  <div>

    <label htmlFor="email" className="mb-2 block text-sm">
      Organization Email
    </label>

    <div className="relative">
      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

      <input
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="organization@email.com"
        className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        required
      />
    </div>

  </div>

  <div>

    <label htmlFor="phone" className="mb-2 block text-sm">
      Phone Number
    </label>

    <div className="relative">

      <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>

      <input
        id="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+91 9876543210"
        className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        required
      />

    </div>

  </div>

</div>

<div>

  <label htmlFor="website" className="mb-2 block text-sm">
    Website
    <span className="ml-1 text-muted-foreground">(Optional)</span>
  </label>

  <div className="relative">

    <Globe className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>

    <input
      id="website"
      type="url"
      value={formData.website}
      onChange={handleChange}
      placeholder="https://www.example.org"
      className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
    />

  </div>

</div>

<div>

  <label htmlFor="address" className="mb-2 block text-sm">
    Address
  </label>

  <div className="relative">

    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>

    <input
      id="address"
      type="text"
      value={formData.address}
      onChange={handleChange}
      placeholder="Street Address"
      className="w-full rounded-lg border border-border bg-background px-10 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      required
    />

  </div>

</div>

<div className="grid grid-cols-1 gap-4 md:grid-cols-3">

  <div>

    <label htmlFor="city" className="mb-2 block text-sm">
      City
    </label>

    <input
      id="city"
      type="text"
      value={formData.city}
      onChange={handleChange}
      placeholder="City"
      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      required
    />

  </div>

  <div>

    <label htmlFor="state" className="mb-2 block text-sm">
      State
    </label>

    <input
      id="state"
      type="text"
      value={formData.state}
      onChange={handleChange}
      placeholder="State"
      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      required
    />

  </div>

  <div>

    <label htmlFor="postalCode" className="mb-2 block text-sm">
      Postal Code
    </label>

    <input
      id="postalCode"
      type="text"
      value={formData.postalCode}
      onChange={handleChange}
      placeholder="560001"
      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      required
    />

  </div>

</div>

</div>

{/* Organization Categories */}

<div>

  <h3 className="mb-5 text-lg font-semibold">
    Organization Categories
  </h3>

  <div className="flex flex-wrap gap-2">

    {categoryOptions.map((category) => (

      <button
        key={category}
        type="button"
        onClick={() => toggleCategory(category)}
        className={`rounded-full px-4 py-2 text-sm transition-all ${
          selectedCategories.includes(category)
            ? "bg-primary text-primary-foreground"
            : "bg-muted hover:bg-muted/80"
        }`}
      >

        {category}

        {selectedCategories.includes(category) && (
          <X className="ml-1 inline h-3 w-3" />
        )}

      </button>

    ))}

  </div>

</div>

{/* Areas of Operation */}

<div>

  <h3 className="mb-5 text-lg font-semibold">
    Areas of Operation
  </h3>

  <div className="flex flex-wrap gap-2">

    {operationOptions.map((operation) => (

      <button
        key={operation}
        type="button"
        onClick={() => toggleOperation(operation)}
        className={`rounded-full px-4 py-2 text-sm transition-all ${
          selectedOperations.includes(operation)
            ? "bg-secondary text-secondary-foreground"
            : "bg-muted hover:bg-muted/80"
        }`}
      >

        {operation}

        {selectedOperations.includes(operation) && (
          <X className="ml-1 inline h-3 w-3" />
        )}

      </button>

    ))}

  </div>

</div> 
{/* Account Details */}

<div>
  <h3 className="mb-5 text-lg font-semibold">
    Account Details
  </h3>

  <div className="space-y-4">

    <div>

      <label
        htmlFor="password"
        className="mb-2 block text-sm"
      >
        Password
      </label>

      <div className="relative">

        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a strong password"
          className="w-full rounded-lg border border-border bg-background px-10 py-2.5 pr-12 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          required
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>

      </div>

    </div>

    <div>

      <label
        htmlFor="confirmPassword"
        className="mb-2 block text-sm"
      >
        Confirm Password
      </label>

      <div className="relative">

        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

        <input
          id="confirmPassword"
          type={showConfirm ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          className="w-full rounded-lg border border-border bg-background px-10 py-2.5 pr-12 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          required
        />

        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
        >
          {showConfirm ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>

      </div>

    </div>

    <label className="flex items-start gap-3 text-sm cursor-pointer">

      <input
        type="checkbox"
        required
        className="mt-1 h-4 w-4 accent-primary"
      />

      <span className="text-muted-foreground">
        I agree to the{" "}
        <span className="font-medium text-primary hover:underline">
          Terms & Conditions
        </span>{" "}
        and{" "}
        <span className="font-medium text-primary hover:underline">
          Privacy Policy
        </span>
      </span>

    </label>

  </div>

</div>

<button
  type="submit"
  disabled={loading}
  className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Creating Account..." : "Create NGO Account"}
</button>

</form>

<p className="mt-6 text-center text-sm text-muted-foreground">
  Already have an account?{" "}
  <Link
    to="/ngo/login"
    className="font-medium text-primary hover:underline"
  >
    Sign In
  </Link>
</p>

</div>

</div>

</div>
);
}