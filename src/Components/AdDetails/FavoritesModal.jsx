// import React from "react";
// import { FaTimes } from "react-icons/fa";

// const FavoritesModal = ({ 
//   isOpen, 
//   onClose, 
//   onSelectExistingList, 
//   onCreateNewList 
// }) => {
//   // Don't render if modal is not open
//   if (!isOpen) return null;

//   // Handle backdrop click to close modal
//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   // Handle existing favorites list selection
//   const handleSelectExistingList = () => {
//     console.log("Selected existing favorites list");
//     if (onSelectExistingList) {
//       onSelectExistingList();
//     }
//     onClose();
//   };

//   // Handle create new list
//   const handleCreateNewList = () => {
//     console.log("Creating new favorites list");
//     if (onCreateNewList) {
//       onCreateNewList();
//     }
//     onClose();
//   };

//   return (
//     <div 
//       className="fixed inset-0 bg-black bg-opacity-50 font-poppins flex items-center justify-center z-50"
//       onClick={handleBackdropClick}
//     >
//       <div className="bg-white rounded-lg w-[500px] max-w-[90vw] p-8 relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-6 right-6 text-black hover:text-gray-800 text-2xl transition-colors duration-200"
//           aria-label="Close modal"
//         >
//           <FaTimes />
//         </button>

//         {/* Modal Title */}
//         <h2 className="text-xl font-medium text-black mb-5  text-left">
//           Save To My Favorites List
//         </h2>

//         {/* Buttons Container */}
//         <div className="space-y-6 overflow-y-hidden">
//           {/* My Favorite Items Button */}
//           <button
//             onClick={handleSelectExistingList}
//             className="w-full max-w-[15rem] py-3  border border-primaryBlue text-primaryBlue font-medium text-lg rounded-full"
//           >
//             MY FAVORITE ITEMS
//           </button>

//           {/* Create New List Button */}
//           <button
//             onClick={handleCreateNewList}
//             className="w-full max-w-[15rem] py-3  border bg-primaryBlue text-white font-medium text-lg rounded-full "
//           >
//             CREATE NEW LIST
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FavoritesModal;










// import React, { useState, useEffect } from "react";
// import { FaTimes } from "react-icons/fa";
// import { 
//   doc, 
//   getDoc, 
//   setDoc, 
//   onSnapshot
// } from 'firebase/firestore';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, db } from '../../../firebase'; // Adjust path to your Firebase config

// const FavoritesModal = ({ 
//   isOpen, 
//   onClose, 
//   onCreateNewList,
//   currentAd, // Pass current ad data: { addID, addowner, category, title, etc. }
//   onNavigateToFavorites // Function to navigate to FavoritesContent component
// }) => {
//   const [user, loading, error] = useAuthState(auth);
//   const [userLists, setUserLists] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [addingToList, setAddingToList] = useState(null);

//   // Firebase functions
//   const getFavoritesDocRef = () => {
//     if (!user) return null;
//     return doc(db, 'users', user.uid, 'favoriteItem', 'favorites');
//   };

//   // Fetch user's favorite lists from Firebase
//   useEffect(() => {
//     if (!user || !isOpen) return;

//     const favoritesDocRef = getFavoritesDocRef();
//     if (!favoritesDocRef) return;

//     // Real-time listener for favorites document
//     const unsubscribe = onSnapshot(favoritesDocRef, (docSnapshot) => {
//       if (docSnapshot.exists()) {
//         const data = docSnapshot.data();
//         const favoriteList = data.favoriteList || [];
        
//         // Filter lists that belong to current user (user ID should be at the start of the id)
//         const currentUserLists = favoriteList.filter(item => item.id.startsWith(user.uid));
//         setUserLists(currentUserLists);
//       } else {
//         setUserLists([]);
//       }
//     }, (error) => {
//       console.error('Error fetching lists:', error);
//       setUserLists([]);
//     });

//     return () => unsubscribe();
//   }, [user, isOpen]);

