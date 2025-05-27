import React from "react";
import { useState } from "react";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import NavbarMenu from "../../RealEstate/NavbarMenu";
import CommentForm from "../../Home/CommentForm";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

function SellingGuidePage() {
  const guides = [
    {
      id: "pre-sales",
      title: "Pre-Sales",
      description:
        "Do you know what you may need before selling your property? We have prepared a comprehensive guide for you, all the information you need is here.",
      image: "/assets/purchase.png",
      path: "/pre-sales", // Add path for navigation
    },
    {
      id: "during-sales",
      title: "During Sales",
      description:
        "Are you renting a home or office? The Real Estate Rental Guide will provide you with all the answers you need and help you with the rental process.",
      image: "/assets/purchase.png",
      path: "/pre-sales", // Add path for navigation
    },
  ];
  return (
    <>
      <Navbar />
      <NavbarMenu />
      <div className="min-h-screen font-poppins ">
        <Link to="/selling-guides">
          <div className="bg-white font-poppins rounded-lg  max-w-7xl w-full mx-auto my-8">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-5 font-poppins">
              <h1 className="text-[35px] font-[600] text-black">
                 Real Estate Sales Guide
              </h1>
              {/* Search Bar */}
              <div className="relative w-96">
                <input
                  type="text"
                  placeholder="Type the content you want to search"
                  className="w-full pl-4 pr-10 py-2 border border-[#1544AB] rounded-md placeholder-[#D9D9D9] text-gray-700 font-semibold"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-5 h-5 text-[#1544AB]" />
                </button>
              </div>
            </div>
            {/* Content Section */}
            <div className="flex  items-center gap-96  shadow-custom-diagonal p-5  rounded-lg">
              {/* Left Content */}
              <div className="flex flex-col max-w-xl ">
                <h2 className="text-[25px] font-[600] text-black mb-4">
                  10 Step Home Selling Guide
                </h2>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  We have summarized the information for you may need and what
                  you need to do when selling a house in 10 steps and compiled
                  it in a guide. With the 10- Step Home Selling Guide, your mind
                  will be at ease and your job will be easy.
                </p>

                <Link
                  to="/selling-guides"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

export default SellingGuidePage;
