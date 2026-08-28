import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import AdminHeader from "../components/AdminHeader";

const STATUS_OPTIONS = ["new", "reviewed", "escalated"];

function Field({ label, value }) {
  return (
    <div>
      <p style={{ color: "#6b7280" }} className="text-xs font-medium mb-0.5">
        {label}
      </p>
      <p style={{ color: "#1F2937" }} className="text-sm">
        {value || <span className="text-gray-400 italic">Not provided</span>}
      </p>
    </div>
  );
}

export default function AdminReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchReport() {
      const { data, error: fetchError } = await supabase
        .from("reports")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!mounted) return;
      if (fetchError || !data) {
        setError("Report not found or you don't have access.");
      } else {
        setReport(data);
      }
      setLoading(false);
    }

    fetchReport();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    const { error: updateError } = await supabase
      .from("reports")
      .update({ status: newStatus })
      .eq("id", id);

    if (!updateError) {
      setReport((r) => ({ ...r, status: newStatus }));
    }
    setUpdating(false);
  };

  const handleExportPdf = async () => {
    setExportError(null);
    setExporting(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setExportError("Your session has expired. Please sign in again.");
      setExporting(false);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/export-report-pdf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ reportId: id }),
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to generate PDF.");
      }

      // Trigger a download -- the PDF stays in memory/on-disk on the
      // staff member's device only. Nothing is sent anywhere from here.
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setExportError(err.message || "Failed to generate PDF.");
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ background: "#FAFAFA" }} className="min-h-screen">
        <AdminHeader />
        <p style={{ color: "#333333" }} className="text-center text-sm mt-10">
          Loading…
        </p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div style={{ background: "#FAFAFA" }} className="min-h-screen">
        <AdminHeader />
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p style={{ color: "#D32F2F" }} className="text-sm">
            {error}
          </p>
          <Link
            to="/admin"
            style={{ color: "#6A1B9A" }}
            className="text-sm font-semibold inline-block mt-3"
          >
            Back to reports
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAFA" }} className="min-h-screen">
      <AdminHeader />

      <main className="max-w-2xl mx-auto px-4 py-6">
        <Link
          to="/admin"
          style={{ color: "#6A1B9A" }}
          className="flex items-center gap-1.5 text-sm font-semibold mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to reports
        </Link>

        {report.danger === "Yes" && (
          <div
            style={{ background: "#FDECEA" }}
            className="flex items-center gap-2 rounded-xl p-3 mb-4"
          >
            <AlertTriangle
              className="h-4 w-4 shrink-0"
              style={{ color: "#D32F2F" }}
            />
            <p style={{ color: "#D32F2F" }} className="text-sm font-semibold">
              Perpetrator reported nearby
            </p>
          </div>
        )}

        <div
          style={{ background: "#FFFFFF" }}
          className="rounded-2xl shadow-sm p-5 space-y-5"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h1
              style={{ color: "#4A1268" }}
              className="font-['Lexend'] text-lg font-bold"
            >
              {report.district}
            </h1>
            <p style={{ color: "#6b7280" }} className="text-xs">
              {new Date(report.created_at).toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name" value={report.full_name} />
            <Field label="Phone" value={report.phone} />
            <Field label="Preferred Contact" value={report.contact_method} />
            <Field label="Currently Safe" value={report.safe_now} />
          </div>

          <div>
            <p
              style={{ color: "#6b7280" }}
              className="text-xs font-medium mb-1.5"
            >
              Support Needed
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(report.support_needed || []).length > 0 ? (
                report.support_needed.map((s) => (
                  <span
                    key={s}
                    style={{ background: "#EDE7F6", color: "#4A1268" }}
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 italic text-sm">None specified</span>
              )}
            </div>
          </div>

          <Field label="Description" value={report.description} />

          <div>
            <p
              style={{ color: "#6b7280" }}
              className="text-xs font-medium mb-1.5"
            >
              Status
            </p>
            <div className="flex gap-2 flex-wrap">
              {STATUS_OPTIONS.map((status) => {
                const active = report.status === status;
                return (
                  <button
                    key={status}
                    disabled={updating}
                    onClick={() => handleStatusChange(status)}
                    style={{
                      background: active ? "#6A1B9A" : "#F9F5FF",
                      color: active ? "#FFFFFF" : "#4A1268",
                    }}
                    className="text-xs font-semibold px-3 py-2 rounded-xl capitalize disabled:opacity-60 transition"
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* PDF is generated server-side (export-report-pdf Edge
            Function). Staff downloads it here and sends it manually --
            no auto-email, on purpose. Every export is logged. */}
        <button
          onClick={handleExportPdf}
          disabled={exporting}
          style={{ background: exporting ? "#B39DDB" : "#6A1B9A" }}
          className="w-full mt-4 text-white py-3.5 rounded-2xl font-semibold text-sm disabled:cursor-not-allowed active:scale-[0.99] transition"
        >
          {exporting ? "Generating PDF…" : "Export PDF"}
        </button>
        {exportError && (
          <p style={{ color: "#D32F2F" }} className="text-sm text-center mt-2">
            {exportError}
          </p>
        )}
      </main>
    </div>
  );
}
