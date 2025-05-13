import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

function MyProductOnSale() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const filterOptions = [
    "According to notfication",
    "By date of terminaion(Oldest First)",
    "By date of terminaion(Newest First)",
    "By price(Highest First)",
    "By price(Lowest First)",
    "By an entry date(Oldest First)",
    "By an entry date(Newest First)",
  ];
  return (
    <div className="max-w-4xl w-full mx-auto p-4 font-poppins">
      <div className="bg-white rounded-lg ">
        <h1 className="text-xl font-semibold ">My Products on Sale</h1>

        {/* Search Section */}
        <div className="py-4">
          <div className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter product number or word"
              className="flex-1 px-4 py-4 border border-[#1544AB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 max-w-32 bg-[#1544AB] text-white rounded-full ">
              SEARCH
            </button>
          </div>

          {/* Dropdown Filter */}
          <div className="relative flex justify-between items-center border border-[#1544AB] rounded-lg p-2">
            <h1>You do not have any products for sale.</h1>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2 max-w-[20rem] border border-[#1544AB] rounded-lg flex items-center justify-between hover:bg-gray-50"
            >
              <span>{selectedFilter}</span>
              <FaCaretDown size={24} className="text-[#1544AB]" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-[50px] right-2 max-w-[20rem] w-full bg-white border border-[#1544AB] rounded-lg shadow-lg z-10">
                <div className="py-1 w-max">
                  {filterOptions.map((filter) => (
                    <div
                      key={filter}
                      className="px-4 py-2 cursor-pointer "
                      onClick={() => {
                        setSelectedFilter(filter);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {filter}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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
    </div>
  );
}

export default MyProductOnSale;
