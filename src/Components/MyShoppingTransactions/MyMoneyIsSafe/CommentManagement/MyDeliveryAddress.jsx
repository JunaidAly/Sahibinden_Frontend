import React, { useState } from 'react';
import DeliveryBillingForm from './DeliveryBillingForm';

function MyDeliveryAddress() {
    const [showAddressForm, setShowAddressForm] = useState(false);

    const handleAddNewAddress = () => {
      setShowAddressForm(true);
    };
  
    const handleBackToMain = () => {
      setShowAddressForm(false);
    };
  
    // If Address Form is true, render the BankInfoForm component
    if (showAddressForm) {
      return (
        <div className="max-w-4xl w-full mx-auto">
            <DeliveryBillingForm />
          {/* <button 
            onClick={handleBackToMain}
            className="mt-4 text-[#1544AB] underline text-sm"
          >
            Back to Bank Information
          </button> */}
        </div>
      );
    }
  return (
    <div className="max-w-4xl w-full mx-auto bg-white flex flex-col font-poppins">
    <div className='flex justify-between items-center'>
      {/* Header */}
      <h1 className="text-black text-xl font-normal text-left mb-6">
        My Delivery /  Billing Addresses
      </h1>
      {/* Button */}
      <button 
        onClick={handleAddNewAddress} 
        className="bg-[#1544AB] text-white px-6 py-3 rounded-full text-sm font-medium mb-6 uppercase"
      >
         Add new address
      </button>
    </div>
    
    <div className="text-center max-w-4xl w-full mx-auto px-6 py-20 shadow-custom-right rounded-md bg-white">
      {/* Phone Icon */}
      <div className="flex items-center justify-center mb-8">
        <img src="/assets/purchasemobile.svg" className="w-32 h-28" />
      </div>
      {/* Main Message */}
      <h2 className="text-black font-medium text-base mb-2">
         You do not have a registered address. Click to create a new address .
      </h2>
      {/* Button */}
      <button 
        onClick={handleAddNewAddress}
        className="bg-[#1544AB] text-white px-6 py-3 rounded-full text-sm font-medium uppercase"
      >
         Create NEW address
      </button>
    </div>
  </div>
  )
}

export default MyDeliveryAddress