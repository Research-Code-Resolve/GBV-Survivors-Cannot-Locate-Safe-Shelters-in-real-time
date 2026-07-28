import React from "react";

const PARTNERS = ["Ministry of Gender", "Police VSU", "Partner NGO"];

// Placeholders only.
export default function TrustedPartners() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
      <h2
        className="font-display font-semibold text-xl mb-4"
        style={{ color: "var(--primary-dark)" }}
      >
        Trusted Partners
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {PARTNERS.map((name) => (
          <div
            key={name}
            className="aspect-square rounded-xl border border-dashed border-black/15 flex items-center justify-center p-2"
            style={{ background: "var(--card)" }}
          >
            <span className="text-[0.7rem] text-center opacity-50 font-medium leading-tight">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
