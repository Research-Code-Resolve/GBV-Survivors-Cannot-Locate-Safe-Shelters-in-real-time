import React from "react";
import { Home, HeartPulse, Shield, Scale } from "lucide-react";

const SERVICES = [
  { icon: Home, label: "Shelters", desc: "Safe places to stay tonight" },
  { icon: HeartPulse, label: "Health & PEP", desc: "Medical care, 72-hour PEP window" },
  { icon: Shield, label: "Police VSU", desc: "Victim Support Units" },
  { icon: Scale, label: "Legal Aid", desc: "Know your rights, get help" },
];

export default function ServicesGrid() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
      <h2 className="font-display font-semibold text-xl mb-4" style={{ color: "var(--primary-dark)" }}>
        Services Offered
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {SERVICES.map(({ icon: Icon, label, desc }) => (
          <button
            key={label}
            className="service-card text-left p-4 rounded-xl border border-black/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            style={{ background: "var(--card)" }}
          >
            <div
              className="h-9 w-9 rounded-lg flex items-center justify-center mb-2.5"
              style={{ background: "var(--secondary)" }}
            >
              <Icon className="h-5 w-5" style={{ color: "var(--accent)" }} strokeWidth={2} />
            </div>
            <p className="font-semibold text-[0.95rem] leading-tight">{label}</p>
            <p className="text-xs mt-1 opacity-70 leading-snug">{desc}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
