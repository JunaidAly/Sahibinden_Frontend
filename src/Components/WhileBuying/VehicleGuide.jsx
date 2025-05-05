
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import NavbarMenu from "../Auto360/NavbarMenu";
import CommentForm from "../Home/CommentForm";

const VehicleGuide = () => {
  const steps = [
    {
      id: 1,
      title: "Determine the Right Vehicle for You",
      description: "The answers to many questions that come to your mind such as \"New or Second-Hand?\", \"Gasoline or Diesel?\" affect your vehicle selection.",
      additionalText: "How Can I Find the Right Car for Me?",
      hasLink: false
    },
    {
      id: 2,
      title: "Learn the Market Value of the Vehicle",
      description: "You can learn the estimated market value of the vehicle you are considering purchasing through the Vehicle Valuation service.",
      hasLink: true,
      linkText: "Detailed Information",
      linkUrl: "#"
    },
    {
      id: 3,
      title: "Search for a Vehicle and Contact the Advertiser",
      description: "After deciding on the vehicle model you will buy, you can search on sahibinden.com. You can save your searches and be notified when new listings suitable for you arrive.",
      additionalText: "You can contact the listing owner for the vehicles you like.",
      hasLink: false
    },
    {
      id: 4,
      title: "How Much Should the Vehicle Deposit Be?",
      description: "A deposit is usually requested when buying or selling a vehicle. You can take a look at the article How Much Should a Vehicle Deposit Be?",
      hasLink: true,
      linkText: "Detailed Information",
      linkUrl: "#"
    },
    {
        id: 5,
        title: "Check",
        description: "When you contact the seller and see the vehicle on site Inquiry into the damage to the vehicle You should take a test drive with the vehicle It is recommended that you check the vehicle registration information and chassis information.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      },
      {
        id: 6,
        title: "Learn",
        description: "Find out if the vehicle has a spare key , the mileage of the vehicle by examining the service report, how much time is left until the last inspection by checking the last inspection report , and the vehicle's penalty and debt status .",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
      {
        id: 7,
        title: "Have the Vehicle Appraised",
        description: "You can benefit from the Auto Expertise service to have the vehicle you want to buy appraised through the business partners of aracasahibinden.com .You can have the vehicle you want to buy appraised through authorized auto appraisal companies.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
      {
        id: 8,
        title: "Check Out Credit Opportunities",
        description: "If you want to use credit, you can benefit from the Credit Offers service.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
      {
        id: 9,
        title: "Prepare for Notary Procedures",
        description: "To get information about vehicle sales transactions at the notary, you can review the article What Do I Need to Do for Notary Transactions?",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
      {
        id: 10,
        title: "Decide How You Will Pay for the Vehicle",
        description: "Different financial methods can be used to pay for the vehicle. For detailed information, you can read the article What are the Vehicle Payment Methods?",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
      {
        id: 11,
        title: "Get Car Insurance and Traffic Insurance",
        description: "You can secure your vehicle with Comprehensive and Traffic Insurance provided by insurance companies.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
  ];

  return (
    <>
      <Navbar />
      <NavbarMenu />

      <div>
        <div className="relative font-poppins bg-cover bg-center bg-[#00000040]">
          <img
            src="/assets/vehicleguidebg.png"
            alt="Vehicle Guide"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center max-w-7xl mx-auto p-6">
            <h1 className="text-[60px] font-[500] text-white text-center mb-4">
              Vehicle Purchasing Guide in 11 Steps
            </h1>
            <p className="text-white text-center font-poppins mb-10 font-[500] text-[20px]">
              Are you looking for a car? You are probably wondering about many
              things. The 11-step car buying guide will help you. You can find
              answers to your questions by following the route.
            </p>
          </div>
        </div>
        
        {/* Timeline section */}
        <div className="max-w-7xl mx-auto font-poppins py-12 relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-1/2 top-24 bottom-0 w-0.5 h-full max-h-[230rem] bg-gray-200 z-0"></div>
          
          {steps.map((step, index) => {
            const isEven = index % 2 === 1;
            
            return (
              <div key={step.id} className="flex justify-center max-w-7xl mb-16 last:mb-0">
                <div className="flex w-full gap- max-w-7xl">
                  {/* Left side content */}
                  {!isEven ? (
                    <div className="w-1/2 pr-8 flex justify-end">
                      <div className="bg-white p-6 rounded-lg shadow-md max-w-[618px] h-[300px]">
                        <h2 className="text-xl font-bold mb-2">{step.title}</h2>
                        <p className="text-gray-700 mb-3">{step.description}</p>
                        {step.additionalText && (
                          <p className="text-gray-700 text-sm italic">
                            {step.additionalText}
                          </p>
                        )}
                        {step.hasLink && (
                          <a href={step.linkUrl} className="text-blue-600 text-sm font-medium hover:underline block mt-2">
                            {step.linkText}
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="w-1/2"></div>
                  )}
                  
                  {/* Circle with number */}
                  <div className="flex items-center justify-center mb-[10rem] z-10">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-lg">
                      {step.id}
                    </div>
                  </div>
                  
                  {/* Right side content */}
                  {isEven ? (
                    <div className="w-1/2 pl-8">
                      <div className="bg-white p-6 rounded-lg shadow-md max-w-[618px] h-[300px]">
                        <h2 className="text-xl font-bold mb-2">{step.title}</h2>
                        <p className="text-gray-700 mb-3">{step.description}</p>
                        {step.additionalText && (
                          <p className="text-gray-700 text-sm italic">
                            {step.additionalText}
                          </p>
                        )}
                        {step.hasLink && (
                          <a href={step.linkUrl} className="text-blue-600 text-sm font-medium hover:underline block mt-2">
                            {step.linkText}
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="w-1/2"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <CommentForm />
      <Footer />
    </>
  );
};

export default VehicleGuide;