import React from 'react'
import { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";
import Navbar from '../Navbar';
import NavbarMenu from './NavbarMenu';
import Footer from '../Footer';
import CommentForm from '../Home/CommentForm';


export const CreditOffers = () => {
  const [activeTab, setActiveTab] = useState('consumer');
  const [loanAmount, setLoanAmount] = useState('');
  const [maturityOpen, setMaturityOpen] = useState(false);
  const [selectedMaturity, setSelectedMaturity] = useState('');

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
    console.log('Calculating loan with:', { loanAmount, selectedMaturity, type: activeTab });
    // Implement loan calculation logic
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-custom-diagonal mt-4 overflow-hidden">
      <div className="p-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Loan Form */}
          <div className="w-full md:w-1/3 shadow-custom-diagonal p-6 bg-white rounded-lg">
            {/* Tabs */}
            <div className="flex rounded-full overflow-hidden border border-[#1544AB] mb-4">
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
              <button
                className={`flex-1 py-2 text-sm rounded-full font-medium ${
                  activeTab === "vehicle"
                    ? "bg-[#1544AB] text-white"
                    : "bg-white text-[#1544AB]"
                }`}
                onClick={() => handleTabChange("vehicle")}
              >
                Vehicle Loan
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
              Housing Loan Offers
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
              <div className="relative w-[275px] h-[275px]">
                <div className="absolute">
                  <div className="w-[275px] h-[275px]">
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
      </div>
    </div>
  );
};


const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="shadow-custom    rounded-lg">
      <button
        className="w-full flex justify-between  items-center py-6 px-3 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[20px] text-black  font-[500]">{question}</span>
        <svg
          className={`w-5 h-5 text-black transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 20 20"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-6 px-3 text-gray-700 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQComponent = () => {
  const faqItems = [
    {
      question: "What is a housing loan?",
      answer:
        "Vehicle Valuation is a service that suggests a certain price range for each vehicle using the current ad data on sahibinden.com. You can immediately learn the accurate and reliable value of the vehicle you want to sell or buy by entering its features with Vehicle Valuation.",
    },
    {
      question:
        "What is a Consumer Loan?",
      answer:
        "Vehicle Valuation is available for all major vehicle categories including cars, motorcycles, and commercial vehicles. The service covers a wide range of makes and models in the Turkish market.",
    },
    {
      question: "Who provides the Credit Offers?",
      answer:
        "Vehicle Valuation service is available to all users of sahibinden.com. Whether you're looking to buy or sell a vehicle, you can use this service to get an estimated market value for your vehicle.",
    },
    {
      question: "I applied for a loan through sahibinden.com. Who can I get support from for my questions about the loan?",
      answer:
        "Yes, Vehicle Valuation is available both on the website and through the mobile application. You can access this service from any device at your convenience.",
    },
    {
      question:
        "How are loan rates calculated?",
      answer:
        "The vehicle value is calculated using statistical modeling based on current advertisement data, including factors such as brand, model, production year, fuel type, gear type, body type, and mileage. The calculation is based on data from advertisements published on sahibinden.com in the last 30 days.",
    },
    {
      question:
        "Why are my mobile phone and email details required?",
      answer:
        "Yes, you can access Vehicle Valuation when creating your advertisement. This helps you set a competitive price based on current market data for similar vehicles.",
    },
    {
      question: "Is my personal data safe?",
      answer:
        "In some cases, the system might not be able to provide a valuation due to insufficient data for certain vehicle models, rare configurations, or if the vehicle details entered don't match any recent advertisements in our database.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-2 font-poppins">
      <h2 className="text-[35px] text-black font-[500]  mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 ">
        {faqItems.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer}  />
        ))}
      </div>
    </div>
  );
};

const DetailedInformation = () => {
  return (
    <div className="max-w-7xl mx-auto font-poppins  py-12 px-4  ">
      <h2 className="text-2xl font-bold text-black mb-8">
        Detailed Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vehicle Damage Inquiry Section */}
        <div className="shadow-custom-diagonal rounded-lg p-6">
          <h3 className="text-[20px]  font-[500] text-black mb-4">
            What is a housing loan?
          </h3>
          <p className="text-[15px]  font-[500] text-black leading-relaxed">
            A housing loan is a type of loan given by banks on the condition
            that the house to be purchased is collateralized.
          </p>
        </div>

        {/* Vehicle Detail Inquiry Section */}
        <div className="shadow-custom-diagonal rounded-lg p-6">
          <h3 className="text-[20px]  font-[500] text-black mb-4">
            What is a Consumer Loan?
          </h3>
          <p className="text-[15px]  font-[500] text-black leading-relaxed">
            Consumer loans are a type of loan used to meet our short-term and
            low-amount cash needs. 
          </p>
        </div>
      </div>
    </div>
  );
};

function Credit() {
  return (
    <>
      <Navbar />
      <NavbarMenu />
      
      <div className='font-poppins'>
        <h2 className="text-2xl font-medium text-black ml-9 mb-4">Credit Offers</h2>
        <CreditOffers />
      </div>
      <DetailedInformation />
      <FAQComponent />
      <CommentForm />
      <Footer />
    </>
  );
}

export default Credit