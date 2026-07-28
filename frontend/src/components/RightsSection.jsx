import React from "react";
import { BookOpen, ChevronDown } from "lucide-react";

export default function RightsSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
      <h2 className="font-display font-semibold text-xl mb-4" style={{ color: "var(--primary-dark)" }}>
        Learn About Your Rights
      </h2>
      <button
        className="w-full flex items-center justify-between gap-3 p-4 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition text-left"
        style={{ background: "var(--card)" }}
      >
        <span className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 shrink-0" style={{ color: "var(--accent)" }} />
          <span className="font-medium text-sm sm:text-base">
            Know Your Legal &amp; Protection Rights
          </span>
        </span>
        <ChevronDown className="h-4 w-4 opacity-50 -rotate-90 shrink-0" />
      </button>
    </section>
  );
}
