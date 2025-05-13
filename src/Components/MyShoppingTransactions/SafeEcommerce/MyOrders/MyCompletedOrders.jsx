import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

function MyCompletedOrders() {
     const [selectedFilter, setSelectedFilter] = useState(
        ""
      );
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
      const orders = [
        {
          id: "12109",
          propertyType: "Building",
          date: "3/20/2025",
          price: "TL333",
        },
        {
          id: "12109",
          propertyType: "Building",
          date: "3/20/2025",
          price: "TL333",
        },
        {
          id: "12109",
          propertyType: "Building",
          date: "3/20/2025",
          price: "TL333",
        },
        {
          id: "12109",
          propertyType: "Building",
          date: "3/20/2025",
          price: "TL333",
        },
        {
          id: "12109",
          propertyType: "Building",
          date: "3/20/2025",
          price: "TL333",
        },
        {
          id: "12109",
          propertyType: "Building",
          date: "3/20/2025",
          price: "TL333",
        },
      ];
    
      const filterOptions = [
        "All",
        "Last 1 Week",
        "Last 1 Month",
        "Last 3 Month",
        "Last 6 Month",
        "Last 1 Year",
      ];
  return (
    <div className="max-w-4xl w-full mx-auto p-4 font-poppins">
          <div className="bg-white rounded-lg ">
            <h1 className="text-xl font-semibold ">
               My Completed Orders
            </h1>
    
            {/* Search Section */}
            <div className="py-4">
              <div className="flex flex-col gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Among the products i purchased, there are advertisement no."
                  className="flex-1 px-4 py-4 border border-[#1544AB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-6 py-2 max-w-32 bg-[#1544AB] text-white rounded-full ">
                  SEARCH
                </button>
              </div>
    
              {/* Dropdown Filter */}
              <div className="relative flex justify-between items-center border border-[#1544AB] rounded-lg p-2">
                <h1>You do not have any completed Orders.</h1>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-2 max-w-72 border border-[#1544AB] rounded-lg flex items-center justify-between hover:bg-gray-50"
                >
                  <span>{selectedFilter}</span>
                  <FaCaretDown size={24} className="text-[#1544AB]" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-[50px] right-2 max-w-72 w-full bg-white border border-[#1544AB] rounded-lg shadow-lg z-10">
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
            <div className="overflow-x-auto max-w-4xl w-full mx-auto bg-[#CFCFCF80] p-2">
              <table
                className="w-full border-separate"
                style={{ borderSpacing: "8px 8px" }}
              >
                <thead>
                  <tr className="w-full">
                    <th className="px-6 py-3 text-center text-sm font-medium text-black border-r-[1px] border-white">
                      Ad No
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-black border-r-[1px] border-white">
                      Property Type
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-black border-r-[1px] border-white">
                      Announcement Date
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-black">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-6 py-4 text-sm text-black border-r-[1px] border-white">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-black border-r-[1px] border-white">
                        {order.propertyType}
                      </td>
                      <td className="px-6 py-4 text-sm text-black border-r-[1px] border-white">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-black">
                        {order.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  )
}

export default MyCompletedOrders