import React from 'react'
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from 'react-router';

export function ProductsGrid() {
    const products = [
      { image: '/assets/products/4.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'CAR' },
      { image: '/assets/products/5.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'CAR' },
      { image: '/assets/products/4.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'CAR' },
      { image: '/assets/products/5.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'CAR' },
      { image: '/assets/products/4.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'CAR' },
      { image: '/assets/products/5.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'CAR' },
      { image: '/assets/products/4.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'CAR' },
      { image: '/assets/products/5.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'CAR' },
      { image: '/assets/products/4.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'CAR' },
      { image: '/assets/products/5.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'CAR' },
      { image: '/assets/products/4.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'CAR' },
      { image: '/assets/products/5.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'CAR' },
      { image: '/assets/products/4.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'CAR' },
      { image: '/assets/products/5.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'CAR' },
      { image: '/assets/products/23.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'PARTS' },
      { image: '/assets/products/24.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'PARTS' },
      { image: '/assets/products/25.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'PARTS' },
      

      // ... more items
    ];
  
    return (
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
         
          {products.map((p, idx) => (
             <Link to={"/ad-details"} >
            <ProductCard key={idx} {...p} />
            </Link>
          ))}
         
        </div>
      </main>
    );
  }

   export function Stats() {
      const stats = [
        { value: '20K', label: 'Satisfied Clients' },
        { value: '30K', label: 'Items sold' },
        { value: '99%', label: 'Client Satisfaction' },
        { value: '10+', label: 'Work experience' },
      ];
      return (
        <section className="bg-white my-12 p-8   w-[1126px] h-[153px]  border-t-[1px] border-b-[#EBEBEB] border-b-[1px]">
          <div className="grid grid-cols-2 sm:grid-cols-4 text-center">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center gap-5 font-poppins ">
                <h3 className="text-3xl font-[900] text-[64px]  text-[#231E1C]">{s.value}</h3>
                <p className="text-[#8D8D8D] font-[500]">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      );
    }

function ProductCard({ image, title, category, badge }) {
  return (
    <div className="bg-white  rounded-lg shadow hover:shadow-lg transition w-[285px] h-[450px]">
      <img
        src={image}
        alt={title}
        className="w-[285px] h-[300px] object-cover rounded"
      />
      {badge && (
        <span className=" relative bottom-[17.5rem] left-2  text-[#231E1C] bg-white/20 text-[16px] font-poppins font-[600] border border-[#ffffff] h-[40px] w-[58px]  uppercase px-2 py-2 rounded-[40px]">
          {badge}
        </span>
      )}

      <div className='flex flex-col gap-3 '>

      <h3 className=" flex items-center gap-1 ml-2  text-lg font-medium">
        {title} <RiVerifiedBadgeFill className="w-5 h-5" />
      </h3>
      <p className="text-[16px] font-[400] font-poppins ml-2 text-[#8D8D8D]">
        {category}
      </p>

      <div className="flex items-center font-poppins border-t-[1px] border-b-[1px] border-[#EBEBEB]  gap-8 w-[214px] h-[40px] ml-2  ">
        <div className='flex flex-row items-center gap-2'>
        <img
          src="/assets/products/cart/1.png"
          alt="Heart Icon"
          className="w-[18px] h-[18px] "
        />

        <h3 className='text-[16px] text-[#231E1C] font-[400] w-[42px]  '>1-3</h3>
        </div>
        <div className='flex  flex-row  items-center gap-2'>
        <img
          src="/assets/products/cart/2.png"
          alt="Share Icon"
          className="w-[18px] h-[18px]"
        />
        <h3 className='text-[16px] text-[#231E1C] font-[400] w-[42px] '>1-3</h3>
        </div>
        <div className='flex  flex-row  items-center gap-2'>
        <img
          src="/assets/products/cart/3.png"
          alt="Flag Icon"
          className="w-[18px] h-[18px]"
        />
        <h3 className='text-[16px] text-[#231E1C] font-[400] w-[42px] '>1-3</h3>
        </div>
      </div>
      
      </div>
    </div>
  );
}

export default ProductCard