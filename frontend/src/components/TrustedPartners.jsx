import React from "react";
import { useTranslation } from "react-i18next";

export default function TrustedPartners() {
  const { t } = useTranslation();

  const PARTNERS = [
    {
      key: "ministryGender",
      label: t("trustedPartners.partners.ministryGender"),
    },
    {
      key: "policeVsu",
      label: t("trustedPartners.partners.policeVsu"),
    },
    {
      key: "partnerNgo",
      label: t("trustedPartners.partners.partnerNgo"),
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
      <h2
        className="font-display font-semibold text-xl mb-4"
        style={{ color: "var(--primary-dark)" }}
      >
        {t("trustedPartners.title")}
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {PARTNERS.map((partner) => (
          <div
            key={partner.key}
            className="aspect-square rounded-xl border border-dashed border-black/15 flex items-center justify-center p-2"
            style={{ background: "var(--card)" }}
          >
            <span className="text-[0.7rem] text-center opacity-50 font-medium leading-tight">
              {partner.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}