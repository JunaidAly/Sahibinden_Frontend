

// import React, { useState } from 'react';
// import { Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
// import Navbar from '../Navbar';
// import Footer from '../Footer';
// import NavMenuBar from '../NavMenuBar';
// import CommentForm from '../Home/CommentForm';

// // Import Firebase functions (you'll need to set these up)
// import { storage, db, auth } from '../../../firebase'; // Adjust path as needed
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { collection, addDoc } from 'firebase/firestore';
// import { signInAnonymously } from 'firebase/auth';

// // Move FormField component outside the main component
// const FormField = ({ label, name, type = "text", placeholder = "", value, onChange }) => (
//   <div className="mb-3">
//     <label className="block text-black text-sm font-medium mb-2">
//       {label}
//     </label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="w-full px-4 py-3 border border-primaryBlue rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent outline-none"
//     />
//   </div>
// );

// export default function PropertyListingForm() {
//   const [formData, setFormData] = useState({
//     price: '',
//     propertyType: '',
//     m2Gross: '',
//     m2Net: '',
//     openAreaM2: '',
//     numberOfRooms: '',
//     heating: '',
//     numberOfBathrooms: '',
//     kitchen: '',
//     parking: '',
//     furnished: '',
//     usageStatus: '',
//     withinTheSite: '',
//     siteName: ''
//   });

//   const [selectedImages, setSelectedImages] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle multiple image selection
//   const handleImageSelect = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Limit to 10 images max
//     if (selectedImages.length + files.length > 10) {
//       alert('You can upload maximum 10 images');
//       return;
//     }

//     // Validate file types and sizes
//     const validFiles = files.filter(file => {
//       const isValidType = file.type.startsWith('image/');
//       const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB max
      
//       if (!isValidType) {
//         alert(`${file.name} is not a valid image file`);
//         return false;
//       }
//       if (!isValidSize) {
//         alert(`${file.name} is too large. Maximum size is 5MB`);
//         return false;
//       }
//       return true;
//     });

//     // Create preview objects
//     const newImages = validFiles.map(file => ({
//       file,
//       id: Date.now() + Math.random(),
//       preview: URL.createObjectURL(file)
//     }));

//     setSelectedImages(prev => [...prev, ...newImages]);
//   };

//   // Remove selected image
//   const removeImage = (imageId) => {
//     setSelectedImages(prev => {
//       const updated = prev.filter(img => img.id !== imageId);
//       // Clean up preview URLs
//       const removedImage = prev.find(img => img.id === imageId);
//       if (removedImage) {
//         URL.revokeObjectURL(removedImage.preview);
//       }
//       return updated;
//     });
//   };

//   // Upload images to Firebase Storage
//   const uploadImages = async () => {
//     if (selectedImages.length === 0) return [];
    
//     const uploadPromises = selectedImages.map(async (imageObj, index) => {
//       try {
//         // Create unique filename
//         const timestamp = Date.now();
//         const fileName = `property-images/${timestamp}-${index}-${imageObj.file.name}`;
//         const storageRef = ref(storage, fileName);
        
//         // Upload file
//         const snapshot = await uploadBytes(storageRef, imageObj.file);
//         const downloadURL = await getDownloadURL(snapshot.ref);
        
//         return downloadURL;
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         throw error;
//       }
//     });

