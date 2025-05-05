import React from 'react'
import Navbar from "../Navbar";
import Footer from "../Footer";
import NavbarMenu from "../Auto360/NavbarMenu";
import CommentForm from "../Home/CommentForm";
import { Link } from "react-router-dom";
function WhileSellingGuide() {
    const guides = [
        {
          id: "pre-sales",
          title: "Pre-Sales",
          description: "You can find answers to many of your questions, from calculating the value of your vehicle to tips on selling it, from deposits to mortgage....",
          image: "/assets/whileselling.png",
          path: "/before-purchase" // Add path for navigation
        },
        {
          id: "during-sales",
          title: "During Sales",
          description: "Easily learn the answers to your questions during sales, from notary procedures to payment methods.",
          image: "/assets/whileselling.png",
          path: "/during-purchase" // Add path for navigation
        },
  
    ];
  return (
    <>
      <Navbar />
      <NavbarMenu />
      <Link to="/vehicle-guide-selling">
        <div className="bg-white font-poppins rounded-lg px-8 max-w-8xl mx-auto my-6">
          {/* Title */}
          <h1 className="text-[35px] font-[600] text-black mb-8">
            Vehicle Buying Guide
          </h1>

          {/* Content Section */}
          <div className="flex gap-2 items-center justify-center shadow-custom-diagonal px-5 h-[220px] rounded-lg">
            {/* Left Content */}
            <div className="flex-1 w-[60%]">
              <h2 className="text-[25px] font-[600] text-black mb-4">
                7 Steps Car Sales Guide
              </h2>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Are you selling your car? You probably have many questions in
                you mind. “7 Step Car Selling Guide” will provide you with all
                the answers you need and help you with car sales.
              </p>

              <Link
                to="/vehicle-guide-selling"
                className="text-sm text-[#1544AB] font-medium hover:underline"
              >
                More
              </Link>
            </div>

            {/* Right Image */}
            <div className="w-80">
              <img
                src="/assets/vehicledamage.png"
                alt="Black SUV vehicle"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </Link>

      <div className="max-w-7xl w-full mx-auto p-6 font-poppins shadow-custom-diagonal rounded-lg">
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

      <CommentForm />
      <Footer />
    </>
  );
}

export default WhileSellingGuide