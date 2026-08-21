import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import {
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

function ReportForm() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    contactMethod: "",
    district: "",
    safeNow: "",
    danger: "",
    supportNeeded: [],
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        supportNeeded: [...formData.supportNeeded, value],
      });
    } else {
      setFormData({
        ...formData,
        supportNeeded: formData.supportNeeded.filter(
          (item) => item !== value
        ),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert(t("reportForm.success"));
  };

  return (
    <>
      {/* Existing Header - Landing Page Header is NOT changed */}
      <Header />

      <div className="min-h-screen bg-[#F7F8FA] py-10 px-5 font-['Inter']">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Purple Form Header */}

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
            onSubmit={handleSubmit}
            className="p-8 space-y-8"
          >

            {/* Personal Information */}

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
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t("reportForm.enterName")}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
                  />
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("reportForm.phonePlaceholder")}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
                  />
                </div>

                {/* Preferred Contact */}

                <div>
                  <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                    <FaEnvelope className="text-[#4A1268]" />

                    {t("reportForm.preferredContact")} *
                  </label>

                  <select
                    required
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
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

                    <option value="Email">
                      {t("reportForm.email")}
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
                    required
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
                  >
                    <option value="">
                      {t("reportForm.selectDistrict")}
                    </option>

                    <option>Balaka</option>
                    <option>Blantyre</option>
                    <option>Chikwawa</option>
                    <option>Chiradzulu</option>
                    <option>Dedza</option>
                    <option>Dowa</option>
                    <option>Karonga</option>
                    <option>Kasungu</option>
                    <option>Likoma</option>
                    <option>Lilongwe</option>
                    <option>Machinga</option>
                    <option>Mangochi</option>
                    <option>Mchinji</option>
                    <option>Mulanje</option>
                    <option>Mwanza</option>
                    <option>Mzimba</option>
                    <option>Neno</option>
                    <option>Nkhata Bay</option>
                    <option>Nkhotakota</option>
                    <option>Nsanje</option>
                    <option>Ntcheu</option>
                    <option>Ntchisi</option>
                    <option>Phalombe</option>
                    <option>Rumphi</option>
                    <option>Salima</option>
                    <option>Thyolo</option>
                    <option>Zomba</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Safety Assessment */}

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
                        name="safeNow"
                        value="Yes"
                        checked={formData.safeNow === "Yes"}
                        onChange={handleChange}
                        className="accent-[#6B46C1]"
                      />

                      {t("reportForm.yes")}
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="safeNow"
                        value="No"
                        checked={formData.safeNow === "No"}
                        onChange={handleChange}
                        className="accent-[#6B46C1]"
                      />

                      {t("reportForm.no")}
                    </label>

                  </div>
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
                        name="danger"
                        value="Yes"
                        checked={formData.danger === "Yes"}
                        onChange={handleChange}
                        className="accent-[#6B46C1]"
                      />

                      {t("reportForm.yes")}
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="danger"
                        value="No"
                        checked={formData.danger === "No"}
                        onChange={handleChange}
                        className="accent-[#6B46C1]"
                      />

                      {t("reportForm.no")}
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="danger"
                        value="Unsure"
                        checked={formData.danger === "Unsure"}
                        onChange={handleChange}
                        className="accent-[#6B46C1]"
                      />

                      {t("reportForm.unsure")}
                    </label>

                  </div>
                </div>

              </div>
            </div>

            {/* Support Needed */}

            <div>
              <h2 className="font-['Lexend'] text-2xl text-[#4A1268] font-semibold mb-6">
                {t("reportForm.supportNeeded")}
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                  <input
                    type="checkbox"
                    value="Safe Shelter"
                    onChange={handleCheckbox}
                    className="accent-[#6B46C1]"
                  />

                  {t("reportForm.safeShelter")}
                </label>

                <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                  <input
                    type="checkbox"
                    value="Medical Care"
                    onChange={handleCheckbox}
                    className="accent-[#6B46C1]"
                  />

                  {t("reportForm.medicalCare")}
                </label>

                <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                  <input
                    type="checkbox"
                    value="Counselling"
                    onChange={handleCheckbox}
                    className="accent-[#6B46C1]"
                  />

                  {t("reportForm.counselling")}
                </label>

                <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                  <input
                    type="checkbox"
                    value="Police Assistance"
                    onChange={handleCheckbox}
                    className="accent-[#6B46C1]"
                  />

                  {t("reportForm.policeAssistance")}
                </label>

                <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                  <input
                    type="checkbox"
                    value="Legal Support"
                    onChange={handleCheckbox}
                    className="accent-[#6B46C1]"
                  />

                  {t("reportForm.legalSupport")}
                </label>

                <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                  <input
                    type="checkbox"
                    value="Other Support"
                    onChange={handleCheckbox}
                    className="accent-[#6B46C1]"
                  />

                  {t("reportForm.otherSupport")}
                </label>

              </div>
            </div>

            {/* Additional Information */}

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
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder={t("reportForm.descriptionPlaceholder")}
                className="w-full border border-gray-300 rounded-xl p-4 resize-none focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
              ></textarea>
            </div>

            {/* Confidentiality Notice */}

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

            {/* Submit Button */}

            <button
              type="submit"
              className="w-full bg-[#2F855A] hover:bg-[#276749] text-white py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg"
            >
              {t("reportForm.submit")}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default ReportForm;