import React from 'react'
import { Link } from 'react-router-dom'
function RealEstate360() {
    const product = [
      {
        id: 1,
        name: "Real Estate Expertise",
        image: "/assets/realestate360/1.png",
        route: "/real-estate-expertise",
      },
      {
        id: 2,
        name: "Credit Offers",
        image: "/assets/realestate360/2.png",
        route: "/credit-estate",
      },
      {
        id: 3,
        name: "Property Buying Guide",
        image: "/assets/realestate360/3.png",
        route: "/property-buying-guide",
      },
      {
        id: 4,
        name: "Property Rental Guide",
        image: "/assets/realestate360/3.png",
        route: "/property-rental-guide",
      },
      {
        id: 5,
        name: "Real Estate Sales Guide",
        image: "/assets/realestate360/3.png",
        route: "/selling-guides-page",
      },
    ];

    
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 max-w-4xl gap-16  '>
      {product.map((item) => (
        <Link
          key={item.id}
          to={item.route}
          className='flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm rounded-[10px] shadow-custom-light w-[175px] h-[150px] hover:bg-white/30 hover:scale-105 transition-all duration-300 cursor-pointer'
        >
          <img src={item.image} alt={item.name} className="w-12 h-12 object-contain mb-2" />
          <h2 className="text-sm font-semibold text-center">{item.name}</h2>
        </Link>
      ))}
    </div>
  )
}

export default RealEstate360