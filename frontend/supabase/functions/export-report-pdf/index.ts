// Supabase Edge Function: export-report-pdf
//
// Generates a clean PDF for a single report, server-side. This is
// deliberately NOT client-side html2pdf pulling raw rows into the
// browser -- the browser only ever receives the finished PDF bytes,
// and only after we've verified the caller is an authenticated,
// approved staff member.
//
// This function does NOT send anything anywhere. It returns PDF
// bytes to the caller, who downloads them. Sending to authorities is
// a manual, separate action outside this function, on purpose.
//
// Deploy with: supabase functions deploy export-report-pdf
// Requires the same SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY secrets
// as staff-signup.

import { createClient } from "npm:@supabase/supabase-js@2";
import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

function wrapText(text, font, size, maxWidth) {
  const words = (text || "").split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const trial = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(trial, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = trial;
    }
  }
  if (current) lines.push(current);
  return lines;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const authHeader = req.headers.get("Authorization") || "";
    const jwt = authHeader.replace("Bearer ", "");

    if (!jwt) {
      return new Response(JSON.stringify({ error: "Not authenticated." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { reportId } = await req.json();
    if (!reportId) {
      return new Response(
        JSON.stringify({ error: "reportId is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // A client scoped to the caller's own JWT -- used only to verify
    // who they are. We do not use this client to read the report,
    // to avoid depending solely on RLS for the staff check here.
    const callerClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await callerClient.auth.getUser(jwt);

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Not authenticated." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // service_role client for the actual work -- explicit staff check
    // below, not just relying on RLS, so this function is safe even
    // if a policy is ever misconfigured.
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data: staffProfile } = await admin
      .from("staff_profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (!staffProfile) {
      return new Response(
        JSON.stringify({ error: "You do not have staff access." }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const { data: report, error: reportError } = await admin
      .from("reports")
      .select("*")
      .eq("id", reportId)
      .maybeSingle();

    if (reportError || !report) {
      return new Response(JSON.stringify({ error: "Report not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // --- Build the PDF ---
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const margin = 50;
    const pageWidth = 595.28;
    const contentWidth = pageWidth - margin * 2;
    let y = 841.89 - margin;

    const purple = rgb(0x6a / 255, 0x1b / 255, 0x9a / 255);
    const gray = rgb(0.2, 0.2, 0.2);
    const lightGray = rgb(0.45, 0.45, 0.45);

    function drawHeading(text) {
      page.drawText(text, {
        x: margin,
        y,
        size: 18,
        font: boldFont,
        color: purple,
      });
      y -= 26;
    }

    function drawSubline(text) {
      page.drawText(text, {
        x: margin,
        y,
        size: 9,
        font,
        color: lightGray,
      });
      y -= 20;
    }

    function drawFieldLabel(text) {
      page.drawText(text.toUpperCase(), {
        x: margin,
        y,
        size: 8,
        font: boldFont,
        color: lightGray,
      });
      y -= 12;
    }

    function drawFieldValue(text) {
      const lines = wrapText(text || "Not provided", font, 11, contentWidth);
      for (const line of lines) {
        page.drawText(line, { x: margin, y, size: 11, font, color: gray });
        y -= 15;
      }
      y -= 8;
    }

    drawHeading("GBV Incident Report");
    drawSubline(
      `Report ID: ${report.id}  |  Submitted: ${new Date(
        report.created_at
      ).toLocaleString()}  |  Status: ${report.status}`
    );

    page.drawLine({
      start: { x: margin, y },
      end: { x: pageWidth - margin, y },
      thickness: 1,
      color: rgb(0.85, 0.85, 0.85),
    });
    y -= 20;

    if (report.danger === "Yes") {
      page.drawRectangle({
        x: margin,
        y: y - 22,
        width: contentWidth,
        height: 26,
        color: rgb(0.99, 0.93, 0.92),
      });
      page.drawText("⚠ PERPETRATOR REPORTED NEARBY", {
        x: margin + 10,
        y: y - 16,
        size: 10,
        font: boldFont,
        color: rgb(0.83, 0.18, 0.18),
      });
      y -= 40;
    }

    drawFieldLabel("Full Name");
    drawFieldValue(report.full_name);

    drawFieldLabel("Phone");
    drawFieldValue(report.phone);

    drawFieldLabel("Preferred Contact Method");
    drawFieldValue(report.contact_method);

    drawFieldLabel("District");
    drawFieldValue(report.district);

    drawFieldLabel("Currently Safe");
    drawFieldValue(report.safe_now);

    drawFieldLabel("Support Needed");
    drawFieldValue(
      (report.support_needed || []).length
        ? report.support_needed.join(", ")
        : "None specified"
    );

    drawFieldLabel("Description");
    drawFieldValue(report.description);

    page.drawText(
      "Confidential -- contains sensitive personal information. Handle in accordance with your organization's data protection policy.",
      {
        x: margin,
        y: 40,
        size: 7.5,
        font,
        color: lightGray,
      }
    );

    const pdfBytes = await pdfDoc.save();

    // Log the export -- who, which report, when. Insert-only table,
    // written here with service_role so it can't be bypassed or
    // altered from the client.
    await admin.from("report_export_log").insert({
      report_id: report.id,
      exported_by: user.id,
    });

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="report-${report.id}.pdf"`,
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Unexpected error generating PDF." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
