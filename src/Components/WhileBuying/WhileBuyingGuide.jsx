import React from 'react'
import Navbar from "../Navbar";
import Footer from "../Footer";
import NavbarMenu from "../Auto360/NavbarMenu";
import CommentForm from "../Home/CommentForm";
import { Link } from "react-router-dom";
function WhileBuyingGuide() {
    const guides = [
        {
          id: "before-purchase",
          title: "Before Purchase",
          description: "Do you know what you may need before buying a property? We have prepared a comprehensive guide for you, all the information you need is here.",
          image: "/assets/purchase.png",
          path: "/before-purchase" // Add path for navigation
        },
        {
          id: "during-purchase",
          title: "During Purchase",
          description: "You have found your dream house, agreed and decided to buy. You can easily find what you need to pay attention to during the purchasing process in our guide.",
          image: "/assets/purchase.png",
          path: "/during-purchase" // Add path for navigation
        },
        {
          id: "after-purchase",
          title: "After Purchase",
          description: "if you are wondering what you need to do to keep your home safe, our post-purchase guide is the right place for you.",
          image: "/assets/purchase.png",
          path: "/after-purchase" // Add path for navigation
        }
    ];
  return (
    <>
        <Navbar />
        <NavbarMenu />
        <Link to="/vehicle-guide" >
        <div className="bg-white font-poppins rounded-lg px-8 max-w-8xl mx-auto my-6">
          {/* Title */}
          <h1 className="text-[35px] font-[600] text-black mb-8">Vehicle Buying Guide</h1>
          
          {/* Content Section */}
          <div className="flex gap-2 items-center justify-center shadow-custom-diagonal px-5 h-[220px] rounded-lg">
            {/* Left Content */}
            <div className="flex-1 w-[60%]">
              <h2 className="text-[25px] font-[600] text-black mb-4">
                Vehicle Purchasing Guide in 11 Steps
              </h2>
              
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Are you looking for car? You probably have many questions in you mind.<br />
                "11 Step Car Buying Guide" will provide you with all the answers you need<br />
                and help you buy a car.
              </p>
              
              <Link 
                to="/guides/overview" 
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

        <CommentForm />
        <Footer />
        </>
  )
}

export default WhileBuyingGuide