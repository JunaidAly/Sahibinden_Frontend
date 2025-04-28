import React from 'react'

function RealEstate360() {
    const product = [
        { id: 1, name: 'Real Estate Expertise', image: '/assets/realestate360/1.png' },
        { id: 2, name: 'Credit Offers', image: '/assets/realestate360/2.png' },
        { id: 3, name: 'Property Buying Guide', image: '/assets/realestate360/3.png' },
        { id: 4, name: 'Property Rental Guide', image: '/assets/realestate360/3.png' },
        { id: 5, name: 'Real Estate Sales Guide', image: '/assets/realestate360/3.png' },
        
      ];
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-[963px] h-[130px]  '>
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
  )
}

export default RealEstate360