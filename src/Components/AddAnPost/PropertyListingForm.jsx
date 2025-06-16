

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, X, Upload, Image as ImageIcon, Video } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import NavMenuBar from '../NavMenuBar';
import CommentForm from '../Home/CommentForm';

// Import Firebase for Firestore and Auth
import { db, auth } from '../../../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

// Move FormField component outside the main component
const FormField = ({ label, name, type = "text", placeholder = "", value, onChange, required = false, disabled = false }) => (
  <div className="mb-3">
    <label className="block text-black text-sm font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-primaryBlue rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent outline-none resize-vertical ${disabled ? 'bg-gray-100' : ''}`}
      />
    ) : type === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-primaryBlue rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent outline-none ${disabled ? 'bg-gray-100' : ''}`}
      >
        <option value="">Select {label}</option>
        {placeholder.split(',').map(option => (
          <option key={option.trim()} value={option.trim()}>{option.trim()}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-primaryBlue rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent outline-none ${disabled ? 'bg-gray-100' : ''}`}
      />
    )}
  </div>
);

// Updated category field configurations to match Flutter app exactly
const categoryFields = {
  property: [
    { name: 'propertyType', label: 'Property Type', type: 'select', placeholder: 'Apartment,House,Villa,Office,Land,Commercial', required: true },
    { name: 'grossArea', label: 'Gross Area (M2)', type: 'number', placeholder: 'Gross area in square meters' },
    { name: 'netArea', label: 'Net Area (M2)', type: 'number', placeholder: 'Net area in square meters' },
    { name: 'numberOfRooms', label: 'Number Of Rooms', type: 'select', placeholder: '1+0,1+1,2+1,3+1,4+1,5+1,6+1,7+1,8+1,9+1,10+' },
    { name: 'heating', label: 'Heating', type: 'select', placeholder: 'Central,Combi,Natural Gas,Electric,Coal,None' },
    { name: 'numberOfBathrooms', label: 'Number Of Bathrooms', type: 'select', placeholder: '1,2,3,4,5,6+' },
    { name: 'kitchen', label: 'Kitchen', type: 'select', placeholder: 'American Kitchen,Separate Kitchen,Kitchenette,None' },
    { name: 'parking', label: 'Parking', type: 'select', placeholder: 'Yes,No,Garage,Open Parking' },
    { name: 'furnished', label: 'Furnished', type: 'select', placeholder: 'Fully Furnished,Semi Furnished,Unfurnished' },
    { name: 'usageStatus', label: 'Usage Status', type: 'select', placeholder: 'Empty,Rented,Owner Occupied' },
    { name: 'withinSite', label: 'Within Site', type: 'select', placeholder: 'Yes,No' },
    { name: 'siteName', label: 'Site Name', placeholder: 'Site name' }
  ],
  vehicle: [
    { name: 'brand', label: 'Brand', type: 'select', placeholder: 'Toyota,Honda,BMW,Mercedes,Audi,Volkswagen,Ford,Chevrolet', required: true },
    { name: 'model', label: 'Model', placeholder: 'Vehicle model', required: true },
    { name: 'year', label: 'Year', type: 'number', placeholder: 'Manufacturing year', required: true },
    { name: 'km', label: 'Kilometers', type: 'number', placeholder: 'Mileage in kilometers' },
    { name: 'fuelType', label: 'Fuel Type', type: 'select', placeholder: 'Gasoline,Diesel,Electric,Hybrid,LPG' },
    { name: 'gear', label: 'Transmission', type: 'select', placeholder: 'Manual,Automatic,Semi-Automatic' },
    { name: 'caseType', label: 'Case Type', type: 'select', placeholder: 'Sedan,SUV,Hatchback,Coupe,Wagon,Convertible,Pickup,Van' },
    { name: 'enginePower', label: 'Engine Power', placeholder: 'Engine power (HP)' },
    { name: 'engineDisplacement', label: 'Engine Displacement', placeholder: 'Engine displacement (cc)' },
    { name: 'traction', label: 'Traction', type: 'select', placeholder: 'Front Wheel Drive,Rear Wheel Drive,All Wheel Drive,4WD' },
    { name: 'door', label: 'Number of Doors', type: 'select', placeholder: '2,3,4,5' },
    { name: 'color', label: 'Color', placeholder: 'Vehicle color' },
    { name: 'vehicleStatus', label: 'Vehicle Status', type: 'select', placeholder: 'New,Used,Damaged' },
    { name: 'guarantee', label: 'Guarantee', type: 'select', placeholder: 'Yes,No' },
    { name: 'seriousDamage', label: 'Serious Damage', type: 'select', placeholder: 'Yes,No' },
    { name: 'plateNationality', label: 'Plate Nationality', type: 'select', placeholder: 'Local,Foreign' },
    { name: 'fromWhom', label: 'From Whom', type: 'select', placeholder: 'Owner,Dealer,Gallery' },
    { name: 'swap', label: 'Swap/Exchange', type: 'select', placeholder: 'Yes,No' }
  ],
  product: [ // This represents spare parts
    { name: 'spareCategory', label: 'Spare Category', type: 'select', placeholder: 'Engine Parts,Body Parts,Electrical,Interior,Exterior,Other', required: true },
    { name: 'type', label: 'Type', placeholder: 'Part type' },
    { name: 'product', label: 'Product', placeholder: 'Product name', required: true },
    { name: 'vehicleBrand', label: 'Vehicle Brand', type: 'select', placeholder: 'Toyota,Honda,BMW,Mercedes,Audi,Volkswagen,Ford,Chevrolet' },
    { name: 'vehicleSeries', label: 'Vehicle Series', placeholder: 'Vehicle series/model' },
    { name: 'productBrand', label: 'Product Brand', placeholder: 'Brand of the spare part' },
    { name: 'fromWhom', label: 'From Whom', type: 'select', placeholder: 'Owner,Dealer,Shop' },
    { name: 'usedSpareParts', label: 'Used Spare Parts', type: 'select', placeholder: 'Yes,No' },
    { name: 'swap', label: 'Swap/Exchange', type: 'select', placeholder: 'Yes,No' },
    { name: 'status', label: 'Status', type: 'select', placeholder: 'New,Used,Refurbished' }
  ],
  animal: [
    { name: 'type', label: 'Animal Type', type: 'select', placeholder: 'Dog,Cat,Bird,Fish,Horse,Other', required: true },
    { name: 'race', label: 'Race/Breed', placeholder: 'Animal breed' },
    { name: 'age', label: 'Age', placeholder: 'Animal age' },
    { name: 'gender', label: 'Gender', type: 'select', placeholder: 'Male,Female' },
    { name: 'fromWhom', label: 'From Whom', type: 'select', placeholder: 'Owner,Pet Shop,Breeder' }
  ]
};

