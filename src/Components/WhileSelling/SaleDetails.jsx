import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import NavbarMenu from "../Auto360/NavbarMenu";
import CommentForm from "../Home/CommentForm";
import { Link } from "react-router-dom";
function PurchaseDetails() {
  const [activeTab, setActiveTab] = useState("info");

  const tabs = [
    { id: "pre", label: "Pre-Sales" ,path: "/pre-sale" },
    { id: "during", label: "During Sales" ,path: "/during-sales" },
  ];

  const defectiveCharacteristics = [
    "A valid ID card (documents issued by official institutions such as an ID card, passport or driver's license that can be used instead of an ID card)",
    "Registration document called license (If any part of the license is worn or torn to the point of being unreadable, it must be renewed)",
    "Traffic document",
    "Power of attorney if someone else will carry out the sale on your behalf",
  ];

  const defectiveCharacteristicsOthers = [
    "It should be checked whether your vehicle has Motor Vehicle Tax (MTV) or traffic fine debts. For this, a vehicle debt inquiry should be made on the Revenue Administration website. The seller is responsible for unpaid traffic fines and tax debts. In case of tax debt or traffic fine, the vehicle cannot be sold.",
    "The vehicle inspection service provided by TÜVTÜRK should be questioned and if the inspection has not been done, it should be done. You, as the seller, should pay the vehicle inspection fee. You can learn the inspection date by checking the inspection stamp on the license plate. If the vehicle has not been inspected, the sale transaction will not take place.",
    "If the vehicle is mortgaged due to payment methods such as loans or for another reason, the sale depends on various conditions. As the seller, you must either pay off the debt or transfer the debt to the buyer. You should not forget that banks are very meticulous about this issue.",
    "Vehicles without Compulsory Traffic Insurance cannot be sold. Therefore, you may need to renew your Compulsory Traffic Insurance policy before selling.",
  ];

  const NotaryProcedures = [
    "First, the officers request the vehicle registration and the identity documents of the seller and buyer. If there is an attorney, the power of attorney must be presented",
    "Then the officers check the identity information and request other documents",
    "If any document is incorrect or missing, the sale will not take place.",
    "It is checked whether there is any obstacle to selling the vehicle, such as tax debt, traffic ticket or mortgage.",
    "If there is no obstacle to the sale, the sales contract is prepared by notary officials and presented to the seller and the buyer.",
    "After the signatures are made, the registration process begins. The vehicle is registered in the name of the buyer and the notary transfer is completed.",
    "The buyer must pay the notary fee of 932.65 TL (2023 price).",
    "The license in the name of the seller is cancelled and a sales document is submitted after the new registration document is prepared. Thus, the notary sales transactions are completed.",
  ];

  const TransferProcedures = [
    "The money to be paid for purchase and sale transactions is first transferred to escrow accounts opened at notaries.",
    "Notary transactions regarding purchase and sale are carried out",
    "Once the notary procedures are completed, the price of the sale is transferred from the escrow account to the seller's account.",
  ];
  return (
    <>
      <Navbar />
      <NavbarMenu />
      <div className="max-w-7xl mx-auto font-poppins p-6">
        {/* Header Section */}
        <div className=" flex flex-row  justify-between mb-3">
          <h1 className="text-[30px] font-[600] text-black mb-6">
            How Can I Find Out the Market Value of the Vehicle I Will Sell?
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
            In Türkiye, the official institution where you can carry out the
            transfer of your vehicle is the notary public, and the notary
            process requires great attention in the vehicle sales process.
            Because legal procedures may seem complicated to some buyers and
            sellers. For this reason, you should give importance to notary
            transactions and act carefully to avoid problems.
          </p>
        </div>

        {/* Characteristics Section */}
        <div className="bg-white   mb-8">
          <h2 className="text-[25px] font-bold text-black mb-4">
            What Should You Do Before Going to the Notary?
          </h2>
          <p className="text-[20px] font-[500] text-black">
            You can start the sales process with a deposit . After receiving the
            deposit, you need to start collecting the necessary documents for
            the sale. Most of the documents requested during the notary transfer
            consist of documents that the seller must collect. The documents
            that the seller must prepare for the sale of a vehicle are as
            follows:
          </p>

          <ul className="space-y-2 mb-6">
            {defectiveCharacteristics.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-black mr-2">•</span>
                <span className="text-[20px] font-[500] text-black">
                  {item}
                </span>
              </li>
            ))}
            <span className="text-[20px] font-[500] text-black">
              Other documents that need to be collected to be checked and taken
              into consideration are as follows:
            </span>
            {defectiveCharacteristicsOthers.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-black mr-2">•</span>
                <span className="text-[20px] font-[500] text-black">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Consumer Rights Section */}
        <div className="bg-white ">
          <h2 className="text-[25px] font-bold text-black mb-4">
            What are Notary Procedures?
          </h2>

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

          <p className="text-[20px] font-[500] text-black mb-6">
            After collecting the necessary documents for the notary vehicle
            sale, it will be beneficial to place them in a file and take them
            with you. Contrary to popular belief, notary transactions do not
            take long:
          </p>

          <ul className="space-y-2 mb-6">
            {NotaryProcedures.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-black mr-2">•</span>
                <span className="text-[20px] font-[500] text-black">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <h2 className="text-[25px] font-bold text-black mb-4">
            How Should the Fee Be Paid Before the Notary Transfer Procedure?
          </h2>
          <p className="text-[20px] font-[500] text-black">
            In order to have a safe buying and selling process, it is
            recommended that the fee be paid as blocked before the transfer.
            After receiving the payment via a method such as blocked transfer,
            you must complete the notary procedures and sign the contract. Then,
            you can go to the bank where the money was transferred as blocked
            with the sales document and receive the vehicle fee.
          </p>

          <p className="text-[20px] font-[500] mb-2 text-black">
            In addition, payment options for notary services have also been
            increased. Now, payments can be made at the notary with a credit
            card or bank card. In addition, a secure payment option is offered.
            The aim is to ensure that money transfers are carried out securely
            with the secure payment system. The secure payment system works as
            follows:
          </p>

          <ul className="space-y-2 ">
            {TransferProcedures.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-black mr-2">•</span>
                <span className="text-[20px] font-[500] text-black">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CommentForm />
      <Footer />
    </>
  );
}

export default PurchaseDetails;
