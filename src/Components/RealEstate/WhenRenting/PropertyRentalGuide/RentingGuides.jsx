import React from 'react'
import Navbar from '../../../Navbar'
import Footer from '../../../Footer'
import NavbarMenu from '../../NavbarMenu'
import CommentForm from '../../../Home/CommentForm'

function RentingGuides() {
     const steps = [
    {
      id: 1,
      title: "Determine Your Budget According to Your Needs",
      description: "By determining your needs and budget range before renting a house, you can quickly understand whether the house meets your expectations during the decision-making process.",
      additionalText: "Check Real Estate Index",
      hasLink: false
    },
     {
      id: 2,
      title: "Choose a Location That Meets Your Expectations",
      description: "You can learn about the social facilities and environmental conditions of the house you want to rent by evaluating the distance of the property to public transportation points, shopping malls, universities, educational institutions or hospitals.",
      hasLink: true,
      linkText: "Detailed Information",
      linkUrl: "#"
    },
    {
      id: 3,
      title: "Examine the Value Change in the Area",
      description: "You can easily examine the rental square meter prices, access demographic information such as population age distribution and education status, and choose a house that meets your expectations.",
      hasLink: true,
      linkText: "Detailed Information",
      linkUrl: "#"
    },
    {
      id: 4,
      title: "Get Support from Real Estate Consultants",
      description: "Real estate consultants can assist you at every stage, from your search for a suitable rental home to the preparation of a lease agreement.",
      hasLink: true,
      linkText: "Detailed Information",
      linkUrl: "#"
    },
   
    {
        id: 5,
        title: "Explore the surroundings of the house and learn about its social facilities",
        description: "Before deciding to rent, you can visit the neighborhood where the house is located to find out to what extent the environmental conditions meet your needs and expectations.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      },
      {
        id: 6,
        title: "Clear the Deposit",
        description: "When renting a house, the tenant gives a deposit, or security deposit, to the landlord. When your lease ends, you can get this deposit back, subject to certain conditions.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
      {
        id: 7,
        title: "Determine the Terms of the Lease",
        description: "If you have decided to rent the house, you should reach an agreement with the landlord and reflect all the conditions in detail in the lease agreement.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
      {
        id: 8,
        title: "Plan Your Moving Process",
        description: "Planning and performing the necessary checks will ensure that you complete the moving process smoothly.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
      {
        id: 9,
        title: "Report Change of Address and Take Charge of Invoices",
        description: "After moving to a new address, you must change your residence within 20 business days. Afterwards, do not forget to take on the electricity, water and natural gas bills.",
        hasLink: true,
        linkText: "Detailed Information",
        linkUrl: "#"
      }
      ,
      {
        id: 10,
        title: "Don't Forget to Get Insurance",
        description: "After renting the real estate, you can secure your home and belongings with insurance provided by insurance companies to have a safe and problem-free replacement process.",
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
              10 Step Home Rental Guide
            </h1>
            <p className="text-white text-center font-poppins mb-10 font-[500] text-[20px]">
              We have summarized the information you may need and what you need
              to do when renting a house in 10 steps and compiled it in a guide.
              With the 10-Step House Rental Guide, your mind will be at ease and
              your job will be easy!
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

export default RentingGuides