import React from "react";
import { useState } from "react";
// Toggle Button Component (reused in both components)
const ToggleButton = ({ isOn, onClick }) => (
  <button
    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none ${
      isOn ? "bg-blue-500" : "bg-gray-300"
    }`}
    onClick={onClick}
  >
    <div
      className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
        isOn ? "translate-x-6" : "translate-x-0"
      }`}
    />
  </button>
);

// Save Button Component (reused in both components)
const SaveButton = ({ onClick }) => (
  <div className="flex justify-end mt-4">
    <button
      onClick={onClick}
      className="bg-[#1544AB] text-white px-8 py-2 rounded-full  font-medium"
    >
      SAVE
    </button>
  </div>
);

function CommercialConsentComponent() {
  // State for toggle buttons
  const [consent, setConsent] = useState({
    telephone: true,
    email: true,
    sms: true,
    whatsapp: true,
  });

  // Function to toggle a specific consent channel
  const toggleConsent = (channel) => {
    setConsent((prev) => ({
      ...prev,
      [channel]: !prev[channel],
    }));
  };

  // Handle save button click
  const handleSave = () => {
    console.log("Saving consent preferences:", consent);
    // Here you would typically send the consent data to your backend
    alert("Consent preferences saved!");
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white font-poppins ">
      <h2 className="text-lg font-normal mb-4">
        Commercial Electronic Message Consent
      </h2>

      <div className="w-full shadow-custom-diagonal rounded-lg p-5">

      <div className="mb-4">
        <h3 className="text-base font-medium mb-2">Advert</h3>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-black max-w-md">
            I want to be informed about special campaigns, offers and
            promotions.
          </p>

          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-black mb-1">Telephone</span>
              <ToggleButton
                isOn={consent.telephone}
                onClick={() => toggleConsent("telephone")}
              />
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-black mb-1">Email</span>
              <ToggleButton
                isOn={consent.email}
                onClick={() => toggleConsent("email")}
              />
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-black mb-1">SMS</span>
              <ToggleButton
                isOn={consent.sms}
                onClick={() => toggleConsent("sms")}
              />
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-black mb-1">WhatsApp</span>
              <ToggleButton
                isOn={consent.whatsapp}
                onClick={() => toggleConsent("whatsapp")}
              />
            </div>
          </div>
        </div>
      </div>
      </div>

      <SaveButton onClick={handleSave} />
    </div>
  );
}

export default CommercialConsentComponent;
