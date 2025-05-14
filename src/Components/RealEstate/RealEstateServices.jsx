import React from 'react';

const RealEstateServices = () => {
  const services = [
    {
      id: 1,
      title: "While Buying",
      description: "Examine the square meter price information in that area with the Real Estate Index, and learn the value of the property you want to buy with Real Estate Expertise.",
      image: "/assets/realestate/1.png"
    },
    {
      id: 2,
      title: "When Selling",
      description: "Discover the tricks of the trade with the Real Estate Sales Guide, and examine the changes in the sale prices in your area with the Real Estate Index.",
      image: "/assets/realestate/2.png"
    },
    {
      id: 3,
      title: "When Renting",
      description: "Follow rental price changes with the Real Estate Index and make your rental process easier with the Real Estate Rental Guide.",
      image: "/assets/realestate/3.png"
    },
    {
      id: 4,
      title: "Credit",
      description: "Compare the mortgage loan rates of banks on a single page and choose the alternative that suits you.",
      image: "/assets/realestate/4.png"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-lg mt-5 shadow-custom-diagonal">
      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl font-medium text-center mb-2 text-black">
        The Services You Need in Your Real Estate Buying/Selling/Renting Transactions are at
      </h1>
      <h1 className="text-3xl md:text-4xl font-medium text-center mb-8 text-black">
        Emlak360!
      </h1>
      
      {/* Subheading */}
      <p className="text-lg text-center mb-12 text-black max-w-5xl mx-auto">
        With sahibinden.com's technology and reliable business partners, you can easily access the services you need in your real estate 
        buying, selling and renting process from a single place.
      </p>
      
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-custom-diagonal overflow-hidden">
            <h3 className="text-xl font-medium text-center py-4 text-black">
              {service.title}
            </h3>
            
            <div className="px-4">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              
              <p className="text-sm text-black text-justify pb-6">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealEstateServices;