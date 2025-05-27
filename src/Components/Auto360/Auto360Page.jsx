import React, { useState } from "react";
import Navbar from "../Navbar";
import NavbarMenu from "../Auto360/NavbarMenu";
import Footer from "../Footer";
import { VehicleValuationInfo } from "../WhileBuying/VehicleValuation";
import { AutoExpertiseForm } from "../WhileBuying/AutoExpertise";
import { CreditOffers } from "../RealEstate/Credit";
import VehicleSearchForm from "./VehicleSearchForm";
import BrandNewVehicles from "./BrandNewVehicles";
import EVChargingStations from "./EVChargingStations";

function Auto360Page() {
  const services = [
    {
      id: 1,
      title: "While Buying",
      description:
        "While deciding on the vehicle you are interested in with Vehicle Comparison, learn detailed information about the condition of the vehicle with Vehicle Damage Inquiry and Auto Expertise.",
      image: "/assets/auto360/carts/4.png",
    },
    {
      id: 2,
      title: "When Selling",
      description:
        "Determine the price of your vehicle with Vehicle Valuation, and learn what you need to pay attention to during the sales process from the Vehicle Sales Guide.",
      image: "/assets/auto360/carts/3.png",
    },
    {
      id: 3,
      title: "Credit",
      description:
        "Compare banks' vehicle loan rates on a single page and choose the alternative that suits you.",
      image: "/assets/auto360/carts/2.png",
    },
    {
      id: 4,
      title: "Zero Vehicles  World",
      description:
        "Discover and compare new car models of all brands on sale in Türkiye and contact authorized dealers.",
      image: "/assets/auto360/carts/1.png",
    },
  ];


   const guides = [
        {
          id: "pre-sales",
          title: "What Should I Pay Attention to When Buying a Vehicle?",
          description: "Are you looking for a vehicle? The Vehicle Buying Guide will provide you with all the answers you need and help you buy a vehicle.",
          image: "/assets/whileselling.png",
          path: "/pre-sale" // Add path for navigation
        },
        {
          id: "during-sales",
          title: "What Should I Pay Attention to When Selling a Vehicle?",
          description: "Are you selling your car? The Car Selling Guide will provide you with all the answers you need and help you with selling your car.",
          image: "/assets/whileselling.png",
          path: "/during-sales" // Add path for navigation
        },
  
    ];

  return (
    <>
      <Navbar />
      <NavbarMenu />
      <div className="min-h-screen font-poppins max-w-7xl mx-auto">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-lg mt-5 shadow-custom-diagonal">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl font-medium text-center mb-2 text-black">
            The services you need regarding your vehicle are at Oto360!
          </h1>

          {/* Subheading */}
          <p className="text-lg text-center mb-12 text-black max-w-5xl mx-auto">
            With sahibinden.com's technology and reliable business partners, you
            can easily access the services you need during your vehicle
            purchase, sale and usage process from a single place.
          </p>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-custom-diagonal overflow-hidden"
              >
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

        <div className="w-full   mt-5">
          <h2 className="text-2xl font-medium text-black mb-2">Most Used</h2>
          <div className="bg-white w-full flex  gap-64  rounded-lg shadow-custom-diagonal p-6">
            <div className="max-w-2xl w-full ">
              <h2 className="text-2xl font-semibold text-black mb-2">
                Periodic Maintenance
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                You can access the periodic maintenance service, which includes
                many maintenance such as brake system maintenance, fluid
                control, fuel filter replacement, with a special price advantage
                for sahibinden.com users.
              </p>
              <button className="text-sm bg-primaryBlue text-white p-3 rounded-full font-medium ">
                Show Details
              </button>

              <h3 className="font-medium text-md uppercase mt-3">
                show service points
              </h3>
            </div>
            <div className="w-48 h-48 ">
              <img
                src="/assets/auto360/periodic.png"
                alt="Periodic Maintenance"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-12">
          <VehicleValuationInfo />
        </div>

        <div className="w-full mt-12 shadow-custom-diagonal rounded-lg">
          <AutoExpertiseForm />
        </div>

        <div className="flex flex-col mt-12 shadow-custom-diagonal w-full p-5 rounded-lg">
          <h2 className="text-2xl font-semibold text-black mb-2">
            Vehicle Damage Inquiry
          </h2>
          <p className="text-black text-lg leading-relaxed mb-4">
            With Vehicle Damage Inquiry, you can immediately find out the damage
            information of any vehicle you want by entering its license plate
            number.
          </p>

          <a className="text-primaryBlue text-md font-normal">
            Detailed Information
          </a>
           <button className="text-md bg-primaryBlue text-white py-3 px-10 max-w-xs mt-5 rounded-md font-normal">
                Vehicle Damage Inquiry
           </button>
        </div>

         <div className="w-full mt-12">
          <CreditOffers />
        </div>

        <div className="w-full mt-12">
          <VehicleSearchForm />
        </div>


        <div className="max-w-7xl w-full mx-auto p-6 font-poppins shadow-custom-diagonal mt-12 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-white rounded-lg overflow-hidden">
              {/* Image Section */}
              <div className="relative">
                <h2 className="text-[25px] font-semibold text-black mb-4">
                  {guide.title}
                </h2>
                <img
                  src={guide.image}
                  alt={`${guide.title} - Man in suit with modern building`}
                  className="w-full h-[276px] object-cover"
                />
              </div>

              {/* Content Section - UPDATED WITH ROUTER LINK */}
              <div className="py-4">
                <p className="text-black font-[400] text-sm mb-6">
                  {guide.description}
                </p>

                <a
                  className="text-[#1544AB] text-sm font-medium hover:underline"
                >
                  Detailed Information
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full mt-12">
        <BrandNewVehicles />
        </div>

        <div className="w-full mt-12">
        <EVChargingStations />
        </div>


        <div className="w-full mt-12">
        <BrandNewVehicles />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Auto360Page;
