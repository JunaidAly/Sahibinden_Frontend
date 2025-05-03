import React, { useState } from 'react';
import Navbar from '../Navbar'
import NavbarMenu from '../Auto360/NavbarMenu'
import Footer from '../Footer'
import CommentForm from '../Home/CommentForm'
import {  AlertTriangle } from 'lucide-react';


 const QueryDashboard = () => {
    return (
      <div className="flex flex-col gap-16 max-w-7xl mx-auto p-6 font-poppins">
        <div className='flex flex-col gap-8'>
        {/* Header Section */}
        <div className="flex gap-5 items-center ">
          <h1 className="text-2xl font-semibold text-gray-900">My Past Queries</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1544AB] text-white rounded-md ">
            New Vehicle Damage History
          </button>
        </div>
  
        {/* Search Section */}
        <div className="flex gap-4 mb-0 justify-center items-center">
          <div className="flex-1 ">
            <input
              type="text"
              placeholder="Top Result Of Past Queries Within The Last 60 Days Are Listed"
              className="max-w-[866px] w-full px-4 py- h-[60px] border border-[#1544AB] rounded-md text-[15px]  text-[#888F9F]"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Type the content you want to search"
              className="pr-10 pl-4 py-2 w-96 h-[56px] border border-[#1544AB] rounded-sm  text-[#888F9F] font-[500] text-[17px]"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-[#1544AB]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        </div>
  
        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-24 text-center shadow-custom-diagonal rounded-lg">
          <div className="w-16 h-16 rounded-full border-4 border-black flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-black" />
          </div>
          <p className="text-black text-[25px] font-[500]">You haven't made any queries yet.</p>
        </div>
      </div>
    );
  };

function PastQueries() {
  return (
    <>
    <Navbar />
    <NavbarMenu />        
    <QueryDashboard />
    <CommentForm />
    <Footer />
    </>
  )
}

export default PastQueries