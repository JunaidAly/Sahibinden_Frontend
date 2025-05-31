// import React from 'react'

// function RecoveryEmail() {
//   return (
//     <div className="max-w-4xl w-full mx-auto font-poppins">
//       <h1 className="text-xl font-medium text-black">Recovery Email</h1>
//       <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
//         <p className="text-lg text-black font-normal mb-4">
//           If you forget your password, you can use your recovery email address
//           to help you access your account.
//         </p>

//         <h1 className="text-lg text-black font-normal">You do not have a registered recovery email address .</h1>

//         <button
//           type="button"
//           className="px-5 py-2 mt-2 bg-[#1544AB] text-white font-medium rounded-full"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }

// export default RecoveryEmail






import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../firebase'; // Adjust the path to your Firebase config

function RecoveryEmail() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState('');
  const [hasRecoveryEmail, setHasRecoveryEmail] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('3Aum9zIT16l43LYxO');
  }, []);

  // Fetch current user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserData(userData);
            
            // Check if user already has a recovery email
            if (userData.recoveryEmail) {
              setHasRecoveryEmail(true);
              setRecoveryEmail(userData.recoveryEmail);
            }
          } else {
            setErrorMsg('User data not found');
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setErrorMsg('Failed to fetch user data');
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Generate random 6-digit verification code
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Send verification email
  const sendVerificationEmail = async () => {
    if (!recoveryEmail) {
      setErrorMsg('Please enter a recovery email address');
      return;
    }

    if (!validateEmail(recoveryEmail)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    if (!userData) {
      setErrorMsg('User data not available');
      return;
    }

    if (!userData.email) {
      setErrorMsg('User email not found');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const code = generateVerificationCode();
      setVerificationCode(code);

      // Template parameters matching your HTML template
      const templateParams = {
        to_email: userData.email, // Send to current logged-in user's email
        user_name: userData.displayName || userData.firstName || 'User', // Changed to match your template
        verification_code: code,
        recovery_email: recoveryEmail,
        from_name: 'Sahibendin', // Replace with your store name
        reply_to: userData.email
      };

      // Debug log to check parameters
      console.log('EmailJS Template Parameters:', templateParams);
      console.log('Service ID: service_z5ug5xb');
      console.log('Template ID: template_pewqhtq');

      const response = await emailjs.send(
        'service_z5ug5xb',
        'template_pewqhtq',
        templateParams
      );

      console.log('EmailJS Response:', response);
      setIsVerificationSent(true);
      setSuccess(`Verification code sent to ${userData.email}`);
    } catch (err) {
      console.error('Failed to send verification email:', err);
      
      // More specific error handling
      if (err.status === 422) {
        setErrorMsg('Email template configuration error. Please check EmailJS template settings.');
      } else if (err.status === 400) {
        setErrorMsg('Invalid EmailJS service or template ID.');
      } else if (err.status === 401) {
        setErrorMsg('EmailJS authentication failed. Check your public key.');
      } else {
        setErrorMsg(`Failed to send verification email: ${err.text || err.message || 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Verify the entered code
  const verifyCode = () => {
    if (!enteredCode) {
      setErrorMsg('Please enter the verification code');
      return;
    }

    if (enteredCode === verificationCode) {
      setIsVerified(true);
      setErrorMsg('');
      setSuccess('Email verified successfully!');
    } else {
      setErrorMsg('Invalid verification code. Please try again.');
    }
  };

  // Save recovery email to Firestore
  const saveRecoveryEmail = async () => {
    if (!isVerified) {
      setErrorMsg('Please verify your email first');
      return;
    }

    if (!user) {
      setErrorMsg('User not authenticated');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const userDocRef = doc(db, 'users', user.uid);
      
      // Update user document with recovery email
      await updateDoc(userDocRef, {
        recoveryEmail: recoveryEmail,
        updatedAt: new Date()
      });
      
      setHasRecoveryEmail(true);
      setSuccess('Recovery email saved successfully!');
      
      // Update local userData state
      setUserData(prev => ({
        ...prev,
        recoveryEmail: recoveryEmail,
        updatedAt: new Date()
      }));
      
      // Reset form
      resetVerificationForm();
    } catch (err) {
      console.error('Failed to save recovery email:', err);
      setErrorMsg('Failed to save recovery email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Remove recovery email
  const removeRecoveryEmail = async () => {
    if (!user) {
      setErrorMsg('User not authenticated');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const userDocRef = doc(db, 'users', user.uid);
      
      // Remove recovery email from user document
      await updateDoc(userDocRef, {
        recoveryEmail: null,
        updatedAt: new Date()
      });
      
      setHasRecoveryEmail(false);
      setRecoveryEmail('');
      setSuccess('Recovery email removed successfully!');
      
      // Update local userData state
      setUserData(prev => ({
        ...prev,
        recoveryEmail: null,
        updatedAt: new Date()
      }));
      
    } catch (err) {
      console.error('Failed to remove recovery email:', err);
      setErrorMsg('Failed to remove recovery email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset verification form only
  const resetVerificationForm = () => {
    setVerificationCode('');
    setEnteredCode('');
    setIsVerificationSent(false);
    setIsVerified(false);
  };

  // Reset entire form
  const resetForm = () => {
    setRecoveryEmail('');
    resetVerificationForm();
    setErrorMsg('');
    setSuccess('');
  };

  // Show loading state while fetching user data
  if (loading || !userData) {
    return (
      <div className="max-w-4xl w-full mx-auto font-poppins">
        <h1 className="text-xl font-medium text-black">Recovery Email</h1>
        <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1544AB]"></div>
            <span className="ml-3 text-gray-600">Loading user data...</span>
          </div>
        </div>
      </div>
    );
  }

  // Show error if user data couldn't be loaded
  if (error) {
    return (
      <div className="max-w-4xl w-full mx-auto font-poppins">
        <h1 className="text-xl font-medium text-black">Recovery Email</h1>
        <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Failed to load user data. Please try refreshing the page.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">Recovery Email</h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <p className="text-lg text-black font-normal mb-4">
          If you forget your password, you can use your recovery email address
          to help you access your account.
        </p>

        {/* Current User Info */}
        <div className="bg-gray-50 p-3 rounded-md mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Account:</span> {userData.email}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Name:</span> {userData.displayName || `${userData.firstName} ${userData.lastName}` || 'Not set'}
          </p>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMsg}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {!hasRecoveryEmail ? (
          <>
            <h2 className="text-lg text-black font-normal mb-4">
              You do not have a registered recovery email address.
            </h2>

            {/* Recovery Email Input */}
            <div className="mb-4">
              <label htmlFor="recoveryEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Recovery Email Address
              </label>
              <input
                id="recoveryEmail"
                type="email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                placeholder="Enter your recovery email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isVerificationSent}
              />
            </div>

            {/* Send Verification Button */}
            {!isVerificationSent && (
              <button
                type="button"
                onClick={sendVerificationEmail}
                disabled={isLoading}
                className="px-5 py-2 bg-[#1544AB] text-white font-medium rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mr-3"
              >
                {isLoading ? 'Sending...' : 'Send Verification Code'}
              </button>
            )}

            {/* Verification Code Input */}
            {isVerificationSent && !isVerified && (
              <div className="mt-4">
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <p className="text-sm text-gray-600 mb-2">
                  We've sent a verification code to {userData.email}
                </p>
                <div className="flex gap-3">
                  <input
                    id="verificationCode"
                    type="text"
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={verifyCode}
                    className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
                  >
                    Verify
                  </button>
                </div>
                <button
                  type="button"
                  onClick={sendVerificationEmail}
                  disabled={isLoading}
                  className="text-sm text-blue-600 hover:text-blue-800 mt-2"
                >
                  Resend code
                </button>
              </div>
            )}

            {/* Success State */}
            {isVerified && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center">
                  <div className="text-green-600 mr-2">✓</div>
                  <span className="text-green-800">Email verified successfully!</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Recovery email: {recoveryEmail}
                </p>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={saveRecoveryEmail}
                disabled={!isVerified || isLoading}
                className="px-5 py-2 bg-[#1544AB] text-white font-medium rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Recovery Email'}
              </button>
              
              {(isVerificationSent || isVerified) && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-lg text-black font-normal mb-4">
              ✓ Recovery email is configured
            </h2>
            <div className="bg-green-50 p-3 rounded-md mb-4">
              <p className="text-sm text-green-800">
                <span className="font-medium">Recovery Email:</span> {userData.recoveryEmail}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setHasRecoveryEmail(false);
                  setRecoveryEmail('');
                  resetForm();
                }}
                className="px-5 py-2 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50"
              >
                Update Recovery Email
              </button>
              <button
                type="button"
                onClick={removeRecoveryEmail}
                disabled={isLoading}
                className="px-5 py-2 border border-red-300 text-red-700 font-medium rounded-full hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Removing...' : 'Remove Recovery Email'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecoveryEmail;