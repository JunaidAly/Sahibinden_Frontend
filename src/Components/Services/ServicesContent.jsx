import React from 'react'

function ServicesContent({ activeComponent }) {
  // Content for Auto 360
  const renderAuto360Content = () => {
    return (
      <div className="relative flex items-center justify-center h-[300px] w-full text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/servicesbg1.png')" }}
        >
          <div className="relative z-10 font-poppins text-white p-4">
            <h1 className="text-3xl font-semibold">
              The services you need regarding your vehicle are at Oto360!
            </h1>
            <p className="mt-2 w-1/2 text-lg font-[400] text-white">
              With sahibinden.com's technology and reliable business partners, you
              can easily access the services you need during your vehicle
              purchase, sale and usage process from a single place.
            </p>
            <button className="rounded-full py-2 px-5 mt-4 bg-[#1544AB] text-white">
              Discover Oto360
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Content for Real Estate 360
  const renderRealEstate360Content = () => {
    return (
      <div className="relative flex items-center justify-center h-[300px] w-full text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/servicesbg2.png')" }}
        >
          <div className="relative z-10 font-poppins text-white p-4">
            <h1 className="text-2xl font-semibold">
              All the Services You Need in Your Real Estate
              Buying/Selling/Renting Transactions are on sahibinden.com!
            </h1>
            <p className="mt-2 w-3/4 text-lg font-[400] text-white">
              You can easily and quickly access all the services you may need
              when buying, selling or renting real estate via sahibinden.com.
              Explore our products to examine the details of these services and
              use them instantly.
            </p>
            <button className="rounded-full py-2 px-5 mt-4 bg-[#1544AB] text-white">
              Discover real estate360
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render content based on activeComponent
  return (
    <>
      {activeComponent === 'auto360' && renderAuto360Content()}
      {activeComponent === 'realEstate360' && renderRealEstate360Content()}
    </>
  );
}

export default ServicesContent