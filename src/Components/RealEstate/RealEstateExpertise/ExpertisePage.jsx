import React from 'react'
import { useState } from 'react'
import Navbar from '../../Navbar'
import Footer from '../../Footer'
import NavbarMenu from '../../RealEstate/NavbarMenu'
import CommentForm from '../../Home/CommentForm'
import AppraisalForm from './AppraisalForm'


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
      question: "Who can benefit from the Real Estate Appraisal service?",
      answer:
        "Vehicle Valuation is a service that suggests a certain price range for each vehicle using the current ad data on sahibinden.com. You can immediately learn the accurate and reliable value of the vehicle you want to sell or buy by entering its features with Vehicle Valuation.",
    },
    {
      question:
        "Who provides Real Estate Appraisal services?",
      answer:
        "Vehicle Valuation is available for all major vehicle categories including cars, motorcycles, and commercial vehicles. The service covers a wide range of makes and models in the Turkish market.",
    },
    {
      question: "What is a Real Estate Appraisal Report?",
      answer:
        "Vehicle Valuation service is available to all users of sahibinden.com. Whether you're looking to buy or sell a vehicle, you can use this service to get an estimated market value for your vehicle.",
    },
    {
      question: "How can I submit a request for a Real Estate Appraisal?",
      answer:
        "Yes, Vehicle Valuation is available both on the website and through the mobile application. You can access this service from any device at your convenience.",
    },
    {
      question:
        "What are the documents required for Real Estate Appraisal service?",
      answer:
        "The vehicle value is calculated using statistical modeling based on current advertisement data, including factors such as brand, model, production year, fuel type, gear type, body type, and mileage. The calculation is based on data from advertisements published on sahibinden.com in the last 30 days.",
    },
    {
      question:
        "What is a Valuation Service Agreement?",
      answer:
        "Yes, you can access Vehicle Valuation when creating your advertisement. This helps you set a competitive price based on current market data for similar vehicles.",
    },
    {
      question: "For which cities is the Real Estate Expertise service valid?",
      answer:
        "In some cases, the system might not be able to provide a valuation due to insufficient data for certain vehicle models, rare configurations, or if the vehicle details entered don't match any recent advertisements in our database.",
    },
     {
      question: "Where can I use the Real Estate Appraisal Report?",
      answer:
        "In some cases, the system might not be able to provide a valuation due to insufficient data for certain vehicle models, rare configurations, or if the vehicle details entered don't match any recent advertisements in our database.",
    },
     {
      question: "How is the price of the Real Estate Appraisal service determined?",
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
         {/* Real Estate */}
        <div className="shadow-custom-diagonal rounded-lg p-6">
          <h3 className="text-[20px]  font-[500] text-black mb-4">
            What is Real Estate Appraisal?
          </h3>
          <p className="text-[15px]  font-[500] text-black leading-relaxed">
            Real estate appraisal is a valuation study that includes not only
            the value of a house but also details such as title deed information
            and current zoning status.
          </p>
        </div>

        {/* Real Estate */}
        <div className="shadow-custom-diagonal rounded-lg p-6">
          <h3 className="text-[20px]  font-[500] text-black mb-4">
            What Information is Included in the Expert Report?
          </h3>
          <p className="text-[15px]  font-[500] text-black leading-relaxed">
            The appraisal report includes the title deed encumbrance report
            (mortgage, annotation or lien information regarding the real
            estate), current zoning status, official documents examined by the
            municipality, factors affecting the value of the real estate,
            comparables and a price valuation table.
          </p>
        </div>
      </div>
    </div>
  );
};



function ExpertisePage() {
  return (
    <>
    <Navbar />
    <NavbarMenu />
    <div className='min-h-screen font-poppins'>
        <AppraisalForm />
        <DetailedInformation />
        <FAQComponent />
    </div>
    <CommentForm />
    <Footer />
    </>
  )
}

export default ExpertisePage