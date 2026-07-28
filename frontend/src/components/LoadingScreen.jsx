import React from "react";
import { Shield } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div
      className="loader-overlay fixed inset-0 z-50 flex flex-col items-center justify-center gap-3"
      style={{ background: "var(--bg)" }}
      aria-hidden="true"
    >
      <div className="relative h-12 w-12 flex items-center justify-center">
        <span
          className="absolute inset-0 rounded-xl"
          style={{ background: "var(--primary)", animation: "pulseRing 1.1s ease-out infinite" }}
        />
        <span
          className="relative h-12 w-12 rounded-xl flex items-center justify-center"
          style={{ background: "var(--primary)" }}
        >
          <Shield className="h-6 w-6 text-white" strokeWidth={2.5} />
        </span>
      </div>
      <p className="font-display text-sm font-medium" style={{ color: "var(--primary-dark)" }}>
        Safe Haven Malawi
      </p>
    </div>
  );
}
