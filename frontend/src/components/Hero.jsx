import React from "react";
import { MapPin, FileText, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="max-w-4xl mx-auto px-4 pt-10 pb-8 sm:pt-14 sm:pb-12">
      <div className="fade-up fade-up-1 text-center">
        <p
          className="inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-4"
          style={{
            background: "var(--secondary)",
            color: "var(--primary-dark)",
          }}
        >
          {t("hero.location")}
        </p>

        <h1
          className="font-display font-semibold leading-tight text-[1.85rem] sm:text-4xl"
          style={{ color: "var(--primary-dark)" }}
        >
          {t("hero.title")}
        </h1>

        <p
          className="font-display font-medium text-lg sm:text-xl mt-1"
          style={{ color: "var(--text)" }}
        >
          {t("hero.subtitle")}
        </p>
      </div>

      <div className="fade-up fade-up-2 mt-7 flex flex-col gap-3 max-w-sm mx-auto">
        <button
          className="w-full flex items-center justify-center gap-2 text-white font-semibold text-[1.05rem] py-4 rounded-xl shadow-md hover:opacity-95 active:scale-[0.98] transition"
          style={{ background: "var(--primary)" }}
        >
          <MapPin className="h-5 w-5" />
          {t("hero.findShelters")}
        </button>

        <button
          className="w-full flex items-center justify-center gap-2 font-semibold text-[1.05rem] py-4 rounded-xl border-2 hover:bg-black/2 active:scale-[0.98] transition"
          style={{
            borderColor: "var(--accent)",
            color: "var(--accent)",
          }}
        >
          <FileText className="h-5 w-5" />
          <Link to="/form">{t("hero.anonymousReport")}</Link>
        </button>
      </div>

      <div
        className="hero-note fade-up fade-up-3 mt-6 max-w-sm mx-auto flex items-center gap-2.5 justify-center text-sm font-medium px-4 py-3 rounded-lg"
        style={{
          background: "var(--secondary)",
          color: "var(--primary-dark)",
        }}
      >
        <Lock className="h-4 w-4 shrink-0" />
        {t("hero.privacyNotice")}
      </div>
    </section>
  );
}