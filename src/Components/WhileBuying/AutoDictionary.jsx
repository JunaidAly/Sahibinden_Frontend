import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import NavbarMenu from '../Auto360/NavbarMenu';
import CommentForm from '../Home/CommentForm';
import { Search } from "lucide-react";


function AutoDictionary() {
    const [activeLetter, setActiveLetter] = useState('A');
  
  // Alphabetical index
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  
  // Sample vehicle info data
  const vehicleInfoItems = [
    {
      id: 1,
      title: "ABC - What is Active Suspension System?",
      description: "The system, which stands for Active Body Control, is called ABC. This system, which means active body control in Turkish, protects vehicles from dangers such as tipping over or exceeding certain limits while driving.",
      image: "/assets/vehicledamage.png",
      letter: "A"
    },
    {
      id: 2,
      title: "What is a Certificate of Insolvency?",
      description: "The document showing that the debtor does not have sufficient assets to the legally pursued payment is called the insolvency certificate. This document is issued by the enforcement office. From the creditor's perspective, it is the document issued by the enforcement authorities because the foreclosure process has completely depleted the property of the enforcement proceedings. The content of the insolvency certificate includes:",
      image: "/assets/vehicledamage.png",
      letter: "C"
    }
  ];

  return (
    <>
    <Navbar />
    <NavbarMenu />
    <div className="max-w-7xl mx-auto  p-4 rounded-lg font-sans">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10 font-poppins">
          <h1 className="text-[35px] font-[600] text-black">Auto Dictionary</h1>
          {/* Search Bar */}
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Type the content you want to search"
              className="w-full pl-4 pr-10 py-2 border border-[#1544AB] rounded-md placeholder-[#D9D9D9] text-gray-700 font-semibold"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-[#1544AB]" />
            </button>
          </div>
        </div>
      {/* Alphabetical Index */}
      <div className="bg-white rounded-lg shadow-custom-diagonal p-2 mb-6 overflow-x-auto font-poppins">
        <div className="flex justify-center items-center space-x-4 min-w-max h-[50px]">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className={`w-8 h-8 flex items-center justify-center  text-[30px] font-[600]
                ${activeLetter === letter 
                  ? 'bg-white text-black' 
                  : 'text-[#1544AB] '}`}
              onClick={() => setActiveLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
      
      {/* Back Button */}
      <div className="mb-6">
        
          <h1 className="text-sm w-[50px] h-[50px] font-medium text-[20px] flex items-center justify-center bg-[#1544AB] text-white rounded-full">{activeLetter}</h1>
      </div>
      
      {/* Vehicle Info Cards */}
      <div className="space-y-6">
        {vehicleInfoItems.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-lg  overflow-hidden shadow-custom-diagonal p-5"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/3 h-48 md:h-auto">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-6 md:flex-1">
                <h2 className="text-[30px] font-[600] text-black mb-3">
                  {item.title}
                </h2>
                
                <p className="text-[20px] font-[400] text-black leading-7 mb-4">
                  {item.description}
                </p>
                
                <a 
                  href="#" 
                  className="text-[#1544AB] text-sm font-medium "
                >
                  More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <CommentForm />
    <Footer />
    </>
  )
}

export default AutoDictionary