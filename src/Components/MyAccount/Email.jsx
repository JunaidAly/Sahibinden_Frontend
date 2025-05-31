
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase'; // Adjust import path as needed
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function Email() {
  // Get current user's email from users collection
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [showNewEmailInput, setShowNewEmailInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Fetch current user's email on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchCurrentUserEmail(user.uid);
      } else {
        setCurrentUser(null);
        setCurrentEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCurrentUserEmail = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setCurrentEmail(userData.email || '');
      } else {
        console.error('User document not found');
        setMessage('User data not found');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setMessage('Error loading user data');
      setMessageType('error');
    }
  };

  const handleChangeEmailClick = () => {
    setShowNewEmailInput(true);
    setMessage('');
  };

  const handleSendVerificationCode = async () => {
    if (!newEmail || !isValidEmail(newEmail)) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    if (newEmail === currentEmail) {
      setMessage('New email must be different from current email');
      setMessageType('error');
      return;
    }

    if (!currentUser) {
      setMessage('User not authenticated');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Option 1: Using Firebase Functions
      const { httpsCallable } = await import('firebase/functions');
      const { getFunctions } = await import('firebase/functions');
      
      const functions = getFunctions();
      const sendVerificationCode = httpsCallable(functions, 'sendEmailVerificationCode');
      
      const result = await sendVerificationCode({
        newEmail: newEmail,
        currentEmail: currentEmail,
        uid: currentUser.uid,
      });

      if (result.data.success) {
        setShowVerificationInput(true);
        setMessage(`Verification code sent to ${newEmail}`);
        setMessageType('success');
      } else {
        setMessage(result.data.message || 'Failed to send verification code');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      
      // Fallback: For development/testing - remove this in production
      if (error.code === 'functions/not-found' || error.message.includes('404')) {
        // Temporary mock for development
        setTimeout(() => {
          setShowVerificationInput(true);
          setMessage(`Verification code sent to ${newEmail} (Development Mode)`);
          setMessageType('success');
          setIsLoading(false);
        }, 1000);
        return;
      }
      
      setMessage('Error sending verification code. Please try again.');
      setMessageType('error');
      setIsLoading(false);
    } finally {
      if (!error || error.code !== 'functions/not-found') {
        setIsLoading(false);
      }
    }
  };

  const handleVerifyAndChangeEmail = async () => {
    if (!verificationCode || verificationCode.length < 4) {
      setMessage('Please enter a valid verification code');
      setMessageType('error');
      return;
    }

    if (!currentUser) {
      setMessage('User not authenticated');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Option 1: Using Firebase Functions
      const { httpsCallable } = await import('firebase/functions');
      const { getFunctions } = await import('firebase/functions');
      
      const functions = getFunctions();
      const verifyEmailCode = httpsCallable(functions, 'verifyEmailCode');
      
      const result = await verifyEmailCode({
        newEmail: newEmail,
        verificationCode: verificationCode,
        uid: currentUser.uid,
      });

      if (result.data.success) {
        // Update Firebase user document
        const userDocRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userDocRef, {
          email: newEmail,
          emailVerified: true,
          updatedAt: new Date().toISOString(),
        });

        setCurrentEmail(newEmail);
        setMessage('Email address updated successfully!');
        setMessageType('success');
        // Reset form
        setShowNewEmailInput(false);
        setShowVerificationInput(false);
        setNewEmail('');
        setVerificationCode('');
      } else {
        setMessage(result.data.message || 'Invalid verification code');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      
      // Fallback: For development/testing - remove this in production
      if (error.code === 'functions/not-found' || error.message.includes('404')) {
        // Mock verification for development (always accept "123456")
        if (verificationCode === '123456') {
          const userDocRef = doc(db, 'users', currentUser.uid);
          await updateDoc(userDocRef, {
            email: newEmail,
            emailVerified: true,
            updatedAt: new Date().toISOString(),
          });

          setCurrentEmail(newEmail);
          setMessage('Email address updated successfully! (Development Mode)');
          setMessageType('success');
          setShowNewEmailInput(false);
          setShowVerificationInput(false);
          setNewEmail('');
          setVerificationCode('');
        } else {
          setMessage('Invalid verification code. Use "123456" for development.');
          setMessageType('error');
        }
        setIsLoading(false);
        return;
      }
      
      setMessage('Error verifying code. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowNewEmailInput(false);
    setShowVerificationInput(false);
    setNewEmail('');
    setVerificationCode('');
    setMessage('');
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">Email</h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <p className="text-sm text-black font-normal">
          To ensure that you receive important emails regarding your listings,
          favorites and messages, please make sure that your current email
          address is registered.
        </p>
        <h2 className="text-black text-lg font-normal mt-3">
          Your registered email address:{" "}
          <span className="font-semibold">{currentEmail || 'Loading...'}</span>
        </h2>

        {/* Message display */}
        {message && (
          <div className={`mt-3 p-3 rounded-lg text-sm ${
            messageType === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* New Email Input */}
        {showNewEmailInput && (
          <div className="mt-4">
            <label className="block text-black text-sm font-medium mb-2">
              Enter your new email address:
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1544AB] focus:border-transparent"
            />
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleSendVerificationCode}
                disabled={isLoading}
                className="px-5 py-2 bg-[#1544AB] text-white font-medium rounded-full hover:bg-[#123399] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Sending...' : 'Send Verification Code'}
              </button>
              <button
                onClick={handleCancel}
                className="px-5 py-2 bg-gray-500 text-white font-medium rounded-full hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Verification Code Input */}
        {showVerificationInput && (
          <div className="mt-4">
            <label className="block text-black text-sm font-medium mb-2">
              Enter verification code:
            </label>
            <p className="text-sm text-gray-600 mb-2">
              We've sent a verification code to <span className="font-semibold">{newEmail}</span>
            </p>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter 6-digit code"
              maxLength="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1544AB] focus:border-transparent"
            />
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleVerifyAndChangeEmail}
                disabled={isLoading}
                className="px-5 py-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Verifying...' : 'Verify & Change Email'}
              </button>
              <button
                onClick={handleCancel}
                className="px-5 py-2 bg-gray-500 text-white font-medium rounded-full hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
            <button
              onClick={handleSendVerificationCode}
              disabled={isLoading}
              className="text-[#1544AB] text-sm hover:underline mt-2 disabled:text-gray-400"
            >
              Didn't receive the code? Resend
            </button>
          </div>
        )}

        {/* Change Email Button - only show when not in input mode */}
        {!showNewEmailInput && (
          <button
            type="button"
            onClick={handleChangeEmailClick}
            className="px-5 py-2 mt-2 bg-[#1544AB] text-white font-medium rounded-full hover:bg-[#123399] transition-colors"
          >
            Change my email
          </button>
        )}
      </div>
    </div>
  );
}

export default Email;