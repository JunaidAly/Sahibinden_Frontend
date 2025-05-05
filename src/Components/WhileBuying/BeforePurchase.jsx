import React from "react";
import Navbar from "../Navbar";
import NavbarMenu from "../Auto360/NavbarMenu";
import Footer from "../Footer";
import CommentForm from "../Home/CommentForm";
import { Search } from "lucide-react";

function BeforePurchase() {
  return (
    <>
      <Navbar />
      <NavbarMenu />

      <div className="max-w-7xl mx-auto p-6  font-poppins">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 font-poppins">
          <h1 className="text-[35px] font-[600] text-black">Before Purchase</h1>

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
        <div className="border p-5 border-gray-200 rounded-lg overflow-hidden bg-white shadow-custom-diagonal mb-10">
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
                Which Houses Fall into the Defective Category?
              </h2>

              <p className="text-black text-[20px] font-[400] leading-6 mb-4">
                Defective housing is a real estate that does not meet the
                specifications specified by the seller, does not meet the agreed
                technical specifications, and prevents the buyer from benefiting
                from the house as required. Law No. 6506 on Consumer Protection
                states that the seller is responsible for defective goods and
                the buyer has certain rights in this case.
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
                How to Get a Housing Loan?
              </h2>

              <p className="text-black text-[20px] font-[400] leading-6 mb-4">
                Owning a home is a dream for many people. If you have this dream
                but do not have enough savings, you can make your dreams come
                true by taking out a loan from the banks. While banks used to
                respond to all loan requests with consumer loans, with the
                housing loan system (Mortgage) that came into effect in the
                past, getting a loan has become much easier for those who want
                to buy a house....
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

export default BeforePurchase