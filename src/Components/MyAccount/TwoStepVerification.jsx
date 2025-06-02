// import React from 'react'

// function TwoStepVerification() {
//   return (
//     <div className="max-w-4xl w-full mx-auto font-poppins">
//       <h1 className="text-xl font-medium text-black">2 Step Verification</h1>
//       <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
//         <p className="text-lg text-black font-normal">
//           When I log in from a new device, I would like to receive a
//           verification code sent to my mobile phone or email address in addition
//           to my password.
//         </p>

//         <button
//           type="button"
//           className="px-5 py-2 mt-2 bg-[#1544AB] text-white font-medium rounded-full"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TwoStepVerification



import React, { useState } from 'react';

function TwoStepVerification() {
  const [twoStepEnabled, setTwoStepEnabled] = useState(false);

  const handleToggle = () => {
    setTwoStepEnabled(!twoStepEnabled);
  };

  const handleSave = () => {
    // Here you can add your save functionality
    console.log('Two-step verification:', twoStepEnabled ? 'enabled' : 'disabled');
    
    // Example: Save to Firebase, localStorage, or make API call
    // localStorage.setItem('twoStepVerification', JSON.stringify(twoStepEnabled));
    
    alert(`Two-step verification ${twoStepEnabled ? 'enabled' : 'disabled'} successfully!`);
  };

  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">2 Step Verification</h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className="text-lg text-black font-normal">
              When I log in from a new device, I would like to receive a
              verification code sent to my mobile phone or email address in addition
              to my password.
            </p>
          </div>
          
          {/* Toggle Button */}
          <div className="flex items-center">
            <button
              onClick={handleToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1544AB] focus:ring-offset-2 ${
                twoStepEnabled ? 'bg-[#1544AB]' : 'bg-gray-300'
              }`}
            >
              <span className="sr-only">Enable two-step verification</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoStepEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-3">
            Status: <span className={`font-medium ${twoStepEnabled ? 'text-green-600' : 'text-red-600'}`}>
              {twoStepEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </p>
          
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-[#1544AB] text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TwoStepVerification;