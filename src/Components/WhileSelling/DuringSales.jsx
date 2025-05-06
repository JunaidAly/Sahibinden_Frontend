import React from "react";
import Navbar from "../Navbar";
import NavbarMenu from "../Auto360/NavbarMenu";
import Footer from "../Footer";
import CommentForm from "../Home/CommentForm";
import { Search } from "lucide-react";
import { Link } from "react-router";
function DuringSales() {
  return (
    <>
      <Navbar />
      <NavbarMenu />

      <div className="max-w-7xl mx-auto p-6  font-poppins">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10 font-poppins">
          <h1 className="text-[35px] font-[600] text-black">During Sales</h1>

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

        {/* Content Card */}
        <div className="border p-5 border-gray-200 rounded-lg overflow-hidden  mb-10 bg-white shadow-custom-diagonal">
          <div className="flex flex-col md:flex-row ">
            {/* Image Section */}
            <div className="md:w-[397px] h-48 md:h-auto">
              <img
                src="/assets/purchase.png"
                alt="Man in suit discussing vehicle purchase"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 font-poppins">
              <h2 className="text-[25px] font-semibold text-black mb-3">
                How to Perform Notary Procedures When Selling a Vehicle?
              </h2>

              <p className="text-black text-[20px] font-[400] leading-6 mb-4">
                In Türkiye, the official institution where you can make the
                transfer of your vehicle is the notary public, and the notary
                process requires great attention in the vehicle sales process.
                Because legal procedures may seem complicated to some buyers and
                sellers. For this reason, you should give importance to notary
                transactions and act carefully to avoid problems. You can start
                the sales process with a deposit first. The ...
              </p>

              <div className="flex justify-between items-center">
                <Link to="/purchase-details">
                  <h3 className="text-[#1544AB] text-sm font-medium">More</h3>
                </Link>

                <span className="text-xs font-[500] text-[#D9D9D9]">
                  2h45m Read
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="border p-5 border-gray-200 rounded-lg overflow-hidden bg-white shadow-custom-diagonal">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-[397px] h-48 md:h-auto">
              <img
                src="/assets/purchase.png"
                alt="Man in suit discussing vehicle purchase"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 font-poppins">
              <h2 className="text-[25px] font-semibold text-black mb-3">
                How Can I Get Money During Sale?
              </h2>

              <p className="text-black text-[20px] font-[400] leading-6 mb-4">
                According to the data of the Turkish Statistical Institute
                (TUIK), there are more than 20 million vehicles in traffic in
                our country. This number is increasing with the new vehicle
                sales that take place every year. In addition, transactions such
                as handover and transfer are carried out in second-hand vehicles
                currently in traffic. Money transfer in vehicle sales is one of
                the most important issues you should pay attention to......
              </p>

              <div className="flex justify-between items-center">
                <a href="#" className="text-[#1544AB] text-sm font-medium">
                  More
                </a>

                <span className="text-xs font-[500] text-[#D9D9D9]">
                  2h45m Read
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommentForm />
      <Footer />
    </>
  );
}

export default DuringSales;
