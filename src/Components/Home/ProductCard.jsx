import React from 'react'
import { RiVerifiedBadgeFill } from "react-icons/ri";


export function ProductsGrid() {
    const products = [
      { image: '/assets/products/1.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/2.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/3.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/4.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/5.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/6.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/7.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/8.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/9.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/10.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/11.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/12.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/13.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/14.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/15.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/16.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/17.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/18.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/19.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/20.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/21.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      { image: '/assets/products/22.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      

      // ... more items
    ];
  
    return (
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((p, idx) => (
            <ProductCard key={idx} {...p} />
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
    <div className="bg-white  rounded-lg shadow hover:shadow-lg transition w-[285px] h-[387px]">
        
        <img src={image} alt={title} className="w-[285px] h-[300px] object-cover rounded" />
         {badge && (
          <span className=" relative bottom-[17.5rem] left-2  text-[#231E1C] bg-white/5 text-[16px] font-poppins font-[600] border border-[#ffffff]  uppercase px-2 py-3 rounded-[40px]">
            {badge}
          </span>
        )}
     
      <h3 className=" flex items-center gap-1 ml-2  text-lg font-medium">{title}   <RiVerifiedBadgeFill className='w-5 h-5' /></h3>
      <p className="text-sm ml-2 text-gray-500">{category}</p>
    

    </div>
  )
}

export default ProductCard