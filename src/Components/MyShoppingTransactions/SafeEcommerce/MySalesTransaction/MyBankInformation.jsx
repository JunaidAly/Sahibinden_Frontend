

import React, { useState } from 'react';
import BankInfoForm from './BankInfoForm'; // Adjust the import path as needed

function MyBankInformation() {
  const [showBankForm, setShowBankForm] = useState(false);

  const handleAddNewBank = () => {
    setShowBankForm(true);
  };

  const handleBackToMain = () => {
    setShowBankForm(false);
  };

  // If showBankForm is true, render the BankInfoForm component
  if (showBankForm) {
    return (
      <div className="max-w-4xl w-full mx-auto">
        <BankInfoForm />
        {/* <button 
          onClick={handleBackToMain}
          className="mt-4 text-[#1544AB] underline text-sm"
        >
          Back to Bank Information
        </button> */}
      </div>
    );
  }

  // Otherwise, render the main bank information view
  return (
    <div className="max-w-4xl w-full mx-auto bg-white flex flex-col font-poppins">
      <div className='flex justify-between items-center'>
        {/* Header */}
        <h1 className="text-black text-xl font-normal text-left mb-6">
          My Bank Information
        </h1>
        {/* Button */}
        <button 
          onClick={handleAddNewBank} 
          className="bg-[#1544AB] text-white px-6 py-3 rounded-full text-sm font-medium mb-6 uppercase"
        >
          Add new bank
        </button>
      </div>
      
      <div className="text-center max-w-4xl w-full mx-auto px-6 py-20 shadow-custom-right rounded-md bg-white">
        {/* Phone Icon */}
        <div className="flex items-center justify-center mb-8">
          <img src="/assets/purchasemobile.svg" className="w-32 h-28" />
        </div>
        {/* Main Message */}
        <h2 className="text-black font-medium text-base mb-2">
          You do not have a registered account. Click to create a new account.
        </h2>
        {/* Button */}
        <button 
          onClick={handleAddNewBank}
          className="bg-[#1544AB] text-white px-6 py-3 rounded-full text-sm font-medium uppercase"
        >
          Discover Devices
        </button>
      </div>
    </div>
  );
}

export default MyBankInformation;