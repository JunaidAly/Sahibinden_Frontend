import React from 'react';

const Dashboard = () => {
  return (
    <div className="max-w-4xl  mx-auto p-4 space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-poppins">
        {/* Advertisements Published */}
        <div className="bg-white rounded-lg p-4 flex flex-col max-h-[150px] h-full  shadow-custom-right">
          <div className="flex items-center justify-center">
            <div className="w-[50px] h-[50px] mr-2 ">
              <img src="/assets/addashboard/1.svg" className='w-[50px] h-[50px]' />
            </div>
            <span className="text-sm font-[500] text-black">Number of advertisements published</span>
          </div>
          <div className="flex-grow flex items-center justify-end ">
            <span className="text-[60px] font-[500] text-[#1544AB]">0</span>
          </div>
        </div>
        
        {/* Ads Added to Favorites */}
        <div className="bg-white rounded-lg shadow-custom-right p-4 flex flex-col max-h-[150px] h-full  ">
          <div className="flex items-center justify-center">
            <div className="w-[50px] h-[50px] mr-2">
                 <img src="/assets/addashboard/2.svg" className='w-[50px] h-[50px]' />
            </div>
            <span className="text-sm font-[500] text-black">Number of ads you have added to your favorites</span>
          </div>
          <div className="flex-grow flex items-center justify-end ">
            <span className="text-[60px] font-[500] text-[#1544AB]">0</span>
          </div>
        </div>
        
        {/* Messages Received */}
        <div className="bg-white rounded-lg shadow-custom-right p-4 flex flex-col max-h-[150px] h-full  ">
          <div className="flex items-center justify-center">
            <div className="w-[50px] h-[50px] mr-2 ">
                 <img src="/assets/addashboard/3.svg" className='w-[50px] h-[50px]' />
            </div>
            <span className="text-sm  font-[500] text-black">Number of messages received for your ads</span>
          </div>
          <div className="flex-grow flex items-center justify-end ">
            <span className="text-[60px] font-[500] text-[#1544AB]">0</span>
          </div>
        </div>
      </div>
      
      {/* Post an Ad Now Section */}
      <div className="bg-white rounded-lg  max-h-[185px] h-full p-5 shadow-custom-right font-poppins">
        <div className="flex flex-col items-end justify-center gap-3">
          <div className="flex">
            <div className="w-10 h-10 mr-3  flex-shrink-0">
                <img src="/assets/addashboard/4.svg" className='w-[50px] h-[50px]' />
            </div>
            <div>
              <h2 className="text-[25px] font-[500]">Post an Ad Now</h2>
              <p className="text-sm text-black mt-1 font-[500]">
                You too can place an ad on exhibitinden.com and get results in a short time by having your ad viewed by millions of users.
              </p>
            </div>
          </div>
         
          <button className="bg-[#1544AB] text-white px-5 py-3 rounded-full text-sm font-medium uppercase">
            Advertise
          </button>
       
        </div>
      </div>
      
      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-poppins">
        {/* Favorite Listings */}
        <div className="bg-white p-5 rounded-lg shadow-custom-right flex flex-col gap-2">
          <div className="flex items-center ">
            <div className="w-[35px] h-[35px] mr-2 ">
            <img src="/assets/addashboard/5.svg" className='w-[35px] h-[35px]' />
            </div>
            <h2 className="text-[25px] font-[500]">Favorite Listings</h2>
          </div>
          <p className="text-sm text-black mt-1 font-[500]">
            Add the listings you are interested in to your favorites, and we will notify you by e-mail when there is a price change.
          </p>
        </div>
        
        {/* Favorite Searches */}
        <div className="bg-white rounded-lg p-5 shadow-custom-right flex flex-col gap-2">
          <div className="flex items-center ">
            <div className="w-[35px] h-[35px] mr-2 text-blue-600">
            <img src="/assets/addashboard/6.svg" className='w-[35px] h-[35px]' />
            </div>
            <h2 className="text-[25px] font-[500]">Favorite Searches</h2>
          </div>
          <p className="text-sm text-black mt-1 font-[500]">
            Save time by saving your search selections and receive email notifications when new results match your favorite searches.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;