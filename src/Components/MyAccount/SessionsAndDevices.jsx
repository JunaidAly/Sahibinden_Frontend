import React, { useState, useEffect, useRef } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { doc, onSnapshot, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Adjust path to your Firebase config
import { useAuth } from "../../contexts/AuthContext"; // Use your existing AuthContext
import { 
  removeUserSession, 
  removeAllOtherSessions 
} from "../MyAccount/sessionManager"; // Import session manager functions

function SessionsAndDevices() {
  const { user: currentUser } = useAuth(); // Use your existing AuthContext
  const [userProfile, setUserProfile] = useState(null);
  const [activeDevice, setActiveDevice] = useState(null);
  const [otherDevices, setOtherDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDevices, setExpandedDevices] = useState({});
  
  // Add refs to prevent multiple session creations
  const sessionInitialized = useRef(false);
  const sessionCreating = useRef(false);

  // Helper function to detect device type
  const getDeviceType = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    // More specific mobile detection
    if (/android/.test(userAgent) && /mobile/.test(userAgent)) {
      return "Android Phone";
    }
    if (/android/.test(userAgent) && !(/mobile/.test(userAgent))) {
      return "Android Tablet";
    }
    if (/iphone/.test(userAgent)) {
      return "iPhone";
    }
    if (/ipad/.test(userAgent)) {
      return "iPad";
    }
    if (/tablet/.test(userAgent)) {
      return "Tablet";
    }
    
    // Desktop detection
    if (/windows/.test(userAgent)) {
      return "Windows Desktop";
    }
    if (/macintosh|mac os x/.test(userAgent)) {
      return "Mac Desktop";
    }
    if (/linux/.test(userAgent) && !/android/.test(userAgent)) {
      return "Linux Desktop";
    }
    
    return "Desktop";
  };

  // Helper function to detect browser
  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Edg")) return "Microsoft Edge";
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) return "Google Chrome";
    if (userAgent.includes("Firefox")) return "Mozilla Firefox";
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
    if (userAgent.includes("Opera")) return "Opera";
    return "Unknown Browser";
  };

  // Helper function to get user location
  const getLocation = async () => {
    try {
      // First try IP-based geolocation (no permission required)
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        return `${data.city || 'Unknown'}, ${data.region || 'Unknown'}, ${data.country_name || 'Unknown'}`;
      }
    } catch (error) {
      console.log("IP geolocation failed:", error);
    }

    // Fallback: Try browser geolocation (requires permission)
    return new Promise((resolve) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              // Reverse geocoding to get readable location
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
              );
              if (response.ok) {
                const data = await response.json();
                resolve(`${data.locality || data.city}, ${data.principalSubdivision}, ${data.countryName}`);
              } else {
                resolve(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`);
              }
            } catch (error) {
              resolve(`Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)}`);
            }
          },
          (error) => {
            console.log("Geolocation error:", error);
            resolve("Location Access Denied");
          },
          { timeout: 10000, enableHighAccuracy: false }
        );
      } else {
        resolve("Geolocation Not Supported");
      }
    });
  };

  // Function to initialize user sessions document
  const initializeUserSessions = async (user) => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          sessions: [],
          createdAt: new Date().toISOString()
        });
        console.log("✅ User document created");
      }
    } catch (error) {
      console.error("❌ Error initializing user sessions:", error);
      throw error;
    }
  };

  // Function to create current session object
  const createCurrentSession = async () => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const location = await getLocation();
    
    return {
      id: sessionId,
      deviceType: getDeviceType(),
      browser: getBrowserName(),
      location: location,
      lastLogin: new Date().toLocaleString(),
      lastActiveAt: new Date().toISOString(),
      isCurrent: true,
      createdAt: new Date().toISOString()
    };
  };

  // Helper function to check if two sessions are from the same device/browser
  const isSameDeviceBrowser = (session1, session2) => {
    return session1.deviceType === session2.deviceType && 
           session1.browser === session2.browser;
  };

  // Improved function to add or update user session
  const addOrUpdateUserSession = async (userId, newSessionData) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      
      // Get current user document
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        let updatedSessions = [];
        
        if (userData.sessions && userData.sessions.length > 0) {
          // Check if a session with the same device/browser already exists
          const existingSessionIndex = userData.sessions.findIndex(session => 
            isSameDeviceBrowser(session, newSessionData)
          );
          
          if (existingSessionIndex !== -1) {
            // Update the existing session instead of creating a new one
            console.log("✅ Updating existing session for same device/browser");
            updatedSessions = userData.sessions.map((session, index) => {
              if (index === existingSessionIndex) {
                return {
                  ...session,
                  lastLogin: newSessionData.lastLogin,
                  lastActiveAt: newSessionData.lastActiveAt,
                  location: newSessionData.location,
                  isCurrent: true
                };
              } else {
                return {
                  ...session,
                  isCurrent: false
                };
              }
            });
          } else {
            // No existing session for this device/browser, create new one
            console.log("✅ Creating new session for different device/browser");
            updatedSessions = userData.sessions.map(session => ({
              ...session,
              isCurrent: false
            }));
            updatedSessions.push(newSessionData);
          }
        } else {
          // No existing sessions, create first one
          updatedSessions = [newSessionData];
        }
        
        await updateDoc(userDocRef, {
          sessions: updatedSessions
        });
      } else {
        // No existing document, create with new session
        await updateDoc(userDocRef, {
          sessions: [newSessionData]
        });
      }
      console.log("✅ Session added/updated successfully");
    } catch (error) {
      console.error("❌ Error adding/updating user session:", error);
      throw error;
    }
  };

  // Function to clean up duplicate sessions
  const cleanupDuplicateSessions = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.sessions && userData.sessions.length > 0) {
          // Group sessions by device/browser combination
          const sessionGroups = new Map();
          
          userData.sessions.forEach(session => {
            const key = `${session.deviceType}-${session.browser}`;
            if (!sessionGroups.has(key)) {
              sessionGroups.set(key, []);
            }
            sessionGroups.get(key).push(session);
          });
          
          // Keep only the most recent session for each device/browser combination
          const cleanedSessions = [];
          sessionGroups.forEach(sessions => {
            if (sessions.length > 1) {
              // Sort by creation date and keep the most recent
              sessions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              cleanedSessions.push(sessions[0]);
              console.log(`🧹 Removed ${sessions.length - 1} duplicate sessions for ${sessions[0].deviceType}-${sessions[0].browser}`);
            } else {
              cleanedSessions.push(sessions[0]);
            }
          });
          
          if (cleanedSessions.length !== userData.sessions.length) {
            await updateDoc(userDocRef, {
              sessions: cleanedSessions
            });
            console.log("✅ Duplicate sessions cleaned up");
          }
        }
      }
    } catch (error) {
      console.error("❌ Error cleaning up duplicate sessions:", error);
    }
  };

  const getDeviceIcon = (deviceType) => {
    if (deviceType?.toLowerCase().includes('smartphone') || deviceType?.toLowerCase().includes('mobile')) {
      return "/assets/smartphone.png";
    }
    return "/assets/desktop.png";
  };

  const getBrowserIcon = (browser) => {
    const browserLower = browser?.toLowerCase() || '';
    
    if (browserLower.includes('chrome') && !browserLower.includes('edge')) {
      return "/assets/chrome.png";
    }
    if (browserLower.includes('firefox') || browserLower.includes('mozilla')) {
      return "/assets/firefox.png";
    }
    if (browserLower.includes('safari') && !browserLower.includes('chrome')) {
      return "/assets/safari.png";
    }
    if (browserLower.includes('edge') || browserLower.includes('edg')) {
      return "/assets/edge.png";
    }
    if (browserLower.includes('opera')) {
      return "/assets/opera.png";
    }
    if (browserLower.includes('mobile')) {
      return (
        <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-sm font-bold">
          M
        </div>
      );
    }
    
    // Default browser icon
    return "/assets/browser.png";
  };

  const toggleDeviceExpanded = (deviceId) => {
    setExpandedDevices(prev => ({
      ...prev,
      [deviceId]: !prev[deviceId]
    }));
  };

  // Fetch user data and sessions from Firebase
  useEffect(() => {
    if (currentUser) {
      const initializeCurrentSession = async () => {
        try {
          // Prevent multiple initializations
          if (sessionInitialized.current || sessionCreating.current) {
            console.log("🔄 Session already initialized or being created, skipping...");
            return;
          }
          
          sessionCreating.current = true;
          console.log("🔄 Initializing session for user:", currentUser.email);
          
          // Initialize user document if it doesn't exist
          await initializeUserSessions(currentUser);
          console.log("✅ User sessions initialized");
          
          // Clean up any duplicate sessions first
          await cleanupDuplicateSessions(currentUser.uid);
          
          // Check if current session exists, if not create one
          const userDocRef = doc(db, 'users', currentUser.uid);
          const unsubscribeDoc = onSnapshot(userDocRef, async (docSnapshot) => {
            try {
              if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                console.log("📄 User data retrieved:", userData);
                setUserProfile(userData);
                
                if (userData.sessions && userData.sessions.length > 0) {
                  console.log("📱 Found existing sessions:", userData.sessions.length);
                  
                  // Look for current session
                  const currentSessionData = userData.sessions.find(session => session.isCurrent);
                  const otherSessionsData = userData.sessions.filter(session => !session.isCurrent);
                  
                  console.log("🟢 Current session:", currentSessionData);
                  console.log("📱 Other sessions:", otherSessionsData.length);
                  
                  // Check if current browser/device matches the existing current session
                  const currentBrowser = getBrowserName();
                  const currentDeviceType = getDeviceType();
                  
                  const isCurrentDeviceBrowser = currentSessionData && 
                    currentSessionData.browser === currentBrowser && 
                    currentSessionData.deviceType === currentDeviceType;
                  
                  if (!currentSessionData || !isCurrentDeviceBrowser) {
                    // Only create a new session if we're not already creating one
                    if (!sessionCreating.current || !sessionInitialized.current) {
                      console.log("🆕 Creating new current session for different browser/device...");
                      const newCurrentSession = await createCurrentSession();
                      await addOrUpdateUserSession(currentUser.uid, newCurrentSession);
                      setActiveDevice(newCurrentSession);
                      sessionInitialized.current = true;
                    }
                  } else {
                    console.log("✅ Using existing current session for same browser/device");
                    setActiveDevice(currentSessionData);
                    sessionInitialized.current = true;
                  }
                  
                  setOtherDevices(otherSessionsData);
                } else {
                  console.log("🆕 No sessions exist, creating first session...");
                  if (!sessionInitialized.current) {
                    const newCurrentSession = await createCurrentSession();
                    await addOrUpdateUserSession(currentUser.uid, newCurrentSession);
                    setActiveDevice(newCurrentSession);
                    setOtherDevices([]);
                    sessionInitialized.current = true;
                  }
                }
              } else {
                console.log("🆕 Document doesn't exist, creating user and session...");
                if (!sessionInitialized.current) {
                  await initializeUserSessions(currentUser);
                  const newCurrentSession = await createCurrentSession();
                  await addOrUpdateUserSession(currentUser.uid, newCurrentSession);
                  setActiveDevice(newCurrentSession);
                  setOtherDevices([]);
                  sessionInitialized.current = true;
                }
              }
              setLoading(false);
              sessionCreating.current = false;
            } catch (innerError) {
              console.error("❌ Error in onSnapshot callback:", innerError);
              setLoading(false);
              sessionCreating.current = false;
            }
          });
          
          return () => {
            unsubscribeDoc();
            sessionInitialized.current = false;
            sessionCreating.current = false;
          };
        } catch (error) {
          console.error("❌ Error initializing current session:", error);
          setLoading(false);
          sessionCreating.current = false;
        }
      };

      initializeCurrentSession();
    } else {
      // User not logged in
      console.log("👤 No user logged in");
      setUserProfile(null);
      setActiveDevice(null);
      setOtherDevices([]);
      setLoading(false);
      sessionInitialized.current = false;
      sessionCreating.current = false;
    }
  }, [currentUser]);

  const handleCloseSession = async (deviceId) => {
    if (window.confirm("Are you sure you want to close this session? You will need to log in again on this device.")) {
      try {
        if (currentUser) {
          // Use session manager function
          await removeUserSession(currentUser.uid, deviceId);
          console.log(`Session closed for device: ${deviceId}`);
        }
      } catch (error) {
        console.error("Error closing session:", error);
        alert("Error closing session. Please try again.");
      }
    }
  };

  const handleForgetDevice = async (deviceId) => {
    if (window.confirm("Are you sure you want to forget this device? It will no longer be trusted.")) {
      try {
        if (currentUser) {
          // Use session manager function to remove session
          await removeUserSession(currentUser.uid, deviceId);
          console.log(`Device forgotten: ${deviceId}`);
        }
      } catch (error) {
        console.error("Error forgetting device:", error);
        alert("Error forgetting device. Please try again.");
      }
    }
  };

  const handleCloseAllSessions = async () => {
    if (window.confirm("Are you sure you want to close all other sessions? You will need to log in again on those devices.")) {
      try {
        if (currentUser) {
          // Use session manager function
          await removeAllOtherSessions(currentUser.uid);
          console.log("All other sessions closed");
        }
      } catch (error) {
        console.error("Error closing all sessions:", error);
        alert("Error closing sessions. Please try again.");
      }
    }
  };

  const handleForgetAllDevices = async () => {
    if (window.confirm("Are you sure you want to forget all devices? They will no longer be trusted.")) {
      try {
        if (currentUser) {
          // Use session manager function to remove all other sessions
          await removeAllOtherSessions(currentUser.uid);
          console.log("All devices forgotten");
        }
      } catch (error) {
        console.error("Error forgetting all devices:", error);
        alert("Error forgetting devices. Please try again.");
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl w-full mx-auto font-poppins">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading sessions...</div>
        </div>
      </div>
    );
  }

  // Not logged in state
  if (!currentUser) {
    return (
      <div className="max-w-4xl w-full mx-auto font-poppins">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Please log in to view your sessions</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">
        Active Sessions and Trusted Devices
      </h1>
      
      <div className="shadow-custom-right rounded-lg w-full p-6 mt-5">
        <p className="text-base text-gray-700 mb-6">
          All sessions you have opened with <span className="font-medium text-black">{currentUser?.email}</span> are listed 
          below. For your security, we recommend that you close open sessions on 
          devices you are not currently using.
        </p>

        {/* My Active Device */}
        {activeDevice && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-black mb-4">My Active Device</h2>
            
            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8 flex-1">
                  {/* Device Type */}
                  <div className="flex items-center space-x-3">
                    <img 
                      src={getDeviceIcon(activeDevice.deviceType)} 
                      alt="Device" 
                      className="w-8 h-8" 
                    />
                    <span className="text-base font-medium text-gray-900">
                      {activeDevice.deviceType}
                    </span>
                  </div>

                  {/* Browser */}
                  <div className="flex items-center space-x-3">
                    {typeof getBrowserIcon(activeDevice.browser) === 'string' ? (
                      <img 
                        src={getBrowserIcon(activeDevice.browser)} 
                        alt="Browser" 
                        className="w-8 h-8" 
                      />
                    ) : (
                      getBrowserIcon(activeDevice.browser)
                    )}
                    <span className="text-base font-medium text-gray-900">
                      {activeDevice.browser}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-3">
                    <span className="text-base font-medium text-gray-900">
                      {activeDevice.location}
                    </span>
                  </div>
                </div>

                {/* Active indicator */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              </div>

              {/* Last login time */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Last login date and time:</span>
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {activeDevice.lastLogin}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* My Other Devices */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-black mb-4">My Other Devices</h2>
          
          {otherDevices.length === 0 ? (
            <div className="bg-gray-50 border rounded-lg p-4 text-center">
              <p className="text-gray-600">No other devices found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {otherDevices.map((device) => (
                <div key={device.id} className="bg-gray-50 border rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-8 flex-1">
                        {/* Device Type */}
                        <div className="flex items-center space-x-3">
                          <img 
                            src={getDeviceIcon(device.deviceType)} 
                            alt="Device" 
                            className="w-8 h-8" 
                          />
                          <span className="text-base font-medium text-gray-900">
                            {device.deviceType}
                          </span>
                        </div>

                        {/* Browser */}
                        <div className="flex items-center space-x-3">
                          {typeof getBrowserIcon(device.browser) === 'string' ? (
                            <img 
                              src={getBrowserIcon(device.browser)} 
                              alt="Browser" 
                              className="w-8 h-8" 
                            />
                          ) : (
                            getBrowserIcon(device.browser)
                          )}
                          <span className="text-base font-medium text-gray-900">
                            {device.browser}
                          </span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center space-x-3">
                          <span className="text-base font-medium text-gray-900">
                            {device.location}
                          </span>
                        </div>
                      </div>

                      {/* Expand/Collapse button */}
                      <button
                        onClick={() => toggleDeviceExpanded(device.id)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        {expandedDevices[device.id] ? (
                          <ChevronUpIcon className="w-5 h-5" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Expanded content */}
                    {expandedDevices[device.id] && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Last login:</span> {device.lastLogin}
                            </p>
                            {device.lastActiveAt && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Last active:</span> {new Date(device.lastActiveAt).toLocaleString()}
                              </p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleCloseSession(device.id)}
                              className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
                            >
                              Close Session
                            </button>
                            <button
                              onClick={() => handleForgetDevice(device.id)}
                              className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                            >
                              Forget Device
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {otherDevices.length > 0 && (
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleCloseAllSessions}
              className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
            >
              Close Sessions
            </button>
            <button
              onClick={handleForgetAllDevices}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
              Forget Devices
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SessionsAndDevices;