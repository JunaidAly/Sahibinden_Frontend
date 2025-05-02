import React, { useState } from 'react';

const VehicleValuationSelection = () => {
    const vehicleTypes = [
        'Car',
        'Off-Road, SUV & Pickup',
        'Minivan & Panel Van'
      ];
    
      const years = [2024, 2023, 2022, 2022, 2021];
    
      const brands = [
        'Citroen',
        'Fiat',
        'Ford',
        'Opel',
        'Renault'
      ];
    
      const fuelTypes = [
        'Berlingo',
        'Jumper*',
        'Jumpy*'
      ];
    
      const colors = ['Diesel'];

  return (
    <div className="p-8  max-w-7xl bg-white rounded-lg shadow-custom font-poppins">
      <div className="mb-8">
        <h1 className="text-[30px] font-[500] text-black mb-2">Vehicle Valuation</h1>
        <p className="text-[20px] font-[500] text-[#888F9F]">Select the vehicle you are interested in below.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-[20px] font-[500] text-black  mb-4">Vehicle Type Selection</h2>
        
        <div className="flex flex-row justify-center gap-4">
          {/* Vehicle Type Column */}
          <div className="flex flex-col space-y-2 shadow-custom w-[282px] p-4 rounded-lg">
            {vehicleTypes.map((type, index) => (
              <button
                key={index}
                className={`px-2 text-[20px] font-[500] rounded-md w-max text-left ${
                  index === 0 
                    ? 'bg-[#1544AB] text-white' 
                    : 'bg-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Year Column */}
          <div className=" space-y-2 shadow-custom w-[282px] p-4 rounded-lg flex flex-col">
            {years.map((year, index) => (
              <button
                key={index}
                className={`px-2 text-[20px] font-[500] rounded-md w-max text-left ${
                  index === 0 
                    ? 'bg-[#1544AB] text-white' 
                    : 'bg-white'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Brand Column */}
          <div className="flex flex-col space-y-2 shadow-custom w-[282px] p-4 rounded-lg">
            {brands.map((brand, index) => (
              <button
                key={index}
                className={`px-2 text-[20px] font-[500] rounded-md w-max text-left ${
                  index === 0 
                    ? 'bg-[#1544AB] text-white' 
                    : 'bg-white'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Fuel Type Column */}
          <div className="flex flex-col space-y-2 shadow-custom w-[282px] p-4 rounded-lg">
            {fuelTypes.map((type, index) => (
              <button
                key={index}
                className={`px-2 text-[20px] font-[500] rounded-md w-max text-left ${
                  index === 0 
                    ? 'bg-[#1544AB] text-white' 
                    : 'bg-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Color Column */}
          <div className="flex flex-col space-y-2 shadow-custom w-[282px] p-4 rounded-lg">
            {colors.map((color, index) => (
              <button
                key={index}
                className="px-2 text-[20px] font-[500] rounded-md w-max text-left bg-[#1544AB] text-white"
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleValuationSelection;