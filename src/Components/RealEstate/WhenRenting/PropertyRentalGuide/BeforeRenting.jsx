import React from 'react'
import Navbar from '../../../Navbar'
import Footer from '../../../Footer'
import NavbarMenu from '../../NavbarMenu'
import CommentForm from '../../../Home/CommentForm'
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

function BeforeRenting() {
  return (
    <>
      <Navbar />
      <NavbarMenu />
      <div className="max-w-7xl mx-auto p-6  font-poppins">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 font-poppins">
          <h1 className="text-[35px] font-[600] text-black">Before Renting</h1>

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
                What is a Family Residence Notification and How is it Placed?
              </h2>

              <p className="text-black text-[20px] font-[400] leading-6 mb-4">
                The residence where the spouses live as long as the marriage
                continues is called the family residence. The family residence
                annotation isa regulation that prevents one spouse from selling
                or renting a residence without the permission of the other. The
                family residence annotation, which is made by adding an
                annotation to the title deed, is a legal regulation that aims to
                protect the rights of the spouses by restricting their right to
                dispose of the residence.......
              </p>

              <div className="flex justify-between items-center">
                <Link
                  to={"/before-renting-overview"}
                  className="text-[#1544AB] text-sm font-medium"
                >
                  More
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
                What is a Rent Loan and How to Apply?
              </h2>

              <p className="text-black text-[20px] font-[400] leading-6 mb-4">
                To rent a house, a lease contract is signed between the real
                estate owner and the tenant. This contract includes the
                conditions that the tenant must fulfil and the rights he/she
                has. One of the conditions in question is the rental fee. There
                are 2 items, monthly and annual rent.
              </p>

              <div className="flex justify-between items-center">
                <Link
                  to={"/before-renting-overview"}
                  className="text-[#1544AB] text-sm font-medium"
                >
                  More
                </Link>

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

export default BeforeRenting