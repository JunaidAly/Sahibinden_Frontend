import React, { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";

const RealEstateIndex = () => {
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [neighbourhood, setNeighbourhood] = useState('');

  return (
    <div className="max-w-7xl mx-auto mt-5 ">
        <h2 className="text-xl font-medium mb-6">Most Used</h2>
      <div className="bg-white rounded-lg shadow-custom-right p-6 flex flex-col justify-center lg:flex-row gap-16">
        {/* Left Section - Form */}
        <div className="flex-1 max-w-md">
          
          
          <div className="space-y-4">
            {/* Province Dropdown */}
            <div className="relative">
              <label className="block text-sm text-black mb-1">Province</label>
              <div className="relative">
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-[#1544AB] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Province</option>
                  <option value="province1">Province 1</option>
                  <option value="province2">Province 2</option>
                </select>
                <FaCaretDown size={24}  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1544AB] pointer-events-none" />
              </div>
            </div>

            {/* District Dropdown */}
            <div className="relative">
              <label className="block text-sm text-black mb-1">District</label>
              <div className="relative">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-[#1544AB] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select District</option>
                  <option value="district1">District 1</option>
                  <option value="district2">District 2</option>
                </select>
                <FaCaretDown size={24} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1544AB] pointer-events-none" />
              </div>
            </div>

            {/* Neighbourhood Dropdown */}
            <div className="relative">
              <label className="block text-sm text-black mb-1">Neighbourhood</label>
              <div className="relative">
                <select
                  value={neighbourhood}
                  onChange={(e) => setNeighbourhood(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-[#1544AB] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Neighbourhood</option>
                  <option value="neighbourhood1">Neighbourhood 1</option>
                  <option value="neighbourhood2">Neighbourhood 2</option>
                </select>
                <FaCaretDown size={24} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1544AB] pointer-events-none" />
              </div>
            </div>

            {/* Create Index Button */}
            <button className="bg-[#1544AB] text-white px-6 py-2 rounded-full text-sm font-medium ">
              CREATE INDEX
            </button>
          </div>
        </div>

        {/* Right Section - Info and Illustration */}
        <div className="flex justify-center max-w-2xl  w-full flex-col lg:flex-row gap-4 lg:gap-8">
            <div>
          <h2 className="text-xl font-medium mb-4">REAL ESTATE INDEX</h2>
          <p className="text-sm font-normal max-w-[28rem] w-full text-black mb-2">
            With the most comprehensive Real Estate Index, you can comparatively follow current sale 
            and rental price changes, demographic information, and the districts that provide the 
            most value in the region you are interested in.
          </p>
          <a href="#" className="text-[#1544AB] text-sm">
            Detailed information
          </a>
          </div>
          
          {/* Illustration */}
          <div className="relative h-42">
            <img src="/assets/realestate/realestate.png"  className='w-56 h-56'/>
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default RealEstateIndex;