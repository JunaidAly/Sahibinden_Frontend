import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth'; // If you're using this
import { auth, db } from "../../../firebase";
import { 
  CATEGORY_CONFIGS, 
  DEFAULT_CONFIG, 
  getFieldValue, 
  getItemTitle, 
  getPriceDisplay 
} from "./PropertyConfig";
import FavoritesModal from "./FavoritesModal";

const PropertyListing = () => {
  const { category, addID, id } = useParams(); 
  const navigate = useNavigate();
  const propertyId = addID || id;
  
  // Get current authenticated user
  const [user, loading, error] = useAuthState(auth); // If using react-firebase-hooks
  // OR if you have your own auth context:
  // const { user } = useAuth();
  
  const [property, setProperty] = useState(null);
  const [userData, setUserData] = useState(null);
  const [propertyLoading, setPropertyLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(false);
  const [propertyError, setPropertyError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  // Get category configuration
  const categoryConfig = CATEGORY_CONFIGS[category] || DEFAULT_CONFIG;

  // Updated function to remove last digit from addID
  const findUserIdFromProperty = (propertyData) => {
    const possibleUserIdFields = [
          'userUID','addID'
    ];
    
    for (const field of possibleUserIdFields) {
      if (propertyData[field]) {
        let userId = propertyData[field];
        
        // For addID, remove the last digit to create base ID
        if (field === 'addID' && userId.length > 1) {
          userId = userId.slice(0, -1);
        }
        
        return userId;
      }
    }
    
    // Check nested objects for user ID
    for (const [key, value] of Object.entries(propertyData)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        for (const field of possibleUserIdFields) {
          if (value[field]) {
            let userId = value[field];
            
            // For addID, remove the last digit to create base ID
            if (field === 'addID' && userId.length > 1) {
              userId = userId.slice(0, -1);
            }
            
            return userId;
          }
        }
      }
    }
    
    return null;
  };

  // Function to fetch user data from Firebase
  const fetchUserData = async (uid) => {
    if (!uid) return;
    
    try {
      setUserLoading(true);
      
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        
        // Try multiple field names for each piece of data
        const displayName = userData.displayName || userData.name || userData.fullName || userData.username || 'Unknown User';
        const phone = userData.homePhone || userData.phone || userData.phoneNumber || userData.contactNumber || 'Contact not available';
        const email = userData.email || userData.emailAddress || 'Email not available';
        const photoURL = userData.photoURL || userData.profilePicture || userData.avatar || userData.image || null;
        
        setUserData({
          displayName,
          homePhone: phone,
          photoURL,
          email,
          uid // Store the original user ID
        });
      } else {
        setUserData({
          displayName: 'Unknown User',
          homePhone: 'Contact not available',
          photoURL: null,
          email: 'Email not available',
          uid: uid
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData({
        displayName: 'Unknown User',
        homePhone: 'Contact not available',
        photoURL: null,
        email: 'Email not available',
        uid: uid
      });
    } finally {
      setUserLoading(false);
    }
  };

  // Updated handleSendMessage function
  const handleSendMessage = () => {
    if (!property) {
      alert('Property data not available');
      return;
    }

    if (!user) {
      alert('Please login to send a message');
      // Optionally redirect to login
      // navigate('/login');
      return;
    }

    // Get the current property's addID
    const currentAddId = property.addID || property.id || propertyId;
    
    if (!currentAddId) {
      alert('Property ID not available');
      return;
    }

   // Prepare property data for the chat
const propertyData = {
  title: getItemTitle(property, category, categoryConfig),
  price: getPriceDisplay(property),
  type: categoryConfig.name, // Just the original category name
  location: getFieldValue(property, 'location') || getFieldValue(property, 'city') || 'Location not specified',
  image: property.images?.[0] || property.imageUrls?.[0] || '/assets/placeholder-property.png',
  addId: currentAddId, // Current property's addID
  category: property.category || category
};

    // Use dynamic user data or fallback
    const contactInfo = {
      name: userData?.displayName || "Unknown User",
      phone: userData?.homePhone || "Contact not available",
      receiverId: userData?.uid || findUserIdFromProperty(property) || 'unknown_receiver',
      email: userData?.email
    };

    console.log('Chat Data:', {
      propertyData,
      contactInfo,
      currentUserId: user.uid,
      propertyAddId: currentAddId
    });

    // Navigate to chat with all necessary data
    navigate('/chat', {
      state: {
        propertyData,
        contactInfo,
        currentUserId: user.uid, // Current authenticated user ID
        initialMessages: []
      }
    });
  };

  // Search all documents when direct lookup fails
  const searchAllDocuments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "allAddsPost"));
      let foundProperty = null;
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Check if it's a direct document match
        if (doc.id.startsWith(propertyId) && (data.brand || data.propertyType || data.type || data.images || data.price)) {
          if (!category || data.category === category) {
            foundProperty = { id: doc.id, ...data };
            return;
          }
        }
        
        if (doc.id === propertyId && (data.brand || data.propertyType || data.type || data.images || data.price)) {
          if (!category || data.category === category) {
            foundProperty = { id: doc.id, ...data };
            return;
          }
        }
        
        // Check nested arrays and objects
        Object.keys(data).forEach(categoryKey => {
          if (Array.isArray(data[categoryKey])) {
            data[categoryKey].forEach((item, index) => {
              const matchesId = item.addID === propertyId || item.id === propertyId || 
                               (item.addID && item.addID.startsWith(propertyId));
              const matchesCategory = !category || item.category === category || categoryKey === category;
              
              if (matchesId && matchesCategory) {
                foundProperty = { 
                  id: doc.id, 
                  originalDocId: doc.id, 
                  categoryKey: categoryKey,
                  arrayIndex: index,
                  ...item 
                };
              }
            });
          } else if (data[categoryKey] && typeof data[categoryKey] === 'object') {
            const item = data[categoryKey];
            const matchesId = item.addID === propertyId || item.id === propertyId || 
                             (item.addID && item.addID.startsWith(propertyId));
            const matchesCategory = !category || item.category === category || categoryKey === category;
            
            if (matchesId && matchesCategory) {
              foundProperty = { 
                id: doc.id, 
                originalDocId: doc.id, 
                categoryKey: categoryKey,
                ...item 
              };
            }
          }
        });
      });
      
      if (foundProperty) {
        setProperty(foundProperty);
        setPropertyError(null);
        
        // Fetch user data after property is found
        const uid = findUserIdFromProperty(foundProperty);
        if (uid) {
          await fetchUserData(uid);
        } else {
          setUserData({
            displayName: 'Unknown User',
            homePhone: 'Contact not available',
            photoURL: null,
            email: 'Email not available',
            uid: null
          });
        }
      } else {
        setPropertyError("Item not found");
      }
    } catch (searchError) {
      setPropertyError("Failed to load item details");
    }
  };

  // Fetch property data from Firebase
  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) {
        setPropertyError("No item ID provided");
        setPropertyLoading(false);
        return;
      }

      try {
        setPropertyLoading(true);
        
        const docRef = doc(db, "allAddsPost", propertyId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          
          // Check if it's a valid item document (has key identifying fields)
          const isValidDoc = data.propertyType || data.brand || data.type || data.images || data.price;
          const categoryMatches = !category || data.category === category;
          
          if (isValidDoc && categoryMatches) {
            setProperty({ id: docSnap.id, ...data });
            setPropertyError(null);
            
            // Fetch user data after property is found
            const uid = findUserIdFromProperty(data);
            if (uid) {
              await fetchUserData(uid);
            } else {
              setUserData({
                displayName: 'Unknown User',
                homePhone: 'Contact not available',
                photoURL: null,
                email: 'Email not available',
                uid: null
              });
            }
            return;
          }
        }
        
        await searchAllDocuments();
      } catch (err) {
        setPropertyError("Failed to load item details");
      } finally {
        setPropertyLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, category]);

  // Generate item details based on category configuration
  const generateDetails = () => {
    if (!property) return [];
    
    return categoryConfig.detailFields
      .map(field => ({
        label: field.label,
        value: getFieldValue(property, field.field, field.fallback, field.type)
      }))
      .filter(detail => detail.value && detail.value !== "N/A");
  };

  // Handle add to favorites click
  const handleAddToFavorites = () => {
    setShowFavoritesModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowFavoritesModal(false);
  };

  // Handle existing favorites list selection
  const handleSelectExistingList = () => {
    console.log("Selected existing favorites list");
    // Add your logic here to add to existing list
  };

  // Handle create new list
  const handleCreateNewList = () => {
    console.log("Creating new favorites list");
    // Add your logic here to create new list
  };

  // Loading state
  if (propertyLoading) {
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
  if (propertyError) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg mb-4">{propertyError}</p>
          <p className="text-gray-600 mb-2">Item ID: {propertyId}</p>
          {category && <p className="text-gray-600 mb-4">Category: {category}</p>}
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

  const details = generateDetails();
  const images = property.images || property.imageUrls || [];
  const mainImage = images.length > 0 
    ? (typeof images[selectedImageIndex] === 'string' 
        ? images[selectedImageIndex] 
        : images[selectedImageIndex]?.url)
    : '/assets/placeholder-property.png';

  return (
    <>
      <div className="max-w-7xl mx-auto p-4">
        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-blue-100 p-2 mb-4 text-xs rounded">
            <strong>Debug:</strong> PropertyID: {propertyId} | 
            Property AddID: {property.addID || property.id} | 
            Current User: {user?.uid || 'Not logged in'}
          </div>
        )}

        <div className="flex flex-row items-center gap-[47rem]">
          {/* Breadcrumb Navigation */}
          {category && (
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <a href="/" className="hover:text-blue-600">
                    Home
                  </a>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <span className="capitalize">{categoryConfig.name}</span>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-800 font-medium">
                  {getItemTitle(property, category, categoryConfig)}
                </li>
              </ol>
            </nav>
          )}
          
          {/* Add to Favorites - Clickable */}
          <button
            onClick={handleAddToFavorites}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
          >
            <FaStar size={20} className="text-[#FFC107]" />
            <span className="text-sm font-normal text-primaryBlue">
              Add to Favorites
            </span>
          </button>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0]">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col max-w-3xl gap-3">
              {/* Main Image and Info Section */}
              <div className="w-[400px] mt-10 ml-5">
                <img
                  src={mainImage}
                  alt={getItemTitle(property, category, categoryConfig)}
                  className="w-full h-96 object-cover rounded-xl"
                  onError={(e) => {
                    e.target.src = "/assets/placeholder-property.png";
                  }}
                />
              </div>
              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="mb-3 w-full px-6 max-w-xl">
                  <h3 className="text-lg font-semibold mb-3">
                    {categoryConfig.name} Images
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {images.slice(0, 6).map((image, index) => {
                      const imageUrl =
                        typeof image === "string" ? image : image?.url;
                      return (
                        <img
                          key={index}
                          src={imageUrl}
                          alt={`${categoryConfig.name} image ${index + 1}`}
                          className={`w-full max-w-[10rem] h-24 object-cover rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedImageIndex === index
                              ? "ring-2 ring-primaryBlue opacity-100"
                              : "opacity-70 hover:opacity-100"
                          }`}
                          onClick={() => setSelectedImageIndex(index)}
                          onError={(e) => {
                            e.target.src = "/assets/placeholder-property.png";
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

            {/* Item Details */}
            <div className="max-w-2xl mx-auto p-6 font-sans text-[#2D2D2D]">
              {/* Price header */}
              <h1 className="text-[26px] font-bold mb-4">
                {getPriceDisplay(property)}
              </h1>

              {/* Category-specific item details */}
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
            
            {/* Contact Card - Updated with dynamic user data */}
            <div className="max-w-lg h-[30rem] font-poppins mx-5 my-10 bg-white rounded-lg overflow-hidden shadow-custom-diagonal">
              {/* Header */}
              <div className="text-center py-6 px-2">
                <h1 className="text-sm font-semibold text-primaryBlue mb-2">
                  {categoryConfig.name || 'Real Estate'}
                </h1>

                <h2 className="text-sm font-bold text-gray-900 mb-6">
                  {userLoading ? 'Loading user...' : userData?.displayName || 'Unknown User'}
                </h2>
              </div>

              {/* User Photo */}
              <div className="px-4 mb-6">
                <div className="relative flex justify-center">
                  {userLoading ? (
                    <div className="w-20 h-20 bg-gray-300 rounded-full animate-pulse"></div>
                  ) : userData?.photoURL ? (
                    <img
                      src={userData.photoURL}
                      alt={userData.displayName || 'User'}
                      className="w-20 h-20 rounded-full object-cover border-2 border-primaryBlue"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  {/* Fallback avatar */}
                  <div 
                    className={`w-20 h-20 bg-primaryBlue rounded-full flex items-center justify-center text-white font-bold text-lg ${userData?.photoURL ? 'hidden' : 'flex'}`}
                  >
                    {userData?.displayName ? userData.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
              </div>

              {/* Add to Favorites Section */}
              <div className="px-4 mb-6">
                <h3 className="text-md font-semibold text-primaryBlue text-center">
                  Add Listings to my Favorite Sellers
                </h3>
              </div>

              {/* Contact Buttons */}
              <div className="px-4 space-y-4">
                {/* Phone Button */}
                <button 
                  className="w-full bg-primaryBlue text-white font-medium text-sm py-3 px-3 transition-colors duration-200 hover:bg-blue-700"
                  disabled={userLoading}
                  onClick={() => {
                    if (userData?.homePhone && userData.homePhone !== 'Contact not available') {
                      window.open(`tel:${userData.homePhone}`, '_self');
                    } else {
                      alert('Phone number not available');
                    }
                  }}
                >
                  {userLoading ? 'Loading...' : `CONTACT ${userData?.homePhone || 'Not available'}`}
                </button>

                {/* Message Button */}
                <button 
                  onClick={handleSendMessage}
                  className="w-full bg-primaryBlue text-white font-medium text-sm py-3 px-3 rounded-full transition-colors duration-200 hover:bg-blue-700"
                  disabled={userLoading || !user}
                  title={!user ? 'Please login to send a message' : ''}
                >
                  {!user ? 'LOGIN TO MESSAGE' : 'SEND MESSAGE'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Modal */}
      <FavoritesModal 
        isOpen={showFavoritesModal}
        onClose={handleCloseModal}
        onSelectExistingList={handleSelectExistingList}
        onCreateNewList={handleCreateNewList}
      />
    </>
  );
};

export default PropertyListing;