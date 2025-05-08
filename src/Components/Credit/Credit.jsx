import React from 'react'
import { useState } from 'react';
import { MapPin, ChevronDown, Search } from 'lucide-react';
import { FaCaretDown } from "react-icons/fa";
import Navbar from '../Navbar';
import NavbarMenu from '../Auto360/NavbarMenu';
import Footer from '../Footer';
import CommentForm from '../Home/CommentForm';


const CreditOffers = () => {
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
                  activeTab === 'consumer' 
                    ? 'bg-[#1544AB] text-white' 
                    : 'bg-white text-[#1544AB]'
                }`}
                onClick={() => handleTabChange('consumer')}
              >
                Consumer Loan
              </button>
              <button
                className={`flex-1 py-2 text-sm rounded-full font-medium ${
                  activeTab === 'vehicle' 
                    ? 'bg-[#1544AB] text-white' 
                    : 'bg-white text-[#1544AB]'
                }`}
                onClick={() => handleTabChange('vehicle')}
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
                <span className={selectedMaturity ? 'text-gray-900' : 'text-gray-400'}>
                  {selectedMaturity || 'Maturity'}
                </span>
                <FaCaretDown size={24} className="text-[#1544AB]" />
              </div>
              
              {maturityOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                  {['12 Months', '24 Months', '36 Months', '48 Months', '60 Months'].map((option) => (
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
                Easily Choose The Offer That Suits You Best For Vehicle Loan Offers.
              </h3>
              <p className="text-black mb-4">
                When buying a house, you can easily apply for a loan by comparing the housing or consumer loan rates that suit you on a single page on sahibinden.com.
              </p>
              <a href="#" className="text-[#1544AB]  font-medium">
                Detailed Information
              </a>
            </div>
            
            <div className="flex items-center">
              <div className="relative w-[275px] h-[275px]">
                <div className="absolute">
                  <div  className="w-[275px] h-[275px]">
                    <img src="/assets/creditform.png" alt="Credit Image" className="w-full h-full object-cover " />
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
      question: "What is a Consumer Loan?",
      answer:
        "Vehicle Valuation is a service that suggests a certain price range for each vehicle using the current ad data on sahibinden.com. You can immediately learn the accurate and reliable value of the vehicle you want to sell or buy by entering its features with Vehicle Valuation.",
    },
    {
      question:
        "Who can benefit from Damage and Vehicle Detail Inquiry Services?",
      answer:
        "Vehicle Valuation is available for all major vehicle categories including cars, motorcycles, and commercial vehicles. The service covers a wide range of makes and models in the Turkish market.",
    },
    {
      question: "Why Should I Learn?",
      answer:
        "Vehicle Valuation service is available to all users of sahibinden.com. Whether you're looking to buy or sell a vehicle, you can use this service to get an estimated market value for your vehicle.",
    },
    {
      question: "Why are my email, first and last name required?",
      answer:
        "Yes, Vehicle Valuation is available both on the website and through the mobile application. You can access this service from any device at your convenience.",
    },
    {
      question:
        "There is an error in the damage information, what should I do?",
      answer:
        "The vehicle value is calculated using statistical modeling based on current advertisement data, including factors such as brand, model, production year, fuel type, gear type, body type, and mileage. The calculation is based on data from advertisements published on sahibinden.com in the last 30 days.",
    },
    {
      question:
        "What does the phrase Towing Certificate or Scrap Certificate in the damage reason mean?",
      answer:
        "Yes, you can access Vehicle Valuation when creating your advertisement. This helps you set a competitive price based on current market data for similar vehicles.",
    },
    {
      question: "What does KTT mean in the damage cause?",
      answer:
        "In some cases, the system might not be able to provide a valuation due to insufficient data for certain vehicle models, rare configurations, or if the vehicle details entered don't match any recent advertisements in our database.",
    },
    {
      question: "Why is the damage amount not visible in the Damage Inquiry?",
      answer:
        "In some cases, the system might not be able to provide a valuation due to insufficient data for certain vehicle models, rare configurations, or if the vehicle details entered don't match any recent advertisements in our database.",
    },
    {
      question: "Where can I get detailed information about the damage?",
      answer:
        "In some cases, the system might not be able to provide a valuation due to insufficient data for certain vehicle models, rare configurations, or if the vehicle details entered don't match any recent advertisements in our database.",
    },
    {
      question:
        "What does the phrase Car Insurance (Yes/No) in the Vehicle Details query mean?",
      answer:
        "In some cases, the system might not be able to provide a valuation due to insufficient data for certain vehicle models, rare configurations, or if the vehicle details entered don't match any recent advertisements in our database.",
    },
    {
      question:
        "What does the Total Duration with/without Insurance written in the Vehicle Detail query mean?",
      answer:
        "In some cases, the system might not be able to provide a valuation due to insufficient data for certain vehicle models, rare configurations, or if the vehicle details entered don't match any recent advertisements in our database.",
    },
    {
      question: "What does Last Ownership in the Vehicle Detail query mean?",
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
            What is a Consumer Loan?
          </h3>
          <p className="text-[15px]  font-[500] text-black leading-relaxed">
            Consumer loans are a type of loan used to meet our short-term and
            low-amount cash needs. 
          </p>
        </div>

        {/* Vehicle Detail Inquiry Section */}
        <div className="shadow-custom-diagonal rounded-lg p-6">
          <h3 className="text-[20px]  font-[500] text-black mb-4">
            What is a Vehicle Loan?
          </h3>
          <p className="text-[15px]  font-[500] text-black leading-relaxed">
            A vehicle loan is a type of personal loan that allows you to own a
            car with regular monthly payments and can be used for second-hand or
            new vehicle purchases.
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
      <div className="relative w-full overflow-hidden mt-10 bg-white">
        {/* Main content */}
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center relative z-10">
          {/* Left content */}
          <div className="w-full  font-poppins md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
            <div className="ml-14">
              <h1 className="text-5xl md:text-6xl font-bold text-[#091638] leading-tight mb-6">
                Modern living
                <br />
                for everyone
              </h1>
              <p className="text-lg text-[#091638] mb-12 max-w-lg">
                We provide a complete service for the sale, purchase or rental
                of various items. We have been operating in Spain more than 15
                years.
              </p>
            </div>

            {/* Search form */}
            <div className="bg-white relative md:w-[700px] left-20 p-4 rounded-md shadow-custom-diagonal">
              <div className="flex flex-col md:flex-row gap-5 ">
                {/* Location input */}
                <div className="relative flex-grow">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#888F9F]">
                    <MapPin size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full py-4 pl-12 pr-4 border placeholder:text-[17px] placeholder:font-[400] border-[#888F9F]  rounded-[4px]"
                  />
                </div>

                {/* Property type dropdown */}
                <div className="relative border rounded-sm w-[250px]   border-[#888F9F] flex-grow">
                  <select className="w-full py-4 px-4 appearance-none text-[#888F9F] ">
                    <option>Property type</option>
                    <option>Houses</option>
                    <option>Apartments</option>
                    <option>Cars</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown size={20} className="text-[#888F9F]" />
                  </div>
                </div>

                {/* Search button */}
                <button className="bg-[#1544AB] text-white rounded-[4px]   font-medium text-[17px] py-4 px-8 flex items-center justify-center ">
                  <Search size={20} className="mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="w-full md:w-[40%]">
            <div className="rounded-lg overflow-hidden">
              <img
                src="/assets/credit.png"
                alt="Luxury car with headlights on at sunset"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className='font-poppins'>
        <h2 className="text-[35px] font-medium text-black ml-9 mb-4">Credit Offers</h2>
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