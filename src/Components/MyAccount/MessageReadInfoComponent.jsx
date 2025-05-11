import React from "react";
import { useState } from "react";


// Toggle Button Component (reused in both components)
const ToggleButton = ({ isOn, onClick }) => (
    <button 
      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none ${
        isOn ? 'bg-blue-500' : 'bg-gray-300'
      }`}
      onClick={onClick}
    >
      <div 
        className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
          isOn ? 'translate-x-6' : 'translate-x-0'
        }`} 
      />
    </button>
  );

  // Save Button Component (reused in both components)
const SaveButton = ({ onClick }) => (
    <div className="flex justify-end mt-4">
      <button 
        onClick={onClick}
        className="bg-[#1544AB] text-white px-8 py-2 rounded-full font-medium"
      >
        SAVE
      </button>
    </div>
  );

function MessageReadInfoComponent() {
  // State for the message read information toggle
  const [isMessageReadEnabled, setIsMessageReadEnabled] = useState(true);

  // Toggle message read information
  const toggleMessageRead = () => {
    setIsMessageReadEnabled(!isMessageReadEnabled);
  };

  // Handle save button click
  const handleSave = () => {
    console.log("Saving message read preferences:", { isMessageReadEnabled });
    // Here you would typically send the preference to your backend
    alert("Message read preferences saved!");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white font-poppins ">
      <h2 className="text-lg font-medium mb-5">Message Read Information</h2>
    <div className="w-full shadow-custom-diagonal rounded-lg p-5 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-base">Message Read Information</span>
        <ToggleButton isOn={isMessageReadEnabled} onClick={toggleMessageRead} />
      </div>

      <p className="text-sm text-[#888F9F] mb-4">
        People who have message read information turned on can learn whether
        their messages have been read or not. If you turn off this information
        to be sent to the person you are messaging, you can turn this setting
        off. If you turn this setting off, you will not be able to see the read
        information of the messages you have sent.
      </p>

      <SaveButton onClick={handleSave} />
    </div>
    </div>
  );
}

export default MessageReadInfoComponent;
