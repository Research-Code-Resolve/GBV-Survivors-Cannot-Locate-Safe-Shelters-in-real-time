import { BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function RightsSection() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const rights = [
    "safety",
    "dignity",
    "confidentiality",
    "choice",
    "nonDiscrimination",
    "medical",
    "psychosocial",
    "legal",
    "supportServices",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 sm:py-10">

      <h2
        className="font-display font-semibold text-xl mb-4"
        style={{ color: "var(--primary-dark)" }}
      >
        {t("rightsSection.title")}
      </h2>

      <div
        className="w-full rounded-xl border border-black/5 shadow-sm overflow-hidden"
        style={{ background: "var(--card)" }}
      >

        {/* Dropdown Header */}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="w-full flex items-center justify-between gap-3 p-4 hover:shadow-md transition text-left"
        >

          <span className="flex items-center gap-3">

            <BookOpen
              className="h-5 w-5 shrink-0"
              style={{ color: "var(--accent)" }}
            />

            <span className="font-medium text-sm sm:text-base">
              {t("rightsSection.legalProtectionRights")}
            </span>

          </span>

          <ChevronDown
            className={`h-5 w-5 opacity-60 shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />

        </button>

        {/* Rights */}

        {isOpen && (
          <div className="border-t border-black/5 px-4 pb-5">

            <div className="space-y-4 pt-4">

              {rights.map((right) => (
                <div
                  key={right}
                  className="rounded-lg bg-[#F9F5FF] p-4"
                >

                  <h3 className="font-semibold text-sm sm:text-base mb-2">
                    {t(`rightsSection.rights.${right}.title`)}
                  </h3>

                  <p className="text-sm leading-relaxed opacity-80">
                    {t(`rightsSection.rights.${right}.description`)}
                  </p>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>

    </section>
  );
}