import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReportSchema } from "../schemas/reportSchema";
import Header from "../components/Header";
import { useMemo, useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";



function ReportForm() {
  const { t, i18n } = useTranslation();
  const [submitError, setSubmitError] = useState(null);

const reportSchema = useMemo(
  () => createReportSchema(t),
  [i18n.language]
);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      contactMethod: "",
      district: "",
      safeNow: "",
      danger: "",
      supportNeeded: [],
      description: "",
    },
  });

  const onSubmit = async (data) => {
    setSubmitError(null);

    // Map camelCase form fields to the snake_case DB columns.
    // No .select() on the insert -- the anon role has no SELECT
    // policy on this table, so requesting data back would just fail.
    const { error } = await supabase.from("reports").insert({
      full_name: data.fullName || null,
      phone: data.phone || null,
      contact_method: data.contactMethod || null,
      district: data.district,
      safe_now: data.safeNow,
      danger: data.danger,
      support_needed: data.supportNeeded,
      description: data.description || null,
    });

    if (error) {
      console.error("Report submission failed:", error);
      setSubmitError(t("reportForm.submitError"));
      return;
    }

    reset();
    alert(t("reportForm.success"));
  };

  return (
    <>
      {/* Existing Header - Landing Page Header is NOT changed */}
      <Header />

      <div className="min-h-screen bg-[#F7F8FA] py-10 px-5 font-['Inter']">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Form Header */}
          <div className="bg-[#EEE8FF] p-8 text-center">
            <h1 className="font-['Lexend'] text-4xl font-bold text-[#1F2937]">
              {t("reportForm.title")}
            </h1>

            <p className="mt-4 text-black max-w-xl mx-auto leading-relaxed">
              {t("reportForm.subtitle")}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 space-y-8"
          >

            {/* =========================
                PERSONAL INFORMATION
            ========================== */}

            <div>
              <h2 className="font-['Lexend'] text-2xl text-[#4A1268] font-semibold mb-6">
                {t("reportForm.personalInformation")}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Full Name */}
                <div>
                  <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                    <FaUser className="text-[#4A1268]" />

                    {t("reportForm.fullName")}

                    <span className="text-gray-400 text-sm">
                      {t("reportForm.optional")}
                    </span>
                  </label>

                  <input
                    type="text"
                    {...register("fullName")}
                    placeholder={t("reportForm.enterName")}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
                  />

                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                    <FaPhoneAlt className="text-[#4A1268]" />

                    {t("reportForm.phoneNumber")}

                    <span className="text-gray-400 text-sm">
                      {t("reportForm.optional")}
                    </span>
                  </label>

                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder={t("reportForm.phonePlaceholder")}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
                  />

                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Preferred Contact */}
                <div>
                  <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                    <FaEnvelope className="text-[#4A1268]" />

                    {t("reportForm.preferredContact")} *
                  </label>

                  <select
                    {...register("contactMethod")}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
                  >
                    <option value="">
                      {t("reportForm.selectContact")}
                    </option>

                    <option value="Phone Call">
                      {t("reportForm.phoneCall")}
                    </option>

                    <option value="SMS">
                      {t("reportForm.sms")}
                    </option>

                    <option value="WhatsApp">
                      {t("reportForm.whatsapp")}
                    </option>

            
                    <option value="Do Not Contact Me">
                      {t("reportForm.doNotContact")}
                    </option>
                  </select>

                  
                </div>

                {/* District */}
                <div>
                  <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                    <FaMapMarkerAlt className="text-[#4A1268]" />

                    {t("reportForm.district")} *
                  </label>

                  <select
                    {...register("district")}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
                  >
                    <option value="">
                      {t("reportForm.selectDistrict")}
                    </option>

                    <option value="Balaka">Balaka</option>
                    <option value="Blantyre">Blantyre</option>
                    <option value="Chikwawa">Chikwawa</option>
                    <option value="Chiradzulu">Chiradzulu</option>
                    <option value="Dedza">Dedza</option>
                    <option value="Dowa">Dowa</option>
                    <option value="Karonga">Karonga</option>
                    <option value="Kasungu">Kasungu</option>
                    <option value="Likoma">Likoma</option>
                    <option value="Lilongwe">Lilongwe</option>
                    <option value="Machinga">Machinga</option>
                    <option value="Mangochi">Mangochi</option>
                    <option value="Mchinji">Mchinji</option>
                    <option value="Mulanje">Mulanje</option>
                    <option value="Mwanza">Mwanza</option>
                    <option value="Mzimba">Mzimba</option>
                    <option value="Neno">Neno</option>
                    <option value="Nkhata Bay">Nkhata Bay</option>
                    <option value="Nkhotakota">Nkhotakota</option>
                    <option value="Nsanje">Nsanje</option>
                    <option value="Ntcheu">Ntcheu</option>
                    <option value="Ntchisi">Ntchisi</option>
                    <option value="Phalombe">Phalombe</option>
                    <option value="Rumphi">Rumphi</option>
                    <option value="Salima">Salima</option>
                    <option value="Thyolo">Thyolo</option>
                    <option value="Zomba">Zomba</option>
                  </select>

                  {errors.district && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.district.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* =========================
                SAFETY ASSESSMENT
            ========================== */}

            <div>
              <h2 className="font-['Lexend'] text-2xl text-[#4A1268] font-semibold mb-6">
                {t("reportForm.safetyAssessment")}
              </h2>

              <div className="space-y-8">

                {/* Currently Safe */}
                <div>
                  <label className="block mb-3 font-medium text-gray-700">
                    {t("reportForm.currentlySafe")} *
                  </label>

                  <div className="flex flex-col gap-3">

                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="Yes"
                        {...register("safeNow")}
                        className="accent-[#6B46C1]"
                      />

                      {t("reportForm.yes")}
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="No"
                        {...register("safeNow")}
                        className="accent-[#6B46C1]"
                      />

                      {t("reportForm.no")}
                    </label>
                  </div>

                  {errors.safeNow && (
                    <p className="text-red-600 text-sm mt-2">
                      {errors.safeNow.message}
                    </p>
                  )}
                </div>

                {/* Perpetrator Nearby */}
                <div>
                  <label className="block mb-3 font-medium text-gray-700">
                    {t("reportForm.perpetratorNearby")} *
                  </label>

                  <div className="flex flex-col gap-3">

                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="Yes"
                        {...register("danger")}
                        className="accent-[#6B46C1]"
                      />

                      {t("reportForm.yes")}
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="No"
                        {...register("danger")}
                        className="accent-[#6B46C1]"
                      />

                      {t("reportForm.no")}
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="Unsure"
                        {...register("danger")}
                        className="accent-[#6B46C1]"
                      />

                      {t("reportForm.unsure")}
                    </label>
                  </div>

                  {errors.danger && (
                    <p className="text-red-600 text-sm mt-2">
                      {errors.danger.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* =========================
                SUPPORT NEEDED
            ========================== */}

            <div>
              <h2 className="font-['Lexend'] text-2xl text-[#4A1268] font-semibold mb-6">
                {t("reportForm.supportNeeded")}
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                {/* Safe Shelter */}
                <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                  <input
                    type="checkbox"
                    value="Safe Shelter"
                    {...register("supportNeeded")}
                    className="accent-[#6B46C1]"
                  />

                  {t("reportForm.safeShelter")}
                </label>

                {/* Medical Care */}
                <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                  <input
                    type="checkbox"
                    value="Medical Care"
                    {...register("supportNeeded")}
                    className="accent-[#6B46C1]"
                  />

                  {t("reportForm.medicalCare")}
                </label>

                {/* Counselling */}
                <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                  <input
                    type="checkbox"
                    value="Counselling"
                    {...register("supportNeeded")}
                    className="accent-[#6B46C1]"
                  />

                  {t("reportForm.counselling")}
                </label>

                {/* Police Assistance */}
                <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                  <input
                    type="checkbox"
                    value="Police Assistance"
                    {...register("supportNeeded")}
                    className="accent-[#6B46C1]"
                  />

                  {t("reportForm.policeAssistance")}
                </label>

                {/* Legal Support */}
                <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                  <input
                    type="checkbox"
                    value="Legal Support"
                    {...register("supportNeeded")}
                    className="accent-[#6B46C1]"
                  />

                  {t("reportForm.legalSupport")}
                </label>

                {/* Other Support */}
                <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                  <input
                    type="checkbox"
                    value="Other Support"
                    {...register("supportNeeded")}
                    className="accent-[#6B46C1]"
                  />

                  {t("reportForm.otherSupport")}
                </label>
              </div>

              {errors.supportNeeded && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.supportNeeded.message}
                </p>
              )}
            </div>

            {/* =========================
                ADDITIONAL INFORMATION
            ========================== */}

            <div>
              <h2 className="font-['Lexend'] text-2xl text-[#4A1268] font-semibold mb-6">
                {t("reportForm.additionalInformation")}
              </h2>

              <label className="block mb-2 font-medium text-gray-700">
                {t("reportForm.briefDescription")}{" "}

                <span className="text-gray-400 text-sm">
                  {t("reportForm.optional")}
                </span>
              </label>

              <textarea
                {...register("description")}
                rows="5"
                placeholder={t("reportForm.descriptionPlaceholder")}
                className="w-full border border-gray-300 rounded-xl p-4 resize-none focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
              ></textarea>

              {errors.description && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* =========================
                CONFIDENTIALITY NOTICE
            ========================== */}

            <div className="bg-[#F9F5FF] border border-[#6A1B9A] rounded-2xl p-6">

              <h3 className="font-['Lexend'] text-lg font-semibold text-[#6B46C1] mb-2">
                {t("reportForm.confidentialityNotice")}
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {t("reportForm.confidentialityText")}{" "}

                <strong>
                  "{t("reportForm.doNotContact")}"
                </strong>

                {", "}

                {t("reportForm.reportReceived")}
              </p>
            </div>

            {/* =========================
                SUBMIT BUTTON
            ========================== */}

            {submitError && (
              <p className="text-red-600 text-sm text-center -mb-2">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2F855A] hover:bg-[#276749] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg"
            >
              {isSubmitting ? t("reportForm.submitting") : t("reportForm.submit")}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default ReportForm;