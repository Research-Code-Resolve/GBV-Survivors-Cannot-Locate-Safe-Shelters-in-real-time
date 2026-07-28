import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HistoryHelp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-white/10 pt-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-sm font-medium hover:text-white transition"
      >
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        How to clear your browsing history safely
      </button>
      {open && (
        <div className="mt-3 text-sm text-white/70 leading-relaxed bg-white/5 rounded-lg p-4 space-y-2">
          <p>
            <span className="font-semibold text-white/90">Chrome (Android):</span> Menu (⋮) →
            History → Clear browsing data → select "History" and "Cookies" → Clear data.
          </p>
          <p>
            <span className="font-semibold text-white/90">Safari (iPhone):</span> Settings app →
            Safari → Clear History and Website Data.
          </p>
          <p className="text-white/60 text-xs pt-1">
            This clears your device's history but not your mobile network or Wi-Fi provider's
            records. If it's safer, use a friend's phone or a public library computer.
          </p>
        </div>
      )}
    </div>
  );
}
