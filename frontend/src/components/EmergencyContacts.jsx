import React from "react";
import { Phone } from "lucide-react";

const CONTACTS = [
  { label: "GBV Line", number: "5600" },
  { label: "Childline", number: "116" },
  { label: "Police", number: "997" },
];

export default function EmergencyContacts() {
  return (
    <section className="py-8 sm:py-10" style={{ background: "var(--secondary)" }}>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-display font-semibold text-xl mb-1" style={{ color: "var(--primary-dark)" }}>
          Emergency Contacts
        </h2>
        <p className="text-sm opacity-70 mb-4">Tap a number to call directly.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CONTACTS.map(({ label, number }) => (
            <a
              key={label}
              href={`tel:${number}`}
              className="flex items-center justify-between gap-3 px-4 py-4 rounded-xl shadow-sm hover:shadow-md transition"
              style={{ background: "var(--card)" }}
            >
              <span className="flex items-center gap-2.5 font-medium text-sm">
                <span
                  className="h-9 w-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "var(--primary)" }}
                >
                  <Phone className="h-4 w-4 text-white" />
                </span>
                {label}
              </span>
              <span className="font-mono font-semibold text-lg" style={{ color: "var(--primary-dark)" }}>
                {number}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
