import { useState } from "react";
import {
  FaShieldAlt,
  FaUser,
  FaLanguage,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

function ReportForm() {
  const [formData, setFormData] = useState({
    language: "",
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

    alert("Your report has been submitted successfully.");
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] py-10 px-5 font-['Inter']">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}

        <div className="bg-[#EEE8FF] p-8 text-center">

          <div className="w-15 h-15 rounded-full bg-white flex items-center justify-center mx-auto mb-5 shadow">

            <FaShieldAlt
              className="text-[#6B46C1]"
              size={38}
            />

          </div>

          <h1 className="font-['Lexend'] text-4xl font-bold text-[#1F2937]">
            Report an Incident
          </h1>

          <p className="mt-4 text-black max-w-xl mx-auto leading-relaxed">

            You are not alone. Complete this confidential form to help us
            connect you with the support services you need.

          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-8"
        >
                      {/* Personal Information */}

          <div>

            <h2 className="font-['Lexend'] text-2xl text-[#6B46C1] font-semibold mb-6">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Preferred Language */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                  <FaLanguage className="text-[#6B46C1]" />
                  Preferred Language *
                </label>

                <select
                  required
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
                >
                  <option value="">Select Language</option>
                  <option>English</option>
                  <option>Chichewa</option>
                  <option>Tumbuka</option>
                </select>
              </div>

              {/* Full Name */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                  <FaUser className="text-[#6B46C1]" />
                  Full Name
                  <span className="text-gray-400 text-sm">(Optional)</span>
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
                />
              </div>

              {/* Phone */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                  <FaPhoneAlt className="text-[#6B46C1]" />
                  Phone Number
                  <span className="text-gray-400 text-sm">(Optional)</span>
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+265..."
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
                />
              </div>

              {/* Preferred Contact */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                  <FaEnvelope className="text-[#6B46C1]" />
                  Preferred Contact Method *
                </label>

                <select
                  required
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
                >
                  <option value="">Select Contact Method</option>
                  <option>Phone Call</option>
                  <option>SMS</option>
                  <option>WhatsApp</option>
                  <option>Email</option>
                  <option>Do Not Contact Me</option>
                </select>
              </div>

              {/* District */}

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                  <FaMapMarkerAlt className="text-[#6B46C1]" />
                  District *
                </label>

                <select
                  required
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
                >
                  <option value="">Select District</option>

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

                     {/* Safety Assessment */}

          <div>

            <h2 className="font-['Lexend'] text-2xl text-[#6B46C1] font-semibold mb-6">
              Safety Assessment
            </h2>

            <div className="space-y-8">

              {/* Currently Safe */}

              <div>

                <label className="block mb-3 font-medium text-gray-700">
                  Are you currently in a safe place? *
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
                    Yes
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
                    No
                  </label>

                </div>

              </div>

              {/* Perpetrator Nearby */}

              <div>

                <label className="block mb-3 font-medium text-gray-700">
                  Is the perpetrator nearby? *
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
                    Yes
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
                    No
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
                    Unsure
                  </label>

                </div>

              </div>

            </div>

          </div>

          {/* Support Needed */}

          <div>

            <h2 className="font-['Lexend'] text-2xl text-[#6B46C1] font-semibold mb-6">
              Support Needed
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                <input
                  type="checkbox"
                  value="Safe Shelter"
                  onChange={handleCheckbox}
                  className="accent-[#6B46C1]"
                />
                Safe Shelter
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                <input
                  type="checkbox"
                  value="Medical Care"
                  onChange={handleCheckbox}
                  className="accent-[#6B46C1]"
                />
                Medical Care
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                <input
                  type="checkbox"
                  value="Counselling"
                  onChange={handleCheckbox}
                  className="accent-[#6B46C1]"
                />
                Counselling
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                <input
                  type="checkbox"
                  value="Police Assistance"
                  onChange={handleCheckbox}
                  className="accent-[#6B46C1]"
                />
                Police Assistance
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                <input
                  type="checkbox"
                  value="Legal Support"
                  onChange={handleCheckbox}
                  className="accent-[#6B46C1]"
                />
                Legal Support
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 hover:bg-[#F9F5FF] cursor-pointer">
                <input
                  type="checkbox"
                  value="Other Support"
                  onChange={handleCheckbox}
                  className="accent-[#6B46C1]"
                />
                Other Support
              </label>

            </div>

          </div> 
                    {/* Additional Information */}

          <div>

            <h2 className="font-['Lexend'] text-2xl text-[#6B46C1] font-semibold mb-6">
              Additional Information
            </h2>

            <label className="block mb-2 font-medium text-gray-700">
              Brief Description (Optional)
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Please share any information you feel comfortable providing..."
              className="w-full border border-gray-300 rounded-xl p-4 resize-none focus:ring-2 focus:ring-[#6B46C1] focus:outline-none"
            ></textarea>

          </div>

          {/* Confidentiality Notice */}

          <div className="bg-[#F9F5FF] border border-[#D8C8FF] rounded-2xl p-6">

            <h3 className="font-['Lexend'] text-lg font-semibold text-[#6B46C1] mb-2">
              Confidentiality Notice
            </h3>

            <p className="text-gray-700 leading-relaxed">
              Your information will be handled confidentially and only shared
              with authorized service providers to help you access the support
              you need. If you selected <strong>"Do Not Contact Me"</strong>,
              your report will still be received, but no follow-up communication
              will be initiated unless you choose otherwise.
            </p>

          </div>

          {/* Submit Button */}

          <button
            type="submit"
            className="w-full bg-[#2F855A] hover:bg-[#276749] text-white py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg"
          >
            Submit Report
          </button>

      </div>

    </form>
</div>
</div>
  );
}

export default ReportForm;

