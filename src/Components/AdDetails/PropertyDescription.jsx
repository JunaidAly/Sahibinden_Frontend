import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { CATEGORY_CONFIGS, DEFAULT_CONFIG } from "./PropertyConfig";
import PropertyListing from "./PropertyListing";

export const PropertyDescription = ({ property, category }) => {
  if (!property) return null;

  const categoryConfig = CATEGORY_CONFIGS[category] || DEFAULT_CONFIG;

  // Generate additional details based on category configuration
  const additionalDetails = categoryConfig.additionalDetails
    .map(detail => ({
      category: detail.category,
      value: property[detail.field] || (detail.field === 'category' ? category : null),
      highlight: detail.highlight
    }))
    .filter(detail => detail.value && detail.value.trim() !== "");

  // Generate description text based on category
  const generateDescription = () => {
    const categoryName = categoryConfig.name.toLowerCase();
    const location = property.siteName || property.location || 'available location';
    
    let description = '';
    
    switch(category) {
      case 'vehicles':
        const vehicleInfo = `${property.brand || ''} ${property.model || ''} ${property.year || ''}`.trim();
        description = `This is a ${vehicleInfo} ${property.fuelType ? `with ${property.fuelType.toLowerCase()} fuel` : ''}${property.km ? ` and ${property.km} km mileage` : ''}. `;
        description += `${property.gear ? `Features ${property.gear.toLowerCase()} transmission` : ''}${property.enginePower ? ` with ${property.enginePower} engine power` : ''}.`;
        break;
      case 'spare-parts':
        const partInfo = property.product || property.type || 'spare part';
        description = `This is a ${partInfo.toLowerCase()} ${property.vehicleBrand ? `for ${property.vehicleBrand}` : ''}${property.vehicleSeries ? ` ${property.vehicleSeries}` : ''}. `;
        description += `${property.productBrand ? `Made by ${property.productBrand}` : ''}${property.status ? ` in ${property.status.toLowerCase()} condition` : ''}.`;
        break;
      case 'animal-kingdom':
        const animalInfo = `${property.race || property.type || 'animal'}`;
        description = `This is a ${animalInfo.toLowerCase()} ${property.gender ? `(${property.gender.toLowerCase()})` : ''}${property.age ? ` aged ${property.age}` : ''}. `;
        description += `Available from ${property.fromWhom || 'seller'} in ${location}.`;
        break;
      default:
        // Real estate categories
        const propertyType = property.propertyType || property.investmentType || property.landType || 'property';
        description = `This is a ${propertyType.toLowerCase()} ${categoryName.includes('property') ? '' : 'property'} located in ${location}. `;
        
        if (category === 'residential') {
          description += `${property.m2Gross ? `The property features ${property.m2Gross}m² of gross area` : ''}${property.m2Net ? ` with ${property.m2Net}m² of net area` : ''}.${property.numberOfRooms ? ` It has ${property.numberOfRooms} rooms` : ''}${property.numberOfBathrooms ? ` and ${property.numberOfBathrooms} bathrooms` : ''}.`;
        } else if (category === 'commercial') {
          description += `${property.m2Gross ? `With ${property.m2Gross}m² of space` : ''}${property.businessType ? ` suitable for ${property.businessType.toLowerCase()} business` : ''}.${property.floorLevel ? ` Located on the ${property.floorLevel} floor` : ''}.`;
        } else if (category === 'investment') {
          description += `${property.currentRentalIncome ? `Currently generating ${property.currentRentalIncome} TL monthly rental income` : ''}${property.rentalYield ? ` with a ${property.rentalYield}% rental yield` : ''}.`;
        } else {
          description += `${property.m2Gross ? `The property features ${property.m2Gross}m² of space` : ''}.`;
        }
    }
    
    return description;
  };

  // Generate key features based on category
  const getKeyFeatures = () => {
    const features = [];
    
    switch(category) {
      case 'vehicles':
        if (property.fuelType) features.push(`• Fuel Type: ${property.fuelType}`);
        if (property.gear) features.push(`• Transmission: ${property.gear}`);
        if (property.color) features.push(`• Color: ${property.color}`);
        if (property.guarantee) features.push(`• Guarantee: ${property.guarantee}`);
        if (property.vehicleStatus) features.push(`• Status: ${property.vehicleStatus}`);
        break;
      case 'spare-parts':
        if (property.spareCategory) features.push(`• Category: ${property.spareCategory}`);
        if (property.productBrand) features.push(`• Brand: ${property.productBrand}`);
        if (property.status) features.push(`• Condition: ${property.status}`);
        if (property.usedSpareParts) features.push(`• Used Parts: ${property.usedSpareParts}`);
        break;
      case 'animal-kingdom':
        if (property.type) features.push(`• Type: ${property.type}`);
        if (property.race) features.push(`• Breed: ${property.race}`);
        if (property.age) features.push(`• Age: ${property.age}`);
        if (property.gender) features.push(`• Gender: ${property.gender}`);
        break;
      default:
        // Real estate features
        if (property.heating) features.push(`• Heating: ${property.heating}`);
        if (property.parking) features.push(`• Parking: ${property.parking}`);
        if (property.furnished) features.push(`• Furnished: ${property.furnished}`);
        if (property.numberOfRooms) features.push(`• Rooms: ${property.numberOfRooms}`);
        if (property.numberOfBathrooms) features.push(`• Bathrooms: ${property.numberOfBathrooms}`);
    }
    
    return features;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-poppins">
      {/* Description section */}
      <div className="mb-8">
        <h2 className="text-[28px] leading-[100%] font-bold text-[#434343] mb-3">
          {categoryConfig.name} Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Item Information</h3>
            <p className="text-[#434343] leading-[38px]">
              {generateDescription()}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Key Features</h3>
            <div className="text-[#434343] leading-[38px] space-y-1">
              {getKeyFeatures().map((feature, index) => (
                <div key={index}>{feature}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details section */}
      {additionalDetails.length > 0 && (
        <div className="font-poppins">
          <h2 className="text-[28px] leading-[100%] font-bold text-[#434343] mb-4">
            Additional {categoryConfig.name} Details
          </h2>
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

// Enhanced PropertyDetails component that combines both PropertyListing and PropertyDescription
export const PropertyDetails = () => {
  const { category, addID, id } = useParams();
  const propertyId = addID || id;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) return;
      
      try {
        const docRef = doc(db, "allAddsPost", propertyId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (!category || data.category === category) {
            setProperty({ id: docSnap.id, ...data });
          }
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, category]);

  if (loading) {
    return <div className="text-center py-12">Loading item details...</div>;
  }

  return (
    <div>
      <PropertyListing />
      <PropertyDescription property={property} category={category} />
    </div>
  );
};

export default PropertyDescription;