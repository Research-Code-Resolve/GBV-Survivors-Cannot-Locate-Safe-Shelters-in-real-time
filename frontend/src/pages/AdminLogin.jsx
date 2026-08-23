import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSubmitting(false);

    if (signInError) {
      setError("Incorrect email or password.");
      return;
    }

    navigate("/admin");
  };

  return (
    <div
      style={{ background: "#FAFAFA" }}
      className="min-h-screen flex flex-col items-center justify-center px-5 py-10"
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div
            style={{ background: "#6A1B9A" }}
            className="h-12 w-12 rounded-xl flex items-center justify-center mb-3"
          >
            <Shield className="h-6 w-6 text-white" strokeWidth={2.5} />
          </div>
          <h1
            style={{ color: "#4A1268" }}
            className="font-['Lexend'] text-2xl font-bold"
          >
            Staff Sign In
          </h1>
          <p style={{ color: "#333333" }} className="text-sm mt-1 text-center">
            Safe Haven Malawi — reports dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ background: "#FFFFFF" }}
          className="rounded-2xl shadow-md p-6 space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              style={{ color: "#333333" }}
              className="block text-sm font-medium mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 text-base focus:ring-2 focus:outline-none"
              style={{ "--tw-ring-color": "#6A1B9A" }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{ color: "#333333" }}
              className="block text-sm font-medium mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 text-base focus:ring-2 focus:outline-none"
              style={{ "--tw-ring-color": "#6A1B9A" }}
            />
          </div>

          {error && (
            <p style={{ color: "#D32F2F" }} className="text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{ background: "#6A1B9A" }}
            className="w-full text-white py-3.5 rounded-xl font-semibold text-base disabled:opacity-60 active:scale-[0.98] transition"
          >
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p style={{ color: "#333333" }} className="text-sm text-center mt-6">
          Have a staff access code?{" "}
          <Link
            to="/admin/signup"
            style={{ color: "#6A1B9A" }}
            className="font-semibold"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
