import React from 'react'
import { Link } from 'react-router-dom'

function ShoppingBlog() {
    const product = [
      {
        id: 1,
        name: "Home & Living",
        image: "/assets/shoppingblog/1.png",
        route: "/home-living",
      },
      {
        id: 2,
        name: "Technology",
        image: "/assets/shoppingblog/2.png",
        route: "/home-living",
      },
      {
        id: 3,
        name: "Fashion",
        image: "/assets/shoppingblog/3.png",
        route: "/home-living",
      },
      {
        id: 4,
        name: "Sports & Outdoors",
        image: "/assets/shoppingblog/4.png",
        route: "/home-living",
      },
      {
        id: 5,
        name: "Mother & Baby",
        image: "/assets/shoppingblog/5.png",
        route: "/home-living",
      },
    ];
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 max-w-4xl  gap-16 '>
      {product.map((item) => (
        <div
          key={item.id}
          to={item.route}
          className='flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm rounded-[10px] shadow-custom-light w-[175px] h-[150px]'
        >
          <img src={item.image} alt={item.name} className="w-12 h-12 object-contain mb-2" />
          <h2 className="text-sm font-semibold text-center">{item.name}</h2>
        </div>
      ))}
    </div>
  )
}

export default ShoppingBlog