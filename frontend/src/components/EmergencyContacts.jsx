import React from "react";
import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const CONTACTS = [
  { key: "gbvLine", number: "5600" },
  { key: "childline", number: "116" },
  { key: "police", number: "997" },
];

export default function EmergencyContacts() {
  const { t } = useTranslation();

  return (
    <section
      className="py-8 sm:py-10"
      style={{ background: "var(--secondary)" }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2
          className="font-display font-semibold text-xl mb-1"
          style={{ color: "var(--primary-dark)" }}
        >
          {t("emergency.title")}
        </h2>

        <p className="text-sm opacity-70 mb-4">
          {t("emergency.instruction")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CONTACTS.map(({ key, number }) => (
            <a
              key={key}
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

                {t(`emergency.${key}`)}
              </span>

              <span
                className="font-mono font-semibold text-lg"
                style={{ color: "var(--primary-dark)" }}
              >
                {number}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}