import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { db, auth } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import FormField from './FormField';
import MediaUpload from './MediaUpload';

// Category field configurations
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
  product: [
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

// Generate addID based on user UID and category-specific index
const generateAddID = (userUID, categoryIndex) => {
  return `${userUID}${categoryIndex}`;
};

// Get next available index for the category and generate addID
const getNextCategoryIndexAndAddID = async (userUID, categoryName) => {
  try {
    const userDocRef = doc(db, 'allAddsPost', userUID);
    const userDocSnap = await getDoc(userDocRef);
    
    if (!userDocSnap.exists()) {
      return {
        nextIndex: 0,
        addID: generateAddID(userUID, 1)
      };
    }
    
    const userData = userDocSnap.data();
    
    if (!userData[categoryName]) {
      return {
        nextIndex: 0,
        addID: generateAddID(userUID, 1)
      };
    }
    
    const categoryData = userData[categoryName];
    const numericFields = Object.keys(categoryData)
      .filter(key => /^\d+$/.test(key))
      .map(key => parseInt(key))
      .sort((a, b) => a - b);
    
    if (numericFields.length === 0) {
      return {
        nextIndex: 0,
        addID: generateAddID(userUID, 1)
      };
    }
    
    const nextIndex = Math.max(...numericFields) + 1;
    const categoryAdsCount = numericFields.length;
    const nextAddIDNumber = categoryAdsCount + 1;
    
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

const ListingFormLogic = () => {
  const location = useLocation();
  const categorySelectionData = location.state;
  const [user, loading, error] = useAuthState(auth);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    adTitle: '',
    explanation: '',
    price: '',
    location: '',
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
      
      const newFormData = {
        adTitle: '',
        explanation: '',
        price: '',
        location: '',
        province: '',
        district: '',
        neighbourhood: '',
        categorySelectionPath: categorySelectionData.labels,
        originalCategory: categorySelectionData.category,
        categoryTitle: categorySelectionData.categoryTitle
      };
      
      // Pre-populate vehicle-specific fields
      if (category === 'vehicle' && categorySelectionData.selectedVehicle) {
        const vehicle = categorySelectionData.selectedVehicle;
        newFormData.model = vehicle.subModel || '';
        newFormData.fuelType = vehicle.fuel || '';
        newFormData.gear = vehicle.gear || '';
        newFormData.engineDisplacement = vehicle.engineDisplacement || '';
        newFormData.enginePower = vehicle.enginePower || '';
        newFormData.caseType = vehicle.caseType || '';
        
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
        
        if (category === 'vehicle') {
          if (labels.level1) newFormData.brand = labels.level1;
          if (labels.level2) newFormData.model = newFormData.model || labels.level2;
          if (labels.level5) newFormData.fuelType = newFormData.fuelType || labels.level5;
          if (labels.level7) newFormData.gear = newFormData.gear || labels.level7;
          if (labels.level6) newFormData.caseType = newFormData.caseType || labels.level6;
        }
        
        if (category === 'property') {
          if (labels.level1) newFormData.propertyType = labels.level1;
        }
        
        if (category === 'product') {
          if (labels.level1) newFormData.vehicleBrand = labels.level1;
          if (labels.level2) newFormData.vehicleSeries = labels.level2;
          if (labels.level3) newFormData.spareCategory = labels.level3;
          if (labels.level4) newFormData.product = labels.level4;
        }

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
      
      // Generate default ad title
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

    const isValidType = file.type.startsWith('video/');
    const isValidSize = file.size <= 100 * 1024 * 1024;
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
    
    selectedImages.forEach((imageObj, index) => {
      const promise = uploadToCloudinary(imageObj.file, 'image', `image-${index}`);
      uploadPromises.push(promise);
    });
    
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
    return data.secure_url;
  };

  const handleSubmit = async () => {
    if (!user) {
      alert('Please log in to post an ad');
      return;
    }

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

      const imageUrls = uploadedFiles.filter(url => typeof url === 'string');

      const locationParts = [formData.neighbourhood, formData.district, formData.province].filter(Boolean);
      const location = locationParts.join(', ');

      // Map categories to match Firebase structure
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

      const { nextIndex, addID } = await getNextCategoryIndexAndAddID(user.uid, categoryName);
      setUploadProgress(60);

      // Prepare data according to Firebase structure
      let adData = {};

      if (selectedCategory === 'property') {
        adData = {
          addID: addID,
          announcementDate: new Date().toISOString().split('T')[0],
          category: categorySelectionData?.labels?.category || 'Real Estate',
          subcategory: categorySelectionData?.labels?.level1 || '',
          thirdLevel: categorySelectionData?.labels?.level2 || '',
          fourthLevel: categorySelectionData?.labels?.level3 || '',
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
          fromWhom: 'Owner',
          createdAt: new Date(),
          adStatus: 'active',
          userUID: user.uid
        };
      } else if (selectedCategory === 'vehicle') {
        adData = {
          addID: addID,
          category: categorySelectionData?.labels?.category || 'Vehicles',
          subcategory: categorySelectionData?.labels?.level1 || '',
          thirdLevel: categorySelectionData?.labels?.level2 || '',
          fourthLevel: categorySelectionData?.labels?.level3 || '',
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
          imageUrls: imageUrls,
          createdAt: new Date(),
          adStatus: 'active',
          userUID: user.uid
        };
      } else if (selectedCategory === 'product') {
        adData = {
          addID: addID,
          category: categorySelectionData?.labels?.category || 'Spare Parts',
          subcategory: categorySelectionData?.labels?.level1 || '',
          thirdLevel: categorySelectionData?.labels?.level2 || '',
          fourthLevel: categorySelectionData?.labels?.level3 || '',
          spareCategory: formData.spareCategory || '',
          type: formData.type || '',
          product: formData.product || '',
          vehicleBrand: formData.vehicleBrand || '',
          vehicleSeries: formData.vehicleSeries || '',
          productBrand: formData.productBrand || '',
          fromWhom: formData.fromWhom || 'Owner',
          usedSpareParts: formData.usedSpareParts || '',
          swap: formData.swap || '',
          partCondition: formData.status || '',
          price: formData.price || '',
          location: location || '',
          imageUrls: imageUrls,
          createdAt: new Date(),
          adStatus: 'active',
          userUID: user.uid
        };
      } else if (selectedCategory === 'animal') {
        adData = {
          addID: addID,
          category: categorySelectionData?.labels.category || 'Animal Kingdom',
          subcategory: categorySelectionData?.labels?.level1 || '',
          thirdLevel: categorySelectionData?.labels?.level2 || '',
          fourthLevel: categorySelectionData?.labels?.level3 || '',
          type: formData.type || '',
          race: formData.race || '',
          age: formData.age || '',
          gender: formData.gender || '',
          price: formData.price || '',
          location: location || '',
          fromWhom: formData.fromWhom || 'Owner',
          imageUrls: imageUrls,
          createdAt: new Date(),
          adStatus: 'active',
          userUID: user.uid
        };
      }

      setUploadProgress(85);
      
      // Save to Firestore in array-like structure
      const userDocRef = doc(db, 'allAddsPost', user.uid);
      
      try {
        const userDocSnap = await getDoc(userDocRef);
        
        if (!userDocSnap.exists()) {
          const newDocument = {
            [categoryName]: [adData]
          };
          await setDoc(userDocRef, newDocument);
          console.log('Created new user document with array structure:', newDocument);
        } else {
          const existingData = userDocSnap.data();
          
          if (!existingData[categoryName]) {
            existingData[categoryName] = [];
          }
          
          if (!Array.isArray(existingData[categoryName])) {
            const objectData = existingData[categoryName];
            const arrayData = [];
            Object.keys(objectData).sort((a, b) => parseInt(a) - parseInt(b)).forEach(key => {
              if (/^\d+$/.test(key)) {
                arrayData.push(objectData[key]);
              }
            });
            existingData[categoryName] = arrayData;
          }
          
          existingData[categoryName].push(adData);
          
          await setDoc(userDocRef, existingData);
          console.log('Updated existing document with array structure:', existingData);
        }
        
        setUploadProgress(100);
        
        const arrayIndex = userDocSnap.exists() && Array.isArray(userDocSnap.data()[categoryName]) 
          ? userDocSnap.data()[categoryName].length 
          : 0;
        
        alert(`Your ad has been posted successfully!\nCategory: ${categoryName}\nAd ID: ${addID}\nArray Index: ${arrayIndex}`);
        
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
        
      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError);
        throw new Error(`Database save failed: ${firestoreError.message}`);
      }
      
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
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Please Log In</h2>
        <p className="text-gray-600 mb-8">You need to be logged in to post an ad.</p>
        <button
          onClick={() => window.location.href = '/login'}
          className="bg-primaryBlue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
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
            disabled={!!categorySelectionData}
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

        {/* Media Upload Component */}
        <MediaUpload
          selectedImages={selectedImages}
          selectedVideo={selectedVideo}
          onImageSelect={handleImageSelect}
          onVideoSelect={handleVideoSelect}
          onRemoveImage={removeImage}
          onRemoveVideo={removeVideo}
          uploading={uploading}
        />

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
  );
};

export default ListingFormLogic;