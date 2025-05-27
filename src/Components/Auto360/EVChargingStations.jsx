import React, { useState } from 'react';
import { FaCaretDown, FaChargingStation, FaCar, FaTree, FaSolarPanel, FaMapMarkerAlt } from 'react-icons/fa';

const EVChargingStations = () => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const provinces = [
    'Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 
    'Adana', 'Gaziantep', 'Konya', 'Mersin', 'Diyarbakir'
  ];

  const districts = [
    'Kadikoy', 'Besiktas', 'Sisli', 'Beyoglu', 'Uskudar',
    'Fatih', 'Bakirkoy', 'Zeytinburnu', 'Pendik', 'Maltepe'
  ];

  const CustomSelect = ({ value, onChange, options, placeholder, disabled = false }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-3 pr-10 border border-primaryBlue rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          disabled ? 'bg-white' : 'cursor-pointer'
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.toLowerCase().replace(' ', '-')}>
            {option}
          </option>
        ))}
      </select>
      <FaCaretDown size={24} className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${
        disabled ? 'text-primaryBlue' : 'text-primaryBlue'
      }`} />
    </div>
  );

  const handleShowOnMap = () => {
    console.log('Showing map for:', { selectedProvince, selectedDistrict });
    // Here you would typically integrate with a mapping service
  };

  return (
    <div className="max-w-7xl mx-auto p-3 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Form */}
        <div className="space-y-6 max-w-md mx-auto lg:mx-0">
          <div>
            <h1 className="text-3xl font-semibold w-max text-black mb-3">
              Electric Vehicle Charging Stations
            </h1>
            <p className="text-primarygray font-semibold text-lg leading-relaxed w-max">
              Discover the nearest electric vehicle charging stations and easily access 
              their information.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-custom-diagonal space-y-4">
            <div>
              <CustomSelect
                value={selectedProvince}
                onChange={setSelectedProvince}
                options={provinces}
                placeholder="Province"
              />
            </div>

            <div>
              <CustomSelect
                value={selectedDistrict}
                onChange={setSelectedDistrict}
                options={districts}
                placeholder="District"
                disabled={!selectedProvince}
              />
            </div>

            <button
              onClick={handleShowOnMap}
              disabled={!selectedProvince || !selectedDistrict}
              className={`w-full py-3 px-6 rounded-md font-medium transition-all duration-200 ${
                selectedProvince && selectedDistrict
                  ? 'bg-primaryBlue text-white cursor-pointer'
                  : 'bg-primaryBlue text-white '
              }`}
            >
              Show on Map
            </button>
          </div>

          <p className="text-sm text-primarygray w-max leading-relaxed">
            Map information is provided by Bayersoft Bilgi Teknolojileri A.Ş. within the scope of the cooperation.
          </p>
        </div>

        {/* Right Side - Illustration */}
        <div className="flex justify-center lg:justify-end">
            <img
                src="/assets/auto360/chargingstation.png"
                alt="Electric Vehicle Charging Station"
                className="w-full max-w-xs h-auto object-contain"
            />
        </div>
      </div>

    </div>
  );
};

export default EVChargingStations;