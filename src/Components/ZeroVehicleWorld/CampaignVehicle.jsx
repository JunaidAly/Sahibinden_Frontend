import React from 'react'
import Navbar from '../Navbar';
import Footer from '../Footer';
import NavbarMenu from '../Auto360/NavbarMenu';
import CommentForm from '../Home/CommentForm';
// Sample vehicle data
const vehicles = [
    {
      id: 1,
      model: 'DFSK E5',
      price: '1,790,000 TL',
      image: '/assets/vehimg.png',
      optionsNote: 'There are 1 different engine and package options in total.'
    },
    {
      id: 2,
      model: 'DFSK E5',
      price: '1,790,000 TL',
      image: '/assets/vehimg.png',
      optionsNote: 'There are 1 different engine and package options in total.'
    },
    {
      id: 3,
      model: 'DFSK E5',
      price: '1,790,000 TL',
      image: '/assets/vehimg.png',
      optionsNote: 'There are 1 different engine and package options in total.'
    }
  ];
function CampaignVehicle() {
  return (
    <>
    <Navbar />
    <NavbarMenu />
    <div className="max-w-7xl mx-auto bg-white rounded-lg  font-poppins">
      {/* Header Section */}
      <div className="p-5 rounded-lg mt-10  shadow-custom-diagonal flex justify-between items-center">
        <div className="flex flex-col ">
          <div className="mr-2 font-medium text-[#888F9F]">Campaign Vehicles</div>
          <div className="font-medium">Yes</div>
        </div>
        <button className="text-[#1544AB] text-sm">
          Change Filters
        </button>
      </div>
      
      {/* Results Count */}
      <div className="px-4 py-3 text-black">
        Price List 90 results found matching your search
      </div>
      
      {/* Vehicles List */}
      <div className="flex flex-col gap-5 ">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="p-4 flex flex-col md:flex-row shadow-custom-right rounded-lg">
            {/* Vehicle Image */}
            <div className="w-full md:w-1/3 flex-shrink-0 mb-4 md:mb-0">
              <img 
                src={vehicle.image} 
                alt={vehicle.model} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Vehicle Details */}
            <div className="md:ml-6 flex flex-col md:flex-row gap-20 items-start justify-start md:items-center w-full">
              {/* Model */}
              <div className="text-xl font-medium text-gray-900 mb-2 md:mb-0">
                {vehicle.model}
              </div>
              
              {/* Price and Options */}
              <div className="text-left">
                <div className="text-xl font-medium text-black mb-1">
                  {vehicle.price}
                </div>
                <div className="text-sm text-[#888F9F]">
                  {vehicle.optionsNote}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <CommentForm />
    <Footer />
    </>
  )
}

export default CampaignVehicle