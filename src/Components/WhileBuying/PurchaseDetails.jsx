import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import NavbarMenu from "../Auto360/NavbarMenu";
import CommentForm from "../Home/CommentForm";
import { Link } from "react-router-dom";
function PurchaseDetails() {
  const [activeTab, setActiveTab] = useState("info");

  const tabs = [
    { id: "before", label: "Before Purchase" ,path: "/before-purchase" },
    { id: "during", label: "During Purchase" ,path: "/during-purchase" },
    { id: "after", label: "After Purchase"   ,path: "/after-purchase" },
  ];

  const defectiveCharacteristics = [
    "The residence's installation projects such as electricity, natural gas and water have not been completed.",
    "Presence of deep cracks in the columns and beams of the house that may pose a danger.",
    "The house does not comply with the zoning plan.",
    "Lack of building permit.",
    "Areas such as fire escapes and elevators are not constructed in accordance with the legislation.",
    "The building does not have balcony and roof drains.",
    "The house is mortgaged.",
    "Lack of static reinforced concrete project.",
  ];

  const consumerRights = [
    "Request a discount on the sale price in proportion to the defect.",
    "Requesting the seller to repair or fix the deficiency, and pay the costs.",
    "Request the termination of the sales contract with a court decision.",
  ];
  return (
    <>
      <Navbar />
      <NavbarMenu />
      <div className="max-w-7xl mx-auto font-poppins p-6">
        {/* Header Section */}
        <div className=" flex flex-row  justify-between mb-3">
          <h1 className="text-[30px] font-[600] text-black mb-6">
            Which Houses Fall into the Defective Category?
          </h1>

          <div className="flex space-x-4 mb-6">
            {tabs.map((tab) => (
                <Link
                to={tab.path}>
              <button
                key={tab.id}
               
                className={`px-4 py-3 rounded-md text-[15px] font-medium ${
                  activeTab === tab.id
                    ? "bg-[#1544AB] text-white"
                    : "bg-white text-[#1544AB] border border-[#1544AB]"
                }`}
                onClick={() => setActiveTab(tab.id ,tab.path)}
                onMouseEnter={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
                </Link>
            ))}
          </div>
        </div>

        {/* Hero Section with Image */}
        <div className="bg-white  overflow-hidden shadow-lg mb-8">
          <div className="relative">
            <img
              src="/assets/purchasedetails.png"
              alt="Modern apartment building with glass facades"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="  text-black max-w-7xl mb-10">
          <p className="text-[20px] font-[500] text-black">
            Defective housing is a real estate that does not meet the
            specifications specified by the seller, does not meet the agreed
            technical specifications, and prevents the buyer from benefiting
            from the house as expected. Law No. 6502 on Consumer Protection
            states that the seller is responsible for defective goods and the
            buyer has certain rights in this case.
          </p>
        </div>

        {/* Characteristics Section */}
        <div className="bg-white   mb-8">
          <h2 className="text-[25px] font-bold text-black mb-4">
            What are the Characteristics of a Defective House?
          </h2>
          <p className="text-[20px] font-[500] text-black">
            Although the scope of the definition of defective goods specified in
            Article 8 of the relevant law is wide, the following examples of
            defective housing can be given:
          </p>

          <ul className="space-y-2 mb-6">
            {defectiveCharacteristics.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-black mr-2">•</span>
                <span className="text-[20px] font-[500] text-black">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Consumer Rights Section */}
        <div className="bg-white ">
          <h2 className="text-[25px] font-bold text-black mb-4">
            What are the rights of the consumer in a defective property?
          </h2>
          <p className="text-[20px] font-[500] text-black mb-6">
            If the person purchasing the property notices that the house is
            defective, they must notify the seller within 30 days after the
            sale. The notification must be made to the seller via a notary or
            registered letter. After notifying the seller, a defective goods
            lawsuit can be filed.
          </p>

          <p className="text-[20px] font-[500] text-black mb-6">
            Defects that are called hidden defects and that are discovered
            during use or as a result of an expert's examination can be reported
            until the expiry of the statute of limitation for defective housing.
            The consumer rights in defective housing specified in Article 8 of
            the relevant law are as follows:
          </p>

          <ul className="space-y-2 mb-6">
            {consumerRights.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-black mr-2">•</span>
                <span className="text-[20px] font-[500] text-black">{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-[20px] font-[500] text-black">
            The consumer can only use one of these rights. According to Article
            12 of the Consumer Protection Law, if the consumer has chosen to use
            the right of free repair and the seller accepts it, the one-month
            repair period will apply. In such cases, the period for the consumer
            to use their right is unlimited.
          </p>
        </div>
      </div>
      <CommentForm />
      <Footer />
    </>
  );
}

export default PurchaseDetails;
