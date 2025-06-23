

// src/components/auth/AuthModal.js
import React, { useState } from 'react';
import { auth, db } from '../../../firebase'; // Adjust path to your firebase config
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { FcGoogle } from 'react-icons/fc';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Device and browser detection for session tracking
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

  // Built-in session management (without external import)
  const addUserSessionWithProfile = async (userId, sessionData, firebaseUser = null) => {
    try {
      console.log('🔧 Adding session for user:', userId);
      console.log('📋 Session data:', sessionData);
      
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        let sessions = userData.sessions || [];
        
        console.log('📚 Existing sessions:', sessions.length);
        
        // Remove any existing current session (user switching devices)
        sessions = sessions.map(session => ({
          ...session,
          isCurrent: false
        }));
        
        // Add new current session
        sessions.push(sessionData);
        
        console.log('📝 Updating existing user document with session');
        
        // Update document - PRESERVE ALL EXISTING FIELDS
        await updateDoc(userDocRef, {
          sessions: sessions,
          lastLogin: sessionData.lastLogin,
          lastActiveAt: new Date().toISOString(),
          updatedAt: serverTimestamp()
        });
        
        console.log("✅ Session added successfully:", sessionData.id);
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

        console.log('📝 Creating new user document with profile and session data');

        // Create user document with session data AND profile data
        const completeUserData = {
          uid: userId,
          ...profileData, // Include profile data
          sessions: [sessionData],
          lastLogin: sessionData.lastLogin,
          lastActiveAt: new Date().toISOString(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        await setDoc(userDocRef, completeUserData);
        console.log("✅ User document created with session and profile data:", sessionData.id);
      }
    } catch (error) {
      console.error("❌ Error adding session with profile:", error);
      console.error("❌ Error details:", error.message);
      throw error;
    }
  };

  const createUserDocument = async (user) => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    
    try {
      // Check if user document already exists
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        // Extract first and last name from displayName
        const fullName = user.displayName || '';
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

        // Create new user document with your specified fields
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          firstName: firstName,
          lastName: lastName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          signUpMethod: 'google',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        await setDoc(userDocRef, userData);
        console.log('✅ New user document created successfully');
        console.log('🎉 Welcome new user:', user.displayName || user.email);
        
      } else {
        // Extract first and last name from displayName for existing users too
        const fullName = user.displayName || '';
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

        // Update existing user's information
        await setDoc(userDocRef, {
          updatedAt: serverTimestamp(),
          // Update any changed profile info
          displayName: user.displayName,
          firstName: firstName,
          lastName: lastName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified
        }, { merge: true });
        
        console.log('✅ Existing user login updated');
      }
      
    } catch (error) {
      console.error('❌ Error creating/updating user document:', error);
      // Don't throw error - let sign-in succeed even if Firestore fails
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    const provider = new GoogleAuthProvider();
    
    // Add additional scopes
    provider.addScope('email');
    provider.addScope('profile');
    
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('🔐 Google sign-in successful:', result.user.email);
      
      // Create or update user document in Firestore
      await createUserDocument(result.user);
      
      // Add session tracking for Google sign-in from modal
      console.log('🚀 Starting session creation...');
      const sessionData = createSessionData();
      console.log('📋 Created session data:', sessionData);
      
      try {
        await addUserSessionWithProfile(result.user.uid, sessionData, result.user);
        console.log('✅ Session added successfully!');
      } catch (sessionError) {
        console.error('❌ Session creation failed:', sessionError);
        // Continue with sign-in even if session fails
      }
      
      console.log('🎉 Sign-in complete with session tracking! Welcome,', result.user.displayName || result.user.email);
      onAuthSuccess();
      
    } catch (error) {
      console.error('❌ Google sign-in error:', error);
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign-in was cancelled');
          break;
        case 'auth/popup-blocked':
          setError('Popup was blocked. Please allow popups and try again');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your connection.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later.');
          break;
        default:
          setError('Google sign-in failed. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>

        {/* Modal content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sign in to continue
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to perform this action
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700">
              {loading ? 'Signing in...' : 'Continue with Google'}
            </span>
          </button>

          <p className="text-xs text-gray-500 mt-4">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;