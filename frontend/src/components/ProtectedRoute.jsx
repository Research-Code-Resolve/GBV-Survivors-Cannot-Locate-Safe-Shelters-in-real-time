import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function ProtectedRoute({ children }) {
  const { session, isStaff, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div
        style={{ background: "#FAFAFA" }}
        className="min-h-screen flex items-center justify-center"
      >
        <p style={{ color: "#333333" }} className="text-sm">
          Loading…
        </p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isStaff) {
    return (
      <div
        style={{ background: "#FAFAFA" }}
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-sm text-center">
          <h1
            style={{ color: "#4A1268" }}
            className="text-xl font-semibold mb-2"
          >
            Access pending
          </h1>
          <p style={{ color: "#333333" }} className="text-sm mb-6">
            Your account is signed in but has not been granted staff access
            yet. Contact your team admin.
          </p>
          <button
            onClick={signOut}
            style={{ color: "#6A1B9A" }}
            className="text-sm font-semibold underline"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return children;
}
