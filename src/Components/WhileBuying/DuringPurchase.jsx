import React from "react";
import Navbar from "../Navbar";
import NavbarMenu from "../Auto360/NavbarMenu";
import Footer from "../Footer";
import CommentForm from "../Home/CommentForm";
import { Search } from "lucide-react";
import { Link } from "react-router";
function DuringPurchase() {
  return (
    <>
      <Navbar />
      <NavbarMenu />

      <div className="max-w-7xl mx-auto p-6  font-poppins">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10 font-poppins">
          <h1 className="text-[35px] font-[600] text-black">During Purchase</h1>

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
                How Can I Find Out the Market Value of the Vehicle I Will Sell?
              </h2>

              <p className="text-black text-[20px] font-[400] leading-6 mb-4">
                There are some simple steps you need to follow to find out the
                price of your car. With these applications, you can sell your
                car at its real value and get the amount you expect. You need to
                answer some questions to find out the value of your car. If you
                are the first user of your car or in other words, if you bought
                a brand new car, you know if there is any damage....
              </p>

              <div className="flex justify-between items-center">
                <Link
                  to="/purchase-details">
                <h3  className="text-[#1544AB] text-sm font-medium">
                  More
                </h3>
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
                What are the Tips for Selling a Vehicle?
              </h2>

              <p className="text-black text-[20px] font-[400] leading-6 mb-4">
                Setting a vehicle depends on many criteria and requires a lot of
                attention, in order to sell a vehicle quickly, some points need
                to be taken into consideration. For example, offering your
                vehicle for sale at a reasonable price is among the most
                important criteris. Apart hom ins you can gain trust by
                providing buyers with necessary documents such as vehicle
                inspection Information, Vehicle selling tactics....
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

export default DuringPurchase;
