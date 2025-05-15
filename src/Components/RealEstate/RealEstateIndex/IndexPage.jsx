import React from 'react'
import { useState } from 'react'
import { FaCaretDown } from "react-icons/fa";
import Navbar from '../../Navbar'
import Footer from '../../Footer'
import NavbarMenu from '../../RealEstate/NavbarMenu'
import CommentForm from '../../Home/CommentForm'
import IndexSummary from './IndexSummary';


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
      question: "What's in the Real Estate Index?",
      answer:
        "Vehicle Valuation is a service that suggests a certain price range for each vehicle using the current ad data on sahibinden.com. You can immediately learn the accurate and reliable value of the vehicle you want to sell or buy by entering its features with Vehicle Valuation.",
    },
    {
      question:
        "How are the index results presented in the Real Estate Index generated?",
      answer:
        "Vehicle Valuation is available for all major vehicle categories including cars, motorcycles, and commercial vehicles. The service covers a wide range of makes and models in the Turkish market.",
    },
    {
      question: "Why are some districts and neighborhoods not included in the Real Estate Index?",
      answer:
        "Vehicle Valuation service is available to all users of sahibinden.com. Whether you're looking to buy or sell a vehicle, you can use this service to get an estimated market value for your vehicle.",
    },
    {
      question: "Are the data in the Real Estate Index up-to-date?",
      answer:
        "Yes, Vehicle Valuation is available both on the website and through the mobile application. You can access this service from any device at your convenience.",
    },
    {
      question:
        "How many locations can I compare in the Property Index?",
      answer:
        "The vehicle value is calculated using statistical modeling based on current advertisement data, including factors such as brand, model, production year, fuel type, gear type, body type, and mileage. The calculation is based on data from advertisements published on sahibinden.com in the last 30 days.",
    },
    {
      question:
        "Can I create as many indices as I want in the Real Estate Index?",
      answer:
        "Yes, you can access Vehicle Valuation when creating your advertisement. This helps you set a competitive price based on current market data for similar vehicles.",
    },
    {
      question: "What is the Amortization Period?",
      answer:
        "In some cases, the system might not be able to provide a valuation due to insufficient data for certain vehicle models, rare configurations, or if the vehicle details entered don't match any recent advertisements in our database.",
    },
     {
      question: "How to prepare Demographic Information?",
      answer:
        "In some cases, the system might not be able to provide a valuation due to insufficient data for certain vehicle models, rare configurations, or if the vehicle details entered don't match any recent advertisements in our database.",
    },
     {
      question: "How is the 6 Month Forecast data generated?",
      answer:
        "In some cases, the system might not be able to provide a valuation due to insufficient data for certain vehicle models, rare configurations, or if the vehicle details entered don't match any recent advertisements in our database.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-2 mt-12 font-poppins">
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


function IndexPage() {
return (
  <>
    <Navbar />
    <NavbarMenu />
    <div className="min-h-screen font-poppins">
      <div className="relative font-poppins bg-cover bg-center bg-[#00000040]">
        <img
          src="/assets/vehicleguidebg.png"
          alt="Vehicle Guide"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center max-w-7xl mx-auto p-6">
          <h1 className="text-[60px] font-[500] text-white text-center mb-4">
            Real Estate Index
          </h1>
          <p className="text-white text-center font-poppins mb-10 font-[500] text-[20px]">
            Create an index in any location you want to examine Turkiye’s most
            comprehensive real estate index.
          </p>
          <div className="flex flex-row justify-center items-center gap-2">
            {[1, 2, 3, 4].map((_, idx) => (
              <div key={idx} className="relative">
                <select className="col-span-1 p-3 pr-10 rounded border border-primaryBlue appearance-none">
                  <option value="" disabled selected>
                    House for sale
                  </option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="detached">Detached House</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-primaryBlue">
                  <FaCaretDown size={24} />
                </span>
              </div>
            ))}
            <button className="col-span-1 py-3 px-8 bg-primaryBlue text-white rounded font-semibold">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto mt-12 shadow-custom-diagonal px-5 py-10 bg-white rounded-lg">
        <div className="flex flex-row justify-center items-center">
          <h1 className="text-3xl font-bold text-center  leading-tight">
            Sahibindex Housing Market Outlook
          </h1>
        </div>
        <div className="flex flex-row justify-center items-center p-6">
          <p className="text-black  text-center">
            You can access the sahibindex Housing Market Outlook monthly reports
            prepared in collaboration with the Bahcesehir University Economic
            and Social Research Center (BETAM) and Sahibinden.com
          </p>
        </div>
        <div className='flex justify-center'>
        <button className="py-3 px-8  bg-primaryBlue text-white rounded font-semibold">
          Go to reports Page
        </button>
        </div>
      </div>
    </div>
    <IndexSummary />
    <FAQComponent />  
    <CommentForm />
    <Footer />
  </>
);
}

export default IndexPage