// src/components/ui/AuthBanner.jsx
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { auth, db } from '../../../../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { FcGoogle } from 'react-icons/fc';

const AuthBanner = () => {
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);

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
        
        // You can also trigger a welcome email or other onboarding actions here
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
    const provider = new GoogleAuthProvider();
    
    // Add additional scopes if needed
    provider.addScope('email');
    provider.addScope('profile');
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      console.log('🔐 Google sign-in successful:', user.email);
      
      // Create or update user document in Firestore
      await createUserDocument(user);
      
      // Hide banner after successful sign-in
      setIsVisible(false);
      
      // Show success message (optional)
      // You could show a toast notification here
      console.log('🎉 Sign-in complete! Welcome,', user.displayName || user.email);
      
    } catch (error) {
      console.error('❌ Google sign-in error:', error);
      
      // Handle specific error cases
      let errorMessage = 'Sign-in failed. Please try again.';
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in was cancelled';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup was blocked. Please allow popups and try again.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later.';
          break;
        default:
          errorMessage = 'Google sign-in failed. Please try again.';
      }
      
      // You could show this error in a toast or alert
      alert(errorMessage);
      
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Optional: Store dismissal in localStorage to remember user's choice
    localStorage.setItem('authBannerDismissed', 'true');
  };

  // Check if banner was previously dismissed
  React.useEffect(() => {
    const wasDismissed = localStorage.getItem('authBannerDismissed');
    if (wasDismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  // Don't show if user is authenticated or banner is dismissed
  if (isAuthenticated || !isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Get the best experience!</span>
              <span className="ml-1">Sign in to save favorites, contact sellers, and add your own products.</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <FcGoogle className="w-4 h-4 mr-2" />
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>
          
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthBanner;