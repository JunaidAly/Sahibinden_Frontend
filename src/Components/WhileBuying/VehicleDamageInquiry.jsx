import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import NavbarMenu from "../Auto360/NavbarMenu";
import CommentForm from "../Home/CommentForm";

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

export const FAQComponent = () => {
  const faqItems = [
    {
      question: "What is Vehicle Valuation?",
      answer:
        "Vehicle Valuation is a service that suggests a certain price range for each vehicle using the current ad data on sahibinden.com. You can immediately learn the accurate and reliable value of the vehicle you want to sell or buy by entering its features with Vehicle Valuation.",
    },
    {
      question: "In which categories it is available?",
      answer:
        "Vehicle Valuation is available for all major vehicle categories including cars, motorcycles, and commercial vehicles. The service covers a wide range of makes and models in the Turkish market.",
    },
    {
      question: "Who can use it?",
      answer:
        "Vehicle Valuation service is available to all users of sahibinden.com. Whether you're looking to buy or sell a vehicle, you can use this service to get an estimated market value for your vehicle.",
    },
    {
      question: "Can I also use Vehicle Valuation via the mobile app?",
      answer:
        "Yes, Vehicle Valuation is available both on the website and through the mobile application. You can access this service from any device at your convenience.",
    },
    {
      question: "How is the value of the vehicle calculated?",
      answer:
        "The vehicle value is calculated using statistical modeling based on current advertisement data, including factors such as brand, model, production year, fuel type, gear type, body type, and mileage. The calculation is based on data from advertisements published on sahibinden.com in the last 30 days.",
    },
    {
      question: "Can I use this service when posting an ad?",
      answer:
        "Yes, you can access Vehicle Valuation when creating your advertisement. This helps you set a competitive price based on current market data for similar vehicles.",
    },
    {
      question:
        "I inquired about my vehicle but I could not find out its value. Why?",
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

export const DetailedInformation = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Detailed Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vehicle Damage Inquiry Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What is Vehicle Damage Inquiry Service?
          </h3>
          <p className="text-gray-600 leading-relaxed">
            It is a service where you can find out whether a vehicle has been
            involved in an accident before it leaves so or not. In the case of
            the accident, the cause of the accident and the amount of damage.
            You can easily make inquiries and have the damage calculation with
            this private insurance system.
          </p>
        </div>

        {/* Vehicle Detail Inquiry Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What is Vehicle Detail Inquiry Service?
          </h3>
          <p className="text-gray-600 leading-relaxed">
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

const VehicleDamageInquiry = () => {
    const [selectedTab, setSelectedTab] = useState("damage");
    const [selectedOption, setSelectedOption] = useState("plate");
    const [plateNumber, setPlateNumber] = useState("");
  
    return (
      <>
        <Navbar />
        <NavbarMenu />
        <div className="flex items-center justify-center font-poppins">
          <div className="flex flex-row justify-center items-center  shadow-custom-diagonal max-w-[1360px] lg:max-w-7xl rounded-lg overflow-hidden">
            {/* Left Panel */}
            <div className="max-w-[500px] flex flex-col items-center justify-center shadow-custom-diagonal rounded-lg  bg-white m-6 p-3">
              {/* Tabs */}
              <div className="flex justify-center items-center  h-[41px] w-[400px] mb-6 bg-white border border-[#1F4EC9] rounded-full">
                <button
                  onClick={() => setSelectedTab("damage")}
                  className={`w-1/2 px-[1px] font-[500] text-[15px] py-2 rounded-full ${
                    selectedTab === "damage"
                      ? "bg-[#1544AB] text-white"
                      : "bg-transparent text-[#1544AB]"
                  }`}
                >
                  Vehicle Damage Inquiry
                </button>
                <button
                  onClick={() => setSelectedTab("detail")}
                  className={`w-1/2 font-[500] text-[15px] px-[1px] py-2 rounded-full ${
                    selectedTab === "detail"
                      ? "bg-[#1544AB] text-white"
                      : "bg-transparent text-[#1544AB]"
                  }`}
                >
                  Vehicle Detail Inquiry
                </button>
              </div>
              {/* Radio Buttons */}
              <div className="flex items-center justify-center space-x-8 mb-6">
                <div className="flex items-center">
                  <div
                    onClick={() => setSelectedOption("plate")}
                    className={`w-5 h-5 rounded-full border-2 mr-2 cursor-pointer flex items-center justify-center ${
                      selectedOption === "plate"
                        ? "border-[#1544AB]"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedOption === "plate" && (
                      <div className="w-3 h-3 rounded-full bg-[#1544AB]" />
                    )}
                  </div>
                  <span className="text-gray-700">Plate Number</span>
                </div>
                <div className="flex items-center">
                  <div
                    onClick={() => setSelectedOption("chassis")}
                    className={`w-5 h-5 rounded-full border-2 mr-2 cursor-pointer flex items-center justify-center ${
                      selectedOption === "chassis"
                        ? "border-[#1544AB]"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedOption === "chassis" && (
                      <div className="w-3 h-3 rounded-full bg-[#1544AB]" />
                    )}
                  </div>
                  <span className="text-gray-700">Chassis No.</span>
                </div>
              </div>

              {/* Input Field */}
              <input
                type="text"
                placeholder="Plate Number"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                className="w-[322px] h-[60px] px-4 py-3 border border-[#1544AB] placeholder:text-[15px] placeholder:text-black rounded-lg mb-6 "
              />

              {/* Button - Dynamic text based on selected tab */}
              <button className="w-[323px] bg-[#1544AB] text-white py-3 rounded-full font-medium mb-6 text-[15px]">
                {selectedTab === "damage"
                  ? "Vehicle Damage Inquiry"
                  : "Vehicle Detail Inquiry"}
              </button>

              {/* Link */}
              <a
                href="#"
                className="text-[#1544AB] text-[15px] font-[400]  block text-center"
              >
                My Past Queries
              </a>
            </div>

            {/* Right Panel */}
            <div className="w-[75%] bg-white p-6 flex flex-row justify-center gap-3 ">
              <div className="max-w-[400px]">
                <h2 className="text-3xl w-max font-[600] text-black mb-4">
                  Vehicle Damage Inquiry
                </h2>
                <p className="text-black mb-4 font-[400] text-[16px]  max-w-[400px]">
                  You can learn the damage information or vehicle details of any
                  vehicle you want by using its plate or chassis number. <br />{" "}
                  <br />
                  Log in with your corporate account to get special pricing for
                  corporate account holders.
                </p>
              </div>

              {/* Car Image Placeholder */}
              <div className="w-full max-w-3xl">
                <img
                  src="/assets/vehicledamage.png"
                  alt="Black SUV vehicle"
                  className="w-full h-auto object-contain"
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
    );
  };

export default VehicleDamageInquiry;