import React from 'react';

const DevicePurchasePageAlt = () => {
  return (
    <div className=" max-w-4xl w-full mx-auto bg-white flex flex-col  font-poppins ">
        {/* Header */}
        <h1 className="text-black text-xl font-normal text-left mb-6">What I Got with Yepy</h1>
        <div className="text-center max-w-4xl w-full mx-auto px-6 py-20 shadow-custom-right rounded-md bg-white">
        
        
        {/* Phone Icon */}
        <div className="flex items-center justify-center mb-8">
            <img src='/assets/purchasemobile.svg' className="w-32 h-28 "/>
        </div>
        
        {/* Main Message */}
        <h2 className="text-black font-medium text-base mb-2">
          You Do Not Have A Device You Purchased
        </h2>
        
        {/* Sub Message */}
        <p className="text-gray-500 text-sm mb-8">
          You Can View The Devices You Will Purchase With Yepy On This Page.
        </p>
        
        {/* Button */}
        <button className="bg-[#1544AB] text-white px-6 py-3 rounded-full text-sm font-medium  uppercase">
          Discover Devices
        </button>
      </div>
    </div>
  );
};

export default DevicePurchasePageAlt;