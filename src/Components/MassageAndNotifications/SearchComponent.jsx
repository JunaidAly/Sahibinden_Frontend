// import { useEffect ,useState } from 'react';
//  const  SearchComponent = () => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = () => {
//     // Add actual search functionality here
//     console.log('Searching for:', searchQuery);
//   };

//   return (
//     <div className="w-full max-w-4xl p-5">
//       <div className="text-[#8D8D8D] mb-2 text-lg font-medium">
//         You Can Search By Ad Number Or Sender Name.
//       </div>
      
//       <div className="mb-4">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//         />
//       </div>
      
//       <div className="mb-4">
//         <button
//           onClick={handleSearch}
//           className="bg-[#1544AB] text-white px-6 py-3 rounded-full text-sm font-medium uppercase "
//         >
//           Search
//         </button>
//       </div>
      
//       <div className="text-black  text-lg font-semibold">
//         You have no messages.
//       </div>
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
        
        const userInfo = { displayName, ...userData };
        setUsers(prev => ({ ...prev, [uid]: userInfo }));
        return userInfo;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    
    const fallbackUser = { displayName: 'Unknown User' };
    setUsers(prev => ({ ...prev, [uid]: fallbackUser }));
    return fallbackUser;
  }, []); // Remove users dependency to prevent infinite loop

  // Fetch user chatrooms and messages
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
      
      // Get all chatrooms
      const chatroomsRef = collection(db, 'chatrooms');
      const chatroomsSnapshot = await getDocs(chatroomsRef);
      
      if (chatroomsSnapshot.empty) {
        setAllMessages([]);
        setFilteredMessages([]);
        setLoading(false);
        return;
      }

      const allChatrooms = [];
      
      // Get ALL chatrooms (not filtering by user) since you want all messages
      chatroomsSnapshot.forEach((docSnapshot) => {
        try {
          const chatroomId = docSnapshot.id;
          const chatroomData = docSnapshot.data();
          
          allChatrooms.push({
            id: chatroomId,
            ...chatroomData
          });
          console.log('Found chatroom:', chatroomId);
        } catch (docError) {
          console.warn('Error processing chatroom:', docError);
        }
      });

      console.log(`Found ${allChatrooms.length} total chatrooms`);

      if (allChatrooms.length === 0) {
        setAllMessages([]);
        setFilteredMessages([]);
        setLoading(false);
        return;
      }

      // Fetch messages for each chatroom
      const allMessages = [];
      
      for (const chatroom of allChatrooms) {
        try {
          const messagesRef = collection(db, 'chatrooms', chatroom.id, 'messages');
          
          // Try without orderBy first to see if that's causing issues
          let messagesSnapshot;
          try {
            const messagesQuery = query(messagesRef, orderBy('sentOn', 'desc'), limit(50));
            messagesSnapshot = await getDocs(messagesQuery);
          } catch (queryError) {
            console.warn('Query with orderBy failed, trying without orderBy:', queryError);
            // Fallback: get messages without ordering
            messagesSnapshot = await getDocs(messagesRef);
          }
          
          console.log(`Found ${messagesSnapshot.docs.length} total messages in chatroom ${chatroom.id}`);
          
          // Debug: Show first message data if available
          if (messagesSnapshot.docs.length > 0) {
            const firstMsg = messagesSnapshot.docs[0].data();
            console.log('Sample message data:', firstMsg);
            console.log(`Filtering for messages where receiver === ${userId}`);
          }
          
          for (const messageDoc of messagesSnapshot.docs) {
            try {
              const messageData = messageDoc.data();
              
              // Only include messages sent TO the current user (incoming messages)
              if (!messageData?.text || messageData.receiver !== userId) {
                continue;
              }
              
              // Fetch user data for sender and receiver (if they exist)
              let senderData = { displayName: 'Unknown User' };
              let receiverData = { displayName: 'Unknown User' };
              
              if (messageData.sender) {
                senderData = await fetchUserData(messageData.sender);
              }
              
              if (messageData.receiver) {
                receiverData = await fetchUserData(messageData.receiver);
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
              
              allMessages.push({
                id: messageDoc.id,
                chatroomId: chatroom.id,
                addID: messageData.addId || chatroom.addId || 'Unknown', // Use addId from message or chatroom
                text: messageData.text || '',
                sender: messageData.sender || 'Unknown',
                receiver: messageData.receiver || 'Unknown',
                senderName: senderData?.displayName || 'Unknown User',
                receiverName: receiverData?.displayName || 'Unknown User',
                isRead: Boolean(messageData.isRead),
                sentOn: sentDate,
                category: chatroom.category || 'Unknown',
                isFromCurrentUser: false // All messages shown are TO current user, so none are FROM current user
              });
            } catch (messageError) {
              console.warn('Error processing message:', messageError);
            }
          }
        } catch (chatroomError) {
          console.warn('Error fetching messages for chatroom:', chatroomError);
        }
      }
      
      console.log(`Total incoming messages found: ${allMessages.length}`);
      
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
  }, [userId, fetchUserData]);

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
        const matchesReceiverName = message.receiverName?.toLowerCase().includes(query) || false;
        const matchesText = message.text?.toLowerCase().includes(query) || false;
        
        return matchesAdId || matchesSenderName || matchesReceiverName || matchesText;
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

  // Format timestamp
  const formatTimestamp = useCallback((date) => {
    try {
      if (!date) return 'Unknown time';
      
      const validDate = date instanceof Date ? date : new Date(date);
      
      if (isNaN(validDate.getTime())) return 'Invalid date';
      
      return validDate.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.warn('Error formatting date:', error);
      return 'Invalid date';
    }
  }, []);

  // Handle message click - navigate to chat
  const handleMessageClick = useCallback((message) => {
    try {
      // Determine who the other participant is (not the current user)
      const otherParticipantId = message.sender === userId ? message.receiver : message.sender;
      const otherParticipantName = message.sender === userId ? message.receiverName : message.senderName;
      
      // Construct property data from message info
      const propertyData = {
        addId: message.addID,
        id: message.addID,
        title: `Property ${message.addID}`,
        type: message.category,
        category: message.category,
        location: 'Location not specified',
        price: 'Price on request',
        image: '/assets/placeholder-property.png'
      };
      
      // Construct contact info for the other participant
      const contactInfo = {
        name: otherParticipantName,
        receiverId: otherParticipantId,
        phone: 'Contact via chat'
      };
      
      // Navigate to chat component with state data
      navigate('/chat', {
        state: {
          propertyData: propertyData,
          contactInfo: contactInfo,
          currentUserId: userId,
          chatroomId: message.chatroomId,
          fromSearch: true
        }
      });
      
      console.log('Navigating to chat:', {
        chatroomId: message.chatroomId,
        addId: message.addID,
        otherParticipant: otherParticipantName
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
          
          {/* Debug info */}
          {(error === 'Please log in to view messages' || error === 'Checking authentication...') && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-3">
              <p className="text-yellow-800 text-xs mb-2">Debug Info:</p>
              <p className="text-yellow-700 text-xs">currentUserId prop: {currentUserId || 'not provided'}</p>
              <p className="text-yellow-700 text-xs">Firebase Auth user: {authUser?.uid || 'not logged in'}</p>
              <p className="text-yellow-700 text-xs">Auth loading: {authLoading ? 'yes' : 'no'}</p>
              <p className="text-yellow-700 text-xs">Final userId: {userId || 'not found'}</p>
              {!authUser && !authLoading && (
                <p className="text-red-600 text-xs mt-2">❌ No Firebase Auth user detected. Make sure user is logged in.</p>
              )}
            </div>
          )}
          
          <button 
            onClick={() => {
              setError(null);
              fetchUserChatrooms();
            }}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 mr-2"
          >
            Try Again
          </button>
          
          {/* Temporary bypass for testing */}
          {error === 'Please log in to view messages' && !authUser && (
            <button 
              onClick={() => {
                alert('Please log in through your app\'s authentication system (Google, email, etc.) to access messages. The SearchComponent now uses Firebase Auth instead of localStorage.');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
            >
              How to Fix This
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl p-5">
      {/* Debug info - remove in production */}
      {!authLoading && !userId && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
          <p className="text-yellow-800 text-sm">⚠️ No user ID detected.</p>
          <p className="text-yellow-700 text-xs mt-1">
            Firebase Auth user: {authUser?.uid || 'not logged in'}
          </p>
          <p className="text-yellow-700 text-xs">
            Make sure user is authenticated through Firebase Auth
          </p>
        </div>
      )}
      
      {authLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
          <p className="text-blue-800 text-sm">🔄 Checking authentication...</p>
        </div>
      )}
      
      <div className="text-[#8D8D8D] mb-2 text-lg font-medium">
        Search Your Incoming Messages By Ad Number Or Sender Name.
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by ad number, sender name, or message..."
          className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-4">
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-[#1544AB] text-white px-6 py-3 rounded-full text-sm font-medium uppercase disabled:opacity-50"
        >
          {loading ? 'Loading...' : `Search (${filteredMessages.length} results)`}
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
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="text-black text-lg font-semibold">
              {allMessages.length === 0 ? 'You have no incoming messages.' : 'No incoming messages match your search.'}
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div 
                key={`${message.chatroomId}-${message.id}`}
                onClick={() => handleMessageClick(message)}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
                        Ad ID: {message.addID}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {message.category}
                      </span>
                      {!message.isRead && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          New
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-1">
                      <span className="font-medium text-green-600">
                        {message.senderName} → You
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        (Incoming message)
                      </span>
                    </div>
                    
                    <p className="text-gray-800 text-sm line-clamp-2">
                      {message.text}
                    </p>
                  </div>
                  
                  <div className="text-xs text-gray-500 ml-4 flex flex-col items-end">
                    <span>{formatTimestamp(message.sentOn)}</span>
                    <span className="text-blue-500 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to reply →
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Chatroom: {message.chatroomId}</span>
                  <span className="text-green-600">
                    Received message
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Refresh Button */}
      {!loading && (
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