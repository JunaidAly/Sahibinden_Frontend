import React from 'react'
import { useState } from 'react';
import { MapPin, ChevronDown, Search , ArrowRight,} from 'lucide-react';
import Navbar from '../Navbar';
import NavbarMenu from '../Auto360/NavbarMenu';
import Footer from '../Footer';
import CommentForm from '../Home/CommentForm';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="shadow-custom    rounded-lg">
      <button
        className="w-full flex justify-between  items-center py-6 px-0 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[20px] text-black font-[500]">{question}</span>
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
        <div className="pb-6 text-gray-700 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQComponent = () => {
  const faqItems = [
    {
      question: "Who provides the Damage and Vehicle Detail Inquiry service?",
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
    <div className="max-w-7xl mx-auto p-6 font-poppins">
      <h2 className="text-[35px] text-black font-[500]  mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
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
            What is Vehicle Damage Inquiry Service?
          </h3>
          <p className="text-[15px]  font-[500] text-black leading-relaxed">
            It is a service where you can find out whether a vehicle has been
            involved in an accident before it leaves so or not. In the case of
            the accident, the cause of the accident and the amount of damage.
            You can easily make inquiries and have the damage calculation with
            this private insurance system.
          </p>
        </div>

        {/* Vehicle Detail Inquiry Section */}
        <div className="shadow-custom-diagonal rounded-lg p-6">
          <h3 className="text-[20px]  font-[500] text-black mb-4">
            What is Vehicle Detail Inquiry Service?
          </h3>
          <p className="text-[15px]  font-[500] text-black leading-relaxed">
            It is a service where you can learn the brand and model of the
            vehicle, its registration date, its period with or without
            insurance, whether it has Insurance in force, whether there has been
            a change in plate or vehicle type, in which province it is
            registered, and the car ownership period.
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
      {/* Dot pattern background
      <div className="absolute top-0 right-0 w-[35%] h-full z-0">
        <div className="grid grid-cols-12 md:grid-cols-20 gap-2">
          {Array.from({ length: 408 }).map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-[#E1E1EC]"></div>
          ))}
        </div>
      </div> */}

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center relative z-10">
        {/* Left content */}
        <div className="w-full  font-poppins md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
        <div className='ml-14'>
          <h1 className="text-5xl md:text-6xl font-bold text-[#091638] leading-tight mb-6">
            Modern living<br />for everyone
          </h1>
          <p className="text-lg text-[#091638] mb-12 max-w-lg">
            We provide a complete service for the sale, purchase or rental of various items. We have been operating in Spain more than 15 years.
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
    <DetailedInformation />
    <FAQComponent />
    <CommentForm />
    <Footer />
    </>
  )
}

export default Credit