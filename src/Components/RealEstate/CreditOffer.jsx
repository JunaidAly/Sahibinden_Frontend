import React from "react";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
const CreditOffers = () => {
  const [activeTab, setActiveTab] = useState("consumer");
  const [loanAmount, setLoanAmount] = useState("");
  const [maturityOpen, setMaturityOpen] = useState(false);
  const [selectedMaturity, setSelectedMaturity] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleMaturityToggle = () => {
    setMaturityOpen(!maturityOpen);
  };

  const handleMaturitySelect = (option) => {
    setSelectedMaturity(option);
    setMaturityOpen(false);
  };

  const handleCalculate = () => {
    console.log("Calculating loan with:", {
      loanAmount,
      selectedMaturity,
      type: activeTab,
    });
    // Implement loan calculation logic
  };

  return (
    <>
    
    <div className="w-full max-w-[82rem] mx-auto  my-14  ">
    <h1 className="mt-8 mb-4 ml-4 font-poppins text-xl font-medium">Cradit Offers</h1>
      <div className="  w-full max-w-7xl m-auto  bg-white shadow-custom-right rounded-lg p-5   ">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Loan Form */}
          <div className="w-full md:w-1/3 shadow-custom-diagonal p-6 bg-white rounded-lg">
            {/* Tabs */}
            <div className="flex rounded-full overflow-hidden border border-[#1544AB] mb-4">
              <button
                className={`flex-1 py-2 text-sm rounded-full font-medium ${
                  activeTab === "home"
                    ? "bg-[#1544AB] text-white"
                    : "bg-white text-[#1544AB]"
                }`}
                onClick={() => handleTabChange("home")}
              >
                Home Loan
              </button>
              <button
                className={`flex-1 py-2 text-sm rounded-full font-medium ${
                  activeTab === "consumer"
                    ? "bg-[#1544AB] text-white"
                    : "bg-white text-[#1544AB]"
                }`}
                onClick={() => handleTabChange("consumer")}
              >
                Consumer Loan
              </button>
            </div>

            {/* Loan Amount Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Loan Amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full p-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1544AB]"
              />
            </div>

            {/* Maturity Dropdown */}
            <div className="mb-4 relative">
              <div
                className="w-full p-3 border border-[#1544AB]  focus:outline-none focus:ring-1 focus:ring-[#1544AB] rounded-md flex justify-between items-center cursor-pointer"
                onClick={handleMaturityToggle}
              >
                <span
                  className={
                    selectedMaturity ? "text-gray-900" : "text-gray-400"
                  }
                >
                  {selectedMaturity || "Maturity"}
                </span>
                <FaCaretDown size={24} className="text-[#1544AB]" />
              </div>

              {maturityOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                  {[
                    "12 Months",
                    "24 Months",
                    "36 Months",
                    "48 Months",
                    "60 Months",
                  ].map((option) => (
                    <div
                      key={option}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleMaturitySelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="w-full bg-[#1544AB] text-white py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Calculate Consumer Loan
            </button>
          </div>

          {/* Right Column - Description and Image */}
          <div className="w-full md:w-2/3 flex  gap-20 ">
            <div className="pr-4 max-w-xs">
              <h3 className="text-xl font-bold text-black mb-2">
                Housing Loan Offers
              </h3>
              <p className="text-black mb-4">
                When buying a house, you can easily apply for a loan by
                comparing the housing or consumer loan rates that suit you on a
                single page on sahibinden.com.
              </p>
              <a href="#" className="text-[#1544AB]  font-medium">
                Detailed Information
              </a>
            </div>

            <div className="flex items-center">
              <div className="w-60 h-60">
                <img
                  src="/assets/creditform.png"
                  alt="Credit Image"
                  className="w-full h-full object-cover "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreditOffers;
