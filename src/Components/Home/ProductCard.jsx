// import React from 'react'
// import { RiVerifiedBadgeFill } from "react-icons/ri";
// import { Link } from 'react-router';

// export function ProductsGrid() {
//     const products = [
//       { image: '/assets/products/1.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/2.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/3.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/4.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/5.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/6.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/7.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/8.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/9.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/10.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/11.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/12.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/13.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/14.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/15.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/16.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/17.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/18.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/19.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/20.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/21.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
//       { image: '/assets/products/22.png', title: 'Highett Common', category: 'Abbotsford, Victoria', badge: 'For Rent' },
      

//       // ... more items
//     ];
  
//     return (
//       <main className="flex-1 p-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
         
//           {products.map((p, idx) => (
//              <Link to={"/ad-details"} >
//             <ProductCard key={idx} {...p} />
//             </Link>
//           ))}
         
//         </div>
//       </main>
//     );
//   }
  
//  export function Stats() {
//     const stats = [
//       { value: '20K', label: 'Satisfied Clients' },
//       { value: '30K', label: 'Items sold' },
//       { value: '99%', label: 'Client Satisfaction' },
//       { value: '10+', label: 'Work experience' },
//     ];
//     return (
//       <section className="bg-white my-12 p-8   w-[1126px] h-[153px]  border-t-[1px] border-b-[#EBEBEB] border-b-[1px]">
//         <div className="grid grid-cols-2 sm:grid-cols-4 text-center">
//           {stats.map((s, i) => (
//             <div key={i} className="flex flex-col items-center justify-center gap-5 font-poppins ">
//               <h3 className="text-3xl font-[900] text-[64px]  text-[#231E1C]">{s.value}</h3>
//               <p className="text-[#8D8D8D] font-[500]">{s.label}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   }
// function ProductCard({ image, title, category, badge }) {
//   return (
//     <div className="bg-white  rounded-lg shadow hover:shadow-lg transition w-[285px] h-[387px]">
        
//         <img src={image} alt={title} className="w-[285px] h-[300px] object-cover rounded" />
//          {badge && (
//           <span className=" relative bottom-[17.5rem] left-2  text-[#231E1C] bg-white/20 text-[16px] font-poppins font-[600] border border-[#ffffff]  uppercase px-2 py-3 rounded-[40px]">
//             {badge}
//           </span>
//         )}
     
//       <h3 className=" flex items-center gap-1 ml-2  text-lg font-medium">{title}   <RiVerifiedBadgeFill className='w-5 h-5' /></h3>
//       <p className="text-sm ml-2 text-gray-500">{category}</p>
    

//     </div>
//   )
// }

// export default ProductCard







import React, { useState, useEffect } from 'react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from 'react-router';

// Import Firebase functions
import { db } from '../../../firebase'; // Adjust path as needed
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

export function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Simplified query - just get all property ads and filter client-side
        const q = query(
          collection(db, 'propertyAds'),
          orderBy('createdAt', 'desc') // Newest first
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedProducts = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Filter for active ads client-side to avoid index requirement
          if (data.status === 'active' || !data.status) { // Include if active or no status field
            fetchedProducts.push({
              id: doc.id,
              ...data,
              // Ensure we have at least one image, use placeholder if none
              image: data.images && data.images.length > 0 
                ? (typeof data.images[0] === 'string' ? data.images[0] : data.images[0].url)
                : '/assets/placeholder-property.png', // Add a placeholder image to your public folder
              title: data.propertyType || 'Property',
              category: data.siteName || 'Location not specified',
              badge: determineBadge(data)
            });
          }
        });
        
        setProducts(fetchedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load properties. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Determine badge based on property data
  const determineBadge = (data) => {
    if (data.usageStatus) {
      return data.usageStatus;
    }
    // Default badge logic - you can customize this
    if (data.price) {
      return 'For Sale';
    }
    return 'Available';
  };

  // Loading state
  if (loading) {
    return (
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {/* Loading skeletons */}
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow animate-pulse">
              <div className="w-[285px] h-[300px] bg-gray-300 rounded"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="flex-1 p-6">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primaryBlue text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <main className="flex-1 p-6">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No properties found.</p>
          <Link 
            to="/post-details" 
            className="bg-primaryBlue text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block"
          >
            Post Your Property
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6">
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {products.length} properties
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link to={`/ad-details/${product.id}`} key={product.id}>
            <ProductCard {...product} />
          </Link>
        ))}
      </div>
    </main>
  );
}

export function Stats() {
  const [stats, setStats] = useState([
    { value: '20K', label: 'Satisfied Clients' },
    { value: '30K', label: 'Items sold' },
    { value: '99%', label: 'Client Satisfaction' },
    { value: '10+', label: 'Work experience' },
  ]);

  // Optional: You can also fetch these stats from Firebase
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total number of ads
        const adsSnapshot = await getDocs(collection(db, 'propertyAds'));
        const totalAds = adsSnapshot.size;
        
        // Update stats with real data
        setStats(prev => prev.map(stat => {
          if (stat.label === 'Items sold') {
            return { ...stat, value: totalAds.toString() };
          }
          return stat;
        }));
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="bg-white my-12 p-8 w-[1126px] h-[153px] border-t-[1px] border-b-[#EBEBEB] border-b-[1px]">
      <div className="grid grid-cols-2 sm:grid-cols-4 text-center">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center justify-center gap-5 font-poppins">
            <h3 className="text-3xl font-[900] text-[64px] text-[#231E1C]">{s.value}</h3>
            <p className="text-[#8D8D8D] font-[500]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ image, title, category, badge, price, m2Gross, numberOfRooms }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition w-[285px] h-[387px]">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-[285px] h-[300px] object-cover rounded" 
          onError={(e) => {
            e.target.src = '/assets/placeholder-property.png'; // Fallback image
          }}
        />
        {badge && (
          <span className="absolute top-4 left-4 text-[#231E1C] bg-white/90 backdrop-blur-sm text-[14px] font-poppins font-[600] border border-[#ffffff] uppercase px-3 py-2 rounded-[40px] shadow-sm">
            {badge}
          </span>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="flex items-center gap-1 text-lg font-medium truncate">
          {title} 
          <RiVerifiedBadgeFill className='w-5 h-5 text-green-500' />
        </h3>
        
        <p className="text-sm text-gray-500 truncate mb-2">{category}</p>
        
        {/* Additional property details */}
        <div className="flex items-center justify-between text-xs text-gray-600">
          {price && (
            <span className="font-semibold text-primaryBlue">
              ${parseInt(price).toLocaleString()}
            </span>
          )}
          {(m2Gross || numberOfRooms) && (
            <div className="flex gap-2">
              {numberOfRooms && <span>{numberOfRooms} rooms</span>}
              {m2Gross && <span>{m2Gross}m²</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;