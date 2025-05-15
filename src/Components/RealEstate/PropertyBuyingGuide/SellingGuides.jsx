import React from 'react'
import Navbar from '../../Navbar'
import Footer from '../../Footer'
import NavbarMenu from '../NavbarMenu'
import CommentForm from '../../Home/CommentForm'
function SellingGuides() {
     const steps = [
    {
      id: 1,
      title: "Check the Property Value Trend in Your Area",
      description: "You can easily decide on the sales price by learning the price changes per square meter in your home's area.",
      additionalText: "Check Real Estate Index",
      hasLink: false
    },
     {
      id: 2,
      title: "Determine the Sales Price Realistically",
      description: "You can determine the sales price by learning the values ​​of similar properties that have been sold recently. Setting the price realistically ensures mutual trust between the parties.",
      hasLink: true,
      linkText: "Detailed Information",
      linkUrl: "#"
    },
    {
      id: 3,
      title: "Make Necessary Renovations",
      description: "One of the most important things to do when selling a house is to fix the house's shortcomings. Problem areas on the ceiling, floor and walls should be repaired, and if necessary, the kitchen and bathroom should be renovated.",
      hasLink: true,
      linkText: "Detailed Information",
      linkUrl: "#"
    },
    {
      id: 4,
      title: "Keep the House Clean and Well-Maintained",
      description: "The airiness of the house is one of the factors that will affect potential buyers who will visit the house. You can increase the possibility of your house being sold by keeping it airy and clean.",
      hasLink: true,
      linkText: "Detailed Information",
      linkUrl: "#"
    },
   
    {
        id: 5,
        title: "Take Care When Taking Ad Photos",
        description: "Carefully taken photos increase the number of potential buyers for your home. After you have tidied up your home, you can make it stand out by taking a photo of it.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      },
      {
        id: 6,
        title: "Post a Perfect Ad on sahibinden.com",
        description: "What ensures that the real estate for sale meets its buyer is a complete and correctly prepared real estate advertisement. In order to prepare a perfect home sale advertisement, all details should be taken into consideration.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
      {
        id: 7,
        title: "Get Support from Real Estate Sales Consultants",
        description: "Real estate consultants can support you at every stage of the home selling process by evaluating many factors that affect the features, location and price of the home to be sold.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
      {
        id: 8,
        title: "Pay off previous home debts",
        description: "Debts such as electricity, water and natural gas remaining from the use of the previous tenant or real estate owner must be paid before the sale.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
      {
        id: 9,
        title: "Clarify Payment Terms with Buyer",
        description: "Before proceeding with the title deed transfer process,it is beneficial for the real estate owner and the buyer to determine the payment method.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
      {
        id: 10,
        title: "Prepare Title Deed Transfer Documents",
        description: "The official sale of the house is carried out at the General Directorate of Land Registry and Cadastre. Learn the documents required for title deed transfer in order to complete the transactions quickly.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
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
              10 Step Home Selling Guide
            </h1>
            <p className="text-white text-center font-poppins mb-10 font-[500] text-[20px]">
              We have summarized the information you may need and what you need
              to do when selling a house in 10 steps and compiled it in a guide.
              With the 10-Step Home Selling Guide, your mind is at ease and your
              job is easy!
            </p>
          </div>
        </div>

        {/* Timeline section */}
        <div className="max-w-7xl mx-auto font-poppins bottom-10 relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-1/2 top-16 bottom-0 w-0.5 h-full max-h-[215rem] bg-[#D9D9D9] z-0"></div>

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
}

export default SellingGuides