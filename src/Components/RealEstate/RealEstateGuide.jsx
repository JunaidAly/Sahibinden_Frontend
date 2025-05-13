import React from 'react';

const RealEstateGuide = () => {
  const guides = [
    {
      id: 1,
      title: "What Should I Pay Attention to When Buying Real Estate?",
      description: "Are you looking for a home or office? Real Estate Buying Guide will provide you with all the answers you need and help you through the buying process.",
      linkText: "Detailed Information"
    },
    {
      id: 2,
      title: "What Should I Pay Attention to When Selling Real Estate?",
      description: "Are you selling your home or land? Real Estate Sales Guide will provide you with all the answers you need and help you through the sales process.",
      linkText: "Detailed Information"
    },
    {
      id: 3,
      title: "What Should I Pay Attention to When Renting Real Estate?",
      description: "Are you renting a home or office? The Real Estate Rental Guide will provide you with all the answers you need and help you with the rental process.",
      linkText: "Detailed Information"
    }
  ];

  return (
    <div className="max-w-7xl w-full mx-auto  font-poppins mt-5">
      <h1 className="text-2xl font-medium mb-5 text-black">
        Real Estate Buying/Selling/Renting Guide
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shadow-custom-right p-2 w-full bg-white rounded-lg">
        {guides.map((guide) => (
          <div key={guide.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4">
              <h2 className="text-base font-medium mb-4 text-gray-900">
                {guide.title}
              </h2>
              
              {/* Image placeholder - replace with actual image */}
              <div className="relative mb-4">
                <img
                  src="assets/purchase.png" // Placeholder image
                  alt="Real estate professional"
                  className="w-full h-48 object-cover "
                />
                {/* You can replace the placeholder with the actual image URL */}
              </div>
              
              <p className="text-sm text-black mb-4">
                {guide.description}
              </p>
              
              <a
                href="#"
                className="text-[#1544AB] text-sm hover:underline"
              >
                {guide.linkText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealEstateGuide;