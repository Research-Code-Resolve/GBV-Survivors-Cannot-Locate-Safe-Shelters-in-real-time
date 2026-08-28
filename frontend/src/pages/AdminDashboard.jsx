import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import AdminHeader from "../components/AdminHeader";

const STATUS_STYLES = {
  new: { bg: "#EDE7F6", text: "#4A1268", label: "New" },
  reviewed: { bg: "#E3F2E5", text: "#2E7D32", label: "Reviewed" },
  escalated: { bg: "#FDECEA", text: "#D32F2F", label: "Escalated" },
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.new;
  return (
    <span
      style={{ background: style.bg, color: style.text }}
      className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
    >
      {style.label}
    </span>
  );
}

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchReports() {
      const { data, error: fetchError } = await supabase
        .from("reports")
        .select(
          "id, created_at, district, safe_now, danger, support_needed, status"
        )
        .order("created_at", { ascending: false });

      if (!mounted) return;

      if (fetchError) {
        setError("Could not load reports. Please refresh.");
      } else {
        setReports(data);
      }
      setLoading(false);
    }

    fetchReports();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ background: "#FAFAFA" }} className="min-h-screen">
      <AdminHeader />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1
          style={{ color: "#4A1268" }}
          className="font-['Lexend'] text-xl font-bold mb-1"
        >
          Reports
        </h1>
        <p style={{ color: "#333333" }} className="text-sm mb-5">
          {loading ? "Loading…" : `${reports.length} report${reports.length === 1 ? "" : "s"}`}
        </p>

        {error && (
          <p style={{ color: "#D32F2F" }} className="text-sm mb-4">
            {error}
          </p>
        )}

        {!loading && reports.length === 0 && !error && (
          <div
            style={{ background: "#FFFFFF" }}
            className="rounded-2xl p-8 text-center"
          >
            <p style={{ color: "#333333" }} className="text-sm">
              No reports yet.
            </p>
          </div>
        )}

        <ul className="space-y-3">
          {reports.map((report) => {
            const inDanger = report.danger === "Yes";
            return (
              <li key={report.id}>
                <Link
                  to={`/admin/reports/${report.id}`}
                  style={{ background: "#FFFFFF" }}
                  className="flex items-center justify-between gap-3 rounded-2xl p-4 shadow-sm active:scale-[0.99] transition"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <StatusBadge status={report.status} />
                      {inDanger && (
                        <span
                          style={{ color: "#D32F2F" }}
                          className="flex items-center gap-1 text-xs font-semibold"
                        >
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Perpetrator nearby
                        </span>
                      )}
                    </div>
                    <p
                      style={{ color: "#1F2937" }}
                      className="font-medium text-[0.95rem] truncate"
                    >
                      {report.district}
                    </p>
                    <p style={{ color: "#6b7280" }} className="text-xs mt-0.5">
                      {new Date(report.created_at).toLocaleString()}
                    </p>
                  </div>
                  <ChevronRight
                    className="h-5 w-5 shrink-0"
                    style={{ color: "#6A1B9A" }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
