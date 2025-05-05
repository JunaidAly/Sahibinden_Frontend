
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import NavbarMenu from "../Auto360/NavbarMenu";
import CommentForm from "../Home/CommentForm";

const VehicleGuide = () => {
  const steps = [
    {
      id: 1,
      title: "Learn the Market Value of the Vehicle You Will Sell",
      description: "You can use sahibinden.com  service to find out the market value of the vehicle you will sell.",
      additionalText: "",
      hasLink: true,
      linkText: "Vehicle Valuation"
    },
    {
      id: 2,
      title: "Learn What You Can Do to Your Vehicle Before Selling, Such As Repairing and Washing",
      description: "The cosmetic appearance of the vehicles and their regular periodic maintenance affect their prices. For details, you can check out the article",
      hasLink: true,
      linkText: " What Are the Tips for Selling a Vehicle?",
      linkUrl: "#"
    },
    {
      id: 3,
      title: "Check",
      description: "Check whether the inspection is valid, whether there is a mortgage on your vehicle, and whether LPG can be installed in your vehicle.",
      additionalText: "You can contact the listing owner for the vehicles you like.",
      hasLink: false
    },
    {
      id: 4,
      title: "Advertise with Quality Photos & Interesting Descriptions",
      description: "Check out the tips for posting an ad on sahibinden.com .",
      hasLink: true,
      linkText: "Detailed Information",
      linkUrl: "#"
    },
    {
        id: 5,
        title: "How Much Should the Vehicle Deposit Be?",
        description: "If you want to take a deposit when selling your vehicle, you can take a look at the article How Much Should a Vehicle Deposit Be? to decide how much deposit you will take .",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      },
      {
        id: 6,
        title: "Prepare for Notary Procedures",
        description: "To get information about vehicle sales transactions at the notary, you can review the article What Do I Need to Do for Notary Transactions?",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
      {
        id: 7,
        title: "Decide How You Will Pay for the Vehicle",
        description: "Different financial methods can be used to pay for the vehicle.For detailed information, you can read the article What are the Methods of Paying for the Vehicle?",
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
              7 Step Car Sales Guide
            </h1>
            <p className="text-white text-center font-poppins mb-10 font-[500] text-[20px]">
              Are you selling your car? You probably wonder about many things.
              The 7-step car sales guide will help you. You can find answers to
              your questions by following the route.
            </p>
          </div>
        </div>

        {/* Timeline section */}
        <div className="max-w-7xl mx-auto font-poppins bottom-10 relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-1/2 top-16 bottom-0 w-0.5 h-full max-h-[145rem] bg-[#D9D9D9] z-0"></div>

          {steps.map((step, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={step.id}
                className="flex justify-center max-w-7xl mb-16 last:mb-0"
              >
                <div className="flex w-full  max-w-7xl">
                  {/* Left side content */}
                  {!isEven ? (
                    <div className="w-1/2  flex justify-end font-poppins">
                      <div className="bg-white p-6 rounded-lg shadow-custom-diagonal max-w-[618px] h-[300px]">
                        <h2 className="text-[25px] font-[500]  mb-2">
                          {step.title}
                        </h2>
                        <p className="text-black text-[20px] font-[500] mb-3">
                          {step.description}
                        </p>
                        {step.additionalText && (
                          <p className="text-[#1544AB] font-[500] text-[16px] ">
                            {step.additionalText}
                          </p>
                        )}
                        {step.hasLink && (
                          <a
                            href={step.linkUrl}
                            className="text-[#1544AB] font-[500] text-[16px] block mt-2"
                          >
                            {step.linkText}
                          </a>
                        )}
                      </div>
                      <img
                        src="/assets/Polygon.png"
                        className="w-10 h-10 relative right-2 top-[38px]"
                      />
                    </div>
                  ) : (
                    <div className="w-1/2"></div>
                  )}

                  {/* Circle with number */}
                  <div className="flex items-center justify-center mb-[12rem] z-10">
                    <div className="flex items-center justify-center w-[75px] h-[75px] bg-[#1544AB] text-white rounded-full font-bold text-lg">
                      {step.id}
                    </div>
                  </div>

                  {/* Right side content */}
                  {isEven ? (
                    <div className="w-1/2 pl-8">
                      <div className="bg-white p-6 rounded-lg shadow-custom-diagonal max-w-[618px] h-[300px]">
                        <h2 className="text-[25px] font-[500] mb-2">
                          {step.title}
                        </h2>
                        <p className="text-black text-[20px] mb-3">
                          {step.description}
                        </p>
                        {step.additionalText && (
                          <p className="text-[#1544AB] font-[500] text-[16px]">
                            {step.additionalText}
                          </p>
                        )}
                        {step.hasLink && (
                          <a
                            href={step.linkUrl}
                            className="text-[#1544AB] font-[500] text-[16px] block mt-2"
                          >
                            {step.linkText}
                          </a>
                        )}
                      </div>
                      <img
                        src="/assets/Polygon2.png"
                        className="w-10 h-10 relative right-7 bottom-[15.5rem]"
                      />
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