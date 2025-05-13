import React from "react";

function RealEstateExpertise() {
  return (
    <div className="max-w-7xl w-full mx-auto bg-white rounded-lg shadow-custom-diagonal mt-12 p-10 font-poppins overflow-hidden">
      <div className="w-full flex gap-44    ">
        <div className=" max-w-[45rem]">
          <h3 className="text-xl font-bold text-black mb-2">
            Real Estate Expertise
          </h3>
          <p className="text-black mb-2">
            You can examine the Real Estate Expertise service offered
            exclusively to sahibinden.com users and learn comprehensive
            information such as current zoning status and price valuation.
          </p>
          <p className="text-[#888F9F] text-xs mb-4">
            Real Estate Expertise is provided by EVA Real Estate Appraisal
            Consultancy Inc. within the scope of the cooperation.
          </p>

          <button className="bg-[#1544AB] text-white px-6 py-2 rounded-full text-sm font-medium ">
            Send Request
          </button>
        </div>

        <div className="flex items-center">
          <div className="w-56 h-56]">
            <img
              src="/assets/creditform.png"
              alt="Credit Image"
              className="w-full h-full object-cover "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RealEstateExpertise;
