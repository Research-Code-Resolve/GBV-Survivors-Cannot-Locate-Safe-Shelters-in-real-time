import { Shield, LogOut } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <header
      style={{ background: "#FFFFFF" }}
      className="sticky top-0 z-40 border-b border-black/5 shadow-sm"
    >
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            style={{ background: "#6A1B9A" }}
            className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center"
          >
            <Shield className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span
            style={{ color: "#4A1268" }}
            className="font-['Lexend'] font-semibold text-[1.05rem] truncate"
          >
            Reports Dashboard
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span
            style={{ color: "#333333" }}
            className="hidden sm:inline text-sm truncate max-w-[160px]"
          >
            {session?.user?.email}
          </span>
          <button
            onClick={handleSignOut}
            style={{ color: "#6A1B9A" }}
            className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-md hover:bg-gray-50 active:scale-95 transition"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
