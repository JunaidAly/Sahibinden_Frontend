// // src/contexts/AuthContext.js
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { auth } from '../../firebase'; // Adjust path to your firebase config
// import { onAuthStateChanged } from 'firebase/auth';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     user,
//     loading,
//     isAuthenticated: !!user
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };









// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../../firebase'; // Adjust path to your firebase config
import { 
  initializeUserSessions, 
  addUserSession, 
  cleanupExpiredSessions 
} from '../Components/MyAccount/sessionManager'; // Adjust path accordingly

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get device and browser info
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    let deviceType = "Unknown Device";
    
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      if (/iPhone|iPad|iPod/i.test(userAgent)) deviceType = "iPhone/iPad";
      else if (/Android/i.test(userAgent)) deviceType = "Android Device";
      else deviceType = "Mobile Device";
    } else {
      if (userAgent.includes("Windows")) deviceType = "Windows";
      else if (userAgent.includes("Mac")) deviceType = "Mac";
      else if (userAgent.includes("Linux")) deviceType = "Linux";
      else deviceType = "Desktop";
    }
    
    return deviceType;
  };

  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;
    let browser = "Unknown Browser";
    
    if (userAgent.includes("Chrome")) browser = "Google Chrome";
    else if (userAgent.includes("Firefox")) browser = "Mozilla Firefox";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Edge")) browser = "Microsoft Edge";
    
    return browser;
  };

  // Create session data for current login
  const createSessionData = () => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id: sessionId,
      deviceType: getDeviceInfo(),
      browser: getBrowserInfo(),
      location: "Pakistan", // You can integrate geolocation API here
      lastLogin: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(',', ' -'),
      isActive: true,
      isCurrent: true,
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
  };

  // Sign in function with session tracking
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Initialize user document if it doesn't exist
      await initializeUserSessions(userCredential.user);
      
      // Create and add session for this login
      const sessionData = createSessionData();
      await addUserSession(userCredential.user.uid, sessionData);
      
      // Clean up expired sessions
      await cleanupExpiredSessions(userCredential.user.uid);
      
      console.log("User signed in and session tracked successfully");
      return userCredential;
      
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  // Sign up function with session tracking
  const signUp = async (email, password, additionalData = {}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Initialize user document with additional data
      await initializeUserSessions(userCredential.user, additionalData);
      
      // Create and add session for this signup
      const sessionData = createSessionData();
      await addUserSession(userCredential.user.uid, sessionData);
      
      console.log("User signed up and session tracked successfully");
      return userCredential;
      
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      
      // Clear any local storage
      localStorage.removeItem('user');
      sessionStorage.clear();
      
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        
        // Only add session if this is a new login (not just a page refresh)
        // You can add additional logic here to check if session already exists
        try {
          // Initialize user sessions if first time
          await initializeUserSessions(user);
          
          // You might want to add logic here to check if current session exists
          // and only create new session if it doesn't exist to avoid duplicate sessions on page refresh
          
        } catch (error) {
          console.error("Error initializing user sessions:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};