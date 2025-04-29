import React from 'react'
import { FaShoppingCart, FaEnvelope, FaBell, FaStar } from "react-icons/fa";
import { Link } from "react-router";
function Header() {
  return (
    <nav className="flex flex-col  items-center justify-center gap-2 mb-14 bg-white ">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Left: Logo */}
        <Link to={"/"}>
          <div className="flex items-center">
            <img
              src="assets/logo.svg"
              alt="Logo"
              className="h-[80px] w-[150px]"
            />
          </div>
        </Link>


        {/* Right: Icons + Button */}
        <div className="flex items-center space-x-6">
          {/* Notification Icons */}
          <div className="relative">
            <FaShoppingCart className="text-[#1544AB] text-xl" />
            <span className="absolute -top-2 -right-2 bg-[#1544AB] text-white rounded-full text-xs px-1">
              1
            </span>
          </div>
          <div className="relative">
            <FaEnvelope className="text-[#1544AB] text-xl" />
            <span className="absolute -top-2 -right-2 bg-[#1544AB] text-white rounded-full text-xs px-1">
              1
            </span>
          </div>
          <div className="relative">
            <FaBell className="text-[#1544AB] text-xl" />
            <span className="absolute -top-2 -right-2 bg-[#1544AB] text-white rounded-full text-xs px-1">
              1
            </span>
          </div>
          <div>
            <FaStar className="text-[#1544AB] text-xl" />
          </div>

          {/* Post Ad Button */}
          <button className="bg-[#1544AB]  text-white font-semibold px-6 py-2 rounded-full flex items-center gap-2">
            POST AN AD FOR FREE
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L21 12l-3.75 5.25M3 12h18"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header