//   // Don't render if modal is not open
//   if (!isOpen) return null;

//   // Handle backdrop click to close modal
//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   // Handle adding ad to selected list
//   const handleAddToList = async (selectedList) => {
//     if (!user || !currentAd || !selectedList) {
//       alert('Missing required information to add to favorites.');
//       return;
//     }

//     setAddingToList(selectedList.id);
//     setIsLoading(true);

//     try {
//       const favoritesDocRef = getFavoritesDocRef();
//       if (!favoritesDocRef) return;

//       // Get current data
//       const docSnapshot = await getDoc(favoritesDocRef);
//       const existingData = docSnapshot.exists() ? docSnapshot.data() : {};
//       const existingFavoriteList = existingData.favoriteList || [];

//       // Create the ad object
//       const newAdData = {
//         addID: currentAd.addID || currentAd.id,
//         addowner: currentAd.addowner || currentAd.ownerId,
//         category: currentAd.category || '',
//         title: currentAd.title || '',
//         price: currentAd.price || '',
//         location: currentAd.location || '',
//         imageUrl: currentAd.imageUrl || '',
//         dateAdded: new Date(),
//         addedBy: user.uid
//       };

//       // Check if ad already exists in the selected list
//       const existingAds = selectedList.ads || [];
//       const adExists = existingAds.some(ad => ad.addID === newAdData.addID);
      
//       if (adExists) {
//         alert('This ad is already in your favorites list!');
//         setIsLoading(false);
//         setAddingToList(null);
//         return;
//       }

//       // Update the specific list with the new ad
//       const updatedFavoriteList = existingFavoriteList.map(item => {
//         if (item.id === selectedList.id) {
//           const updatedAds = [...(item.ads || []), newAdData];
//           return {
//             ...item,
//             ads: updatedAds,
//             count: updatedAds.length // Update count based on ads array length
//           };
//         }
//         return item;
//       });

//       // Update the document
//       await setDoc(favoritesDocRef, {
//         favoriteList: updatedFavoriteList
//       }, { merge: true });

//       alert(`Ad successfully added to "${selectedList.name}"!`);
//       onClose();

//     } catch (error) {
//       console.error('Error adding ad to list:', error);
//       alert('Error adding ad to favorites. Please try again.');
//     } finally {
//       setIsLoading(false);
//       setAddingToList(null);
//     }
//   };

//   // Handle create new list navigation
//   const handleCreateNewList = () => {
//     console.log("Navigating to create new favorites list");
//     onClose();
//     if (onNavigateToFavorites) {
//       onNavigateToFavorites('listing'); // Navigate to FavoritesContent with listing tab
//     }
//   };

//   // Show loading state
//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 font-poppins flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg w-[500px] max-w-[90vw] p-8">
//           <div className="text-center">Loading...</div>
//         </div>
//       </div>
//     );
//   }

//   // Show login prompt if user is not authenticated
//   if (!user) {
//     return (
//       <div 
//         className="fixed inset-0 bg-black bg-opacity-50 font-poppins flex items-center justify-center z-50"
//         onClick={handleBackdropClick}
//       >
//         <div className="bg-white rounded-lg w-[500px] max-w-[90vw] p-8 relative">
//           <button
//             onClick={onClose}
//             className="absolute top-6 right-6 text-black hover:text-gray-800 text-2xl transition-colors duration-200"
//             aria-label="Close modal"
//           >
//             <FaTimes />
//           </button>
          
//           <h2 className="text-xl font-medium text-black mb-5 text-left">
//             Login Required
//           </h2>
          
//           <p className="text-gray-600 mb-4">
//             Please log in to save ads to your favorites list.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="fixed inset-0 bg-black bg-opacity-50 font-poppins flex items-center justify-center z-50"
//       onClick={handleBackdropClick}
//     >
//       <div className="bg-white rounded-lg w-[500px] max-w-[90vw] p-8 relative max-h-[80vh] overflow-y-auto">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-6 right-6 text-black hover:text-gray-800 text-2xl transition-colors duration-200"
//           aria-label="Close modal"
//           disabled={isLoading}
//         >
//           <FaTimes />
//         </button>

//         {/* Modal Title */}
//         <h2 className="text-xl font-medium text-black mb-5 text-left">
//           Save To My Favorites List
//         </h2>

//         {/* Lists Container */}
//         <div className="space-y-4 mb-6">
//           {userLists.length > 0 ? (
//             <>
//               <h3 className="text-sm font-medium text-gray-600 mb-3">
//                 Select a list to add this ad:
//               </h3>
//               {userLists.map((list) => (
//                 <button
//                   key={list.id}
//                   onClick={() => handleAddToList(list)}
//                   disabled={isLoading || addingToList === list.id}
//                   className="w-full p-4 border border-gray-300 hover:border-primaryBlue text-left rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <h4 className="font-medium text-black">{list.name}</h4>
//                       <p className="text-sm text-gray-500">
//                         {list.count || 0} items
//                       </p>
//                     </div>
//                     {addingToList === list.id ? (
//                       <div className="text-sm text-primaryBlue">Adding...</div>
//                     ) : (
//                       <div className="text-primaryBlue">+</div>
//                     )}
//                   </div>
//                 </button>
//               ))}
//             </>
//           ) : (
//             <div className="text-center py-8">
//               <p className="text-gray-500 mb-4">
//                 You don't have any favorite lists yet.
//               </p>
//               <p className="text-sm text-gray-400">
//                 Create your first list to start saving ads!
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Create New List Button */}
//         <div className="border-t pt-4">
//           <button
//             onClick={handleCreateNewList}
//             disabled={isLoading}
//             className="w-full max-w-[15rem] py-3 border bg-primaryBlue text-white font-medium text-lg rounded-full hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             CREATE NEW LIST
//           </button>
//         </div>

//         {/* Current Ad Info (Optional - for debugging) */}
//         {currentAd && (
//           <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//             <p className="text-xs text-gray-500">
//               Adding: {currentAd.title || currentAd.addID}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FavoritesModal;









