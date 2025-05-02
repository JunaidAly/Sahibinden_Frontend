

import React, { useState } from 'react';
import Navbar from '../Navbar'
import NavbarMenu from '../Auto360/NavbarMenu'
import Footer from '../Footer'
import CommentForm from '../Home/CommentForm'

// Import the VehicleValuationSelection component
import VehicleValuationSelection from './VehicleValuationSelection';

export const VehicleValuationInfo = ({ onNavigateToSelection }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 mb-10 md:p-8 lg:p-12 rounded-lg font-poppins shadow-custom">
      <h1 className="text-3xl text-black font-[500] mb-8">Vehicle Valuation</h1>

      <p className="text-3xl text-black font-[500] mb-8 max-w-[1300px]">
        Learn the estimated market value of the vehicle you want to buy or sell
        with our "Vehicle Valuation Service"! This service is offered by
        utilizing the current and comprehensive ad data on sahibinden.com.
      </p>

      <button 
        onClick={onNavigateToSelection}
        className="bg-[#1544AB] text-white px-8 py-4 rounded-md text-lg font-medium w-full max-w-[352px] mb-8"
      >
        Vehicle Valuation
      </button>

      <div className="text-[#888F9F]   max-w-[1300px]">
        <p className="text-[20px] font-[600]">
          sahibinden.com is not responsible for any damages that users or third
          parties may suffer in the event that any transaction, including
          purchase or sale, is made or not made based on the information
          provided in the vehicle valuation service. The vehicle's paint, damage
          status and additional equipment features are not taken into
          consideration in the calculation.
        </p>
      </div>
    </div>
  );
};

 export const VehicleValuationCartInfo = () => {
        return (
          <div className="max-w-7xl mx-auto p-6 font-poppins ">
            <div className="w-full grid grid-cols-1  md:grid-cols-3 gap-20">
              {/* What is Vehicle Valuation Section */}
              <div className='shadow-custom p-4 rounded-lg'>
                <h2 className="text-[25px] font-[500] text-black w-max mb-4">What is Vehicle Valuation?</h2>
                <p className="text-[20px] font-[400] text-black  leading-relaxed">
                  Vehicle Valuation is a service that suggests a certain price range for each vehicle using the current ad data on sahibinden.com. You can immediately learn the accurate and reliable value of the vehicle you want to sell or buy by entering its features with Vehicle Valuation.
                </p>
              </div>
              
              {/* How Do We Calculate Section */}
              <div className='shadow-custom p-4 rounded-lg'>
                <h2 className="text-[25px] font-[500] text-black mb-4">How Do We Calculate?</h2>
                <p className="text-[20px] font-[400] text-black  leading-relaxed">
                  It is calculated using statistical modeling created using variables such as vehicle brand, model, production year, fuel type, gear type, body type and mileage and the price published in the advertisement, according to the advertisement data published on sahibinden.com in the last 30 days. The vehicle's paint, damage status, whether the body has been renovated and additional equipment features are not taken into consideration in the calculation.
                </p>
              </div>
              
              {/* Important Information Section */}
              <div className='shadow-custom p-4 rounded-lg'>
                <h2 className="text-[25px] font-[500] text-black mb-4">Important Information</h2>
                <p className="text-[20px] font-[400] text-black  leading-relaxed">
                  sahibinden.com is not responsible for any damages that users or third parties may suffer if any transaction, including purchase or sale, is made or not made based on the information provided in the vehicle valuation service.
                </p>
              </div>
            </div>
          </div>
        );
      };


      const FAQItem = ({ question, answer }) => {
        const [isOpen, setIsOpen] = useState(false);
      
        return (
          <div className="shadow-custom   px-4 rounded-lg">
            <button
              className="w-full flex justify-between  items-center py-6 px-0 text-left focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="text-[20px] text-black font-[500]">{question}</span>
              <svg
                className={`w-5 h-5 text-black transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="pb-6 text-gray-700 text-sm leading-relaxed">
                {answer}
              </div>
            )}
          </div>
        );
      };
      
    export  const FAQComponent = () => {
        const faqItems = [
          {
            question: "What is Vehicle Valuation?",
            answer: "Vehicle Valuation is a service that suggests a certain price range for each vehicle using the current ad data on sahibinden.com. You can immediately learn the accurate and reliable value of the vehicle you want to sell or buy by entering its features with Vehicle Valuation."
          },
          {
            question: "In which categories it is available?",
            answer: "Vehicle Valuation is available for all major vehicle categories including cars, motorcycles, and commercial vehicles. The service covers a wide range of makes and models in the Turkish market."
          },
          {
            question: "Who can use it?",
            answer: "Vehicle Valuation service is available to all users of sahibinden.com. Whether you're looking to buy or sell a vehicle, you can use this service to get an estimated market value for your vehicle."
          },
          {
            question: "Can I also use Vehicle Valuation via the mobile app?",
            answer: "Yes, Vehicle Valuation is available both on the website and through the mobile application. You can access this service from any device at your convenience."
          },
          {
            question: "How is the value of the vehicle calculated?",
            answer: "The vehicle value is calculated using statistical modeling based on current advertisement data, including factors such as brand, model, production year, fuel type, gear type, body type, and mileage. The calculation is based on data from advertisements published on sahibinden.com in the last 30 days."
          },
          {
            question: "Can I use this service when posting an ad?",
            answer: "Yes, you can access Vehicle Valuation when creating your advertisement. This helps you set a competitive price based on current market data for similar vehicles."
          },
          {
            question: "I inquired about my vehicle but I could not find out its value. Why?",
            answer: "In some cases, the system might not be able to provide a valuation due to insufficient data for certain vehicle models, rare configurations, or if the vehicle details entered don't match any recent advertisements in our database."
          }
        ];
      
        return (
          <div className="max-w-7xl mx-auto p-6 font-poppins">
            <h2 className="text-[35px] text-black font-[500]  mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        );
      };

function VehicleValuation() {
  const [showSelection, setShowSelection] = useState(false);

  const handleNavigateToSelection = () => {
    setShowSelection(true);
  };

  return (
    <>
    <Navbar/>
    <NavbarMenu/>
    {showSelection ? <div className='flex items-center justify-center'><VehicleValuationSelection/></div>  : <VehicleValuationInfo onNavigateToSelection={handleNavigateToSelection}/>}
    <VehicleValuationCartInfo/>
    <FAQComponent/>
    <CommentForm/>
    <Footer/>
    </>
  )
}

export default VehicleValuation