// Generate addID based on user UID and category index
const generateAddID = (userUID, categoryIndex) => {
  return `${userUID}${categoryIndex}`;
};

// Get next available index for the category and generate addID
const getNextCategoryIndexAndAddID = async (userUID, categoryName) => {
  try {
    // Get the user's document from allAddsPost collection
    const userDocRef = doc(db, 'allAddsPost', userUID);
    const userDocSnap = await getDoc(userDocRef);
    
    if (!userDocSnap.exists()) {
      // First ad for this user, start with index 1
      return {
        nextIndex: 0,
        addID: generateAddID(userUID, 1)
      };
    }
    
    const userData = userDocSnap.data();
    
    // Check if the category exists
    if (!userData[categoryName]) {
      // First ad in this category, start with index 1
      return {
        nextIndex: 0,
        addID: generateAddID(userUID, 1)
      };
    }
    
    // Find all numeric field names (0, 1, 2, etc.) within the category
    const categoryData = userData[categoryName];
    const numericFields = Object.keys(categoryData)
      .filter(key => /^\d+$/.test(key))
      .map(key => parseInt(key))
      .sort((a, b) => a - b);
    
    if (numericFields.length === 0) {
      // No ads in this category yet, start with index 1
      return {
        nextIndex: 0,
        addID: generateAddID(userUID, 1)
      };
    }
    
    // Get the next index and calculate the next addID number
    const nextIndex = Math.max(...numericFields) + 1;
    
    // Count total ads across all categories to determine the next addID number
    let totalAdsCount = 0;
    Object.keys(userData).forEach(category => {
      if (typeof userData[category] === 'object' && userData[category] !== null) {
        const categoryAds = Object.keys(userData[category]).filter(key => /^\d+$/.test(key));
        totalAdsCount += categoryAds.length;
      }
    });
    
    // Next addID number is total ads + 1
    const nextAddIDNumber = totalAdsCount + 1;
    
    return {
      nextIndex: nextIndex,
      addID: generateAddID(userUID, nextAddIDNumber)
    };
  } catch (error) {
    console.error('Error getting next category index and addID:', error);
    return {
      nextIndex: 0,
      addID: generateAddID(userUID, 1)
    };
  }
};

export default function DynamicListingForm() {
  const location = useLocation();
  const categorySelectionData = location.state;
  const [user, loading, error] = useAuthState(auth);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    // Common fields for all categories
    adTitle: '', // For display purposes, not saved to DB
    explanation: '', // For display purposes, not saved to DB
    price: '',
    location: '', // Will be constructed from province, district, neighbourhood
    // Address fields
    province: '',
    district: '',
    neighbourhood: ''
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Cloudinary configuration
  const CLOUDINARY_CLOUD_NAME = 'dcjsnjl0d';
  const CLOUDINARY_UPLOAD_PRESET = 'productform';

  // Pre-populate form data from category selection
  useEffect(() => {
    if (categorySelectionData) {
      console.log('Received category selection data:', categorySelectionData);
      
      // Map category names to match mobile app
      const categoryMapping = {
        'vehicle': 'vehicle',
        'vehicles': 'vehicle',
        'property': 'property',
        'real-estate': 'property',
        'spare-parts': 'product',
        'products': 'product',
        'animal': 'animal',
        'animals': 'animal'
      };
      
      const category = categoryMapping[categorySelectionData.mappedCategory] || categorySelectionData.mappedCategory || 'product';
      setSelectedCategory(category);
      
      // Initialize form data with category-specific fields
      const newFormData = {
        adTitle: '',
        explanation: '',
        price: '',
        location: '',
        province: '',
        district: '',
        neighbourhood: '',
        // Store the original category selection data
        categorySelectionPath: categorySelectionData.labels,
        originalCategory: categorySelectionData.category,
        categoryTitle: categorySelectionData.categoryTitle
      };
      
      // Pre-populate vehicle-specific fields if we have selected vehicle data
      if (category === 'vehicle' && categorySelectionData.selectedVehicle) {
        const vehicle = categorySelectionData.selectedVehicle;
        newFormData.model = vehicle.subModel || '';
        newFormData.fuelType = vehicle.fuel || '';
        newFormData.gear = vehicle.gear || '';
        newFormData.engineDisplacement = vehicle.engineDisplacement || '';
        newFormData.enginePower = vehicle.enginePower || '';
        newFormData.caseType = vehicle.caseType || '';
        
        // Extract year from yearsOfProduction if available
        if (vehicle.yearsOfProduction) {
          const yearMatch = vehicle.yearsOfProduction.match(/(\d{4})/);
          if (yearMatch) {
            newFormData.year = yearMatch[1];
          }
        }
      }
      
      // Pre-populate from category selection labels
      if (categorySelectionData.labels) {
        const labels = categorySelectionData.labels;
        
        // For vehicles, try to map selection data to form fields
        if (category === 'vehicle') {
          if (labels.level1) newFormData.brand = labels.level1;
          if (labels.level2) newFormData.model = newFormData.model || labels.level2;
          if (labels.level5) newFormData.fuelType = newFormData.fuelType || labels.level5;
          if (labels.level7) newFormData.gear = newFormData.gear || labels.level7;
          if (labels.level6) newFormData.caseType = newFormData.caseType || labels.level6;
        }
        
        // For property, map relevant fields
        if (category === 'property') {
          if (labels.level1) newFormData.propertyType = labels.level1;
        }
        
        // For spare parts/products, map relevant fields
        if (category === 'product') {
          if (labels.level1) newFormData.vehicleBrand = labels.level1;
          if (labels.level2) newFormData.vehicleSeries = labels.level2;
          if (labels.level3) newFormData.spareCategory = labels.level3;
          if (labels.level4) newFormData.product = labels.level4;
        }

        // For animals, map relevant fields
        if (category === 'animal') {
          if (labels.level1) newFormData.type = labels.level1;
          if (labels.level2) newFormData.race = labels.level2;
        }
      }
      
      // Initialize category-specific fields
      if (categoryFields[category]) {
        categoryFields[category].forEach(field => {
          if (!newFormData.hasOwnProperty(field.name)) {
            newFormData[field.name] = '';
          }
        });
      }
      
      setFormData(newFormData);
      
      // Generate a default ad title based on selection
      if (categorySelectionData.selectedVehicle) {
        newFormData.adTitle = `${categorySelectionData.selectedVehicle.subModel} for Sale`;
      } else if (categorySelectionData.labels) {
        const titleParts = Object.values(categorySelectionData.labels).slice(0, 3);
        newFormData.adTitle = titleParts.join(' ') + ' for Sale';
      }
      
      setFormData(newFormData);
    }
  }, [categorySelectionData]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    
    // Reset category-specific fields but preserve pre-populated data
    const newFormData = {
      adTitle: formData.adTitle,
      explanation: formData.explanation,
      price: formData.price,
      location: formData.location,
      province: formData.province,
      district: formData.district,
      neighbourhood: formData.neighbourhood,
      categorySelectionPath: formData.categorySelectionPath,
      originalCategory: formData.originalCategory,
      categoryTitle: formData.categoryTitle
    };
    
    // Initialize category-specific fields
    if (categoryFields[category]) {
      categoryFields[category].forEach(field => {
        newFormData[field.name] = '';
      });
    }
    
    setFormData(newFormData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle multiple image selection
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (selectedImages.length + files.length > 10) {
      alert('You can upload maximum 10 images');
      return;
    }

    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024;
      
      if (!isValidType) {
        alert(`${file.name} is not a valid image file`);
        return false;
      }
      if (!isValidSize) {
        alert(`${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });

    const newImages = validFiles.map(file => ({
      file,
      id: Date.now() + Math.random(),
      preview: URL.createObjectURL(file)
    }));

    setSelectedImages(prev => [...prev, ...newImages]);
  };

  // Handle video selection
  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate video file
    const isValidType = file.type.startsWith('video/');
    const isValidSize = file.size <= 100 * 1024 * 1024; // 100MB max
    const isValidFormat = ['video/mp4', 'video/mov', 'video/avi'].includes(file.type);

    if (!isValidType || !isValidFormat) {
      alert('Please select a valid video file (MP4, MOV, or AVI)');
      return;
    }
    if (!isValidSize) {
      alert('Video file is too large. Maximum size is 100MB');
      return;
    }

    setSelectedVideo({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    });
  };

  // Remove selected image
  const removeImage = (imageId) => {
    setSelectedImages(prev => {
      const updated = prev.filter(img => img.id !== imageId);
      const removedImage = prev.find(img => img.id === imageId);
      if (removedImage) {
        URL.revokeObjectURL(removedImage.preview);
      }
      return updated;
    });
  };

  // Remove selected video
  const removeVideo = () => {
    if (selectedVideo) {
      URL.revokeObjectURL(selectedVideo.preview);
      setSelectedVideo(null);
    }
  };

  // Upload files to Cloudinary
  const uploadFiles = async () => {
    const uploadPromises = [];
    
    // Upload images
    selectedImages.forEach((imageObj, index) => {
      const promise = uploadToCloudinary(imageObj.file, 'image', `image-${index}`);
      uploadPromises.push(promise);
    });
    
    // Upload video if exists
    if (selectedVideo) {
      const videoPromise = uploadToCloudinary(selectedVideo.file, 'video', 'video');
      uploadPromises.push(videoPromise);
    }
    
    return Promise.all(uploadPromises);
  };

  const uploadToCloudinary = async (file, resourceType, identifier) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('resource_type', resourceType);
    formData.append('folder', `${selectedCategory}-listings`);
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed for ${identifier}`);
    }

    const data = await response.json();
    return data.secure_url; // Return just the URL for imageUrls array
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Check if user is authenticated
    if (!user) {
      alert('Please log in to post an ad');
      return;
    }

    // Validate required fields
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }
    
    if (!formData.price) {
      alert('Please fill in Price');
      return;
    }

    if (selectedImages.length === 0) {
      alert('Please select at least one image');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      setUploadProgress(25);
      const uploadedFiles = await uploadFiles();
      setUploadProgress(50);

      // Get image URLs
      const imageUrls = uploadedFiles.filter(url => typeof url === 'string');

      // Construct location from address fields
      const locationParts = [formData.neighbourhood, formData.district, formData.province].filter(Boolean);
      const location = locationParts.join(', ');

      // Map categories to match your database structure
      let categoryName = '';
      if (selectedCategory === 'property') {
        categoryName = 'Real Estate';
      } else if (selectedCategory === 'vehicle') {
        categoryName = 'Vehicles';
      } else if (selectedCategory === 'product') {
        categoryName = 'Spare Parts, Accessories, hardware & Tuning';
      } else if (selectedCategory === 'animal') {
        categoryName = 'Animal Kingdom';
      }

      // Get next index and generate custom addID
      const { nextIndex, addID } = await getNextCategoryIndexAndAddID(user.uid, categoryName);
      setUploadProgress(60);

      // Prepare data according to mobile app structure
      let adData = {};

      if (selectedCategory === 'property') {
        adData = {
          addID: addID,
          announcementDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
          category: categorySelectionData?.labels?.level1 || 'Real Estate',
          subcategory: categorySelectionData?.labels?.level2 || '',
          thirdLevel: categorySelectionData?.labels?.level3 || '',
          fourthLevel: categorySelectionData?.labels?.level4 || '',
          propertyType: formData.propertyType || '',
          price: formData.price || '',
          grossArea: formData.grossArea || '',
          netArea: formData.netArea || '',
          numberOfRooms: formData.numberOfRooms || '',
          heating: formData.heating || '',
          numberOfBathrooms: formData.numberOfBathrooms || '',
          kitchen: formData.kitchen || '',
          parking: formData.parking || '',
          furnished: formData.furnished || '',
          usageStatus: formData.usageStatus || '',
          withinSite: formData.withinSite || '',
          siteName: formData.siteName || '',
          imageUrls: imageUrls,
          location: location || '',
          fromWhom: 'Owner' // Default value
        };
      } else if (selectedCategory === 'vehicle') {
        adData = {
          addID: addID,
          category: categorySelectionData?.labels?.level1 || 'Vehicles',
          subcategory: categorySelectionData?.labels?.level2 || '',
          thirdLevel: categorySelectionData?.labels?.level3 || '',
          fourthLevel: categorySelectionData?.labels?.level4 || '',
          brand: formData.brand || '',
          model: formData.model || '',
          year: formData.year || '',
          price: formData.price || '',
          location: location || '',
          fuelType: formData.fuelType || '',
          gear: formData.gear || '',
          vehicleStatus: formData.vehicleStatus || '',
          km: formData.km || '',
          caseType: formData.caseType || '',
          enginePower: formData.enginePower || '',
          engineDisplacement: formData.engineDisplacement || '',
          traction: formData.traction || '',
          door: formData.door || '',
          color: formData.color || '',
          guarantee: formData.guarantee || '',
          seriousDamage: formData.seriousDamage || '',
          plateNationality: formData.plateNationality || '',
          fromWhom: formData.fromWhom || 'Owner',
          swap: formData.swap || '',
          imageUrls: imageUrls
        };
      } else if (selectedCategory === 'product') { // Spare Parts
        adData = {
          addID: addID,
          category: categorySelectionData?.labels?.level1 || 'Spare Parts',
          subcategory: categorySelectionData?.labels?.level2 || '',
          thirdLevel: categorySelectionData?.labels?.level3 || '',
          fourthLevel: categorySelectionData?.labels?.level4 || '',
          spareCategory: formData.spareCategory || '',
          type: formData.type || '',
          product: formData.product || '',
          vehicleBrand: formData.vehicleBrand || '',
          vehicleSeries: formData.vehicleSeries || '',
          productBrand: formData.productBrand || '',
          fromWhom: formData.fromWhom || 'Owner',
          usedSpareParts: formData.usedSpareParts || '',
          swap: formData.swap || '',
          status: formData.status || '',
          price: formData.price || '',
          location: location || '',
          imageUrls: imageUrls
        };
      } else if (selectedCategory === 'animal') {
        adData = {
          addID: addID,
          category: categorySelectionData?.labels?.level1 || 'Animal Kingdom',
          subcategory: categorySelectionData?.labels?.level2 || '',
          thirdLevel: categorySelectionData?.labels?.level3 || '',
          fourthLevel: categorySelectionData?.labels?.level4 || '',
          type: formData.type || '',
          race: formData.race || '',
          age: formData.age || '',
          gender: formData.gender || '',
          price: formData.price || '',
          location: location || '',
          fromWhom: formData.fromWhom || 'Owner',
          imageUrls: imageUrls
        };
      }

      // Add common metadata
      adData.createdAt = new Date();
      adData.status = 'active';
      adData.userUID = user.uid;

      setUploadProgress(85);
      
      // Save to Firestore in the category-based structure
      const userDocRef = doc(db, 'allAddsPost', user.uid);
      
      // Check if user document exists
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        // Create new user document with the first ad in the category
        await setDoc(userDocRef, {
          [categoryName]: {
            [nextIndex.toString()]: adData
          }
        });
      } else {
        // Get existing data
        const existingData = userDocSnap.data();
        
        // Prepare update object
        const updateData = {
          ...existingData,
          [categoryName]: {
            ...((existingData[categoryName]) || {}),
            [nextIndex.toString()]: adData
          }
        };
        
        // Update existing user document with new ad in the category
        await setDoc(userDocRef, updateData);
      }
      
      setUploadProgress(100);
      
      alert(`Your ad has been posted successfully in ${categoryName} with ID: ${addID}!`);
      
      // Reset form
      setSelectedCategory('');
      setFormData({
        adTitle: '',
        explanation: '',
        price: '',
        location: '',
        province: '',
        district: '',
        neighbourhood: ''
      });
      setSelectedImages([]);
      setSelectedVideo(null);
      
    } catch (error) {
      console.error('Error posting ad:', error);
      alert(`Failed to post ad: ${error.message}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };


// Show loading state while checking authentication
  if (loading) {
    return (
      <>
        <Navbar />
        <NavMenuBar />
        <div className="max-w-7xl mx-auto p-6 bg-white font-poppins">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <>
        <Navbar />
        <NavMenuBar />
        <div className="max-w-7xl mx-auto p-6 bg-white font-poppins">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Please Log In</h2>
            <p className="text-gray-600 mb-8">You need to be logged in to post an ad.</p>
            <button
              onClick={() => window.location.href = '/login'} // Adjust this to your login route
              className="bg-primaryBlue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <NavMenuBar />
      <div className="max-w-7xl mx-auto p-6 bg-white font-poppins">
        <h1 className="text-2xl font-semibold text-black mb-4">
          Ad Details
        </h1>
        
        <div>
          {/* Category Selection */}
          <div className="mb-6">
            <FormField 
              label="Category" 
              name="category" 
              type="select" 
              placeholder="property,vehicle,product,animal" 
              value={selectedCategory} 
              onChange={handleCategoryChange}
              required={true}
              disabled={!!categorySelectionData} // Disable if pre-selected
            />
          </div>

          {/* Basic Details */}
          <div className="mb-6">
            <FormField 
              label="Ad Title" 
              name="adTitle" 
              placeholder="Enter ad title (for display only)" 
              value={formData.adTitle} 
              onChange={handleInputChange}
            />
            
            <FormField 
              label="Description" 
              name="explanation" 
              type="textarea" 
              placeholder="Describe your item in detail..." 
              value={formData.explanation} 
              onChange={handleInputChange}
            />
            
            <FormField 
              label="Price" 
              name="price" 
              type="number" 
              placeholder="Enter price" 
              value={formData.price} 
              onChange={handleInputChange}
              required={true}
            />
          </div>

          {/* Category-specific fields */}
          {selectedCategory && categoryFields[selectedCategory] && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-black mb-4">
                {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryFields[selectedCategory].map(field => {
                  // Check if this field should be disabled (pre-populated from category selection)
                  const isPrePopulated = categorySelectionData && formData[field.name] && 
                    ['brand', 'model', 'fuelType', 'gear', 'caseType', 'enginePower', 'engineDisplacement',
                     'propertyType', 'vehicleBrand', 'vehicleSeries', 'spareCategory', 'product', 'type', 'race'].includes(field.name);
                  
                  return (
                    <FormField
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      type={field.type || 'text'}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      required={field.required}
                      disabled={isPrePopulated}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Address Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-black mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField 
                label="Province" 
                name="province" 
                placeholder="Province" 
                value={formData.province} 
                onChange={handleInputChange}
              />
              <FormField 
                label="District" 
                name="district" 
                placeholder="District" 
                value={formData.district} 
                onChange={handleInputChange}
              />
              <FormField 
                label="Neighbourhood" 
                name="neighbourhood" 
                placeholder="Neighbourhood" 
                value={formData.neighbourhood} 
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Photograph Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-black mb-4">Photograph</h3>
            
            <div className="flex flex-wrap gap-4 items-center mb-4">
              <label 
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-primaryBlue rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
              >
                <ImageIcon className="w-8 h-8 text-primaryBlue mb-1" />
                <span className="text-sm text-primaryBlue font-medium text-center">Take or Upload</span>
                <span className="text-xs text-primaryBlue">Photo</span>
              </label>
              
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                disabled={uploading}
              />

              <label 
                htmlFor="phone-upload"
                className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-primaryBlue rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
              >
                <Plus className="w-8 h-8 text-primaryBlue mb-1" />
                <span className="text-sm text-primaryBlue font-medium text-center">Add Photo from</span>
                <span className="text-xs text-primaryBlue">Mobile Phone</span>
              </label>
              
              <input
                id="phone-upload"
                type="file"
                multiple
                accept="image/*"
                capture="environment"
                onChange={handleImageSelect}
                className="hidden"
                disabled={uploading}
              />
            </div>
            
            {selectedImages.length > 0 && (
              <div className="mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {selectedImages.map((imageObj) => (
                    <div key={imageObj.id} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                        <img
                          src={imageObj.preview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeImage(imageObj.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={uploading}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-primaryBlue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(selectedImages.length / 10) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  You can increase the visibility of your ad with more photos ({selectedImages.length}/10)
                </p>
              </div>
            )}
          </div>

          {/* Video Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-black mb-4">Video</h3>
            
            {!selectedVideo ? (
              <div>
                <label 
                  htmlFor="video-upload"
                  className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-primaryBlue rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  <Video className="w-8 h-8 text-primaryBlue mb-1" />
                  <span className="text-sm text-primaryBlue font-medium text-center">Take or Upload</span>
                  <span className="text-xs text-primaryBlue">a Video</span>
                </label>
                
                <input
                  id="video-upload"
                  type="file"
                  accept="video/mp4,video/mov,video/avi"
                  onChange={handleVideoSelect}
                  className="hidden"
                  disabled={uploading}
                />
                
                <p className="text-sm text-gray-600 mt-2">
                  The video you add must be in 3gp, mp4 or mov format.<br />
                  The maximum length of the video can be 1 minute.
                </p>
              </div>
            ) : (
              <div className="relative inline-block">
                <video 
                  src={selectedVideo.preview} 
                  className="w-48 h-32 object-cover rounded-lg border-2 border-gray-200"
                  controls
                />
                <button
                  onClick={removeVideo}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  disabled={uploading}
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-sm text-gray-600 mt-1">{selectedVideo.name}</p>
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  {uploadProgress < 70 ? 'Uploading files...' : 
                   uploadProgress < 85 ? 'Saving ad...' : 'Almost done...'}
                </span>
                <span className="text-sm text-gray-600">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primaryBlue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={uploading || !selectedCategory || selectedImages.length === 0}
            className={`w-full py-4 rounded-lg font-semibold text-lg mt-6 transition-all duration-200 ${
              uploading || !selectedCategory || selectedImages.length === 0
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-primaryBlue text-white hover:bg-blue-700'
            }`}
          >
            {uploading ? (
              <div className="flex items-center justify-center">
                <Upload className="w-5 h-5 mr-2 animate-spin" />
                Posting Ad... {uploadProgress}%
              </div>
            ) : (
              'Post Ad'
            )}
          </button>
        </div>
      </div>
      <CommentForm />
      <Footer />
    </>
  );
}



