// Helper function to extract addowner by removing last digit from addIDimport React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useState ,useEffect} from "react";
import { useParams } from 'react-router-dom'; // Add this import
import { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../firebase'; // Adjust path to your Firebase config

const FavoritesModal = ({ 
  isOpen, 
  onClose, 
  onCreateNewList,
  onNavigateToFavorites // Function to navigate to FavoritesContent component
}) => {
  const { id: currentAdId } = useParams(); // Get ad ID from URL params
  const [user, loading, error] = useAuthState(auth);
  const [userLists, setUserLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addingToList, setAddingToList] = useState(null);
  const [currentAd, setCurrentAd] = useState(null); // State to store fetched ad data

  // Firebase functions
  const getFavoritesDocRef = () => {
    if (!user) return null;
    return doc(db, 'users', user.uid, 'favoriteItem', 'favorites');
  };

  const getUserDocRef = () => {
    if (!user) return null;
    return doc(db, 'users', user.uid);
  };

  // Function to fetch ad data from favoriteItem collection
  const fetchAdDataFromFavorites = async (adId) => {
    if (!user || !adId) return null;

    try {
      const favoritesDocRef = getFavoritesDocRef();
      if (!favoritesDocRef) return null;

      const docSnapshot = await getDoc(favoritesDocRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const favoriteList = data.favoriteList || [];
        
        // Search through all lists to find the ad with matching ID
        for (const list of favoriteList) {
          if (list.ads && Array.isArray(list.ads)) {
            const foundAd = list.ads.find(ad => ad.addID === adId || ad.id === adId);
            if (foundAd) {
              return foundAd;
            }
          }
        }
      }
      return null;
    } catch (error) {
      console.error('Error fetching ad data:', error);
      return null;
    }
  };

  // Fetch current ad data when modal opens
  useEffect(() => {
    const fetchCurrentAd = async () => {
      if (!user || !isOpen || !currentAdId) return;
      
      setIsLoading(true);
      try {
        const adData = await fetchAdDataFromFavorites(currentAdId);
        setCurrentAd(adData);
      } catch (error) {
        console.error('Error fetching current ad:', error);
        setCurrentAd(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentAd();
  }, [user, isOpen, currentAdId]);
  const getAddOwnerFromId = (addId) => {
    if (!addId) return '';
    return addId.toString().slice(0, -1);
  };

  // Helper function to get category from addID (you may need to adjust this based on your data structure)
  const getCategoryFromAddId = async (addId) => {
    try {
      // You might need to fetch from ads collection or extract from ID pattern
      // This is a placeholder - adjust based on your actual data structure
      const adDocRef = doc(db, 'ads', addId); // Assuming you have an ads collection
      const adDoc = await getDoc(adDocRef);
      if (adDoc.exists()) {
        return adDoc.data().category || '';
      }
      return currentAd?.category || '';
    } catch (error) {
      console.error('Error getting category:', error);
      return currentAd?.category || '';
    }
  };

  // Fetch user's favorite lists from Firebase
  useEffect(() => {
    if (!user || !isOpen) return;

    const favoritesDocRef = getFavoritesDocRef();
    if (!favoritesDocRef) return;

    // Real-time listener for favorites document
    const unsubscribe = onSnapshot(favoritesDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const favoriteList = data.favoriteList || [];
        
        // Filter lists that belong to current user (user ID should be at the start of the id)
        const currentUserLists = favoriteList.filter(item => item.id.startsWith(user.uid));
        setUserLists(currentUserLists);
      } else {
        setUserLists([]);
      }
    }, (error) => {
      console.error('Error fetching lists:', error);
      setUserLists([]);
    });

    return () => unsubscribe();
  }, [user, isOpen]);

  // Don't render if modal is not open
  if (!isOpen) return null;

  // Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle adding ad to selected list
  const handleAddToList = async (selectedList) => {
    // Debug logging
    console.log('Debug - handleAddToList called with:');
    console.log('user:', user);
    console.log('currentAd:', currentAd);
    console.log('selectedList:', selectedList);
    
    if (!user) {
      alert('User not authenticated. Please log in first.');
      return;
    }
    
    if (!currentAd && !currentAdId) {
      alert('Current ad data is missing. Please try again.');
      return;
    }
    
    if (!selectedList) {
      alert('Selected list data is missing. Please try again.');
      return;
    }
    
    if (!currentAd.addID && !currentAd.id) {
      alert('Ad ID is missing from current ad data.');
      return;
    }

    setAddingToList(selectedList.id);
    setIsLoading(true);

    try {
      const favoritesDocRef = getFavoritesDocRef();
      const userDocRef = getUserDocRef();
      
      if (!favoritesDocRef || !userDocRef) return;

      // Get current data from favoriteItem document
      const docSnapshot = await getDoc(favoritesDocRef);
      const existingData = docSnapshot.exists() ? docSnapshot.data() : {};
      const existingFavoriteList = existingData.favoriteList || [];

      // Get category from addID
      const category = await getCategoryFromAddId(currentAd.addID);

      // Create the ad object for favoriteItem collection (existing functionality)
      const newAdData = {
        addID: currentAd?.addID || currentAd?.id || currentAdId,
        addowner: currentAd?.addowner || currentAd?.ownerId,
        category: category,
        title: currentAd?.title || '',
        price: currentAd?.price || '',
        location: currentAd?.location || '',
        imageUrl: currentAd?.imageUrl || '',
        dateAdded: new Date(),
        addedBy: user.uid
      };

      // Check if ad already exists in the selected list
      const existingAds = selectedList.ads || [];
      const adExists = existingAds.some(ad => ad.addID === newAdData.addID);
      
      if (adExists) {
        alert('This ad is already in your favorites list!');
        setIsLoading(false);
        setAddingToList(null);
        return;
      }

      // Update the specific list with the new ad in favoriteItem collection
      const updatedFavoriteList = existingFavoriteList.map(item => {
        if (item.id === selectedList.id) {
          const updatedAds = [...(item.ads || []), newAdData];
          return {
            ...item,
            ads: updatedAds,
            count: updatedAds.length // Update count based on ads array length
          };
        }
        return item;
      });

      // Update the favoriteItem document
      await setDoc(favoritesDocRef, {
        favoriteList: updatedFavoriteList
      }, { merge: true });

      // Create new entry for favorites array in user's main document
      const favoritesEntry = {
        addID: currentAd?.addID || currentAd?.id || currentAdId,
        addowner: getAddOwnerFromId(currentAd?.addID || currentAd?.id || currentAdId),
        category: category,
        favoriteName: selectedList.name
      };

      // Check if user document exists and get current favorites array
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.exists() ? userDocSnapshot.data() : {};
      const currentFavorites = userData.favorites || [];

      // Check if this addID already exists in favorites array
      const favoriteExists = currentFavorites.some(fav => 
        fav.addID === favoritesEntry.addID && fav.favoriteName === selectedList.name
      );

      if (!favoriteExists) {
        // Add to favorites array in user's main document
        await updateDoc(userDocRef, {
          favorites: arrayUnion(favoritesEntry)
        });
      }

      alert(`Ad successfully added to "${selectedList.name}"!`);
      onClose();

    } catch (error) {
      console.error('Error adding ad to favorites:', error);
      alert('Error adding ad to favorites. Please try again.');
    } finally {
      setIsLoading(false);
      setAddingToList(null);
    }
  };

  // Handle create new list navigation
  const handleCreateNewList = () => {
    console.log("Navigating to create new favorites list");
    onClose();
    if (onNavigateToFavorites) {
      onNavigateToFavorites('listing'); // Navigate to FavoritesContent with listing tab
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 font-poppins flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-[500px] max-w-[90vw] p-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 font-poppins flex items-center justify-center z-50"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-lg w-[500px] max-w-[90vw] p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-black hover:text-gray-800 text-2xl transition-colors duration-200"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
          
          <h2 className="text-xl font-medium text-black mb-5 text-left">
            Login Required
          </h2>
          
          <p className="text-gray-600 mb-4">
            Please log in to save ads to your favorites list.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 font-poppins flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg w-[500px] max-w-[90vw] p-8 relative max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-black hover:text-gray-800 text-2xl transition-colors duration-200"
          aria-label="Close modal"
          disabled={isLoading}
        >
          <FaTimes />
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-medium text-black mb-5 text-left">
          Save To My Favorites List
        </h2>

        {/* Lists Container */}
        <div className="space-y-4 mb-6">
          {userLists.length > 0 ? (
            <>
              <h3 className="text-sm font-medium text-gray-600 mb-3">
                Select a list to add this ad:
              </h3>
              {userLists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => handleAddToList(list)}
                  disabled={isLoading || addingToList === list.id}
                  className="w-full p-4 border border-gray-300 hover:border-primaryBlue text-left rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-black">{list.name}</h4>
                      <p className="text-sm text-gray-500">
                        {list.count || 0} items
                      </p>
                    </div>
                    {addingToList === list.id ? (
                      <div className="text-sm text-primaryBlue">Adding...</div>
                    ) : (
                      <div className="text-primaryBlue">+</div>
                    )}
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                You don't have any favorite lists yet.
              </p>
              <p className="text-sm text-gray-400">
                Create your first list to start saving ads!
              </p>
            </div>
          )}
        </div>

        {/* Create New List Button */}
        <div className="border-t pt-4">
          <button
            onClick={handleCreateNewList}
            disabled={isLoading}
            className="w-full max-w-[15rem] py-3 border bg-primaryBlue text-white font-medium text-lg rounded-full hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            CREATE NEW LIST
          </button>
        </div>

        {/* Current Ad Info */}
        {(currentAd || currentAdId) && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">
              Adding: {currentAd?.title || currentAdId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesModal;