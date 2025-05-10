import React from 'react'
import { useEffect ,useState } from 'react';

function Content({ activeComponent }) {

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Add actual search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="w-full max-w-4xl p-5">
      <div className="text-[#8D8D8D] mb-2 text-lg font-medium">
        You Can Search By Ad Number Or Sender Name.
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-4">
        <button
          onClick={handleSearch}
          className="bg-[#1544AB] text-white px-6 py-3 rounded-full text-sm font-medium uppercase "
        >
          Search
        </button>
      </div>
      
      <div className="text-black  text-lg font-semibold">
        You have no messages.
      </div>
    </div>
  );
};


const InformationComponent = () => {
 
  
    return (
      <div className="w-full max-w-4xl p-5">
        <div className="text-black mb-2 text-lg font-semibold">
            Information
        </div>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="You have no notifications."
            className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        
        
      </div>
    );
  };


  const IamSeller = () => {
 
  
    return (

        <div className="w-full max-w-4xl mx-auto bg-white font-poppins ">
        <h2 className="text-black text-xl  font-medium mb-5">My Product Offers - I am a Seller</h2>
        
        <div className="flex flex-col shadow-custom-right rounded-lg w-full max-w-4xl mx-auto items-center justify-center py-12">
          {/* Shopping Bags Icon */}
          <div className="mb-4">
            <img src="/assets/selling.png" className='w-48 h-48' />
          </div>
          
          {/* Messages */}
          <p className="text-center text-black font-medium mb-1">
            You Don't Have Any Offers Yet
          </p>
          <p className="text-center text-black mb-6">
            Add Products You Don't Use, Evaluate Offers From Buyers And Earn Immediately.
          </p>
          
          {/* Button */}
          <button 
            className="bg-[#1544AB] text-white px-4 py-2 rounded-full text-sm font-medium "
          >
            POST AN AD NOW
          </button>
        </div>
      </div>
    );
  };


  const IamBuyer = () => {
 
  
    return (
        <div className="w-full max-w-4xl mx-auto bg-white font-poppins ">
        <h2 className="text-black text-xl  font-medium mb-10">My Product Offers - I am a Buyer</h2>
        
        <div className="flex flex-col shadow-custom-right rounded-lg w-full max-w-4xl mx-auto items-center justify-center py-12">
         {/* Shopping Bags Icon */}
         <div className="mb-4">
            <img src="/assets/selling.png" className='w-48 h-48' />
          </div>
          
          {/* Messages */}
          <p className="text-center text-gray-800 font-medium mb-1">
            You Don't Have Any Offers Yet
          </p>
          <p className="text-center text-gray-700 mb-6">
            Add Products You Don't Use, Evaluate Offers From Buyers And Earn Immediately.
          </p>
          
          {/* Button */}
          <button 
            className="bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-800 transition-colors"
          >
            POST AN AD NOW
          </button>
        </div>
      </div>
    );
  };



  return (
    <>
     {activeComponent === 'messages' && SearchComponent()}
     {activeComponent === 'informations' && InformationComponent()}
     {activeComponent === 'seller' && IamSeller()}
     {activeComponent === 'buyer' && IamBuyer()}
    </>
  )
}

export default Content