// // PropertyListing.jsx
// import React from "react";
// const details = [
//   { label: "Ad No.", value: "12562345678654" },
//   { label: "Announcement Date", value: "March 2025" },
//   { label: "Property Type", value: "House For Sale" },
//   { label: "m² (Gross)", value: "70" },
//   { label: "m² (Net)", value: "65" },
//   { label: "Number of Rooms", value: "3 + 3" },
//   { label: "Building Age", value: "Between 2-3" },
//   { label: "Number of Floors", value: "2" },
//   { label: "Heating", value: "Combi Boiler" },
//   { label: "Parking", value: "Two Vehicles" },
// ];

// const PropertyListing = () => {
//   return (
//     <div className="max-w-6xl mx-auto p-4 bg-white rounded-xl border border-[#E0E0E0]">
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Main Image and Info Section */}
//         <div className="w-full md:w-2/3">
//           <img
//             src="/assets/addetails/img.png"
//             alt="Modern house with pool"
//             className="w-full h-96 object-cover rounded-xl"
//           />
//         </div>

//         {/* Property Details */}

//         <div className="max-w-2xl mx-auto p-6 font-sans text-[#2D2D2D]">
//           {/* Price header */}
//           <h1 className="text-[26px]  font-bold ">1,395,000 TL</h1>

//           {/* Property details with vertical dividers */}
//           <div className="">
//             {details.map((detail, index) => (
//               <div key={index} className="flex items-start">
//                 <div className=" text-2xl md:text-[20px] font-[400] leading-[171%] text-[#414141]">
//                   {detail.label}
//                 </div>
//                 <div className="px-1 text-3xl md:text-xl text-[#000000] font-light">
//                   |
//                 </div>
//                 <div className="flex-1 w-max  md:text-[20px] font-[400] leading-[171%] text-[#414141]">
//                   {detail.value}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Thumbnail Images */}
//       <div className="mb-3 grid grid-cols-3 gap-3 w-[400px]">
//         <img
//           src="/assets/addetails/1.png"
//           alt="Property thumbnail 1"
//           className="w-[181px] h-[108px] object-cover rounded-lg"
//         />
//         <img
//           src="/assets/addetails/2.png"
//           alt="Property thumbnail 2"
//           className="w-[181px] h-[108px] object-cover rounded-lg"
//         />
//         <img
//           src="/assets/addetails/3.png"
//           alt="Property thumbnail 3"
//           className="w-[181px] h-[108px] object-cover rounded-lg"
//         />
//       </div>
      
//     </div>
//   );
// };


// export const PropertyDescription = () => {
//   const additionalDetails = [
//     { category: "BEDROOM FEATURES:", value: "Main Floor Master Bedroom, Walk-In Closet", highlight: false },
//     { category: "DINING AREA:", value: "Breakfast Counter/Bar, Living/Dining Combo", highlight: true },
//     { category: "DOORS & WINDOWS", value: "Bay Window", highlight: false },
//     { category: "ENTRY LOCATION:", value: "Mid Level", highlight: true },
//     { category: "EXTERIOR CONSTRUCTION:", value: "Wood", highlight: false },
//     { category: "FIREPLACE FUEL:", value: "Pellet Stove", highlight: true }
//   ];

//   return (
//     <div className="max-w-6xl mx-auto p-6 font-poppins">
//       {/* Description section */}
//       <div className="mb-8">
//         <h2 className="text-[28px]   leading-[100%] font-bold text-[#434343] mb-3">Description</h2>
//         <p className="text-[#434343] leading-[38px]   ">
//           Enchanting Three Bedroom, Three Bath Home With Spacious One Bedroom, One Bath Cabana, In-Laws Quarters. Charming Living Area 
//           Features Fireplace And Fabulous Art Deco Details, Formal Dining Room. Remodeled Kitchen With Granite Countertops, White Cabinetry 
//           And Stainless Appliances. Lovely Master Bedroom Has Updated Bath, Beautiful View Of The Pool. Guest Bedrooms Have Walk-In, Cedar 
//           Closets. Delightful Backyard; Majestic Oaks Surround The Free Form Pool And Expansive Patio, Wet Bar And Grill.
//         </p>
//       </div>

//       {/* Additional Details section */}
//       <div className="font-poppins">
//         <h2 className="text-[28px] leading-[100%] font-bold text-[#434343] mb-4  ">Additional Details</h2>
//         <div className=" overflow-hidden">
//           {additionalDetails.map((detail, index) => (
//             <div 
//               key={index} 
//               className={`flex ${detail.highlight ? 'bg-[#1544AB] text-white' : 'bg-white text-[#272727]'}`}
//             >
//               <div className={`w-2/5 p-3 text-[20px] vertical-trim leading-[38px] font-poppins font-medium ${detail.highlight ? 'border-r border-blue-600' : 'border-r border-gray-200'}`}>
//                 {detail.category}
//               </div>
//               <div className="w-3/5 p-3 text-[20px]  leading-[38px] font-poppins">
//                 {detail.value}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyListing;




import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase"; // Adjust path as needed

const PropertyListing = () => {
  const { id } = useParams(); // Get property ID from URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch property data from Firebase
  useEffect(() => {
    const searchAllDocuments = async () => {
      try {
        console.log('Searching all documents for ID:', id);
        const querySnapshot = await getDocs(collection(db, "allAddsPost"));
        let foundProperty = null;
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(`Checking document ${doc.id}:`, Object.keys(data));
          
          // Check if document ID starts with the search ID (for cases where index is appended)
          if (doc.id.startsWith(id) && (data.propertyType || data.images || data.price)) {
            console.log('Found document with matching ID prefix:', doc.id);
            foundProperty = { id: doc.id, ...data };
            return;
          }
          
          // Check if this is an exact direct match
          if (doc.id === id && (data.propertyType || data.images || data.price)) {
            console.log('Found exact direct match in document:', doc.id);
            foundProperty = { id: doc.id, ...data };
            return;
          }
          
          // Search in nested arrays and objects
          Object.keys(data).forEach(categoryKey => {
            if (Array.isArray(data[categoryKey])) {
              console.log(`Checking array ${categoryKey} in doc ${doc.id}`);
              data[categoryKey].forEach((item, index) => {
                console.log(`Item ${index} in ${categoryKey}:`, { addID: item.addID, id: item.id });
                if (item.addID === id || item.id === id || (item.addID && item.addID.startsWith(id))) {
                  console.log('Found matching property in nested array!');
                  foundProperty = { id: doc.id, originalDocId: doc.id, ...item };
                }
              });
            } else if (data[categoryKey] && typeof data[categoryKey] === 'object') {
              // Check single object properties
              const item = data[categoryKey];
              console.log(`Checking object ${categoryKey}:`, { addID: item.addID, id: item.id });
              if (item.addID === id || item.id === id || (item.addID && item.addID.startsWith(id))) {
                console.log('Found matching property in nested object!');
                foundProperty = { id: doc.id, originalDocId: doc.id, ...item };
              }
            }
          });
        });
        
        if (foundProperty) {
          console.log('Property found:', foundProperty);
          setProperty(foundProperty);
          setError(null);
        } else {
          console.log('Property not found anywhere');
          setError("Property not found");
        }
      } catch (searchError) {
        console.error("Error searching for property:", searchError);
        setError("Failed to load property details");
      }
    };

    const fetchProperty = async () => {
      if (!id) {
        setError("No property ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Searching for property with ID:', id);
        
        // First, try to get the document directly
        const docRef = doc(db, "allAddsPost", id);
        const docSnap = await getDoc(docRef);

        console.log('Direct document lookup result:', docSnap.exists());
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log('Document data:', data);
          console.log('Has propertyType:', !!data.propertyType);
          console.log('Has images:', !!data.images);
          console.log('Has price:', !!data.price);
          
          // Check if this is a direct property document
          if (data.propertyType || data.images || data.price) {
            console.log('Found direct property document');
            setProperty({ id: docSnap.id, ...data });
            setError(null);
            return;
          }
        }
        
        // If direct lookup fails, search all documents for matching addID or partial ID match
        console.log('Direct lookup failed, searching all documents...');
        await searchAllDocuments();
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <div className="w-full h-96 bg-gray-300 rounded-xl"></div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-300 rounded mb-2"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <p className="text-gray-600 mb-4">Property ID: {id}</p>
          <button 
            onClick={() => window.history.back()} 
            className="bg-primaryBlue text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!property) return null;

  // Format creation date
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
    } catch {
      return "N/A";
    }
  };

  // Generate property details from Firebase data
  const details = [
    { label: "Ad No.", value: property.addID || property.id || "N/A" },
    { label: "Announcement Date", value: formatDate(property.createdAt) },
    { label: "Property Type", value: property.propertyType || "N/A" },
    { label: "m² (Gross)", value: property.m2Gross || "N/A" },
    { label: "m² (Net)", value: property.m2Net || "N/A" },
    { label: "Open Area m²", value: property.openAreaM2 || "N/A" },
    { label: "Number of Rooms", value: property.numberOfRooms || "N/A" },
    { label: "Number of Bathrooms", value: property.numberOfBathrooms || "N/A" },
    { label: "Heating", value: property.heating || "N/A" },
    { label: "Parking", value: property.parking || "N/A" },
    { label: "Kitchen", value: property.kitchen || "N/A" },
    { label: "Furnished", value: property.furnished || "N/A" },
    { label: "Usage Status", value: property.usageStatus || "N/A" },
    { label: "Within The Site", value: property.withinTheSite || "N/A" },
    { label: "Site Name", value: property.siteName || "N/A" }
  ].filter(detail => detail.value && detail.value !== "N/A"); // Only show fields with values

  // Handle images - support both imageUrls and images arrays
  const images = property.images || property.imageUrls || [];
  const mainImage = images.length > 0 
    ? (typeof images[selectedImageIndex] === 'string' 
        ? images[selectedImageIndex] 
        : images[selectedImageIndex]?.url)
    : '/assets/placeholder-property.png';

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white rounded-xl border border-[#E0E0E0]">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Image and Info Section */}
        <div className="w-full md:w-2/3">
          <img
            src={mainImage}
            alt={`${property.propertyType} in ${property.siteName}`}
            className="w-full h-96 object-cover rounded-xl"
            onError={(e) => {
              e.target.src = '/assets/placeholder-property.png';
            }}
          />
        </div>

        {/* Property Details */}
        <div className="max-w-2xl mx-auto p-6 font-sans text-[#2D2D2D]">
          {/* Price header */}
          <h1 className="text-[26px] font-bold mb-4">
            {property.price ? `${parseInt(property.price).toLocaleString()} TL` : 'Price on Request'}
          </h1>

          {/* Property details with vertical dividers */}
          <div className="space-y-1">
            {details.map((detail, index) => (
              <div key={index} className="flex items-start">
                <div className="text-2xl md:text-[20px] font-[400] leading-[171%] text-black min-w-[140px]">
                  {detail.label}
                </div>
                <div className="px-1 text-3xl md:text-xl text-[#000000] font-light">
                  |
                </div>
                <div className="flex-1 w-max md:text-[20px] font-[400] leading-[171%] text-black">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="mb-3 mt-6">
          <h3 className="text-lg font-semibold mb-3">Property Images</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {images.slice(0, 6).map((image, index) => {
              const imageUrl = typeof image === 'string' ? image : image?.url;
              return (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Property image ${index + 1}`}
                  className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedImageIndex === index 
                      ? 'ring-2 ring-primaryBlue opacity-100' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                  onError={(e) => {
                    e.target.src = '/assets/placeholder-property.png';
                  }}
                />
              );
            })}
          </div>
          {images.length > 6 && (
            <p className="text-sm text-gray-500 mt-2">
              +{images.length - 6} more images
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export const PropertyDescription = ({ property }) => {
  if (!property) return null;

  // Create additional details from property data
  const additionalDetails = [
    { category: "PROPERTY TYPE:", value: property.propertyType, highlight: false },
    { category: "SITE NAME:", value: property.siteName, highlight: true },
    { category: "HEATING SYSTEM:", value: property.heating, highlight: false },
    { category: "KITCHEN:", value: property.kitchen, highlight: true },
    { category: "PARKING:", value: property.parking, highlight: false },
    { category: "FURNISHED:", value: property.furnished, highlight: true },
    { category: "USAGE STATUS:", value: property.usageStatus, highlight: false },
    { category: "WITHIN SITE:", value: property.withinTheSite, highlight: true }
  ].filter(detail => detail.value && detail.value.trim() !== ""); // Only show fields with values

  return (
    <div className="max-w-6xl mx-auto p-6 font-poppins">
      {/* Description section */}
      <div className="mb-8">
        <h2 className="text-[28px] leading-[100%] font-bold text-[#434343] mb-3">Property Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Property Information</h3>
            <p className="text-[#434343] leading-[38px]">
              This is a {property.propertyType?.toLowerCase()} property located in {property.siteName}. 
              {property.m2Gross && ` The property features ${property.m2Gross}m² of gross area`}
              {property.m2Net && ` with ${property.m2Net}m² of net area`}.
              {property.numberOfRooms && ` It has ${property.numberOfRooms} rooms`}
              {property.numberOfBathrooms && ` and ${property.numberOfBathrooms} bathrooms`}.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Features</h3>
            <ul className="text-[#434343] leading-[38px] space-y-1">
              {property.heating && <li>• Heating: {property.heating}</li>}
              {property.parking && <li>• Parking: {property.parking}</li>}
              {property.kitchen && <li>• Kitchen: {property.kitchen}</li>}
              {property.furnished && <li>• Furnished: {property.furnished}</li>}
              {property.openAreaM2 && <li>• Open Area: {property.openAreaM2}m²</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Details section */}
      {additionalDetails.length > 0 && (
        <div className="font-poppins">
          <h2 className="text-[28px] leading-[100%] font-bold text-[#434343] mb-4">Additional Details</h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            {additionalDetails.map((detail, index) => (
              <div 
                key={index} 
                className={`flex ${detail.highlight ? 'bg-[#1544AB] text-white' : 'bg-white text-[#272727]'}`}
              >
                <div className={`w-2/5 p-3 text-[20px] leading-[38px] font-poppins font-medium ${detail.highlight ? 'border-r border-blue-600' : 'border-r border-gray-200'}`}>
                  {detail.category}
                </div>
                <div className="w-3/5 p-3 text-[20px] leading-[38px] font-poppins">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced PropertyDetails component that combines both
export const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      try {
        const docRef = doc(db, "allAddsPost", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12">Loading property details...</div>;
  }

  return (
    <div>
      <PropertyListing />
      <PropertyDescription property={property} />
    </div>
  );
};

export default PropertyListing;