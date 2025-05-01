import React, { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";

const UnPublishedAdvertisements = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  return (
    <div className="w-full max-w-4xl p-4 font-poppins  rounded  bg-white ml-4 mt-5">
      <h2 className="text-[25px] font-[500] mb-1 text-black">
        Unpublished Ads
      </h2>

      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="By Ad Number Or Word"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-[#1544AB] placeholder-[#8D8D8D] font-[400] text-[18px] rounded-md "
          />
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="bg-[#1544AB] text-white px-6 py-3 rounded-full font-medium uppercase text-sm  "
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex justify-between items-center border border-[#1544AB] placeholder-[#8D8D8D] font-[400] text-[18px] rounded-md px-4 py-2">
        <div className="text-[#231E1C] font-[400] text-[18px]">
          No Ads Found
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-center border border-[#1544AB] rounded bg-white w-[325px] h-8"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <div className="flex justify-between items-center w-full px-2">
              <span className="text-gray-700">{selectedOption || ""}</span>
              <FaCaretDown className="text-[#1544AB] w-8 h-8"  />
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-[325px] bg-white border border-gray-300 rounded shadow-lg z-10">
              <ul className="py-1">
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSelectOption("Date Descending")}
                >
                  Date Descending
                </li>
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSelectOption("Date Ascending")}
                >
                  Date Ascending
                </li>
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSelectOption("Price High to Low")}
                >
                  Price High to Low
                </li>
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSelectOption("Price Low to High")}
                >
                  Price Low to High
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnPublishedAdvertisements;