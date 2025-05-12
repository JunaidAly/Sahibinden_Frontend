import React, { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";
const MyCurrentOrders = () => {
  const [selectedFilter, setSelectedFilter] = useState('You Do Not Have An Order');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const orders = [
    { id: '12109', propertyType: 'Building', date: '3/20/2025', price: 'TL333' },
    { id: '12109', propertyType: 'Building', date: '3/20/2025', price: 'TL333' },
    { id: '12109', propertyType: 'Building', date: '3/20/2025', price: 'TL333' },
    { id: '12109', propertyType: 'Building', date: '3/20/2025', price: 'TL333' },
    { id: '12109', propertyType: 'Building', date: '3/20/2025', price: 'TL333' },
    { id: '12109', propertyType: 'Building', date: '3/20/2025', price: 'TL333' },
  ];

  const filterOptions = [
    'All',
    'Last 1 Week',
    'Last 1 Month',
    'Last 3 Month',
    'Last 6 Month',
    'Last 1 Year'
  ];

  return (
    <div className="max-w-4xl w-full mx-auto p-4 font-poppins">
      <div className="bg-white rounded-lg ">
        <h1 className="text-xl font-semibold p-6 border-b">My Current Orders</h1>
        
        {/* Search Section */}
        <div className="p-6">
          <div className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              placeholder="Among My Current Orders, With The Ad No."
              className="flex-1 px-4 py-2 border border-[#1544AB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 max-w-32 bg-[#1544AB] text-white rounded-full ">
              SEARCH
            </button>
          </div>

          {/* Dropdown Filter */}
          <div className="relative flex justify-end border border-[#1544AB] rounded-lg p-2">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2 max-w-72 border border-[#1544AB] rounded-lg flex items-center justify-between hover:bg-gray-50"
            >
              <span>{selectedFilter}</span>
              <FaCaretDown className="w-5 h-5 text-[#1544AB]" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-[50px] max-w-72 w-full bg-white border border-[#1544AB] rounded-lg shadow-lg z-10">
                <div className="py-1">
                  {filterOptions.map((filter) => (
                    <div 
                      key={filter}
                      className="px-4 py-2 cursor-pointer"
                      onClick={() => {
                        setSelectedFilter(filter);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {filter}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-[#CFCFCF80]">
          <table className="w-full">
            <thead>
              <tr className=" ">
                <th className="px-6 py-3 text-left text-sm font-medium text-black border-r border-white">Ad No</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black border-r border-white">Property Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black border-r border-white">Announcement Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black">Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="  ">
                  <td className="px-6 py-4 text-sm text-black border-r border-white">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-black border-r border-white">{order.propertyType}</td>
                  <td className="px-6 py-4 text-sm text-black border-r border-white">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-black">{order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCurrentOrders;