import React, { useState } from "react";
import Navbar from '../../Navbar'
import Footer from '../../Footer'
import NavbarMenu from '../NavbarMenu'
import CommentForm from '../../Home/CommentForm'
import { Link } from "react-router-dom";

const AfterLeaseDetails = () => {

    const [activeTab, setActiveTab] = useState("info");
        
          const tabs = [
            { id: "before", label: "Before Renting" ,path: "/purchase-details-real-estate" },
            { id: "after", label: "After Lease"   ,path: "/purchase-details-real-estate" },
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
        
          const managementPlan = [
            "General Provisions",
            "Definitions",
            "Governing Bodies",
            "Rights and Obligations of Flat Owners",
            "Participation in Common Expenses",
            "Innovations and Additions",
            "Temporary Provisions",
          ];

  return (
    <>
      <Navbar />
      <NavbarMenu />
      <div className="max-w-7xl mx-auto font-poppins p-6">
        {/* Header Section */}
        <div className=" flex flex-row  justify-between mb-3">
          <h1 className="text-[30px] max-w-[53rem] font-[600] text-black mb-6">
            Why is a Management Plan Important for Apartment and Site Residents?
          </h1>

          <div className="flex space-x-4 mb-6">
            {tabs.map((tab) => (
              <Link to={tab.path}>
                <button
                  key={tab.id}
                  className={`px-4 py-3 rounded-md text-[15px] font-medium ${
                    activeTab === tab.id
                      ? "bg-[#1544AB] text-white"
                      : "bg-white text-[#1544AB] border border-[#1544AB]"
                  }`}
                  onClick={() => setActiveTab(tab.id, tab.path)}
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
            The management style of an apartment or site and the rules such as
            the salaries to be received by the managers are determined by the
            management plan. According to Article 28 of the Law on Condominiums
            No. 634, the management plan is a contract binding on all
            condominium owners. In case of disagreements regarding an article
            not included in the management plan, the articles of the relevant
            law are applied.
          </p>
        </div>

        {/* Characteristics Section */}
        <div className="bg-white   mb-8">
          <h2 className="text-[25px] font-bold text-black mb-4">
            Why is a Management Plan Important?
          </h2>
          <p className="text-[20px] font-[500] text-black">
            If there is a disagreement between people living in an apartment or
            site, the rules specified in the management plan are applied. Since
            disagreements are resolved within the framework of these rules, it
            is important for real estate owners to be informed about the
            apartment management plan. <br /> In addition, issues such as
            manager selection, meeting times, shared responsibilities or
            prohibitions are also determined by the management plan. People who
            want to buy real estate have the right to request and examine the
            management plan from the General Directorate of Land Registry and
            Cadastre. The possibility of encountering an unexpected situation
            can be eliminated by reading the management plan before transferring
            the title deed.
          </p>
        </div>

        {/* Consumer Rights Section */}
        <div className="bg-white ">
          <h2 className="text-[25px] font-bold text-black mb-4">
            How to Prepare an Apartment Management Plan?
          </h2>
          <p className="text-[20px] font-[500] text-black mb-6">
            The apartment or site management plan is determined when the
            condominium is established. In other words, if an apartment is to be
            purchased from an apartment where the condominium is established,
            there is also a management plan. However, if the condominium is not
            yet established, a management plan sample can be obtained from the
            Land Registry and Cadastre Directorates. The condominium owners can
            add new items to the sample management plan. The newly added items
            are written on the management plan pages with the notary seal and
            signed by the condominium owners. The sections in the management
            plan are as follows:
          </p>

          <ul className="space-y-2 mb-6">
            {managementPlan.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-black mr-2">•</span>
                <span className="text-[20px] font-[500] text-black">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white   mb-8">
          <h2 className="text-[25px] font-bold text-black mb-4">
            How to Change the Management Plan?
          </h2>
          <p className="text-[20px] font-[500] text-black">
            According to Article 28 of the relevant Law, in order to make
            changes to the management plan, the approval of 4/5 of the flat
            owners must be obtained. Each real estate owner has one vote,
            regardless of the size or price of their flats. Owners of more than
            one flat have more than one vote, provided that it does not exceed
            1/3 of all votes. In addition, flat owners have the right to appeal
            to the court regarding the changed decision.
          </p>
        </div>

        <div className="max-w-7xl w-full h-full mx-auto  mt-12">
          <div className="w-full h-full flex flex-row justify-center items-center  gap-5 ">
            <div className="p-5 bg-white shadow-custom-diagonal rounded-lg">
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-xl ">
                  What are Diesel Engines?
                </h1>
                <img
                  src="/assets/image40.png"
                  alt="Real estate image"
                  className="w-full h-full object-cover"
                />
                <a className="text-primaryBlue text-sm text-right  font-medium">
                  More
                </a>
              </div>
            </div>

            <div className="p-5 bg-white shadow-custom-diagonal rounded-lg">
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-xl ">What is AWS?</h1>
                <img
                  src="/assets/image40.png"
                  alt="Real estate image"
                  className="w-full h-full object-cover"
                />
                <a className="text-primaryBlue text-sm text-right font-medium ">
                  More
                </a>
              </div>
            </div>

            <div className="p-5 bg-white shadow-custom-diagonal rounded-lg">
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-xl ">What is a Dumper?</h1>
                <img
                  src="/assets/image40.png"
                  alt="Real estate image"
                  className="w-full h-full object-cover"
                />
                <a className="text-primaryBlue text-sm font-medium text-right ">
                  More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommentForm />
      <Footer />
    </>
  )
}

export default AfterLeaseDetails