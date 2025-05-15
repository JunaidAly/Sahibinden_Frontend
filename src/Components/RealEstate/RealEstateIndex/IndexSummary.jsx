import { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";

const IndexSummary = () => {
  const [selectedPrice, setSelectedPrice] = useState('Price Per M2 For Sale');

  const topProvinces = [
    { rank: 1, name: 'DIYARBAKIR', appreciation: 58.9 },
    { rank: 2, name: 'BINGOL', appreciation: 56.2 },
    { rank: 3, name: 'ERZURUM', appreciation: 54.0 },
    { rank: 4, name: 'SIIRT', appreciation: 50.6 },
    { rank: 5, name: 'MUS', appreciation: 46.4 }
  ];

  const valuableDistricts = [
    { name: 'Sanacaktepe', percentage: 40.2 },
    { name: 'Kadikoy', percentage: 56.2 },
    { name: 'Maltepe', percentage: 32.2 },
    { name: 'Pendik', percentage: 30.2 },
    { name: 'Salt', percentage: 39.2 }
  ];

  const leastAppreciatedDistricts = [
    { name: 'Gaziomanpasa', percentage: 56.2 },
    { name: 'Conqueror', percentage: 40.2 },
    { name: 'Sariyer', percentage: 39.2 },
    { name: 'Hunters', percentage: 32.2 },
    { name: 'Esenler', percentage: 30.2 }
  ];

  const Legend = () => (
    <div className="flex items-center justify-center gap-6 mt-6">
      <div className="flex items-center justify-center gap-2">
        <div>
             <FaCaretDown size={45} className='text-red-600' />
        </div>
        <span className="text-sm">20%+</span>
      </div>
      <div className="flex items-center gap-2">
        <div>
             <FaCaretDown size={45} className='text-red-400' />
        </div>
        <span className="text-sm">10%-20%</span>
      </div>
      <div className="flex items-center gap-2">
        <div>
             <FaCaretDown size={45} className='text-red-200' />
        </div>
        <span className="text-sm">0%-10%</span>
      </div>
      <div className="flex items-center gap-2">
        <div>
             <FaCaretDown size={45} className='text-gray-200' />
        </div>
        <span className="text-sm">0%</span>
      </div>
      <div className="flex items-center gap-2">
        <div>
             <FaCaretDown size={45} className='text-green-200' />
        </div>
        <span className="text-sm">0%-10%</span>
      </div>
      <div className="flex items-center gap-2">
       <div>
             <FaCaretDown size={45} className='text-green-400' />
        </div>
        <span className="text-sm">10%-20%</span>
      </div>
      <div className="flex items-center gap-2">
        <div>
             <FaCaretDown size={45} className='text-green-600' />
        </div>
        <span className="text-sm">20%+</span>
      </div>
    </div>
  );

  const WorldMap = () => (
    <div className="relative  rounded-lg  my-8">
      <img src="/assets/map.png" alt="" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 mt-12 font-poppins shadow-custom-diagonal rounded-lg bg-white">
      {/* Header */}
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-3xl text-center font-bold ml-48">Index Summary</h1>
        <div className="relative left-72 ">
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="appearance-none bg-white border border-primaryBlue rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Price Per M2 For Sale</option>
            <option>Price Per M2 For Rent</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <FaCaretDown size={24} className='text-primaryBlue' />

          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold mb-4">Changes In The Last 1 Year (Sale M2 Price)</h2>
        <WorldMap />
        <Legend />
      </div>

      {/* Top Provinces */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6 text-center">The 5 Most Appreciated Provinces</h2>
        <div className="grid grid-cols-5 gap-4">
          {topProvinces.map((province) => (
            <div key={province.rank} className="text-center  shadow-custom-diagonal rounded-lg p-4 bg-white">
              <div className="flex items-center justify-center ">
                <div className="relative bottom-9 right-24 w-10 h-10 bg-primaryBlue rounded-full flex items-center justify-center text-white font-bold">
                  {province.rank}
                </div>
              </div>
              <div className='relative bottom-5'>
              <h3 className="font-semibold  ">{province.name}</h3>
              <div className="flex items-center justify-center gap-2">
                <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[16px] border-l-transparent border-r-transparent border-b-green-500"></div>
                <span className="text-lg font-semibold">{province.appreciation}%</span>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Districts Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Most Valuable Districts */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Most Valuable Districts</h3>
          <div className=" border border-black rounded-full w-fit flex items-center justify-center gap-20 px-8 mb-4">
            <span className='font-medium'>ISTANBUL</span>
            <div className="bg-[#04AD3D] text-white px-10 py-[10px] rounded-full font-medium">ANKARA</div>
            <span className='font-medium'>IZMIR</span>
          </div>
          <div className="space-y-3">
            {valuableDistricts.map((district, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-24 text-sm font-medium">{district.name}</span>
                <div className="flex-1  h-4 overflow-hidden">
                  <div
                    className="bg-[#04AD3D] h-full "
                    style={{ width: `${district.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm w-12 text-right font-medium">{district.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Least Appreciated Districts */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Least Appreciated Districts</h3>
          <div className="border border-black rounded-full   w-fit flex items-center justify-center gap-20 px-8 mb-4">
            <span className='font-medium'>ISTANBUL</span>
            <div className="bg-[#FF0000] text-white px-10 py-[10px] h-full rounded-full font-medium">ANKARA</div>
            <span className='font-medium'>IZMIR</span>
          </div>
          <div className="space-y-3">
            {leastAppreciatedDistricts.map((district, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-24 text-sm font-medium">{district.name}</span>
                <div className="flex-1  rounded- h-4 ml-4 overflow-hidden">
                  <div
                    className="bg-[#FF0000] h-full "
                    style={{ width: `${district.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm w-12 text-right font-medium">{district.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexSummary;