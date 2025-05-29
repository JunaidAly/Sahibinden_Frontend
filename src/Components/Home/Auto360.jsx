import React from 'react';
import { Link } from 'react-router-dom';

function Auto360() {
  const product = [
    { 
      id: 1, 
      name: 'Vehicle Valuation', 
      image: '/assets/auto360/1.png',
      route: '/vehicle-valuation'
    },
    { 
      id: 2, 
      name: 'Vehicle Comparison', 
      image: '/assets/auto360/2.png',
      route: '/vehicle-comparison'
    },
    { 
      id: 3, 
      name: 'Vehicle Damage Inquiry', 
      image: '/assets/auto360/3.png',
      route: '/vehicle-damage-inquiry'
    },
    { 
      id: 4, 
      name: 'Auto Expertise', 
      image: '/assets/auto360/4.png',
      route: '/auto-expertise'
    },
    { 
      id: 5, 
      name: 'Credit Offers', 
      image: '/assets/auto360/5.png',
      route: '/credit'
    },
    { 
      id: 6, 
      name: 'Zero World Vehicle', 
      image: '/assets/auto360/6.png',
      route: '/zero-vehicle-world'
    },
    // { 
    //   id: 7, 
    //   name: 'S-My Vehicle', 
    //   image: '/assets/auto360/7.png',
    //   route: '/s-my-vehicle'
    // },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 max-w-7xl gap-24'>
      {product.map((item) => (
        <Link
          key={item.id}
          to= {item.route}
          className='flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm rounded-[10px] shadow-custom-light w-[175px] h-[150px] hover:bg-white/30 hover:scale-105 transition-all duration-300 cursor-pointer'
        >
          <img src={item.image} alt={item.name} className="w-12 h-12 object-contain mb-2" />
          <h2 className="text-sm font-semibold text-center">{item.name}</h2>
        </Link>
      ))}
    </div>
  );
}

export default Auto360;