//     return Promise.all(uploadPromises);
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (selectedImages.length === 0) {
//       alert('Please select at least one image');
//       return;
//     }

//     setUploading(true);
//     setUploadProgress(0);

//     try {
//       // Check if user is authenticated, if not, sign in anonymously
//       if (!auth.currentUser) {
//         console.log('No user signed in, signing in anonymously...');
//         await signInAnonymously(auth);
//         console.log('Signed in anonymously');
//       }

//       // Upload images first
//       setUploadProgress(25);
//       const imageUrls = await uploadImages();
//       setUploadProgress(50);

//       // Prepare data for Firestore
//       const adData = {
//         ...formData,
//         images: imageUrls,
//         createdAt: new Date(),
//         status: 'active',
//         userId: auth.currentUser?.uid || 'anonymous'
//       };

//       setUploadProgress(75);

//       // Save to Firestore
//       const docRef = await addDoc(collection(db, 'propertyAds'), adData);
      
//       setUploadProgress(100);
      
//       console.log('Ad posted successfully with ID:', docRef.id);
//       alert('Your ad has been posted successfully!');
      
//       // Reset form
//       setFormData({
//         price: '',
//         propertyType: '',
//         m2Gross: '',
//         m2Net: '',
//         openAreaM2: '',
//         numberOfRooms: '',
//         heating: '',
//         numberOfBathrooms: '',
//         kitchen: '',
//         parking: '',
//         furnished: '',
//         usageStatus: '',
//         withinTheSite: '',
//         siteName: ''
//       });
//       setSelectedImages([]);
      
//     } catch (error) {
//       console.error('Detailed error:', error);
//       console.error('Error code:', error.code);
//       console.error('Error message:', error.message);
      
//       // More specific error messages
//       if (error.code === 'storage/unauthorized') {
//         alert('Authentication failed. Please try again.');
//       } else if (error.code === 'storage/canceled') {
//         alert('Upload was canceled.');
//       } else if (error.code === 'storage/unknown') {
//         alert('An unknown error occurred. Please check your internet connection.');
//       } else {
//         alert(`Failed to post ad: ${error.message}`);
//       }
//     } finally {
//       setUploading(false);
//       setUploadProgress(0);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <NavMenuBar />
//       <div className="max-w-7xl mx-auto p-6 bg-white font-poppins">
//         <h1 className="text-2xl font-semibold text-black mb-8">
//           Enter details to post your ad
//         </h1>
        
//         <div>
//           {/* Image Upload Section */}
//           <div className="mb-8">
//             <h3 className="text-lg font-medium text-black mb-4">Property Images</h3>
            
//             {/* Upload Button */}
//             <div className="flex flex-wrap gap-4 items-center">
//               <label 
//                 htmlFor="image-upload"
//                 className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-primaryBlue rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
//               >
//                 <Plus className="w-8 h-8 text-primaryBlue mb-1" />
//                 <span className="text-sm text-primaryBlue font-medium text-center">Add Photos</span>
//                 <span className="text-xs text-gray-500 mt-1">(Max 10)</span>
//               </label>
              
//               <input
//                 id="image-upload"
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageSelect}
//                 className="hidden"
//                 disabled={uploading}
//               />
//             </div>
            
//             {/* Image Previews */}
//             {selectedImages.length > 0 && (
//               <div className="mt-4">
//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                   {selectedImages.map((imageObj) => (
//                     <div key={imageObj.id} className="relative group">
//                       <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
//                         <img
//                           src={imageObj.preview}
//                           alt="Preview"
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
                      
//                       {/* Remove button */}
//                       <button
//                         onClick={() => removeImage(imageObj.id)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                         disabled={uploading}
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
                
//                 <p className="text-sm text-gray-600 mt-2">
//                   {selectedImages.length} image(s) selected
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Form Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormField label="Price" name="price" type="number" placeholder="Enter price" value={formData.price} onChange={handleInputChange} />
//             <FormField label="Property Type" name="propertyType" placeholder="e.g., Apartment, House" value={formData.propertyType} onChange={handleInputChange} />
//             <FormField label="M2 (Gross)" name="m2Gross" type="number" placeholder="Gross area" value={formData.m2Gross} onChange={handleInputChange} />
//             <FormField label="M2 (Net)" name="m2Net" type="number" placeholder="Net area" value={formData.m2Net} onChange={handleInputChange} />
//             <FormField label="Open Area M2" name="openAreaM2" type="number" placeholder="Open area" value={formData.openAreaM2} onChange={handleInputChange} />
//             <FormField label="Number Of Rooms" name="numberOfRooms" type="number" placeholder="Number of rooms" value={formData.numberOfRooms} onChange={handleInputChange} />
//             <FormField label="Heating" name="heating" placeholder="Heating type" value={formData.heating} onChange={handleInputChange} />
//             <FormField label="Number Of Bathrooms" name="numberOfBathrooms" type="number" placeholder="Number of bathrooms" value={formData.numberOfBathrooms} onChange={handleInputChange} />
//             <FormField label="Kitchen" name="kitchen" placeholder="Kitchen details" value={formData.kitchen} onChange={handleInputChange} />
//             <FormField label="Parking" name="parking" placeholder="Parking availability" value={formData.parking} onChange={handleInputChange} />
//             <FormField label="Furnished" name="furnished" placeholder="Furnished status" value={formData.furnished} onChange={handleInputChange} />
//             <FormField label="Usage Status" name="usageStatus" placeholder="Usage status" value={formData.usageStatus} onChange={handleInputChange} />
//             <FormField label="Within The Site" name="withinTheSite" placeholder="Within site details" value={formData.withinTheSite} onChange={handleInputChange} />
//             <FormField label="Site Name" name="siteName" placeholder="Site name" value={formData.siteName} onChange={handleInputChange} />
//           </div>

//           {/* Upload Progress */}
//           {uploading && (
//             <div className="mb-4">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm text-gray-600">Uploading...</span>
//                 <span className="text-sm text-gray-600">{uploadProgress}%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div 
//                   className="bg-primaryBlue h-2 rounded-full transition-all duration-300"
//                   style={{ width: `${uploadProgress}%` }}
//                 ></div>
//               </div>
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             disabled={uploading || selectedImages.length === 0}
//             className={`w-full py-4 rounded-lg font-semibold text-lg mt-6 transition-all duration-200 ${
//               uploading || selectedImages.length === 0
//                 ? 'bg-gray-400 cursor-not-allowed text-white'
//                 : 'bg-primaryBlue text-white hover:bg-blue-700'
//             }`}
//           >
//             {uploading ? (
//               <div className="flex items-center justify-center">
//                 <Upload className="w-5 h-5 mr-2 animate-spin" />
//                 Posting Ad... {uploadProgress}%
//               </div>
//             ) : (
//               'Post Ad'
//             )}
//           </button>
//         </div>
//       </div>
//       <CommentForm />
//       <Footer />
//     </>
//   );
// }







import React, { useState } from 'react';
import { Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import NavMenuBar from '../NavMenuBar';
import CommentForm from '../Home/CommentForm';

// Import Firebase for Firestore only
import { db } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';

// Move FormField component outside the main component
const FormField = ({ label, name, type = "text", placeholder = "", value, onChange }) => (
  <div className="mb-3">
    <label className="block text-black text-sm font-medium mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-primaryBlue rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent outline-none"
    />
  </div>
);

export default function PropertyListingForm() {
  const [formData, setFormData] = useState({
    price: '',
    propertyType: '',
    m2Gross: '',
    m2Net: '',
    openAreaM2: '',
    numberOfRooms: '',
    heating: '',
    numberOfBathrooms: '',
    kitchen: '',
    parking: '',
    furnished: '',
    usageStatus: '',
    withinTheSite: '',
    siteName: ''
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Cloudinary configuration - Replace with your credentials
  const CLOUDINARY_CLOUD_NAME = 'dcjsnjl0d'; // Replace with your cloud name
  const CLOUDINARY_UPLOAD_PRESET = 'productform'; // Replace with your upload preset

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
    
    // Limit to 10 images max
    if (selectedImages.length + files.length > 10) {
      alert('You can upload maximum 10 images');
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB max for Cloudinary
      
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

    // Create preview objects
    const newImages = validFiles.map(file => ({
      file,
      id: Date.now() + Math.random(),
      preview: URL.createObjectURL(file)
    }));

    setSelectedImages(prev => [...prev, ...newImages]);
  };

  // Remove selected image
  const removeImage = (imageId) => {
    setSelectedImages(prev => {
      const updated = prev.filter(img => img.id !== imageId);
      // Clean up preview URLs
      const removedImage = prev.find(img => img.id === imageId);
      if (removedImage) {
        URL.revokeObjectURL(removedImage.preview);
      }
      return updated;
    });
  };

  // Upload images to Cloudinary
  const uploadImages = async () => {
    if (selectedImages.length === 0) return [];
    
    const uploadPromises = selectedImages.map(async (imageObj, index) => {
      try {
        const formData = new FormData();
        formData.append('file', imageObj.file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', 'property-images'); // Optional: organize in folders
        
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData
          }
        );

        if (!response.ok) {
          throw new Error(`Upload failed for image ${index + 1}`);
        }

        const data = await response.json();
        return {
          url: data.secure_url,
          publicId: data.public_id,
          width: data.width,
          height: data.height
        };
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    });

    return Promise.all(uploadPromises);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (selectedImages.length === 0) {
      alert('Please select at least one image');
      return;
    }

    // Validate required fields
    if (!formData.price || !formData.propertyType) {
      alert('Please fill in at least Price and Property Type');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Upload images to Cloudinary
      setUploadProgress(25);
      console.log('Starting image uploads...');
      const imageData = await uploadImages();
      setUploadProgress(70);

      // Prepare data for Firestore
      const adData = {
        ...formData,
        images: imageData,
        createdAt: new Date(),
        status: 'active',
        createdBy: 'user' // You can add user ID here if you have authentication
      };

      setUploadProgress(85);

      // Save to Firestore
      const docRef = await addDoc(collection(db, 'propertyAds'), adData);
      
      setUploadProgress(100);
      
      console.log('Ad posted successfully with ID:', docRef.id);
      alert('Your ad has been posted successfully!');
      
      // Reset form
      setFormData({
        price: '',
        propertyType: '',
        m2Gross: '',
        m2Net: '',
        openAreaM2: '',
        numberOfRooms: '',
        heating: '',
        numberOfBathrooms: '',
        kitchen: '',
        parking: '',
        furnished: '',
        usageStatus: '',
        withinTheSite: '',
        siteName: ''
      });
      setSelectedImages([]);
      
    } catch (error) {
      console.error('Detailed error:', error);
      
      // More specific error messages
      if (error.message.includes('Upload failed')) {
        alert('Failed to upload images. Please check your internet connection and try again.');
      } else if (error.message.includes('Cloudinary')) {
        alert('Image upload service error. Please try again later.');
      } else {
        alert(`Failed to post ad: ${error.message}`);
      }
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <>
      <Navbar />
      <NavMenuBar />
      <div className="max-w-7xl mx-auto p-6 bg-white font-poppins">
        <h1 className="text-2xl font-semibold text-black mb-8">
          Enter details to post your ad
        </h1>
        
        <div>
          {/* Image Upload Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-black mb-4">Property Images</h3>
            
            {/* Upload Button */}
            <div className="flex flex-wrap gap-4 items-center">
              <label 
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-primaryBlue rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
              >
                <Plus className="w-8 h-8 text-primaryBlue mb-1" />
                <span className="text-sm text-primaryBlue font-medium text-center">Add Photos</span>
                <span className="text-xs text-gray-500 mt-1">(Max 10)</span>
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
            </div>
            
            {/* Image Previews */}
            {selectedImages.length > 0 && (
              <div className="mt-4">
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
                      
                      {/* Remove button */}
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
                
                <p className="text-sm text-gray-600 mt-2">
                  {selectedImages.length} image(s) selected
                </p>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Price *" name="price" type="number" placeholder="Enter price" value={formData.price} onChange={handleInputChange} />
            <FormField label="Property Type *" name="propertyType" placeholder="e.g., Apartment, House" value={formData.propertyType} onChange={handleInputChange} />
            <FormField label="M2 (Gross)" name="m2Gross" type="number" placeholder="Gross area" value={formData.m2Gross} onChange={handleInputChange} />
            <FormField label="M2 (Net)" name="m2Net" type="number" placeholder="Net area" value={formData.m2Net} onChange={handleInputChange} />
            <FormField label="Open Area M2" name="openAreaM2" type="number" placeholder="Open area" value={formData.openAreaM2} onChange={handleInputChange} />
            <FormField label="Number Of Rooms" name="numberOfRooms" type="number" placeholder="Number of rooms" value={formData.numberOfRooms} onChange={handleInputChange} />
            <FormField label="Heating" name="heating" placeholder="Heating type" value={formData.heating} onChange={handleInputChange} />
            <FormField label="Number Of Bathrooms" name="numberOfBathrooms" type="number" placeholder="Number of bathrooms" value={formData.numberOfBathrooms} onChange={handleInputChange} />
            <FormField label="Kitchen" name="kitchen" placeholder="Kitchen details" value={formData.kitchen} onChange={handleInputChange} />
            <FormField label="Parking" name="parking" placeholder="Parking availability" value={formData.parking} onChange={handleInputChange} />
            <FormField label="Furnished" name="furnished" placeholder="Furnished status" value={formData.furnished} onChange={handleInputChange} />
            <FormField label="Usage Status" name="usageStatus" placeholder="Usage status" value={formData.usageStatus} onChange={handleInputChange} />
            <FormField label="Within The Site" name="withinTheSite" placeholder="Within site details" value={formData.withinTheSite} onChange={handleInputChange} />
            <FormField label="Site Name" name="siteName" placeholder="Site name" value={formData.siteName} onChange={handleInputChange} />
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  {uploadProgress < 70 ? 'Uploading images...' : 
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
            disabled={uploading || selectedImages.length === 0}
            className={`w-full py-4 rounded-lg font-semibold text-lg mt-6 transition-all duration-200 ${
              uploading || selectedImages.length === 0
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