import React from 'react';

function Auto360() {
  const product = [
    { id: 1, name: 'Vehicle Valuation', image: '/assets/auto360/1.png' },
    { id: 2, name: 'Vehicle Comparison', image: '/assets/auto360/2.png' },
    { id: 3, name: 'Vehicle Damage Inquiry', image: '/assets/auto360/3.png' },
    { id: 4, name: 'Auto Expertise', image: '/assets/auto360/4.png' },
    { id: 5, name: 'Credit Offers', image: '/assets/auto360/5.png' },
    { id: 6, name: 'Zero World Vehicle', image: '/assets/auto360/6.png' },
    { id: 7, name: 'S-My Vehicle', image: '/assets/auto360/7.png' },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 w-[1320px]'>
      {product.map((item) => (
        <div
          key={item.id}
          className='flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm rounded-[10px] shadow-lg w-[175px] h-[150px]'
        >
          <img src={item.image} alt={item.name} className="w-12 h-12 object-contain mb-2" />
          <h2 className="text-sm font-semibold text-center">{item.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default Auto360;
