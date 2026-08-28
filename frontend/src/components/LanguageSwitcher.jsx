import React, { useState } from "react";
import { Globe, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../constants";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  const currentLanguage = LANGUAGES.find(
    ({ code }) => code === i18n.language
  );

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-sm font-medium px-2.5 py-1.5 rounded-md hover:bg-black/5 transition-colors"
        style={{ color: "var(--text)" }}
        aria-label={t("language.select")}
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" />
        {currentLanguage?.code || "EN"}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          <div
            className="absolute right-0 top-full mt-1.5 w-44 rounded-lg shadow-lg border border-black/5 overflow-hidden z-50"
            style={{ background: "var(--card)" }}
          >
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className="w-full flex items-center justify-between gap-2 text-left text-sm px-3.5 py-2.5 hover:bg-black/5 transition-colors"
                style={{ color: "var(--text)" }}
              >
                {label}

                {i18n.language === code && (
                  <Check
                    className="h-4 w-4 shrink-0"
                    style={{ color: "var(--accent)" }}
                  />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}