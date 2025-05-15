import React from "react";
import { useState } from 'react'
import Navbar from '../../Navbar'
import Footer from '../../Footer'
import NavbarMenu from '../../RealEstate/NavbarMenu'
import CommentForm from '../../Home/CommentForm'
import { Link } from "react-router-dom";

function BuyingGuidePage() {
  const guides = [
    {
      id: "before-purchase",
      title: "Before Purchase",
      description:
        "Do you know what you may need before buying a property? We have prepared a comprehensive guide for you, all the information you need is here.",
      image: "/assets/purchase.png",
      path: "/purchase-details-real-estate", // Add path for navigation
    },
    {
      id: "during-purchase",
      title: "During Purchase",
      description:
        "You have found your dream house, agreed and decided to buy. You can easily find what you need to pay attention to during the purchasing process in our guide.",
      image: "/assets/purchase.png",
      path: "/purchase-details-real-estate", // Add path for navigation
    },
    {
      id: "after-purchase",
      title: "After Purchase",
      description:
        "if you are wondering what you need to do to keep your home safe, our post-purchase guide is the right place for you.",
      image: "/assets/purchase.png",
      path: "/purchase-details-real-estate", // Add path for navigation
    },
  ];
  return (
    <>
      <Navbar />
      <NavbarMenu />
      <div className="min-h-screen font-poppins ">
        <Link to="/selling-guides">
          <div className="bg-white font-poppins rounded-lg  max-w-7xl w-full mx-auto my-8">
            {/* Content Section */}
            <div className="flex  items-center gap-96  shadow-custom-diagonal p-5  rounded-lg">
              {/* Left Content */}
              <div className="flex flex-col max-w-xl ">
                <h2 className="text-[25px] font-[600] text-black mb-4">
                  Home Buying Guide in 10 Steps
                </h2>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  We have summarized the information for you may need and what
                  you need to do when buying a house in 10 steps and compiled it
                  in a guide. With the 10- Step Home Buying Guide, your mind
                  will be at ease and your job will be easy.
                </p>

                <Link
                  to="/guides/overview"
                  className="text-sm text-[#1544AB] font-medium hover:underline"
                >
                  More
                </Link>
              </div>

              {/* Right Image */}
              <div className="w-52">
                <img
                  src="/assets/creditform.png"
                  alt="Black SUV vehicle"
                  className="w-full  object-contain"
                />
              </div>
            </div>
          </div>
        </Link>

        <div className="max-w-7xl w-full mx-auto p-6 font-poppins shadow-custom-diagonal rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-lg overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative">
                  <h2 className="text-[25px] font-semibold text-black mb-4">
                    {guide.title}
                  </h2>
                  <img
                    src={guide.image}
                    alt={`${guide.title} - Man in suit with modern building`}
                    className="w-full h-60 object-cover"
                  />
                </div>

                {/* Content Section - UPDATED WITH ROUTER LINK */}
                <div className="py-4">
                  <p className="text-black font-[400] text-sm mb-6">
                    {guide.description}
                  </p>

                  <Link
                    to={guide.path}
                    className="text-[#1544AB] text-sm font-medium hover:underline"
                  >
                    More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CommentForm />
      <Footer />
    </>
  );
}

export default BuyingGuidePage;
