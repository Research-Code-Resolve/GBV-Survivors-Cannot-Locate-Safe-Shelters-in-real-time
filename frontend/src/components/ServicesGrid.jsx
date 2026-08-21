import React from "react";
import { Home, HeartPulse, Shield, Scale } from "lucide-react";
import { useTranslation } from "react-i18next";

const SERVICES = [
  {
    icon: Home,
    label: "shelters",
  },
  {
    icon: HeartPulse,
    label: "healthPep",
  },
  {
    icon: Shield,
    label: "policeVsu",
  },
  {
    icon: Scale,
    label: "legalAid",
  },
];

export default function ServicesGrid() {
  const { t } = useTranslation();

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
      <h2
        className="font-display font-semibold text-xl mb-4"
        style={{ color: "var(--primary-dark)" }}
      >
        {t("services.title")}
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {SERVICES.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="service-card text-left p-4 rounded-xl border border-black/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            style={{ background: "var(--card)" }}
          >
            <div
              className="h-9 w-9 rounded-lg flex items-center justify-center mb-2.5"
              style={{ background: "var(--secondary)" }}
            >
              <Icon
                className="h-5 w-5"
                style={{ color: "var(--accent)" }}
                strokeWidth={2}
              />
            </div>

            <p className="font-semibold text-[0.95rem] leading-tight">
              {t(`services.${label}.label`)}
            </p>

            <p className="text-xs mt-1 opacity-70 leading-snug">
              {t(`services.${label}.description`)}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}