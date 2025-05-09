import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { FaCaretDown } from "react-icons/fa";
import Navbar from '../Navbar';
import Footer from '../Footer';
import NavbarMenu from '../Auto360/NavbarMenu';
import CommentForm from '../Home/CommentForm';
function AuthorizedDealer() {
    // State for dropdown selections
  const [brand, setBrand] = useState('');
  const [authorizedDealer, setAuthorizedDealer] = useState('');
  const [service, setService] = useState('');
  const [showMap, setShowMap] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState(false);

  // Filter options
  const brandOptions = ['Brand 1', 'Brand 2', 'Brand 3'];
  const dealerOptions = ['Dealer Type 1', 'Dealer Type 2', 'Dealer Type 3'];
  const serviceOptions = ['Service 1', 'Service 2', 'Service 3'];

  // Handle filter change
  const handleFilterChange = (type, value) => {
    switch(type) {
      case 'brand':
        setBrand(value);
        break;
      case 'dealer':
        setAuthorizedDealer(value);
        break;
      case 'service':
        setService(value);
        break;
      default:
        break;
    }
  };

  // Handle search button click
  const handleSearch = () => {
    if (brand || authorizedDealer || service) {
      setSelectedFilters(true);
      setShowMap(false);
    }
  };

  // Custom dropdown component
  const Dropdown = ({ label, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative">
        <div 
          className="flex items-center justify-between p-2 border border-gray-300 rounded-md cursor-pointer bg-white"
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

     <div className="max-w-7xl mx-auto p-4 font-poppins">
     
      
      {/* Filter controls */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-14">
        <div className="w-full md:w-1/4">
          <Dropdown 
            label="Brand" 
            options={brandOptions} 
            value={brand} 
            onChange={(value) => handleFilterChange('brand', value)} 
          />
        </div>
        <div className="w-full md:w-1/4">
          <Dropdown 
            label="Authorized Dealer" 
            options={dealerOptions} 
            value={authorizedDealer} 
            onChange={(value) => handleFilterChange('dealer', value)} 
          />
        </div>
        <div className="w-full md:w-1/4">
          <Dropdown 
            label="Service" 
            options={serviceOptions} 
            value={service} 
            onChange={(value) => handleFilterChange('service', value)} 
          />
        </div>
        <div className="w-full md:w-1/4">
          <button
            onClick={handleSearch}
            className="w-full bg-[#1544AB] text-white py-2 px-4 rounded-md transition-colors"
          >
            Show on Map
          </button>
        </div>
      </div>
      
      {/* World Map Section - shown when no filters applied */}
      {showMap && (
        <div className="relative mt-4 rounded-md overflow-hidden bg-white ">
          <div className="w-full h-[600px]">
           <img src="/assets/map.png" className='h-full w-full object-fit' />
          </div>
        </div>
      )}
      
      {/* Results Section - shown after applying filters */}
      {!showMap && (
        <div className="bg-white rounded-md p-6 border border-gray-200 mt-4">
          {selectedFilters ? (
            <div>
              <p className="text-black mb-8">
                Authorized dealers or services will be listed after selecting "Brand, Authorized dealer / Service and City".
              </p>
              
              {/* This would be populated with actual dealer data */}
              <div className="space-y-4">
                {/* Example dealer listing */}
                <div className="p-4  rounded-md">
                  <h3 className="font-bold text-lg">ABC Motors</h3>
                  <p className="text-black">123 Main Street, New York</p>
                  <div className="flex items-center text-blue-600 mt-2">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">View on map</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-black">
              Authorized dealers or services will be listed after selecting "Brand, Authorized dealer / Service and City".
            </p>
          )}
        </div>
      )}
       {/* Header for dealer finder */}
       <h1 className="text-xl font-bold my-6">Find an Authorized Dealer</h1>
       <div className='w-full shadow-custom-diagonal rounded-lg  h-[600px] flex items-center justify-center'>
        <p className="text-black mb-4">
          Authorized dealers or services will be listed after selecting "Brand, Authorized dealer / Service and City".
        </p>
       </div>
    </div>
    <CommentForm />
    <Footer />
    </>
  )
}

export default AuthorizedDealer