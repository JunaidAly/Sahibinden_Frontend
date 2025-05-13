import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

function MyDistanceContracts() {
  const [selectedFilter, setSelectedFilter] = useState("");

  const orders = [
    {
      id: "992170042",
      productTitle: "House",
      salesPerson: "M.Umer",
      sellBy: "M.Umer",
    },
    {
      id: "992170042",
      productTitle: "House",
      salesPerson: "M.Umer",
      sellBy: "M.Umer",
    },
    {
      id: "992170042",
      productTitle: "House",
      salesPerson: "M.Umer",
      sellBy: "M.Umer",
    },
    {
      id: "992170042",
      productTitle: "House",
      salesPerson: "M.Umer",
      sellBy: "M.Umer",
    },
    {
      id: "992170042",
      productTitle: "House",
      salesPerson: "M.Umer",
      sellBy: "M.Umer",
    },
    {
      id: "992170042",
      productTitle: "House",
      salesPerson: "M.Umer",
      sellBy: "M.Umer",
    },
  ];


  return (
    <div className="max-w-4xl w-full mx-auto p-4 font-poppins">
      <div className="bg-white rounded-lg ">
        <h1 className="text-xl font-semibold ">
           My Distance Contracts
        </h1>

        {/* Search Section */}
        <div className="py-4">
          <div className="flex flex-col gap-4 mb-1">
            <input
              type="text"
              placeholder="In my sales with ad no."
              className="flex-1 px-4 py-4 border border-[#1544AB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 max-w-32 bg-[#1544AB] text-white rounded-full ">
              SEARCH
            </button>
          </div>      
          </div>
          <h1 className="mb-4 text-black font-normal"> You can review your distance contracts on this page.</h1>
        </div>
        
        {/* Table Section */}
        <div className="overflow-x-auto max-w-4xl w-full mx-auto bg-[#CFCFCF80] ">
          <table
            className="w-full border-separate"
            style={{ borderSpacing: "8px 8px" }}
          >
            <thead>
              <tr className="w-full">
                <th className="px-6 py-3 text-center text-sm font-medium text-black border-r-[1px] border-white">
                  Product No
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-black border-r-[1px] border-white">
                  Product Title
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-black border-r-[1px] border-white">
                  Sales Person
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-black">
                  Sell By
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="text-center">
                  <td className="px-6 py-4 text-sm text-black border-r-[1px] border-white">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-black border-r-[1px] border-white">
                    {order.productTitle}
                  </td>
                  <td className="px-6 py-4 text-sm text-black border-r-[1px] border-white">
                    {order.salesPerson}
                  </td>
                  <td className="px-6 py-4 text-sm text-black">
                    {order.sellBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
 
  );
}

export default MyDistanceContracts;
