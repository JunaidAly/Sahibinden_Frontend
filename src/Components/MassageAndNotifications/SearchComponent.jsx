
// import { useEffect, useState, useCallback } from 'react';
// import { 
//   collection, 
//   getDocs, 
//   doc, 
//   getDoc,
//   orderBy,
//   query,
//   limit
// } from 'firebase/firestore';
// import { auth, db } from '../../../firebase'; // Import auth as well
// import { onAuthStateChanged } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom'; // Add useNavigate for navigation

// const SearchComponent = ({ currentUserId } = {}) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [allMessages, setAllMessages] = useState([]);
//   const [filteredMessages, setFilteredMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [users, setUsers] = useState({});
//   const [authUser, setAuthUser] = useState(null);
//   const [authLoading, setAuthLoading] = useState(true);
  
//   const navigate = useNavigate(); // Add navigation hook

//   // Listen to Firebase Auth state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setAuthUser(user);
//       setAuthLoading(false);
//       console.log('Firebase Auth user:', user?.uid || 'No user logged in');
//     });

//     return () => unsubscribe(); // Cleanup subscription
//   }, []);

//   // Get current user ID - prioritize Firebase Auth
//   const getUserId = () => {
//     // First check if we have currentUserId prop
//     if (currentUserId) {
//       console.log('Using currentUserId prop:', currentUserId);
//       return currentUserId;
//     }
    
//     // Then check Firebase Auth current user
//     if (authUser?.uid) {
//       console.log('Using Firebase Auth user ID:', authUser.uid);
//       return authUser.uid;
//     }
    
//     // Fallback to localStorage/sessionStorage (for backwards compatibility)
//     if (typeof window !== 'undefined') {
//       const possibleKeys = [
//         'userId', 'currentUserId', 'user_id', 'uid', 'userID', 
//         'firebase_uid', 'authUserId', 'loggedInUserId'
//       ];
      
//       // Check localStorage
//       for (const key of possibleKeys) {
//         const value = localStorage.getItem(key);
//         if (value) {
//           console.log(`Found userId in localStorage[${key}]:`, value);
//           return value;
//         }
//       }
      
//       // Check sessionStorage
//       for (const key of possibleKeys) {
//         const value = sessionStorage.getItem(key);
//         if (value) {
//           console.log(`Found userId in sessionStorage[${key}]:`, value);
//           return value;
//         }
//       }
//     }
    
//     console.log('No userId found anywhere');
//     return null;
//   };
  
//   const userId = getUserId();

//   // Fetch user data with better error handling
//   const fetchUserData = useCallback(async (uid) => {
//     if (!uid) return { displayName: 'Unknown User' };
    
//     // Check if we already have this user's data
//     if (users[uid]) return users[uid];
    
//     try {
//       const userDocRef = doc(db, "users", uid);
//       const userDocSnap = await getDoc(userDocRef);
      
//       if (userDocSnap.exists()) {
//         const userData = userDocSnap.data();
//         const displayName = userData?.displayName || 
//                            userData?.name || 
//                            userData?.fullName || 
//                            userData?.username || 
//                            'Unknown User';
        
//         const userInfo = { displayName, ...userData };
//         setUsers(prev => ({ ...prev, [uid]: userInfo }));
//         return userInfo;
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
    
//     const fallbackUser = { displayName: 'Unknown User' };
//     setUsers(prev => ({ ...prev, [uid]: fallbackUser }));
//     return fallbackUser;
//   }, []); // Remove users dependency to prevent infinite loop

//   // Fetch user chatrooms and messages
//   const fetchUserChatrooms = useCallback(async () => {
//     if (!userId) {
//       if (authLoading) {
//         setError('Checking authentication...');
//         return;
//       }
//       setError('Please log in to view messages');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
      
//       // Get all chatrooms
//       const chatroomsRef = collection(db, 'chatrooms');
//       const chatroomsSnapshot = await getDocs(chatroomsRef);
      
//       if (chatroomsSnapshot.empty) {
//         setAllMessages([]);
//         setFilteredMessages([]);
//         setLoading(false);
//         return;
//       }

//       const allChatrooms = [];
      
//       // Get ALL chatrooms (not filtering by user) since you want all messages
//       chatroomsSnapshot.forEach((docSnapshot) => {
//         try {
//           const chatroomId = docSnapshot.id;
//           const chatroomData = docSnapshot.data();
          
//           allChatrooms.push({
//             id: chatroomId,
//             ...chatroomData
//           });
//           console.log('Found chatroom:', chatroomId);
//         } catch (docError) {
//           console.warn('Error processing chatroom:', docError);
//         }
//       });

//       console.log(`Found ${allChatrooms.length} total chatrooms`);

//       if (allChatrooms.length === 0) {
//         setAllMessages([]);
//         setFilteredMessages([]);
//         setLoading(false);
//         return;
//       }

//       // Fetch messages for each chatroom
//       const allMessages = [];
      
//       for (const chatroom of allChatrooms) {
//         try {
//           const messagesRef = collection(db, 'chatrooms', chatroom.id, 'messages');
          
//           // Try without orderBy first to see if that's causing issues
//           let messagesSnapshot;
//           try {
//             const messagesQuery = query(messagesRef, orderBy('sentOn', 'desc'), limit(50));
//             messagesSnapshot = await getDocs(messagesQuery);
//           } catch (queryError) {
//             console.warn('Query with orderBy failed, trying without orderBy:', queryError);
//             // Fallback: get messages without ordering
//             messagesSnapshot = await getDocs(messagesRef);
//           }
          
//           console.log(`Found ${messagesSnapshot.docs.length} total messages in chatroom ${chatroom.id}`);
          
//           // Debug: Show first message data if available
//           if (messagesSnapshot.docs.length > 0) {
//             const firstMsg = messagesSnapshot.docs[0].data();
//             console.log('Sample message data:', firstMsg);
//             console.log(`Filtering for messages where receiver === ${userId}`);
//           }
          
//           for (const messageDoc of messagesSnapshot.docs) {
//             try {
//               const messageData = messageDoc.data();
              
//               // Only include messages sent TO the current user (incoming messages)
//               if (!messageData?.text || messageData.receiver !== userId) {
//                 continue;
//               }
              
//               // Fetch user data for sender and receiver (if they exist)
//               let senderData = { displayName: 'Unknown User' };
//               let receiverData = { displayName: 'Unknown User' };
              
//               if (messageData.sender) {
//                 senderData = await fetchUserData(messageData.sender);
//               }
              
//               if (messageData.receiver) {
//                 receiverData = await fetchUserData(messageData.receiver);
//               }
              
//               // Create safe date object
//               let sentDate;
//               try {
//                 if (messageData.sentOn?.toDate) {
//                   sentDate = messageData.sentOn.toDate();
//                 } else if (messageData.sentOn instanceof Date) {
//                   sentDate = messageData.sentOn;
//                 } else if (messageData.sentOn) {
//                   sentDate = new Date(messageData.sentOn);
//                 } else {
//                   sentDate = new Date();
//                 }
//               } catch (dateError) {
//                 console.warn('Date parsing error:', dateError);
//                 sentDate = new Date();
//               }
              
//               allMessages.push({
//                 id: messageDoc.id,
//                 chatroomId: chatroom.id,
//                 addID: chatroom.addId || chatroom.addID || 'Unknown', // Use addId from message or chatroom
//                 text: messageData.text || '',
//                 sender: messageData.sender || 'Unknown',
//                 receiver: messageData.receiver || 'Unknown',
//                 senderName: senderData?.displayName || 'Unknown User',
//                 receiverName: receiverData?.displayName || 'Unknown User',
//                 isRead: Boolean(messageData.isRead),
//                 sentOn: sentDate,
//                 category: chatroom.category || 'Unknown',
//                 isFromCurrentUser: false // All messages shown are TO current user, so none are FROM current user
//               });
//             } catch (messageError) {
//               console.warn('Error processing message:', messageError);
//             }
//           }
//         } catch (chatroomError) {
//           console.warn('Error fetching messages for chatroom:', chatroomError);
//         }
//       }
      
//       console.log(`Total incoming messages found: ${allMessages.length}`);
      
//       // Sort messages by date (newest first) with error handling
//       try {
//         allMessages.sort((a, b) => {
//           const dateA = a.sentOn instanceof Date ? a.sentOn : new Date(a.sentOn);
//           const dateB = b.sentOn instanceof Date ? b.sentOn : new Date(b.sentOn);
//           return dateB - dateA;
//         });
//       } catch (sortError) {
//         console.warn('Error sorting messages:', sortError);
//       }
      
//       setAllMessages(allMessages);
//       setFilteredMessages(allMessages);
      
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       setError('Failed to load messages. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   }, [userId, fetchUserData]);

//   // Search functionality
//   const handleSearch = useCallback(() => {
//     if (!searchQuery.trim()) {
//       setFilteredMessages(allMessages);
//       return;
//     }

//     try {
//       const query = searchQuery.toLowerCase();
//       const filtered = allMessages.filter(message => {
//         const matchesAdId = message.addID?.toLowerCase().includes(query) || false;
//         const matchesSenderName = message.senderName?.toLowerCase().includes(query) || false;
//         const matchesReceiverName = message.receiverName?.toLowerCase().includes(query) || false;
//         const matchesText = message.text?.toLowerCase().includes(query) || false;
        
//         return matchesAdId || matchesSenderName || matchesReceiverName || matchesText;
//       });

//       setFilteredMessages(filtered);
//     } catch (searchError) {
//       console.error('Error during search:', searchError);
//     }
//   }, [searchQuery, allMessages]);

//   // Real-time search as user types
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       handleSearch();
//     }, 300);

//     return () => clearTimeout(timeoutId);
//   }, [handleSearch]);

//   // Fetch data when userId is available and auth has loaded
//   useEffect(() => {
//     if (!authLoading && userId) {
//       fetchUserChatrooms();
//     }
//   }, [userId, authLoading, fetchUserChatrooms]);

//   // Format timestamp to match the design
//   const formatTimestamp = useCallback((date) => {
//     try {
//       if (!date) return 'Unknown time';
      
//       const validDate = date instanceof Date ? date : new Date(date);
      
//       if (isNaN(validDate.getTime())) return 'Invalid date';
      
//       // Format like: "June 24, 2025 • 10:56"
//       const dateStr = validDate.toLocaleDateString('en-US', {
//         month: 'long',
//         day: 'numeric',
//         year: 'numeric'
//       });
      
//       const timeStr = validDate.toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: false
//       });
      
//       return `${dateStr} • ${timeStr}`;
//     } catch (error) {
//       console.warn('Error formatting date:', error);
//       return 'Invalid date';
//     }
//   }, []);

//   // Handle message click - navigate to chat
//   const handleMessageClick = useCallback((message) => {
//     try {
//       // Determine who the other participant is (not the current user)
//       const otherParticipantId = message.sender === userId ? message.receiver : message.sender;
//       const otherParticipantName = message.sender === userId ? message.receiverName : message.senderName;
      
//       // Construct property data from message info
//       const propertyData = {
//         addId: message.addID,
//         id: message.addID,
//         title: `Property ${message.addID}`,
//         type: message.category,
//         category: message.category,
//         location: 'Location not specified',
//         price: 'Price on request',
//         image: '/assets/placeholder-property.png'
//       };
      
//       // Construct contact info for the other participant
//       const contactInfo = {
//         name: otherParticipantName,
//         receiverId: otherParticipantId,
//         phone: 'Contact via chat'
//       };
      
//       // Navigate to chat component with state data
//       navigate('/chat', {
//         state: {
//           propertyData: propertyData,
//           contactInfo: contactInfo,
//           currentUserId: userId,
//           chatroomId: message.chatroomId,
//           fromSearch: true
//         }
//       });
      
//       console.log('Navigating to chat:', {
//         chatroomId: message.chatroomId,
//         addId: message.addID,
//         otherParticipant: otherParticipantName
//       });
//     } catch (error) {
//       console.error('Error navigating to chat:', error);
//       alert('Unable to open chat. Please try again.');
//     }
//   }, [userId, navigate]);

//   // Error state
//   if (error) {
//     return (
//       <div className="w-full max-w-4xl p-5">
//         <div className="bg-red-50 border border-red-200 rounded-md p-4">
//           <h3 className="text-red-800 font-medium mb-2">Error Loading Messages</h3>
//           <p className="text-red-600 text-sm mb-3">{error}</p>
          
          
//           <button 
//             onClick={() => {
//               setError(null);
//               fetchUserChatrooms();
//             }}
//             className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 mr-2"
//           >
//             Try Again
//           </button>
          
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-4xl p-5">
      
//       {authLoading && (
//         <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
//           <p className="text-blue-800 text-sm">🔄 Checking authentication...</p>
//         </div>
//       )}
      
//       <div className="text-[#8D8D8D] mb-2 text-lg font-medium">
//         Search Your Incoming Messages By Ad Number Or Sender Name.
//       </div>
      
//       <div className="mb-4">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search by ad number, sender name, or message..."
//           className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//         />
//       </div>
      
//       <div className="mb-6">
//         <button
//           onClick={handleSearch}
//           disabled={loading}
//           className="bg-[#1544AB] text-white px-6 py-3 rounded-full text-sm font-medium uppercase disabled:opacity-50"
//         >
//           {loading ? 'Loading...' : `Search (${filteredMessages.length} messages)`}
//         </button>
//       </div>
      
//       {/* Loading state */}
//       {loading && (
//         <div className="flex justify-center items-center h-20">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//           <span className="ml-2 text-gray-600">Loading messages...</span>
//         </div>
//       )}
      
//       {/* Messages List */}
//       {!loading && (
//         <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//           {filteredMessages.length === 0 ? (
//             <div className="text-center py-8">
//               <div className="text-gray-500 text-lg font-medium">
//                 {allMessages.length === 0 ? 'You have no incoming messages.' : 'No incoming messages match your search.'}
//               </div>
//             </div>
//           ) : (
//             filteredMessages.map((message) => (
//               <div 
//                 key={`${message.chatroomId}-${message.id}`}
//                 onClick={() => handleMessageClick(message)}
//                 className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors group"
//               >
//                 {/* Thumbnail */}
//                 <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 mr-4">
//                   <img 
//                     src="/assets/placeholder-property.png" 
//                     alt="Property" 
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.src = "/assets/placeholder-property.png";
//                     }}
//                   />
//                 </div>

//                 {/* Content */}
//                 <div className="flex-1 min-w-0">
//                   {/* Message text (like property title) */}
//                   <h3 className="text-gray-600 text-sm font-normal mb-1 overflow-hidden group-hover:text-gray-800" 
//                       style={{
//                         display: '-webkit-box',
//                         WebkitLineClamp: 2,
//                         WebkitBoxOrient: 'vertical',
//                         overflow: 'hidden'
//                       }}>
//                     {message.text}
//                   </h3>
                  
//                   {/* Sender name and timestamp */}
//                   <div className="flex items-center text-xs text-blue-500 space-x-2">
//                     <span className="font-medium">{message.senderName}</span>
//                     <span className="text-gray-400">•</span>
//                     <span className="text-gray-500">{formatTimestamp(message.sentOn)}</span>
//                     {!message.isRead && (
//                       <>
//                         <span className="text-gray-400">•</span>
//                         <span className="text-red-500 font-medium">New</span>
//                       </>
//                     )}
//                   </div>

//                   {/* Ad ID and Category */}
//                   <div className="flex items-center text-xs text-gray-400 mt-1 space-x-2">
//                     <span>Ad: {message.addID}</span>
//                     <span>•</span>
//                     <span>{message.category}</span>
//                   </div>
//                 </div>

//                 {/* Menu dots */}
//                 <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
//                   </svg>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {/* Refresh Button */}
//       {!loading && filteredMessages.length > 0 && (
//         <div className="mt-6 text-center">
//           <button 
//             onClick={fetchUserChatrooms}
//             className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//           >
//             Refresh Messages
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchComponent;











import { useEffect, useState, useCallback } from 'react';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  orderBy,
  query,
  limit
} from 'firebase/firestore';
import { auth, db } from '../../../firebase'; // Import auth as well
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Add useNavigate for navigation

const SearchComponent = ({ currentUserId } = {}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState({});
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [propertyImages, setPropertyImages] = useState({}); // Cache for property images
  
  const navigate = useNavigate(); // Add navigation hook

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setAuthLoading(false);
      console.log('Firebase Auth user:', user?.uid || 'No user logged in');
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Get current user ID - prioritize Firebase Auth
  const getUserId = () => {
    // First check if we have currentUserId prop
    if (currentUserId) {
      console.log('Using currentUserId prop:', currentUserId);
      return currentUserId;
    }
    
    // Then check Firebase Auth current user
    if (authUser?.uid) {
      console.log('Using Firebase Auth user ID:', authUser.uid);
      return authUser.uid;
    }
    
    // Fallback to localStorage/sessionStorage (for backwards compatibility)
    if (typeof window !== 'undefined') {
      const possibleKeys = [
        'userId', 'currentUserId', 'user_id', 'uid', 'userID', 
        'firebase_uid', 'authUserId', 'loggedInUserId'
      ];
      
      // Check localStorage
      for (const key of possibleKeys) {
        const value = localStorage.getItem(key);
        if (value) {
          console.log(`Found userId in localStorage[${key}]:`, value);
          return value;
        }
      }
      
      // Check sessionStorage
      for (const key of possibleKeys) {
        const value = sessionStorage.getItem(key);
        if (value) {
          console.log(`Found userId in sessionStorage[${key}]:`, value);
          return value;
        }
      }
    }
    
    console.log('No userId found anywhere');
    return null;
  };
  
  const userId = getUserId();

  // Function to fetch property data from allAddsPost collection
  const fetchPropertyData = useCallback(async (addID, category, adOwnerId) => {
    if (!addID || !category || !adOwnerId) {
      console.log('Missing required parameters for property fetch:', { addID, category, adOwnerId });
      return null;
    }

    // Remove the last character from addID to match the format in allAddsPost
    const searchAddID = addID.slice(0, -1);
    console.log(`Original addID: ${addID}, Search addID: ${searchAddID}`);

    try {
      console.log(`Fetching property data for addID: ${searchAddID}, category: ${category}, owner: ${adOwnerId}`);
      
      // Get the owner's document from allAddsPost collection
      const userDocRef = doc(db, "allAddsPost", adOwnerId);
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        console.log(`No allAddsPost document found for owner: ${adOwnerId}`);
        return null;
      }
      
      const userData = userDocSnap.data();
      console.log('Owner data structure:', Object.keys(userData));
      
      // Look for the category in the owner's data
      let categoryData = null;
      
      // First, try direct category access
      if (userData[category]) {
        categoryData = userData[category];
      } else {
        // If not found directly, search through all fields
        for (const [key, value] of Object.entries(userData)) {
          if (Array.isArray(value)) {
            // Check if this array contains our category
            const foundCategory = value.find(item => 
              item?.category === category || key === category
            );
            if (foundCategory) {
              categoryData = value;
              break;
            }
          }
        }
      }
      
      if (!categoryData) {
        console.log(`Category '${category}' not found in owner data`);
        return null;
      }
      
      console.log(`Found category data:`, categoryData);
      
      // If categoryData is an array, search through it
      if (Array.isArray(categoryData)) {
        console.log(`Searching through ${categoryData.length} items in category array`);
        
        // Try different possible field names for addID
        const possibleIdFields = ['addID', 'addId', 'id', 'propertyId', 'adId', 'listingId'];
        
        let propertyData = null;
        
        // Search through all items in the array
        for (const item of categoryData) {
          // Check each possible ID field
          for (const field of possibleIdFields) {
            if (item[field] === searchAddID || item[field] === addID) {
              propertyData = item;
              console.log(`Found matching property using field '${field}':`, item);
              break;
            }
          }
          if (propertyData) break;
        }
        
        if (propertyData) {
          // Extract property information
          const propertyInfo = {
            addId: addID,
            id: addID,
            title: propertyData.title || propertyData.propertyTitle || `Property ${addID}`,
            type: propertyData.category || category,
            category: propertyData.category || category,
            location: propertyData.location || propertyData.address || 'Location not specified',
            price: propertyData.price || propertyData.rentAmount || 'Price on request',
            description: propertyData.description || '',
            ownerId: adOwnerId
          };
          
          // Get the first image if available
          const possibleImageFields = ['imageUrls', 'images', 'imageUrl', 'photos', 'propertyImages'];
          
          for (const imageField of possibleImageFields) {
            if (propertyData[imageField] && Array.isArray(propertyData[imageField]) && propertyData[imageField].length > 0) {
              propertyInfo.image = propertyData[imageField][0];
              console.log(`Found image for property:`, propertyInfo.image);
              break;
            }
          }
          
          if (!propertyInfo.image) {
            propertyInfo.image = '/assets/placeholder-property.png';
          }
          
          return propertyInfo;
        }
      }
      
      console.log(`No property found for addID: ${searchAddID} in category: ${category}`);
      return null;
      
    } catch (error) {
      console.error('Error fetching property data:', error);
      return null;
    }
  }, []);

  // Fetch user data with better error handling
  const fetchUserData = useCallback(async (uid) => {
    if (!uid) return { displayName: 'Unknown User' };
    
    // Check if we already have this user's data
    if (users[uid]) return users[uid];
    
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const displayName = userData?.displayName || 
                           userData?.name || 
                           userData?.fullName || 
                           userData?.username || 
                           'Unknown User';
        
        const userInfo = { 
          displayName, 
          phone: userData?.phone || userData?.phoneNumber || 'Contact via chat',
          ...userData 
        };
        setUsers(prev => ({ ...prev, [uid]: userInfo }));
        return userInfo;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    
    const fallbackUser = { displayName: 'Unknown User', phone: 'Contact via chat' };
    setUsers(prev => ({ ...prev, [uid]: fallbackUser }));
    return fallbackUser;
  }, []); // Remove users dependency to prevent infinite loop

  // Fetch user chatrooms and messages where current user is the add owner (receiver)
  const fetchUserChatrooms = useCallback(async () => {
    if (!userId) {
      if (authLoading) {
        setError('Checking authentication...');
        return;
      }
      setError('Please log in to view messages');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Get all chatrooms where current user is the add owner
      const chatroomsRef = collection(db, 'chatrooms');
      const chatroomsSnapshot = await getDocs(chatroomsRef);
      
      if (chatroomsSnapshot.empty) {
        setAllMessages([]);
        setFilteredMessages([]);
        setLoading(false);
        return;
      }

      const userChatrooms = [];
      
      // Filter chatrooms where current user is the add owner
      chatroomsSnapshot.forEach((docSnapshot) => {
        try {
          const chatroomId = docSnapshot.id;
          const chatroomData = docSnapshot.data();
          
          // Check if current user is the add owner in this chatroom
          if (chatroomData.adOwnerId === userId) {
            userChatrooms.push({
              id: chatroomId,
              ...chatroomData
            });
            console.log('Found chatroom where user is add owner:', chatroomId);
          }
        } catch (docError) {
          console.warn('Error processing chatroom:', docError);
        }
      });

      console.log(`Found ${userChatrooms.length} chatrooms where user is add owner`);

      if (userChatrooms.length === 0) {
        setAllMessages([]);
        setFilteredMessages([]);
        setLoading(false);
        return;
      }

      // Fetch messages for each chatroom where user is add owner
      const allMessages = [];
      
      for (const chatroom of userChatrooms) {
        try {
          const messagesRef = collection(db, 'chatrooms', chatroom.id, 'messages');
          
          // Get messages with ordering
          let messagesSnapshot;
          try {
            const messagesQuery = query(messagesRef, orderBy('sentOn', 'desc'), limit(50));
            messagesSnapshot = await getDocs(messagesQuery);
          } catch (queryError) {
            console.warn('Query with orderBy failed, trying without orderBy:', queryError);
            // Fallback: get messages without ordering
            messagesSnapshot = await getDocs(messagesRef);
          }
          
          console.log(`Found ${messagesSnapshot.docs.length} messages in chatroom ${chatroom.id}`);
          
          for (const messageDoc of messagesSnapshot.docs) {
            try {
              const messageData = messageDoc.data();
              
              // Only include messages with text and where current user is the receiver (add owner)
              if (!messageData?.text || messageData.receiver !== userId) {
                continue;
              }
              
              // Fetch user data for sender
              let senderData = { displayName: 'Unknown User', phone: 'Contact via chat' };
              
              if (messageData.sender) {
                senderData = await fetchUserData(messageData.sender);
              }
              
              // Create safe date object
              let sentDate;
              try {
                if (messageData.sentOn?.toDate) {
                  sentDate = messageData.sentOn.toDate();
                } else if (messageData.sentOn instanceof Date) {
                  sentDate = messageData.sentOn;
                } else if (messageData.sentOn) {
                  sentDate = new Date(messageData.sentOn);
                } else {
                  sentDate = new Date();
                }
              } catch (dateError) {
                console.warn('Date parsing error:', dateError);
                sentDate = new Date();
              }
              
              // Fetch property data
              const propertyData = await fetchPropertyData(
                chatroom.addId || chatroom.addID,
                chatroom.category,
                userId // Current user is the add owner
              );
              
              allMessages.push({
                id: messageData.id || messageDoc.id,
                chatroomId: chatroom.id,
                addID: chatroom.addId || chatroom.addID || 'Unknown',
                text: messageData.text || '',
                sender: messageData.sender || 'Unknown',
                receiver: messageData.receiver || 'Unknown',
                senderName: senderData?.displayName || 'Unknown User',
                senderPhone: senderData?.phone || 'Contact via chat',
                isRead: Boolean(messageData.isRead),
                sentOn: sentDate,
                category: chatroom.category || 'Unknown',
                propertyData: propertyData, // Store full property data
                propertyImage: propertyData?.image || '/assets/placeholder-property.png'
              });
            } catch (messageError) {
              console.warn('Error processing message:', messageError);
            }
          }
        } catch (chatroomError) {
          console.warn('Error fetching messages for chatroom:', chatroomError);
        }
      }
      
      console.log(`Total messages to add owner found: ${allMessages.length}`);
      
      // Sort messages by date (newest first) with error handling
      try {
        allMessages.sort((a, b) => {
          const dateA = a.sentOn instanceof Date ? a.sentOn : new Date(a.sentOn);
          const dateB = b.sentOn instanceof Date ? b.sentOn : new Date(b.sentOn);
          return dateB - dateA;
        });
      } catch (sortError) {
        console.warn('Error sorting messages:', sortError);
      }
      
      setAllMessages(allMessages);
      setFilteredMessages(allMessages);
      
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [userId, fetchUserData, fetchPropertyData]);

  // Search functionality
  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredMessages(allMessages);
      return;
    }

    try {
      const query = searchQuery.toLowerCase();
      const filtered = allMessages.filter(message => {
        const matchesAdId = message.addID?.toLowerCase().includes(query) || false;
        const matchesSenderName = message.senderName?.toLowerCase().includes(query) || false;
        const matchesText = message.text?.toLowerCase().includes(query) || false;
        const matchesPropertyTitle = message.propertyData?.title?.toLowerCase().includes(query) || false;
        
        return matchesAdId || matchesSenderName || matchesText || matchesPropertyTitle;
      });

      setFilteredMessages(filtered);
    } catch (searchError) {
      console.error('Error during search:', searchError);
    }
  }, [searchQuery, allMessages]);

  // Real-time search as user types
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [handleSearch]);

  // Fetch data when userId is available and auth has loaded
  useEffect(() => {
    if (!authLoading && userId) {
      fetchUserChatrooms();
    }
  }, [userId, authLoading, fetchUserChatrooms]);

  // Format timestamp to match the design
  const formatTimestamp = useCallback((date) => {
    try {
      if (!date) return 'Unknown time';
      
      const validDate = date instanceof Date ? date : new Date(date);
      
      if (isNaN(validDate.getTime())) return 'Invalid date';
      
      // Format like: "June 24, 2025 • 10:56"
      const dateStr = validDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      
      const timeStr = validDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      
      return `${dateStr} • ${timeStr}`;
    } catch (error) {
      console.warn('Error formatting date:', error);
      return 'Invalid date';
    }
  }, []);

  // Handle message click - navigate to existing ChatComponent
  const handleMessageClick = useCallback((message) => {
    try {
      // Use the existing property data if available, otherwise construct it
      const propertyData = message.propertyData || {
        addId: message.addID,
        id: message.addID,
        title: `Property ${message.addID}`,
        type: message.category,
        category: message.category,
        location: 'Location not specified',
        price: 'Price on request',
        image: message.propertyImage || '/assets/placeholder-property.png'
      };
      
      // Contact info for the message sender (the one messaging the add owner)
      const contactInfo = {
        name: message.senderName,
        receiverId: message.sender, // The sender becomes the contact for the add owner
        phone: message.senderPhone || 'Contact via chat'
      };
      
      // Navigate to ChatComponent with existing chatroom data
      navigate('/chat', {
        state: {
          propertyData: propertyData,
          contactInfo: contactInfo,
          currentUserId: userId, // Current user is the add owner
          chatroomId: message.chatroomId, // Use existing chatroom ID
          fromSearch: true
        }
      });
      
      console.log('Navigating to existing chat:', {
        chatroomId: message.chatroomId,
        addId: message.addID,
        sender: message.senderName,
        propertyData: propertyData
      });
    } catch (error) {
      console.error('Error navigating to chat:', error);
      alert('Unable to open chat. Please try again.');
    }
  }, [userId, navigate]);

  // Error state
  if (error) {
    return (
      <div className="w-full max-w-4xl p-5">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium mb-2">Error Loading Messages</h3>
          <p className="text-red-600 text-sm mb-3">{error}</p>
          
          <button 
            onClick={() => {
              setError(null);
              fetchUserChatrooms();
            }}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 mr-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl p-5">
      
      {authLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
          <p className="text-blue-800 text-sm">🔄 Checking authentication...</p>
        </div>
      )}
      
      <div className="text-[#8D8D8D] mb-2 text-lg font-medium">
        Messages For Your Property Listings - Search By Ad Number Or Sender Name.
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by ad number, sender name, property title, or message..."
          className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-6">
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-[#1544AB] text-white px-6 py-3 rounded-full text-sm font-medium uppercase disabled:opacity-50"
        >
          {loading ? 'Loading...' : `Search (${filteredMessages.length} messages)`}
        </button>
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading messages...</span>
        </div>
      )}
      
      {/* Messages List */}
      {!loading && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500 text-lg font-medium">
                {allMessages.length === 0 ? 'You have no messages for your property listings.' : 'No messages match your search.'}
              </div>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div 
                key={`${message.chatroomId}-${message.id}`}
                onClick={() => handleMessageClick(message)}
                className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors group"
              >
                {/* Property Image Thumbnail */}
                <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 mr-4">
                  <img 
                    src={message.propertyImage || "/assets/placeholder-property.png"} 
                    alt={`Property ${message.addID}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/assets/placeholder-property.png";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Property title or message text */}
                  <h3 className="text-gray-800 text-sm font-medium mb-1 overflow-hidden group-hover:text-gray-900" 
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                    {message.propertyData?.title || `Property ${message.addID}`}
                  </h3>
                  
                  {/* Latest message text */}
                  <p className="text-gray-600 text-sm mb-1 overflow-hidden" 
                     style={{
                       display: '-webkit-box',
                       WebkitLineClamp: 1,
                       WebkitBoxOrient: 'vertical',
                       overflow: 'hidden'
                     }}>
                    "{message.text}"
                  </p>
                  
                  {/* Sender name and timestamp */}
                  <div className="flex items-center text-xs text-blue-500 space-x-2">
                    <span className="font-medium">From: {message.senderName}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{formatTimestamp(message.sentOn)}</span>
                    {!message.isRead && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-red-500 font-medium">New</span>
                      </>
                    )}
                  </div>

                  {/* Ad ID and Category */}
                  <div className="flex items-center text-xs text-gray-400 mt-1 space-x-2">
                    <span>Ad: {message.addID}</span>
                    <span>•</span>
                    <span>{message.category}</span>
                  </div>
                </div>

                {/* Menu dots */}
                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Refresh Button */}
      {!loading && filteredMessages.length > 0 && (
        <div className="mt-6 text-center">
          <button 
            onClick={fetchUserChatrooms}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Refresh Messages
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
