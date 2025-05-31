// src/components/auth/AuthModal.js
import React, { useState } from 'react';
import { auth } from '../../../firebase'; // Adjust path to your firebase config
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign-in successful:', result.user);
      onAuthSuccess();
    } catch (error) {
      console.error('Google sign-in error:', error);
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign-in was cancelled');
          break;
        case 'auth/popup-blocked':
          setError('Popup was blocked. Please allow popups and try again');
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