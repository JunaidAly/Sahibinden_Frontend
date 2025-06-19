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










import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { 
  collection, 
  addDoc, 
  getDocs, 
  onSnapshot,
  updateDoc,
  doc,
  increment
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../firebase'; // Adjust path to your Firebase config
import { Navigate } from "react-router";

const FavoritesModal = ({ 
  isOpen, 
  onClose, 
  onCreateNewList,
  currentAd, // Pass current ad data: { addID, addowner, category, title, etc. }
  onNavigateToFavorites // Function to navigate to FavoritesContent component
}) => {
  const [user, loading, error] = useAuthState(auth);
  const [userLists, setUserLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addingToList, setAddingToList] = useState(null);

  // Fetch user's favorite lists from Firebase
  useEffect(() => {
    if (!user || !isOpen) return;

    const fetchUserLists = () => {
      const listsCollection = collection(db, 'users', user.uid, 'newlist');
      
      // Real-time listener for lists
      const unsubscribe = onSnapshot(listsCollection, (snapshot) => {
        const fetchedLists = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUserLists(fetchedLists);
      }, (error) => {
        console.error('Error fetching lists:', error);
      });

      return unsubscribe;
    };

    const unsubscribe = fetchUserLists();
    return () => {
      if (unsubscribe) unsubscribe();
    };
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
    if (!user || !currentAd || !selectedList) {
      alert('Missing required information to add to favorites.');
      return;
    }

    setAddingToList(selectedList.id);
    setIsLoading(true);

    try {
      // Add the ad to the selected list's favorites subcollection
      const favoritesCollection = collection(
        db, 
        'users', 
        user.uid, 
        'newlist', 
        selectedList.id, 
        'favorites'
      );

      // Create the ad document in the favorites subcollection
      await addDoc(favoritesCollection, {
        addID: currentAd.addID || currentAd.id,
        addowner: currentAd.addowner || currentAd.ownerId,
        category: currentAd.category,
        title: currentAd.title || '',
        price: currentAd.price || '',
        location: currentAd.location || '',
        imageUrl: currentAd.imageUrl || '',
        dateAdded: new Date(),
        addedBy: user.uid
      });

      // Update the list's count
      const listDoc = doc(db, 'users', user.uid, 'newlist', selectedList.id);
      await updateDoc(listDoc, {
        count: increment(1),
        lastUpdated: new Date()
      });

      alert(`Ad successfully added to "${selectedList.name}"!`);
      onClose();

    } catch (error) {
      console.error('Error adding ad to list:', error);
      alert('Error adding ad to favorites. Please try again.');
    } finally {
      setIsLoading(false);
      setAddingToList(null);
    }
  };

  // Handle create new list navigation
  const handleCreateNewList = () => {
    console.log("Navigating to create new favorites list");
   Navigate('/favorites'); // Adjust path as needed
    onClose();
    if (onNavigateToFavorites) {
      onNavigateToFavorites('/favorites'); // Navigate to FavoritesContent with listing tab
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

        {/* Current Ad Info (Optional - for debugging) */}
        {currentAd && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">
              Adding: {currentAd.title || currentAd.addID}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesModal;