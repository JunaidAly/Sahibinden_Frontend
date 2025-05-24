import React, { useState } from "react";
import Navbar from '../../../Navbar'
import Footer from '../../../Footer'
import NavbarMenu from '../../NavbarMenu'
import CommentForm from '../../../Home/CommentForm'
import { Link } from "react-router-dom";

function BeforeRentingOverview() {
    const [activeTab, setActiveTab] = useState("info");
        
          const tabs = [
            { id: "before", label: "Before Renting" ,path: "/before-renting" },
            { id: "after", label: "After Lease"   ,path: "/after-lease" },
          ];
        
          const residenceNote = [
            "Petition for family residence annotation",
            "Marriage Certificate",
            "An identity card containing the applicant's Turkish identity number.",
            "A copy of the population registration certificate",
            "A document obtained from the muhtar's office showing that the residence in question is a family residence.",
          ];
        
          const  residenceCertificate = [
            "In case of divorce, the judge decides to cancel the annotation. The legal property regime is applied instead of the conditions of the family residence annotation.",
            "In case of annulment of the marriage, upon the request of the spouse who owns the real estate,",
            "In case of death of one of the spouses,",
            "If the spouse who is not the owner of the real estate has added a note, again upon the request of the spouse who is not the owner,",
            "If an annotation was made upon the application of the owner spouse, the family residence annotation may be removed upon the acceptance or request of the non-owner spouse.",
          ];
  return (
    <>
      <Navbar />
      <NavbarMenu />
      <div className="max-w-7xl mx-auto font-poppins p-6">
        {/* Header Section */}
        <div className=" flex flex-row  justify-between mb-3">
          <h1 className="text-[30px] max-w-[53rem] font-[600] text-black mb-6">
            What is a Family Residence Notification and How it is Placed?
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
            The residence where the spouses live as long as the marriage
            continues is called the family residence. The family residence
            annotation is a regulation that prevents one spouse from selling or
            renting the residence without the permission of the other. The
            family residence annotation, which is made by adding an annotation
            to the title deed, is a legal practice that aims to protect the
            rights of the spouses by restricting their right to dispose of the
            residence.
          </p>
        </div>

        {/* Characteristics Section */}
        <div className="bg-white   mb-8">
          <h2 className="text-[25px] font-bold text-black mb-4">
            How to Put a Family Residence Note?
          </h2>
          <p className="text-[20px] font-[500] text-black">
            In order to add a family residence record, one of the spouses must
            apply to the Land Registry and Cadastre Directorates. The documents
            that must be submitted for the transaction to be carried out are as
            follows;
          </p>

          <ul className="space-y-2 mb-6">
            {residenceNote.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-black mr-2">•</span>
                <span className="text-[20px] font-[500] text-black">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Residence Note Section */}
        <div className="bg-white ">
          <h2 className="text-[25px] font-bold text-black mb-4">
            Can a House with a Family Residence Note Be Rented?
          </h2>
          <p className="text-[20px] font-[500] text-black mb-6">
            The house, which is a family residence, can be rented, sold or if it
            is rented, the contract can be terminated. However, according to
            Article 194 of the Turkish Civil Code No. 4271, both spouses must
            give their explicit consent for all these transactions to take
            place. If one of the spouses does not give their consent without a
            justified reason, the spouse who cannot obtain permission can apply
            to the judge for intervention. The spouse who is a tenant in a house
            and is not a party to the lease agreement may notify the real estate
            owner. By notifying, he/she becomes a party to the lease agreement.
            He/she shares the rights and responsibilities arising from the
            agreement.
          </p>
        </div>

        <div className="bg-white   mb-8">
          <h2 className="text-[25px] font-bold text-black mb-4">
            How to Terminate a Family Residence Certificate?
          </h2>
          <p className="text-[20px] font-[500] text-black mb-3">
            An application to the court is required to cancel the family
            residence record. The situations in which the family residence
            record can be canceled are as follows
          </p>

          <ul className="space-y-2 mb-6">
            {residenceCertificate.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-black mr-2">•</span>
                <span className="text-[20px] font-[500] text-black">
                  {item}
                </span>
              </li>
            ))}
          </ul>
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
  );
}

export default BeforeRentingOverview