import React from 'react'
import { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import NavbarMenu from '../Auto360/NavbarMenu';
import CommentForm from '../Home/CommentForm';
import { FaCaretDown } from "react-icons/fa";

function ElectricVehicle() {
     const provinceOptions = ['province 1', 'province 2', 'province 3'];
     const [province, setProvincer] = useState('');
     const districtOptions = ['District 1', 'District 2', 'District 3'];
     const [district, setDistrict] = useState('');
     const [showMap, setShowMap] = useState(true);

     // Custom dropdown component
      const Dropdown = ({ label, options, value, onChange }) => {
        const [isOpen, setIsOpen] = useState(false);
        
        
        return (
          <div className="relative">
            <div 
              className="flex items-center justify-between p-2 border border-[#1544AB] rounded-md  cursor-pointer bg-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="text-black">{value || label}</span>
              <FaCaretDown size={20} className="text-[#1544AB]" />
            </div>
            
            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {options.map((option) => (
                  <div 
                    key={option} 
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      };

  return (
    <>
      <Navbar />
      <NavbarMenu />
      <div className="flex flex-col gap-5 p-5 mt-10 max-w-7xl mx-auto shadow-custom-diagonal rounded-lg h-[370px] font-poppins">
        <h1 className="text-2xl font-semibold ">
          Electric Vehicle Charging Stations
        </h1>
        <p className="text-lg font-semibold text-[#888F9F]">
          Discover the nearest electric vehicle charging stations and easily
          access <br /> their information.
        </p>

        <div className="w-full md:w-1/4 ">
          <Dropdown
            label="Province"
            options={provinceOptions}
            value={province}
            onChange={(value) => handleFilterChange("province", value)}
          />
        </div>
        <div className="w-full md:w-1/4 ">
          <Dropdown
            label="District"
            options={districtOptions}
            value={district}
            onChange={(value) => handleFilterChange("district", value)}
          />
        </div>
        <div className="w-full md:w-1/4">
          <button className="w-full bg-[#1544AB] text-white py-2 px-4 rounded-md transition-colors">
            Show on Map
          </button>
        </div>
        <p className="text-sm font-medium text-[#888F9F]">
          Map information is provided by Başarsoft Bilgi Teknolojileri A.Ş.
          within the scope of the cooperation.
        </p>
      </div>

      {/* World Map Section - shown when no filters applied */}
      {showMap && (
        <div className="relative mt-20 max-w-7xl mx-auto rounded-md overflow-hidden bg-white ">
          <div className="w-full h-[600px]">
           <img src="/assets/map.png" className='h-full w-full object-fit' />
          </div>
        </div>
      )}
      <CommentForm />
      <Footer />
    </>
  );
}

export default ElectricVehicle