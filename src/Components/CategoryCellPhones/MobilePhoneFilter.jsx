import React, { useState } from 'react';

const MobilePhoneFilter = () => {
  // State for tracking filter selections
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [priceRange, setPriceRange] = useState({ lowest: '', highest: '' });

  // Phone brands with counts
  const brands = [
    { name: 'Apple', count: '766986' },
    { name: 'Oppo', count: '766986' },
    { name: 'Realme', count: '766986' },
    { name: 'Samsung', count: '766986' },
    { name: 'Vivo', count: '766986' },
    { name: 'Xiaomi', count: '766986' }
  ];

  // Filter options
  const conditions = ['Good', 'Very Good', 'Perfect'];
  const colors = ['Gold', 'Copper', 'Beige', 'White', 'Claret Red', 'Bronze'];
  const storageOptions = ['None', '4GB', '6GB', '8GB', '12GB', '13GB'];

  // Toggle handlers for checkboxes
  const toggleCondition = (condition) => {
    setSelectedConditions(prev => 
      prev.includes(condition) 
        ? prev.filter(item => item !== condition) 
        : [...prev, condition]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(item => item !== color) 
        : [...prev, color]
    );
  };

  const toggleStorage = (storage) => {
    setSelectedStorage(prev => 
      prev.includes(storage) 
        ? prev.filter(item => item !== storage) 
        : [...prev, storage]
    );
  };

  // Handle price range changes
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: value }));
  };

  // Handle search button click
  const handleSearch = () => {
    console.log('Search with filters:', {
      priceRange,
      selectedConditions,
      selectedColors,
      selectedStorage
    });
  };

  return (
    <div className="w-80 bg-white  rounded-lg overflow-hidden shadow-custom h-[1220px] ">
      <div className="p-4">
        {/* Mobile Phone Brands Section with Blue Scrollbar */}
        <div className="relative  ">
          <h2 className="text-[25px] font-[600] font-poppins text-[#231E1C] mb-4">Mobile Phone</h2>
          <div className="h-48 overflow-y-auto scrollbar-hide mb-6 pr-2 relative">
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#1544AB] rounded-full"></div>
            <ul className="space-y-5">
              {brands.map((brand, index) => (
                <li key={index} className="text-[#231E1C] font-monrope font-[400] text-[15px]">
                  {brand.name}<span className="text-[12px]">({brand.count})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Price Range Section */}
        <div className="mb-6">
          <h2 className="text-[25px] font-[600] font-poppins text-[#231E1C] mb-4">Price</h2>
          <div className="space-y-3">
            <input
              type="text"
              name="lowest"
              placeholder="Lowest"
              value={priceRange.lowest}
              onChange={handlePriceChange}
              className="w-full p-3 border border-[#1544AB] font-poppins font-[400] text-[15px] placeholder-black rounded-md"
            />
            <input
              type="text"
              name="highest"
              placeholder="Highest"
              value={priceRange.highest}
              onChange={handlePriceChange}
              className="w-full p-3 border border-[#1544AB] font-poppins font-[400] text-[15px] placeholder-black rounded-md"
            />
          </div>
        </div>

        {/* Cosmetics Condition Section */}
        <div className="mb-6">
          <h2 className="text-[18px] font-[400] font-poppins text-[#231E1C] mb-4">Cosmetics Condition</h2>
          <div className="space-y-3">
            {conditions.map((condition, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`condition-${index}`}
                  checked={selectedConditions.includes(condition)}
                  onChange={() => toggleCondition(condition)}
                  className="w-4 h-4 border-2 border-gray-300"
                />
                <label htmlFor={`condition-${index}`} className="ml-2 text-[16px] font-[400] font-monrope text-[#231E1C]">
                  {condition}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Color Section with Blue Scrollbar */}
        <div className="relative mb-6">
          <h2 className="text-[18px] font-[400] font-poppins text-[#231E1C] mb-4">Color</h2>
          <div className="h-48 overflow-y-auto scrollbar-hide pr-2 relative">
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#1544AB] rounded-full"></div>
            <div className="space-y-3">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`color-${index}`}
                    checked={selectedColors.includes(color)}
                    onChange={() => toggleColor(color)}
                    className="w-4 h-4 border-2 border-gray-300"
                  />
                  <label htmlFor={`color-${index}`} className="ml-2 text-[16px] font-[400] font-monrope text-[#231E1C]">
                    {color}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Storage Capacity Section with Blue Scrollbar */}
        <div className="relative mb-6">
          <h2 className="text-[18px] font-[400] font-poppins text-[#231E1C] mb-4">Storage Capacity</h2>
          <div className="h-48 overflow-y-auto scrollbar-hide pr-2 relative">
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#1544AB] rounded-full"></div>
            <div className="space-y-3">
              {storageOptions.map((storage, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`storage-${index}`}
                    checked={selectedStorage.includes(storage)}
                    onChange={() => toggleStorage(storage)}
                    className="w-4 h-4 border-2 border-[#1544AB]"
                  />
                  <label htmlFor={`storage-${index}`} className="ml-2 text-[16px] font-[400] font-monrope text-[#231E1C]">
                    {storage}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full bg-[#1544AB] text-white py-3 rounded-md font-bold font-monrope text-[17px] "
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default MobilePhoneFilter;