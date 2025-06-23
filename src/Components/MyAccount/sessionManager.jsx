

// src/Components/MyAccount/sessionManager.js - Place this file to match your import path
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Correct path: Components/MyAccount -> src -> firebase

/**
 * Initialize user document with session tracking
 * Call this when user signs up or first logs in
 */
export const initializeUserSessions = async (user, additionalData = {}) => {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    
    // Check if user document exists
    const userDoc = await getDoc(userDocRef);
    
    const baseUserData = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName || additionalData.displayName || '',
      firstName: additionalData.firstName || '',
      lastName: additionalData.lastName || '',
      photoURL: user.photoURL || additionalData.photoURL || '',
      signUpMethod: additionalData.signUpMethod || 'email',
      sessions: [], // Array to store active sessions
      trustedDevices: [], // Array to store trusted devices
      lastLogin: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(',', ' -'),
      lastActiveAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(userDocRef, {
        ...baseUserData,
        createdAt: new Date().toISOString()
      });
      console.log("User document created successfully");
    } else {
      // Update existing user document
      await updateDoc(userDocRef, {
        lastLogin: baseUserData.lastLogin,
        lastActiveAt: baseUserData.lastActiveAt,
        updatedAt: baseUserData.updatedAt
      });
      console.log("User document updated successfully");
    }

    return userDocRef;
  } catch (error) {
    console.error("Error initializing user sessions:", error);
    throw error;
  }
};

/**
 * Add a new session when user logs in from a device
 * FIXED: Now preserves user profile data when document doesn't exist
 */
export const addUserSession = async (userId, sessionData, userProfileData = null) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      let sessions = userData.sessions || [];
      
      // Remove any existing current session (user switching devices)
      sessions = sessions.map(session => ({
        ...session,
        isCurrent: false
      }));
      
      // Add new current session
      sessions.push(sessionData);
      
      // Update document - PRESERVE ALL EXISTING FIELDS
      await updateDoc(userDocRef, {
        sessions: sessions,
        lastLogin: sessionData.lastLogin,
        lastActiveAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      console.log("Session added successfully:", sessionData.id);
    } else {
      console.warn("⚠️ User document doesn't exist, creating minimal document. Profile data might be missing!");
      
      // Create user document with session data AND preserve profile data if provided
      const minimalUserData = {
        uid: userId,
        sessions: [sessionData],
        lastLogin: sessionData.lastLogin,
        lastActiveAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // If userProfileData is provided, merge it
      if (userProfileData) {
        Object.assign(minimalUserData, userProfileData);
      }

      await setDoc(userDocRef, minimalUserData);
      console.log("User document created with session:", sessionData.id);
    }
  } catch (error) {
    console.error("Error adding session:", error);
    throw error;
  }
};

/**
 * ENHANCED: Add session with user profile data preservation
 * Use this when you have access to the Firebase user object
 */
export const addUserSessionWithProfile = async (userId, sessionData, firebaseUser = null) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      let sessions = userData.sessions || [];
      
      // Remove any existing current session (user switching devices)
      sessions = sessions.map(session => ({
        ...session,
        isCurrent: false
      }));
      
      // Add new current session
      sessions.push(sessionData);
      
      // Update document - PRESERVE ALL EXISTING FIELDS
      await updateDoc(userDocRef, {
        sessions: sessions,
        lastLogin: sessionData.lastLogin,
        lastActiveAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      console.log("Session added successfully:", sessionData.id);
    } else {
      console.log("🔧 User document doesn't exist, creating with profile data from Firebase user");
      
      // Extract profile data from Firebase user if available
      let profileData = {};
      if (firebaseUser) {
        const fullName = firebaseUser.displayName || '';
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

        profileData = {
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          firstName: firstName,
          lastName: lastName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          signUpMethod: 'google' // Assume Google if we're creating from session
        };
      }

      // Create user document with session data AND profile data
      const completeUserData = {
        uid: userId,
        ...profileData, // Include profile data
        sessions: [sessionData],
        lastLogin: sessionData.lastLogin,
        lastActiveAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await setDoc(userDocRef, completeUserData);
      console.log("✅ User document created with session and profile data:", sessionData.id);
    }
  } catch (error) {
    console.error("Error adding session with profile:", error);
    throw error;
  }
};

/**
 * Remove a specific session
 */
export const removeUserSession = async (userId, sessionId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const sessions = userData.sessions || [];
      
      // Filter out the session to remove
      const updatedSessions = sessions.filter(session => session.id !== sessionId);
      
      await updateDoc(userDocRef, {
        sessions: updatedSessions
      });
      
      console.log(`Session ${sessionId} removed successfully`);
    }
  } catch (error) {
    console.error("Error removing session:", error);
    throw error;
  }
};

/**
 * Remove all sessions except current
 */
export const removeAllOtherSessions = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const sessions = userData.sessions || [];
      
      // Keep only current session
      const currentSession = sessions.find(session => session.isCurrent);
      const newSessions = currentSession ? [currentSession] : [];
      
      await updateDoc(userDocRef, {
        sessions: newSessions
      });
      
      console.log("All other sessions removed successfully");
    }
  } catch (error) {
    console.error("Error removing all sessions:", error);
    throw error;
  }
};

/**
 * Clean up expired sessions (call this periodically)
 */
export const cleanupExpiredSessions = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const sessions = userData.sessions || [];
      
      // Remove sessions older than 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const activeSessions = sessions.filter(session => {
        const sessionDate = new Date(session.lastActiveAt || session.createdAt);
        return sessionDate > thirtyDaysAgo;
      });
      
      if (activeSessions.length !== sessions.length) {
        await updateDoc(userDocRef, {
          sessions: activeSessions
        });
        console.log(`Cleaned up ${sessions.length - activeSessions.length} expired sessions`);
      }
    }
  } catch (error) {
    console.error("Error cleaning up sessions:", error);
  }
};

/**
 * Update session last active time
 */
export const updateSessionActivity = async (userId, sessionId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const sessions = userData.sessions || [];
      
      // Update the specific session's last active time
      const updatedSessions = sessions.map(session => {
        if (session.id === sessionId) {
          return {
            ...session,
            lastActiveAt: new Date().toISOString()
          };
        }
        return session;
      });
      
      await updateDoc(userDocRef, {
        sessions: updatedSessions,
        lastActiveAt: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error("Error updating session activity:", error);
  }
};

/**
 * Get user's current active session (Additional useful function)
 */
export const getCurrentUserSession = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const sessions = userData.sessions || [];
      
      return sessions.find(session => session.isCurrent);
    }
    
    return null;
  } catch (error) {
    console.error("Error getting current session:", error);
    return null;
  }
};