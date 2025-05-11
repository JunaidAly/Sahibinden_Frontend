import { useState } from "react";

const NotificationPreferences = () => {
  // Initial state for all toggle buttons (true = on, false = off)
  const [preferences, setPreferences] = useState({
    // Advert section
    advert: {
      1: { insite: true, email: true }, // Notify me while the ad is awaiting approval
      2: { insite: true, email: true }, // Notify me when the ad date is updated
      3: { insite: true, email: true }, // Notify me when the ad is published
      4: { insite: true, email: true }, // Notify me when ad is rejected
      5: { insite: true, email: true }, // Let me know 3 days before my ad expires
      6: { insite: true, email: true }, // Notify me when the ad publication period ends
      7: { insite: true, email: true }, // Notify me when I remove the ad from publication
      8: { insite: true, email: true }, // Notify me when doping is applied to the ad
      9: { insite: true, email: true }, // Notify me when the doping period of the ad expires
      10: { insite: true, email: true }, // Notify me 7 days after my ad's publication period ends
      11: { insite: true, email: true }, // Notify me when I receive a message from another user regarding my ad
      12: { insite: true, email: true }, // If I have an ad that is left unfinished, let me know
      13: { insite: true, email: true }, // Notify me when a buyer asks a question about my listing
      14: { insite: true, email: true }, // Notify me when a question I asked about an ad is answered
    },
    // Get section (selling/buying)
    get: {
      1: { insite: true, email: true }, // Notify me when my item is sold
      2: { insite: true, email: true }, // Notify me when the shipping sales contract is sent
      3: { insite: true, email: true }, // Let me know if the product I sell is not approved
      4: { insite: true, email: true }, // Notify me when the shipping information entry period for the product I sell has passed
      5: { insite: true, email: true }, // Notify me when the sale of the product I am selling is completed
      6: { insite: true, email: true }, // If shipping approval is not given for my product within the specified time, please notify me
      7: { insite: true, email: true }, // Notify me when the GET transaction of the product I am selling is confirmed
      8: { insite: true, email: true }, // Notify me when my payment for the product I purchased is confirmed
      9: { insite: true, email: true }, // Notify me when my payment for the product I purchased is refunded
      10: { insite: true, email: true }, // Notify me when the seller's shipping period ends for the product I purchased
      11: { insite: true, email: true }, // Notify me when the seller is given an additional 24 hours to enter shipping information for the product I purchased
      12: { insite: true, email: true }, // Notify me when the seller cancels the sale for the item I purchased
      13: { insite: true, email: true }, // Notify me when the approval period for the product I purchased has expired
      14: { insite: true, email: true }, // Notify me when the product I purchased is shipped to my address
      15: { insite: true, email: true }, // Notify me when I approve the transaction for my purchase
      16: { insite: true, email: true }, // Notify me when I initiate the return process for the product I purchased
      17: { insite: true, email: true }, // Notify me when I receive the product I purchased from the contracted cargo company
      18: { insite: true, email: true }, // Notify me when the product I sell is delivered to the buyer via contracted cargo
    },
    // Favorites section
    favorites: {
      1: { insite: true, email: true }, // Notify me when the price of my favorite listing drops
      2: { insite: true, email: true }, // Notify me when my favorite listing drops below the price I set
      3: { insite: true, email: true }, // Notify me about my favorite search results
      4: { insite: true, email: true }, // Notify me of my favorite seller results
    },
  });

  // Function to toggle a specific preference
  const togglePreference = (section, id, type) => {
    setPreferences((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [id]: {
          ...prevState[section][id],
          [type]: !prevState[section][id][type],
        },
      },
    }));
  };

  // Handle save button click
  const handleSave = () => {
    console.log("Saving preferences:", preferences);
    // Here you would typically send the preferences to your backend
    alert("Preferences saved!");
  };

  // Function to render a toggle button
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

  // Render preference item
  const renderPreferenceItem = (section, id, text) => (
    <div className="flex items-center justify-between py-2 ">
      <div className="flex-1 pr-4">
        <p className="text-sm text-black">{`${id}. ${text}`}</p>
      </div>
      <div className="flex items-center space-x-8">
        <ToggleButton
          isOn={preferences[section][id].insite}
          onClick={() => togglePreference(section, id, "insite")}
        />
        <ToggleButton
          isOn={preferences[section][id].email}
          onClick={() => togglePreference(section, id, "email")}
        />
      </div>
    </div>
  );

  // Advert notification texts
  const advertTexts = {
    1: "Notify me while the ad is awaiting approval.",
    2: "Notify me when the ad date is updated.",
    3: "Notify me when the ad is published.",
    4: "Notify me when ad is rejected.",
    5: "Let me know 3 days before my ad expires.",
    6: "Notify me when the ad publication period ends.",
    7: "Notify me when I remove the ad from publication.",
    8: "Notify me when doping is applied to the ad.",
    9: "Notify me when the doping period of the ad expires.",
    10: "Notify me 7 days after my ad's publication period ends.",
    11: "Notify me when I receive a message from another user regarding my ad.",
    12: "If I have an ad that is left unfinished, let me know.",
    13: "Notify me when a buyer asks a question about my listing.",
    14: "Notify me when a question I asked about an ad is answered.",
  };

  // Get notification texts
  const getTexts = {
    1: "Notify me when my item is sold.",
    2: "Notify me when the shipping sales contract is sent.",
    3: "Let me know if the product I sell is not approved.",
    4: "Notify me when the shipping information entry period for the product I sell has passed.",
    5: "Notify me when the sale of the product I am selling is completed.",
    6: "If shipping approval is not given for my product within the specified time, please notify me.",
    7: "Notify me when the GET transaction of the product I am selling is confirmed.",
    8: "Notify me when my payment for the product I purchased is confirmed.",
    9: "Notify me when my payment for the product I purchased is refunded.",
    10: "Notify me when the seller's shipping period ends for the product I purchased.",
    11: "Notify me when the seller is given an additional 24 hours to enter shipping information for the product I purchased.",
    12: "Notify me when the seller cancels the sale for the item I purchased.",
    13: "Notify me when the approval period for the product I purchased has expired.",
    14: "Notify me when the product I purchased is shipped to my address.",
    15: "Notify me when I approve the transaction for my purchase.",
    16: "Notify me when I initiate the return process for the product I purchased.",
    17: "Notify me when I receive the product I purchased from the contracted cargo company.",
    18: "Notify me when the product I sell is delivered to the buyer via contracted cargo.",
  };

  // Favorites notification texts
  const favoritesTexts = {
    1: "Notify me when the price of my favorite listing drops.",
    2: "Notify me when my favorite listing drops below the price I set.",
    3: "Notify me about my favorite search results.",
    4: "Notify me of my favorite seller results.",
  };

  return (
    <div className="max-w-4xl mx-auto  font-poppins bg-white">
      <h2 className="text-xl font-normal mb-4">Notification Preferences</h2>
      <div className="w-full p-5 rounded-lg shadow-custom-diagonal">
        {/* Advert Section */}
        <div className="mb-8">
          <div className="mb-2">
            <h3 className="text-lg font-medium mb-3">Advert</h3>

            <div className="flex mb-2 pr-2">
              <div className="flex-1"></div>
              <div className="flex items-center space-x-8">
                <span className="w-12 text-center text-sm font-medium">
                  Insite
                </span>
                <span className="w-12 text-center text-sm font-medium">
                  Email
                </span>
              </div>
            </div>

            {Object.entries(advertTexts).map(([key, text]) =>
              renderPreferenceItem("advert", key, text)
            )}
          </div>
        </div>

        {/* Get Section */}
        <div className="mb-8">
          <div className="mb-2">
            <h3 className="text-lg font-medium mb-3">Get</h3>

            <div className="flex mb-2 pr-2">
              <div className="flex-1"></div>
              <div className="flex items-center space-x-8">
                <span className="w-12 text-center text-sm font-medium">
                  Insite
                </span>
                <span className="w-12 text-center text-sm font-medium">
                  Email
                </span>
              </div>
            </div>

            {Object.entries(getTexts).map(([key, text]) =>
              renderPreferenceItem("get", key, text)
            )}
          </div>
        </div>

        {/* Favorites Section */}
        <div className="mb-8">
          <div className="mb-2">
            <h3 className="text-lg font-medium mb-3">Favorites</h3>

            <div className="flex mb-2 pr-2">
              <div className="flex-1"></div>
              <div className="flex items-center space-x-8">
                <span className="w-12 text-center text-sm font-medium">
                  Insite
                </span>
                <span className="w-12 text-center text-sm font-medium">
                  Email
                </span>
              </div>
            </div>

            {Object.entries(favoritesTexts).map(([key, text]) =>
              renderPreferenceItem("favorites", key, text)
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="bg-[#1544AB] text-white px-8 py-2 rounded-full "
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
