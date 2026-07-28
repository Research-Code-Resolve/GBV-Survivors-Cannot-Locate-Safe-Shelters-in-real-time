import React from "react";
import AccessibilityControls from "./AccessibilityControls";
import HistoryHelp from "./HistoryHelp";

export default function Footer({ textScale, onCycleTextScale, highContrast, onToggleContrast }) {
  return (
    <footer style={{ background: "var(--primary-dark)" }} className="text-white/80 mt-4">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AccessibilityControls
          textScale={textScale}
          onCycleTextScale={onCycleTextScale}
          highContrast={highContrast}
          onToggleContrast={onToggleContrast}
        />

        <HistoryHelp />

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mt-5 pt-5 border-t border-white/10">
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition">
            Contact Us (Non-Emergency)
          </a>
        </div>

        <p className="text-xs text-white/40 mt-6">
          © {new Date().getFullYear()} Safe Haven Malawi.
        </p>
      </div>
    </footer>
  );
}
