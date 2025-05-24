import React from 'react'
import Navbar from '../../../Navbar'
import Footer from '../../../Footer'
import NavbarMenu from '../../NavbarMenu'
import CommentForm from '../../../Home/CommentForm'
import { Search } from "lucide-react";
import { Link } from "react-router-dom";


function AfterLease() {
  return (
    <>
      <Navbar />
      <NavbarMenu />
      <div className="max-w-7xl mx-auto p-6  font-poppins">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 font-poppins">
          <h1 className="text-[35px] font-[600] text-black">After Lease</h1>

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
                Why is a Management Plan Important for Apartment and Site
                Residents?
              </h2>

              <p className="text-black text-[20px] font-[400] leading-6 mb-4">
                The management style of an apartment or site and the rules such
                as the salaries to be received by the managers are determined by
                the management plan. According to Article 28 of the Law on
                Condominiums No. 634, the management plan is a contract binding
                on all condominium owners. In case of disagreements regarding an
                article not included in the management plan, the articles of the
                relevant law are applied.
              </p>

              <div className="flex justify-between items-center">
                <Link
                  to={"/after-lease-overview"}
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
                What are Tenant Rights in Urban Transformation?
              </h2>

              <p className="text-black text-[20px] font-[400] leading-6 mb-4">
                Within the scope of urban transformation, risky structures are
                detected in buildings upon the request of real estate owners. A
                demolition decision is made for buildings that are determined to
                risky. Tenants, like estate owners, have certain rights in house
                where a demolition decision is made.
              </p>

              <div className="flex justify-between items-center">
                <Link
                  to={"/after-lease-overview"}
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

export default AfterLease