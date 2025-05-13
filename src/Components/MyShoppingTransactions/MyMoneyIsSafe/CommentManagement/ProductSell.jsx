import React from 'react'
import { Bed, Car, Bath } from "lucide-react";
import { RiVerifiedBadgeFill } from "react-icons/ri";


const PropertyCard = ({
  image,
  title,
  location,
  cost,
  propertyType,
  bedrooms,
  bathrooms,
  parkingSpaces,
}) => {
  return (
    <div className="flex flex-col  bg-white rounded-lg  overflow-hidden w-full max-w-5xl mx-auto ">
      {/* Image Section */}
      <div className="relative h-60 group:hover:transition-transform hover:scale-105 duration-300 ease-in-out">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-white/50 px-5 py-3 rounded-full text-xs font-medium">
          {propertyType}
        </span>
      </div>

      {/* Content Section */}
      <div className="py-2 flex-grow w-full">
        <div className="flex items-center  mb-1">
          <div>
            <h3 className="text-lg font-semibold mb-1 w-max flex items-center gap-1">{title}
            <RiVerifiedBadgeFill className='w-3 h-3' />
            </h3>
            
            <p className="text-gray-600 text-sm mb-2">{location}</p>
          </div>
          <p className="border-gray-600 text-xs font-normal text-right w-max">
            Cost ${cost}
          </p>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between   text-gray-600 text-sm ">
          <div className="flex items-center gap-1">
            <Bed size={16} />
            <span>{bedrooms}-3</span>
          </div>
          <div className="flex items-center gap-1">
            <Car size={16} />
            <span>{parkingSpaces}-3</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} />
            <span>{bathrooms}-3</span>
          </div>

          {/* Brochure Button */}
          <div className=" ">
            <button className=" border border-gray-300 rounded-full py-2 px-4 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
              BROCHURE
              <span className="text-xs">
                <img src="/assets/download.svg"  />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function ProductSell() {
    const properties = [
        {
          image: "/assets/purchasetransaction/1.png",
          title: "Highett Common",
          location: "Abbotsford, Victoria",
          cost: "700,000",
          propertyType: "HOUSE",
          bedrooms: 1,
          bathrooms: 1,
          parkingSpaces: 1,
        },
        {
          image: "/assets/purchasetransaction/2.png",
          title: "Albero Apartments",
          location: "Abbotsford, Victoria",
          cost: "700,000",
          propertyType: "HOUSE",
          bedrooms: 1,
          bathrooms: 1,
          parkingSpaces: 1,
        },
        {
          image: "/assets/purchasetransaction/3.png",
          title: "Albero Apartments",
          location: "Abbotsford, Victoria",
          cost: "700,000",
          propertyType: "HOUSE",
          bedrooms: 1,
          bathrooms: 1,
          parkingSpaces: 1,
        },
      ];
  return (
    <div className=" max-w-4xl w-full mx-auto  font-poppins ">
      <h1 className="text-2xl font-semibold mb-6">Products I Sell</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))}
      </div>
    </div>
  )
}

export default ProductSell