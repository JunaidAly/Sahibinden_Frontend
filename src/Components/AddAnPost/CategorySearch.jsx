import React from "react";

function CategorySearch() {
  return (
    <div className="flex flex-col gap-4 max-w-[1300px] mt-10 mx-auto h-[300px] ">
      <h2 className="text-2xl font-[500] text-black  ">
        Select Category by searching with keyword
      </h2>
      {/* Center: Search Bar */}
      <div className="flex-1 ">
        <div className="flex items-center w-[370px] border border-[#1544AB] rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Type the content you want to search"
            className="w-[464px] px-4 py-2 outline-none font-sans font-[700] text-gray-700 placeholder-[#D9D9D9]"
          />
          <button className="px-3  text-[#1544AB]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategorySearch;
