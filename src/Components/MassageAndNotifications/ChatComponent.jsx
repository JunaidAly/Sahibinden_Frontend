import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import NavMenuBar from '../NavMenuBar';

const ChatComponent = ({ 
  propertyData: propPropertyData,
  contactInfo: propContactInfo,
  initialMessages: propInitialMessages,
  onBack: propOnBack
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data from props or location state (for navigation)
  const stateData = location.state || {};
  
  const propertyData = propPropertyData || stateData.propertyData;
  const contactInfo = propContactInfo || stateData.contactInfo;
  const initialMessages = propInitialMessages || stateData.initialMessages || [];
  
  const onBack = propOnBack || (() => navigate('/massage-and-notifications'));
  
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        timestamp: new Date().toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isSender: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // If no data is provided, show a message or redirect
  if (!propertyData || !contactInfo) {
    return (
      <>
        <Navbar />
        <NavMenuBar />
        <div className="w-full max-w-5xl mx-auto shadow-custom-diagonal rounded-lg mb-10 mt-5 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">No Chat Data Available</h2>
          <p className="text-gray-600 mb-4">Unable to load chat information. Please try again.</p>
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
            <button className="flex items-center space-x-1 text-blue-600 border border-blue-600 px-3 py-1 rounded text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>Report</span>
            </button>
            <button className="flex items-center space-x-1 text-blue-600 border border-blue-600 px-3 py-1 rounded text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18 18M5.636 5.636L6 6" />
              </svg>
              <span>Block</span>
            </button>
            <button className="text-red-600 p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto">
          {messages.length === 0 ? (
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
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Send
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