import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

function TransactionNavigationMenu({ onSectionChange }) {
  // Track which sections are expanded (dropdowns)
  const [expandedSections, setExpandedSections] = useState({
    MyMoneyIsSafe: true, // Main account section starts expanded
    safeECommerceTransactions: false, // Safe E-Commerce section starts collapsed
    brandNewTransactions: false, // Brand New Transactions section starts collapsed
  });

  // Track the currently active section (for highlighting)
  const [activeSection, setActiveSection] = useState("purchaseTransactions");

  // Track which parent section is active
  const [activeParentSection, setActiveParentSection] = useState("MyMoneyIsSafe");

  // Toggle a dropdown section open/closed
  const toggleSection = (section) => {
    // Set this section as the active parent
    setActiveParentSection(section);

    // Toggle the expanded state
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle click on a menu item
  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);

    // Notify parent component about the selection
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  // Check if a section is the currently active one
  const isSectionActive = (sectionId) => {
    return activeSection === sectionId;
  };

  // Check if a parent section is active
  const isParentSectionActive = (sectionId) => {
    return activeParentSection === sectionId;
  };

  return (
    <div className="w-full h-max max-w-xs mx-auto border border-[#1544AB] font-poppins">
      {/* My Money is Safe - Main header */}
      <button
        className={`w-full py-4 px-6 text-left flex justify-between items-center ${
          isParentSectionActive("MyMoneyIsSafe")
            ? "bg-[#1544AB] text-white"
            : "bg-white text-[#231E1C]"
        }`}
        onClick={() => toggleSection("MyMoneyIsSafe")}
      >
        <h2 className="text-xl font-normal">My Money is Safe</h2>
        {expandedSections.MyMoneyIsSafe ? (
          <FaCaretUp
            size={24}
            className={
              isParentSectionActive("MyMoneyIsSafe")
                ? "text-white"
                : "text-[#1544AB]"
            }
          />
        ) : (
          <FaCaretDown
            size={24}
            className={
              isParentSectionActive("MyMoneyIsSafe")
                ? "text-white"
                : "text-[#1544AB]"
            }
          />
        )}
      </button>

      {/* My Money is Safe Dropdown Items */}
      {expandedSections.MyMoneyIsSafe && (
        <>
          <button
            className="w-full py-4 px-6  text-left border-t border-[#1544AB] bg-white"
            onClick={() => handleSectionClick("purchaseTransactions")}
          >
            <span
              className={`text-lg font-normal pl-4 ${
                isSectionActive("purchaseTransactions")
                  ? "text-[#1544AB]"
                  : "text-[#231E1C]"
              }`}
            >
              My Purchase Transactions
            </span>
          </button>

          <button
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white"
            onClick={() => handleSectionClick("mySalesTransactions")}
          >
            <span
              className={`text-lg font-normal pl-4 ${
                isSectionActive("mySalesTransactions")
                  ? "text-[#1544AB]"
                  : "text-[#231E1C]"
              }`}
            >
              My Sales Transactions
            </span>
          </button>

          {/* Comment Management - Moved inside My Money is Safe */}
          <div>
            <button
              className={`w-full py-4 px-6 text-left border-t border-[#1544AB] flex justify-between items-center ${
                expandedSections.commentManagement
                  ? "bg-white"
                  : "bg-white"
              }`}
              onClick={() => toggleSection("commentManagement")}
            >
              <span className="text-lg font-normal text-[#231E1C] pl-4">
                Comment Management
              </span>
              <FaCaretDown
                className={`transform transition-transform duration-300 ${
                  expandedSections.commentManagement ? "rotate-180" : ""
                } text-[#1544AB]`}
                size={24}
              />
            </button>

            {/* Comment Management Sub-items */}
            {expandedSections.commentManagement && (
              <>
                <button
                  className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-16"
                  onClick={() => handleSectionClick("billingAddress")}
                >
                  <span
                    className={`text-lg font-normal ${
                      isSectionActive("billingAddress")
                        ? "text-[#1544AB]"
                        : "text-[#231E1C]"
                    }`}
                  >
                    My Delivery / Billing Addresses
                  </span>
                </button>

                <button
                  className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-16"
                  onClick={() => handleSectionClick("myBankInformation")}
                >
                  <span
                    className={`text-lg font-normal ${
                      isSectionActive("myBankInformation")
                        ? "text-[#1544AB]"
                        : "text-[#231E1C]"
                    }`}
                  >
                    My Bank Information
                  </span>
                </button>

                <button
                  className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-16"
                  onClick={() => handleSectionClick("headOfficeAddress")}
                >
                  <span
                    className={`text-lg font-normal ${
                      isSectionActive("headOfficeAddress")
                        ? "text-[#1544AB]"
                        : "text-[#231E1C]"
                    }`}
                  >
                    My Head Office Address
                  </span>
                </button>
              </>
            )}
          </div>
        </>
      )}

      {/* Brand New Transactions - With Dropdown Icon */}
      <button
        className={`w-full py-4 px-6 text-left border-t border-[#1544AB] flex justify-between items-center ${
          isParentSectionActive("brandNewTransactions")
            ? "bg-[#1544AB] text-white"
            : "bg-white text-[#231E1C]"
        }`}
        onClick={() => toggleSection("brandNewTransactions")}
      >
        <span className="text-xl font-normal">Brand New Transactions</span>
        <FaCaretDown
          className={`transform transition-transform duration-300 ${
            expandedSections.brandNewTransactions ? "rotate-180" : ""
          } ${
            isParentSectionActive("brandNewTransactions")
              ? "text-white"
              : "text-[#1544AB]"
          }`}
          size={24}
        />
      </button>

      {/* Brand New Transactions Dropdown Items */}
      {expandedSections.brandNewTransactions && (
        <>
          <button
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-10"
            onClick={() => handleSectionClick("devicePurchasePage")}
          >
            <span
              className={`text-lg font-normal ${
                isSectionActive("devicePurchasePage")
                  ? "text-[#1544AB]"
                  : "text-[#231E1C]"
              }`}
            >
              What I bought with vepy
            </span>
          </button>

          <button
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-10"
            onClick={() => handleSectionClick("deviceSellPage")}
          >
            <span
              className={`text-lg font-normal ${
                isSectionActive("deviceSellPage")
                  ? "text-[#1544AB]"
                  : "text-[#231E1C]"
              }`}
            >
              What I Sold with brand new
            </span>
          </button>
        </>
      )}

      {/* Safe E-Commerce - With Dropdown Icon */}
      <button
        className={`w-full py-4 px-6 text-left border-t border-[#1544AB] flex justify-between items-center ${
          isParentSectionActive("safeECommerceTransactions")
            ? "bg-[#1544AB] text-white"
            : "bg-white text-[#231E1C]"
        }`}
        onClick={() => toggleSection("safeECommerceTransactions")}
      >
        <span className="text-xl font-normal">Safe E-Commerce</span>
        <FaCaretDown
          className={`transform transition-transform duration-300 ${
            expandedSections.safeECommerceTransactions ? "rotate-180" : ""
          } ${
            isParentSectionActive("safeECommerceTransactions")
              ? "text-white"
              : "text-[#1544AB]"
          }`}
          size={24}
        />
      </button>

      {/* Safe E-Commerce Dropdown Items */}
      {expandedSections.safeECommerceTransactions && (
        <>
          <button
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-10"
            onClick={() => handleSectionClick("summary")}
          >
            <span
              className={`text-lg font-normal ${
                isSectionActive("summary") ? "text-[#1544AB]" : "text-[#231E1C]"
              }`}
            >
              Summary
            </span>
          </button>

          {/* My Orders (moved to Safe E-Commerce) */}
          <div>
            <button
              className={`w-full py-4 px-6 text-left border-t border-[#1544AB] flex justify-between items-center ${
                expandedSections.myOrders ? "bg-white" : "bg-white"
              } pl-10`}
              onClick={() => toggleSection("myOrders")}
            >
              <span className="text-lg font-normal text-[#231E1C]">
                My Orders
              </span>
              <FaCaretDown
                className={`transform transition-transform duration-300 ${
                  expandedSections.myOrders ? "rotate-180" : ""
                } text-[#1544AB]`}
                size={24}
              />
            </button>

            {/* My Orders Sub-items */}
            {expandedSections.myOrders && (
              <>
                <button
                  className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-20"
                  onClick={() => handleSectionClick("myCurrentOrders")}
                >
                  <span
                    className={`text-lg font-normal ${
                      isSectionActive("myCurrentOrders")
                        ? "text-[#1544AB]"
                        : "text-[#231E1C]"
                    }`}
                  >
                    My Current Orders
                  </span>
                </button>

                <button
                  className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-20"
                  onClick={() =>
                    handleSectionClick("returnAndCancellationProcedures")
                  }
                >
                  <span
                    className={`text-lg font-normal ${
                      isSectionActive("returnAndCancellationProcedures")
                        ? "text-[#1544AB]"
                        : "text-[#231E1C]"
                    }`}
                  >
                    Return & Cancellation Procedures
                  </span>
                </button>

                <button
                  className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-20"
                  onClick={() => handleSectionClick("myCompletedOrders")}
                >
                  <span
                    className={`text-lg font-normal ${
                      isSectionActive("myCompletedOrders")
                        ? "text-[#1544AB]"
                        : "text-[#231E1C]"
                    }`}
                  >
                    My Completed Orders
                  </span>
                </button>

                <button
                  className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-20"
                  onClick={() => handleSectionClick("myDistanceContracts")}
                >
                  <span
                    className={`text-lg font-normal ${
                      isSectionActive("myDistanceContracts")
                        ? "text-[#1544AB]"
                        : "text-[#231E1C]"
                    }`}
                  >
                    My Distance Contracts
                  </span>
                </button>
              </>
            )}
          </div>

          {/* My Sales Transaction (moved to Safe E-Commerce) */}
          <div>
            <button
              className={`w-full py-4 px-6 text-left border-t border-[#1544AB] flex justify-between items-center ${
                expandedSections.mySalesTransaction ? "bg-white" : "bg-white"
              } pl-10`}
              onClick={() => toggleSection("mySalesTransaction")}
            >
              <span className="text-lg font-normal text-[#231E1C]">
                My Sales Transaction
              </span>
              <FaCaretDown
                className={`transform transition-transform duration-300 ${
                  expandedSections.mySalesTransaction ? "rotate-180" : ""
                } text-[#1544AB]`}
                size={24}
              />
            </button>

            {/* My Sales Transaction Sub-items */}
            {expandedSections.mySalesTransaction && (
              <>
                <button
                  className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-20"
                  onClick={() => handleSectionClick("myProductOnSale")}
                >
                  <span
                    className={`text-lg font-normal ${
                      isSectionActive("myProductOnSale")
                        ? "text-[#1544AB]"
                        : "text-[#231E1C]"
                    }`}
                  >
                    My Product On Sale
                  </span>
                </button>

                <button
                  className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-20"
                  onClick={() => handleSectionClick("WhatIWillShip")}
                >
                  <span
                    className={`text-lg font-normal ${
                      isSectionActive("WhatIWillShip")
                        ? "text-[#1544AB]"
                        : "text-[#231E1C]"
                    }`}
                  >
                    What I Will Ship
                  </span>
                </button>

                <button
                  className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-20"
                  onClick={() => handleSectionClick("approvalFromTheBuyer")}
                >
                  <span
                    className={`text-lg font-normal ${
                      isSectionActive("approvalFromTheBuyer")
                        ? "text-[#1544AB]"
                        : "text-[#231E1C]"
                    }`}
                  >
                    Approval From The Buyer
                  </span>
                </button>

                <button
                  className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-20"
                  onClick={() => handleSectionClick("mySuccessfulSales")}
                >
                  <span
                    className={`text-lg font-normal ${
                      isSectionActive("mySuccessfulSales")
                        ? "text-[#1544AB]"
                        : "text-[#231E1C]"
                    }`}
                  >
                    My Successful Sales
                  </span>
                </button>

                <button
                  className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-20"
                  onClick={() => handleSectionClick("returnsAndCancellation")}
                >
                  <span
                    className={`text-lg font-normal ${
                      isSectionActive("returnsAndCancellation")
                        ? "text-[#1544AB]"
                        : "text-[#231E1C]"
                    }`}
                  >
                    Returns & Cancellation
                  </span>
                </button>

                <button
                  className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-20"
                  onClick={() => handleSectionClick("myProductsThatAreNotOnSale")}
                >
                  <span
                    className={`text-lg font-normal ${
                      isSectionActive("myProductsThatAreNotOnSale")
                        ? "text-[#1544AB]"
                        : "text-[#231E1C]"
                    }`}
                  >
                    My Products That Are Not On sale
                  </span>
                </button>

                <button
                  className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-20"
                  onClick={() => handleSectionClick("myDistanceContractsSales")}
                >
                  <span
                    className={`text-lg font-normal ${
                      isSectionActive("myDistanceContractsSales")
                        ? "text-[#1544AB]"
                        : "text-[#231E1C]"
                    }`}
                  >
                    My Distance Contracts
                  </span>
                </button>
              </>
            )}
          </div>

          {/* My Delivery / Billing Addresses (moved to Safe E-Commerce) */}
          <button
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-10"
            onClick={() => handleSectionClick("myDeliveryBillingAddresses")}
          >
            <span
              className={`text-lg font-normal ${
                isSectionActive("myDeliveryBillingAddresses")
                  ? "text-[#1544AB]"
                  : "text-[#231E1C]"
              }`}
            >
              My Delivery / Billing Addresses
            </span>
          </button>

          {/* Comment Management (non-dropdown version, moved to Safe E-Commerce) */}
          <button
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-10"
            onClick={() => handleSectionClick("commentManagementSafeEcom")}
          >
            <span
              className={`text-lg font-normal ${
                isSectionActive("commentManagementSafeEcom")
                  ? "text-[#1544AB]"
                  : "text-[#231E1C]"
              }`}
            >
              Comment Management
            </span>
          </button>
        </>
      )}
    </div>
  );
}

export default TransactionNavigationMenu;