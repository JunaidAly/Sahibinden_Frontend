// PropertyListing.jsx
import React from "react";
const details = [
  { label: "Ad No.", value: "12562345678654" },
  { label: "Announcement Date", value: "March 2025" },
  { label: "Property Type", value: "House For Sale" },
  { label: "m² (Gross)", value: "70" },
  { label: "m² (Net)", value: "65" },
  { label: "Number of Rooms", value: "3 + 3" },
  { label: "Building Age", value: "Between 2-3" },
  { label: "Number of Floors", value: "2" },
  { label: "Heating", value: "Combi Boiler" },
  { label: "Parking", value: "Two Vehicles" },
];

const PropertyListing = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 bg-white rounded-xl border border-[#E0E0E0]">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Image and Info Section */}
        <div className="w-full md:w-2/3">
          <img
            src="/assets/addetails/img.png"
            alt="Modern house with pool"
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>

        {/* Property Details */}

        <div className="max-w-2xl mx-auto p-6 font-sans text-[#2D2D2D]">
          {/* Price header */}
          <h1 className="text-[26px]  font-bold ">1,395,000 TL</h1>

          {/* Property details with vertical dividers */}
          <div className="">
            {details.map((detail, index) => (
              <div key={index} className="flex items-start">
                <div className=" text-2xl md:text-[20px] font-[400] leading-[171%] text-[#414141]">
                  {detail.label}
                </div>
                <div className="px-1 text-3xl md:text-xl text-[#000000] font-light">
                  |
                </div>
                <div className="flex-1 w-max  md:text-[20px] font-[400] leading-[171%] text-[#414141]">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="mb-3 grid grid-cols-3 gap-3 w-[400px]">
        <img
          src="/assets/addetails/1.png"
          alt="Property thumbnail 1"
          className="w-[181px] h-[108px] object-cover rounded-lg"
        />
        <img
          src="/assets/addetails/2.png"
          alt="Property thumbnail 2"
          className="w-[181px] h-[108px] object-cover rounded-lg"
        />
        <img
          src="/assets/addetails/3.png"
          alt="Property thumbnail 3"
          className="w-[181px] h-[108px] object-cover rounded-lg"
        />
      </div>
      
    </div>
  );
};


export const PropertyDescription = () => {
  const additionalDetails = [
    { category: "BEDROOM FEATURES:", value: "Main Floor Master Bedroom, Walk-In Closet", highlight: false },
    { category: "DINING AREA:", value: "Breakfast Counter/Bar, Living/Dining Combo", highlight: true },
    { category: "DOORS & WINDOWS", value: "Bay Window", highlight: false },
    { category: "ENTRY LOCATION:", value: "Mid Level", highlight: true },
    { category: "EXTERIOR CONSTRUCTION:", value: "Wood", highlight: false },
    { category: "FIREPLACE FUEL:", value: "Pellet Stove", highlight: true }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 font-poppins">
      {/* Description section */}
      <div className="mb-8">
        <h2 className="text-[28px]   leading-[100%] font-bold text-[#434343] mb-3">Description</h2>
        <p className="text-[#434343] leading-[38px]   ">
          Enchanting Three Bedroom, Three Bath Home With Spacious One Bedroom, One Bath Cabana, In-Laws Quarters. Charming Living Area 
          Features Fireplace And Fabulous Art Deco Details, Formal Dining Room. Remodeled Kitchen With Granite Countertops, White Cabinetry 
          And Stainless Appliances. Lovely Master Bedroom Has Updated Bath, Beautiful View Of The Pool. Guest Bedrooms Have Walk-In, Cedar 
          Closets. Delightful Backyard; Majestic Oaks Surround The Free Form Pool And Expansive Patio, Wet Bar And Grill.
        </p>
      </div>

      {/* Additional Details section */}
      <div className="font-poppins">
        <h2 className="text-[28px] leading-[100%] font-bold text-[#434343] mb-4  ">Additional Details</h2>
        <div className=" overflow-hidden">
          {additionalDetails.map((detail, index) => (
            <div 
              key={index} 
              className={`flex ${detail.highlight ? 'bg-[#1544AB] text-white' : 'bg-white text-[#272727]'}`}
            >
              <div className={`w-2/5 p-3 text-[20px] vertical-trim leading-[38px] font-poppins font-medium ${detail.highlight ? 'border-r border-blue-600' : 'border-r border-gray-200'}`}>
                {detail.category}
              </div>
              <div className="w-3/5 p-3 text-[20px]  leading-[38px] font-poppins">
                {detail.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
