

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { 
  doc, 
  getDoc, 
  getDocs,
  setDoc, 
  updateDoc, 
  onSnapshot,
  arrayRemove,
  collection 
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../firebase';

function FavoriteListing({ onShowAlert }) {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate(); // Add navigate hook
  
  // State variables
  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [editingList, setEditingList] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listCounts, setListCounts] = useState({});
  const [selectedList, setSelectedList] = useState(null);
  const [listAds, setListAds] = useState([]);
  const [showAdDetails, setShowAdDetails] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);

  // Firebase functions
  const getFavoritesDocRef = () => {
    if (!user) return null;
    return doc(db, 'users', user.uid, 'favoriteItem', 'favorites');
  };

  const getUserDocRef = () => {
    if (!user) return null;
    return doc(db, 'users', user.uid);
  };

  // Add navigation handler for ad clicks
  const handleAdClick = (ad) => {
    // Navigate to ad details page
    navigate(`/ad-details/${ad.category}/${ad.addID}`);
  };

  // Fetch ad details from allAddsPost collection
  const fetchAdDetails = async (addID, originalCategory) => {
    try {
      console.log('Searching for addID:', addID, 'in category:', originalCategory);
      
      const collectionRef = collection(db, 'allAddsPost');
      const querySnapshot = await getDocs(collectionRef);
      
      let foundAd = null;
      
      for (const docSnapshot of querySnapshot.docs) {
        const docData = docSnapshot.data();
        
        if (docData[originalCategory]) {
          const categoryData = docData[originalCategory];
          
          if (Array.isArray(categoryData)) {
            foundAd = categoryData.find(ad => ad && ad.addID === addID);
            if (foundAd) break;
          } else if (typeof categoryData === 'object') {
            const numberedKeys = Object.keys(categoryData).filter(key => !isNaN(key));
            if (numberedKeys.length > 0) {
              for (const key of numberedKeys) {
                const ad = categoryData[key];
                if (ad && ad.addID === addID) {
                  foundAd = ad;
                  break;
                }
              }
              if (foundAd) break;
            }
          }
        }
      }
      
      if (foundAd) {
        return {
          imageUrl: foundAd.imageUrls && Array.isArray(foundAd.imageUrls) && foundAd.imageUrls.length > 0 ? foundAd.imageUrls[0] : null,
          price: foundAd.price ? String(foundAd.price) : null,
          title: foundAd.title || 'No Title',
          category: foundAd.category || originalCategory,
          addID: addID
        };
      } else {
        return {
          imageUrl: null,
          price: null,
          title: 'Ad not found',
          category: originalCategory,
          addID: addID
        };
      }
    } catch (error) {
      console.error('Error searching for ad with addID:', addID, error);
      return {
        imageUrl: null,
        price: null,
        title: 'Error loading ad',
        category: originalCategory,
        addID: addID
      };
    }
  };

  // Get counts for each list from favorites array
  const updateListCounts = async () => {
    if (!user) return;

    try {
      const userDocRef = getUserDocRef();
      const userDocSnapshot = await getDoc(userDocRef);
      
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const favorites = userData.favorites || [];
        
        const counts = {};
        favorites.forEach(fav => {
          const listName = fav.favoriteName;
          counts[listName] = (counts[listName] || 0) + 1;
        });
        
        setListCounts(counts);
      }
    } catch (error) {
      console.error('Error getting list counts:', error);
    }
  };

  // Get ads for a specific list and fetch their details
  const getAdsForList = async (listName) => {
    if (!user) return [];

    try {
      const userDocRef = getUserDocRef();
      const userDocSnapshot = await getDoc(userDocRef);
      
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const favorites = userData.favorites || [];
        
        const favoriteAds = favorites.filter(fav => fav.favoriteName === listName);
        
        const limitedAds = favoriteAds.slice(0, 10);
        const adsWithDetails = [];
        const batchSize = 3;
        
        for (let i = 0; i < limitedAds.length; i += batchSize) {
          const batch = limitedAds.slice(i, i + batchSize);
          
          const batchPromises = batch.map(async (fav) => {
            try {
              const adDetails = await fetchAdDetails(fav.addID, fav.category);
              if (adDetails) {
                return {
                  ...fav,
                  ...adDetails
                };
              }
            } catch (error) {
              console.error('Error fetching details for ad:', fav.addID, error);
              return {
                ...fav,
                imageUrl: null,
                price: null,
                title: 'Error loading ad',
                category: fav.category
              };
            }
          });
          
          const batchResults = await Promise.all(batchPromises);
          adsWithDetails.push(...batchResults.filter(ad => ad !== null));
        }
        
        return adsWithDetails;
      }
      return [];
    } catch (error) {
      console.error('Error getting ads for list:', error);
      return [];
    }
  };

  // Handle clicking on a list to view its ads
  const handleListClick = async (list) => {
    setSelectedList(list);
    setIsLoading(true);
    setShowAdDetails(true);
    
    try {
      const ads = await getAdsForList(list.name);
      setListAds(ads);
    } catch (error) {
      console.error('Error loading list ads:', error);
      onShowAlert('Error loading ads. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Remove ad from favorites
  const handleRemoveAd = async (adToRemove) => {
    if (!user) return;
    setAdToDelete(adToRemove);
    setShowDeleteConfirm(true);
  };

  // Confirm deletion
  const confirmDeleteAd = async () => {
    setShowDeleteConfirm(false);
    setIsLoading(true);
    
    try {
      const userDocRef = getUserDocRef();
      const userDocSnapshot = await getDoc(userDocRef);
      
      if (!userDocSnapshot.exists()) {
        throw new Error('User document not found');
      }

      const userData = userDocSnapshot.data();
      const favorites = userData.favorites || [];
      
      const originalFav = favorites.find(fav => 
        fav.addID === adToDelete.addID && 
        fav.favoriteName === adToDelete.favoriteName
      );

      if (!originalFav) {
        throw new Error('Original favorite not found in array');
      }
      
      await updateDoc(userDocRef, {
        favorites: arrayRemove(originalFav)
      });

      const updatedAds = listAds.filter(ad => 
        !(ad.addID === adToDelete.addID && 
          ad.favoriteName === adToDelete.favoriteName)
      );
      setListAds(updatedAds);

      await updateListCounts();
      onShowAlert('Ad removed from favorites successfully!', 'success');
    } catch (error) {
      console.error('Error removing ad:', error);
      onShowAlert('Error removing ad. Please try again.', 'error');
    } finally {
      setIsLoading(false);
      setAdToDelete(null);
    }
  };

  // Cancel deletion
  const cancelDeleteAd = () => {
    setShowDeleteConfirm(false);
    setAdToDelete(null);
  };

  // Generate unique ID for new list items
  const generateListId = (existingLists) => {
    const baseId = user.uid;
    let counter = 1;
    let newId = `${baseId}${counter}`;
    
    while (existingLists.some(list => list.id === newId)) {
      counter++;
      newId = `${baseId}${counter}`;
    }
    
    return newId;
  };

  // Create default list
  const handleCreateDefaultList = async () => {
    try {
      const favoritesDocRef = getFavoritesDocRef();
      if (!favoritesDocRef) return;

      const docSnapshot = await getDoc(favoritesDocRef);
      const existingData = docSnapshot.exists() ? docSnapshot.data() : {};
      const existingFavoriteList = existingData.favoriteList || [];
      
      const newId = generateListId(existingFavoriteList);
      
      const defaultListItem = {
        id: newId,
        name: 'My Favorite List',
        isDefault: true
      };

      const updatedFavoriteList = [...existingFavoriteList, defaultListItem];

      await setDoc(favoritesDocRef, {
        favoriteList: updatedFavoriteList
      }, { merge: true });
    } catch (error) {
      console.error('Error creating default list:', error);
    }
  };

  // List management functions
  const handleCreateNewList = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewListName('');
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingList(null);
    setNewListName('');
  };

  const handleSaveList = async () => {
    if (!newListName.trim() || !user) return;

    setIsLoading(true);
    try {
      const favoritesDocRef = getFavoritesDocRef();
      if (!favoritesDocRef) return;

      const docSnapshot = await getDoc(favoritesDocRef);
      const existingData = docSnapshot.exists() ? docSnapshot.data() : {};
      const existingFavoriteList = existingData.favoriteList || [];

      const newId = generateListId(existingFavoriteList);
      const newListItem = {
        id: newId,
        name: newListName.trim(),
        isDefault: false
      };

      const updatedFavoriteList = [...existingFavoriteList, newListItem];

      await setDoc(favoritesDocRef, {
        favoriteList: updatedFavoriteList
      }, { merge: true });

      handleCloseModal();
      onShowAlert('List created successfully!', 'success');
    } catch (error) {
      console.error('Error creating list:', error);
      onShowAlert('Error creating list. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditList = (list) => {
    setEditingList(list);
    setNewListName(list.name);
    setShowEditModal(true);
    setShowDropdown(null);
  };

  const handleUpdateList = async () => {
    if (!newListName.trim() || !editingList || !user) return;

    setIsLoading(true);
    try {
      const favoritesDocRef = getFavoritesDocRef();
      if (!favoritesDocRef) return;

      const docSnapshot = await getDoc(favoritesDocRef);
      const existingData = docSnapshot.exists() ? docSnapshot.data() : {};
      const existingFavoriteList = existingData.favoriteList || [];

      const updatedFavoriteList = existingFavoriteList.map(item => {
        if (item.id === editingList.id) {
          return { ...item, name: newListName.trim() };
        }
        return item;
      });

      await setDoc(favoritesDocRef, {
        favoriteList: updatedFavoriteList
      }, { merge: true });

      handleCloseEditModal();
      onShowAlert('List updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating list:', error);
      onShowAlert('Error updating list. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteList = async (listId, listName) => {
    if (!user) return;

    if (!window.confirm('Are you sure you want to delete this list? All ads in this list will be removed from your favorites.')) {
      return;
    }

    setIsLoading(true);
    try {
      const favoritesDocRef = getFavoritesDocRef();
      const userDocRef = getUserDocRef();
      if (!favoritesDocRef || !userDocRef) return;

      const docSnapshot = await getDoc(favoritesDocRef);
      const existingData = docSnapshot.exists() ? docSnapshot.data() : {};
      const existingFavoriteList = existingData.favoriteList || [];

      const updatedFavoriteList = existingFavoriteList.filter(item => item.id !== listId);

      await setDoc(favoritesDocRef, {
        favoriteList: updatedFavoriteList
      }, { merge: true });

      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const favorites = userData.favorites || [];
        const adsToRemove = favorites.filter(fav => fav.favoriteName === listName);
        
        for (const adToRemove of adsToRemove) {
          await updateDoc(userDocRef, {
            favorites: arrayRemove(adToRemove)
          });
        }
      }

      setShowDropdown(null);
      onShowAlert('List deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting list:', error);
      onShowAlert('Error deleting list. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareList = (list) => {
    navigator.clipboard.writeText(`Check out my list: ${list.name}`);
    onShowAlert(`"${list.name}" has been copied to clipboard for sharing!`, 'success');
    setShowDropdown(null);
  };

  const toggleDropdown = (listId) => {
    setShowDropdown(showDropdown === listId ? null : listId);
  };

  // Load lists from Firebase
  useEffect(() => {
    if (!user) return;

    const favoritesDocRef = getFavoritesDocRef();
    if (!favoritesDocRef) return;

    const unsubscribe = onSnapshot(favoritesDocRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const favoriteList = data.favoriteList || [];
        
        const userLists = favoriteList.filter(item => item.id.startsWith(user.uid));
        const hasDefaultList = userLists.some(list => list.isDefault);
        
        if (!hasDefaultList) {
          await handleCreateDefaultList();
        } else {
          setLists(userLists);
          await updateListCounts();
        }
      } else {
        await handleCreateDefaultList();
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Update counts when user's favorites change
  useEffect(() => {
    if (user) {
      const userDocRef = getUserDocRef();
      const unsubscribe = onSnapshot(userDocRef, () => {
        updateListCounts();
      });
      return () => unsubscribe();
    }
  }, [user]);

  // Render ad details view
  const renderAdDetails = () => {
    if (!selectedList || !showAdDetails) return null;

    return (
      <div className="px-4 w-full font-poppins">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => setShowAdDetails(false)}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
          </button>
          <h2 className="text-2xl font-[400]">{selectedList.name}</h2>
        </div>

        {isLoading ? (
          <div className="bg-white border border-gray-200 rounded-md p-6 text-center">
            <p className="text-lg">Loading ads...</p>
          </div>
        ) : listAds.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-md p-6 text-center">
            <p className="text-lg">No ads in this list yet.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-1"></div>
                <div className="col-span-6">Category</div>
                <div className="col-span-3">Price</div>
                <div className="col-span-2">Actions</div>
              </div>
            </div>

            {listAds.map((ad, index) => (
              <div key={`${ad.addID}-${ad.category}-${index}`} className="border-b border-gray-200 last:border-b-0">
                <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50">
                  <div className="col-span-1">
                    <div 
                      className="w-16 h-16 bg-gray-200 rounded overflow-hidden cursor-pointer"
                      onClick={() => handleAdClick(ad)}
                    >
                      {ad.imageUrl ? (
                        <img 
                          src={ad.imageUrl} 
                          alt={ad.category} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-span-6">
                    <h3 
                      className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => handleAdClick(ad)}
                    >
                      {ad.category || 'No Category'}
                    </h3>
                  </div>
                  
                  <div className="col-span-3">
                    <span 
                      className="text-lg font-semibold cursor-pointer"
                      onClick={() => handleAdClick(ad)}
                    >
                      {ad.price ? `${ad.price} TL` : 'Price not available'}
                    </span>
                  </div>
                  
                  <div className="col-span-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveAd(ad);
                      }}
                      disabled={isLoading}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500">
          * Listings you have added to your favorites within the last year are listed.
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
              <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-10 h-10 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Remove from Favorites</h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Are you sure you want to remove this ad from your favorites? This action cannot be undone.
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={cancelDeleteAd}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDeleteAd}
                      disabled={isLoading}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {isLoading ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // Show ad details if selected
  if (showAdDetails) {
    return renderAdDetails();
  }

  // Show loading state if user is being authenticated
  if (loading) {
    return (
      <div className="px-4 w-full font-poppins">
        <h2 className="text-2xl font-[400] mb-4">Favorite Listings</h2>
        <div className="flex justify-center items-center h-32">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="px-4 w-full font-poppins">
        <h2 className="text-2xl font-[400] mb-4">Favorite Listings</h2>
        <div className="bg-white border border-gray-200 rounded-md p-6 text-center">
          <p className="text-lg">Please log in to manage your favorite listings.</p>
        </div>
      </div>
    );
  }

  // Get default list and additional lists
  const defaultList = lists.find(list => list.isDefault);
  const additionalLists = lists.filter(list => !list.isDefault);

  return (
    <>
      <div className="px-4 w-full font-poppins">
        <h2 className="text-2xl font-[400] mb-4">Favorite Listings</h2>
        
        <div className="grid grid-cols-2 h-[300px] gap-4">
          {/* Default favorite list */}
          {defaultList && (
            <div 
              onClick={() => handleListClick(defaultList)}
              className="bg-[#1544AB] border border-[#1544AB] text-white rounded-md p-6 flex flex-col items-center justify-center h-full shadow-sm relative cursor-pointer hover:bg-blue-700 transition-colors"
            >
              {/* Three dots menu for default list */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(defaultList.id);
                  }}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors duration-200"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </button>
                
                {showDropdown === defaultList.id && (
                  <div className="absolute right-0 top-8 bg-white text-black rounded-md shadow-lg py-2 w-32 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditList(defaultList);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShareList(defaultList);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200"
                    >
                      Share
                    </button>
                  </div>
                )}
              </div>

              <h3 className="font-medium text-center text-xl">{defaultList.name}</h3>
              <p className="text-xl mt-2">({listCounts[defaultList.name] || 0} listings)</p>
            </div>
          )}
          
          {/* Create new list card */}
          <div 
            onClick={handleCreateNewList}
            className="border border-[#1544AB] rounded-md p-6 flex flex-col items-center justify-center h-full cursor-pointer hover:border-blue-400 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
          >
            <div className="text-[#1544AB] mb-2">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <p className="text-[#1544AB] text-xl">Create New List</p>
          </div>
        </div>

        {/* Additional created lists */}
        {additionalLists.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {additionalLists.map((list) => (
              <div 
                key={list.id}
                onClick={() => handleListClick(list)}
                className="bg-[#1544AB] border border-[#1544AB] text-white rounded-md p-6 flex flex-col items-center justify-center h-[300px] shadow-sm relative cursor-pointer hover:bg-blue-700 transition-colors"
              >
                {/* Three dots menu */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(list.id);
                    }}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors duration-200"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  </button>
                  
                  {showDropdown === list.id && (
                    <div className="absolute right-0 top-8 bg-white text-black rounded-md shadow-lg py-2 w-32 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditList(list);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShareList(list);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200"
                      >
                        Share
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteList(list.id, list.name);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <h3 className="font-medium text-center text-xl">{list.name}</h3>
                <p className="text-xl mt-2">({listCounts[list.name] || 0} listings)</p>
              </div>
            ))}
          </div>
        )}

        {/* Click outside to close dropdown */}
        {showDropdown && (
          <div 
            className="fixed inset-0 z-0" 
            onClick={() => setShowDropdown(null)}
          />
        )}

        {/* Create New List Modal */}
        {showModal && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-30" onClick={handleCloseModal}></div>
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
              <div className="bg-white w-full max-w-lg rounded-lg border border-blue-900 overflow-hidden">
                <div className="p-6 flex justify-between items-center border-b">
                  <h3 className="text-xl font-medium">Create New List</h3>
                  <button 
                    onClick={handleCloseModal}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                <div className="p-6">
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Enter list name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="p-6 flex justify-end">
                  <button
                    onClick={handleSaveList}
                    disabled={!newListName.trim() || isLoading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Edit List Modal */}
        {showEditModal && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-30" onClick={handleCloseEditModal}></div>
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
              <div className="bg-white w-full max-w-lg rounded-lg border border-blue-900 overflow-hidden">
                <div className="p-6 flex justify-between items-center border-b">
                  <h3 className="text-xl font-medium">Edit List</h3>
                  <button 
                    onClick={handleCloseEditModal}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                <div className="p-6">
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Enter list name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="p-6 flex justify-end">
                  <button
                    onClick={handleUpdateList}
                    disabled={!newListName.trim() || isLoading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                  >
                    {isLoading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default FavoriteListing;