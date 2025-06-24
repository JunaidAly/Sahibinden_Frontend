

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  doc, 
  collection, 
  addDoc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  orderBy, 
  query, 
  serverTimestamp,
  updateDoc 
} from 'firebase/firestore';
import { db } from '../../../firebase';
import Navbar from '../Navbar';
import Footer from '../Footer';
import NavMenuBar from '../NavMenuBar';

const ChatComponent = ({ 
  propertyData: propPropertyData,
  contactInfo: propContactInfo,
  initialMessages: propInitialMessages,
  onBack: propOnBack,
  currentUserId
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const stateData = location.state || {};
  
  const propertyData = propPropertyData || stateData.propertyData;
  const contactInfo = propContactInfo || stateData.contactInfo;
  const initialMessages = propInitialMessages || stateData.initialMessages || [];
  
  const onBack = propOnBack || (() => navigate('/massage-and-notifications'));
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [chatroomId, setChatroomId] = useState(null);
  const [error, setError] = useState(null);
  const [chatroomCreated, setChatroomCreated] = useState(false);

  // Get user ID from multiple sources
  const userId = currentUserId || 
                 stateData.currentUserId || 
                 localStorage.getItem('userId') || 
                 sessionStorage.getItem('currentUserId') ||
                 'temp_user_' + Date.now();

  const generateChatroomId = (addId, userId) => {
    return `${addId}+${userId}`;
  };

  // Enhanced chatroom creation with better error handling
  const createOrGetChatroom = async () => {
    try {
      if (!propertyData?.addId && !propertyData?.id) {
        throw new Error('Missing property ID');
      }
      
      const addId = propertyData.addId || propertyData.id;
      const roomId = generateChatroomId(addId, userId);
      
      setChatroomId(roomId);

      const chatroomRef = doc(db, 'chatrooms', roomId);
      const chatroomSnap = await getDoc(chatroomRef);

      if (!chatroomSnap.exists()) {
        const chatroomData = {
          addID: addId,
          category: propertyData.type || propertyData.category || 'Real Estate',
          lastMessage: '',
          participants: {
            [userId]: true,
            [contactInfo?.receiverId || 'unknown_receiver']: true
          },
          sentOn: serverTimestamp()
        };
        
        await setDoc(chatroomRef, chatroomData);
        
        // Verify chatroom was created
        const verifySnap = await getDoc(chatroomRef);
        if (verifySnap.exists()) {
          setChatroomCreated(true);
        } else {
          throw new Error('Failed to create chatroom document');
        }
      } else {
        setChatroomCreated(true);
      }
      
      return roomId;
    } catch (error) {
      setError('Failed to create chatroom: ' + error.message);
      setLoading(false);
      return null;
    }
  };

  // Enhanced message sending with better error handling
  const sendMessageToFirebase = async (messageText) => {
    if (!chatroomId || !messageText.trim()) {
      return;
    }

    if (!chatroomCreated) {
      setError('Chatroom not ready. Please try again.');
      return;
    }

    try {
      // First, verify chatroom exists
      const chatroomRef = doc(db, 'chatrooms', chatroomId);
      const chatroomSnap = await getDoc(chatroomRef);
      
      if (!chatroomSnap.exists()) {
        await createOrGetChatroom();
        // Try again after recreating
        return sendMessageToFirebase(messageText);
      }

      // Add message to messages subcollection
      const messagesRef = collection(db, 'chatrooms', chatroomId, 'messages');
      const messageData = {
        addID: propertyData.addId || propertyData.id,
        isRead: false,
        receiver: contactInfo?.receiverId || 'unknown_receiver',
        sender: userId,
        sentOn: serverTimestamp(),
        text: messageText.trim()
      };

      await addDoc(messagesRef, messageData);

      // Update chatroom with last message
      await updateDoc(chatroomRef, {
        lastMessage: messageText.trim(),
        sentOn: serverTimestamp()
      });

    } catch (error) {
      setError('Failed to send message: ' + error.message);
      
      // If update failed, try to recreate chatroom
      if (error.message.includes('No document to update')) {
        setChatroomCreated(false);
        await createOrGetChatroom();
      }
    }
  };

  // Listen to messages with better error handling
  useEffect(() => {
    if (!chatroomId || !chatroomCreated) return;

    const messagesRef = collection(db, 'chatrooms', chatroomId, 'messages');
    const q = query(messagesRef, orderBy('sentOn', 'asc'));

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const messagesData = [];
        
        snapshot.forEach((doc) => {
          const data = doc.data();
          messagesData.push({
            id: doc.id,
            text: data.text,
            timestamp: data.sentOn?.toDate ? data.sentOn.toDate().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : 'Sending...',
            isSender: data.sender === userId,
            isRead: data.isRead,
            sender: data.sender,
            receiver: data.receiver
          });
        });
        
        setMessages(messagesData);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError('Failed to load messages: ' + error.message);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [chatroomId, userId, chatroomCreated]);

  // Initialize chatroom with timeout and retry logic
  useEffect(() => {
    if (propertyData && contactInfo && userId) {
      const initializeChat = async () => {
        try {
          await createOrGetChatroom();
        } catch (error) {
          setError('Failed to initialize chat: ' + error.message);
          setLoading(false);
        }
      };

      const timeoutId = setTimeout(() => {
        if (loading && !chatroomCreated) {
          setError('Connection timeout. Please check your internet connection.');
          setLoading(false);
        }
      }, 15000);

      initializeChat().then(() => {
        clearTimeout(timeoutId);
      });

      return () => clearTimeout(timeoutId);
    } else {
      setLoading(false);
    }
  }, [propertyData, contactInfo, userId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessageToFirebase(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleReport = () => {
    // Add your report functionality here
    alert('Report functionality will be implemented');
  };

  const handleBlock = () => {
    // Add your block functionality here
    alert('Block functionality will be implemented');
  };

  // Error state
  if (error) {
    return (
      <>
        <Navbar />
        <NavMenuBar />
        <div className="w-full max-w-5xl mx-auto shadow-custom-diagonal rounded-lg mb-10 mt-5 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Chat Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="text-left bg-gray-100 p-4 rounded mb-4 text-sm">
            <p><strong>Debug Info:</strong></p>
            <p>Property Data: {propertyData ? '✓' : '✗'}</p>
            <p>Contact Info: {contactInfo ? '✓' : '✗'}</p>
            <p>User ID: {userId}</p>
            <p>Property AddID: {propertyData?.addId || 'Missing'}</p>
            <p>Chatroom ID: {chatroomId || 'Not set'}</p>
            <p>Chatroom Created: {chatroomCreated ? '✓' : '✗'}</p>
          </div>
          <div className="space-y-2">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors mr-2"
            >
              Retry
            </button>
            <button 
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // No data state
  if (!propertyData || !contactInfo) {
    return (
      <>
        <Navbar />
        <NavMenuBar />
        <div className="w-full max-w-5xl mx-auto shadow-custom-diagonal rounded-lg mb-10 mt-5 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">No Chat Data Available</h2>
          <p className="text-gray-600 mb-4">Unable to load chat information. Please try again.</p>
          <div className="text-left bg-gray-100 p-4 rounded mb-4 text-sm">
            <p><strong>Debug Info:</strong></p>
            <p>Property Data: {propertyData ? '✓' : '✗'}</p>
            <p>Contact Info: {contactInfo ? '✓' : '✗'}</p>
            <p>User ID: {userId}</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Go Home
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <NavMenuBar />
      <div className="w-full max-w-5xl mx-auto shadow-custom-diagonal rounded-lg mb-10 mt-5 bg-white">
        {/* Back Button */}
        {onBack && (
          <div className="p-4 border-b">
            <button 
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>
        )}

        {/* Property Listing Header */}
        <div className="border border-gray-200 rounded-lg m-4 p-4">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={propertyData.image || '/assets/placeholder-property.png'} 
                alt="Property" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/assets/placeholder-property.png";
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-blue-600 font-medium text-sm mb-1">
                {propertyData.title || 'Property Title'}
              </h3>
              <p className="text-gray-600 text-xs mb-1">{propertyData.type || 'Property Type'}</p>
              <p className="text-gray-500 text-xs">{propertyData.location || 'Location'}</p>
            </div>
            <div className="text-red-600 font-bold text-lg">
              {propertyData.price || 'Price'}
            </div>
          </div>
        </div>

        {/* Contact Info and Actions */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-sm">
                {contactInfo.name ? contactInfo.name.split(' ').map(n => n[0]).join('') : 'U'}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{contactInfo.name || 'Contact Name'}</h4>
              <p className="text-gray-600 text-sm bg-gray-100 px-2 py-1 rounded">
                {contactInfo.phone || 'Phone not available'}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {/* Report Button with Icon */}
            <button 
              onClick={handleReport}
              className="flex items-center space-x-2 text-blue-600 border border-blue-600 px-3 py-2 rounded text-sm hover:bg-blue-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>Report</span>
            </button>

            {/* Block Button with Icon */}
            <button 
              onClick={handleBlock}
              className="flex items-center space-x-2 text-red-600 border border-red-600 px-3 py-2 rounded text-sm hover:bg-red-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18 18M5.636 5.636L6 6" />
              </svg>
              <span>Block</span>
            </button>

            {/* Delete/More Options Button */}
            <button className="text-gray-600 hover:text-red-600 p-2 rounded hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full flex-col">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
              <p className="text-gray-500 text-sm">
                {chatroomCreated ? 'Loading messages...' : 'Setting up chat...'}
              </p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500 text-sm">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.isSender 
                    ? 'bg-green-100 text-gray-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                  {message.isSender && (
                    <div className="flex justify-end mt-1">
                      <svg 
                        className={`w-4 h-4 ${message.isRead ? 'text-blue-500' : 'text-gray-400'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write your message here"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading || !chatroomCreated}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !newMessage.trim() || !chatroomCreated}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Send</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Information on the processing of personal data
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChatComponent;