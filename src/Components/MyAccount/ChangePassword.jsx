// import React from 'react'

// function ChangePassword() {
//   return (
//     <div className="max-w-4xl w-full mx-auto font-poppins">
//       <h1 className="text-xl font-medium text-black">Password Change</h1>
//       <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
//         <h1 className="text-xl font-semibold text-black">
//           To change your password, enter your current and new password.
//         </h1>
       
//         <div className="flex flex-col gap-2 items-center mt-2">
//           <label className="w-full capitalize ">current Password</label>
//           <input
//             type="text"
//             placeholder="teuser44"
//             className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//           <label className="w-full ">New Password</label>
//           <input
//             type="text"
//             placeholder="teuser44"
//             className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//           <label className="w-full ">Retype Password</label>
//           <input
//             type="text"
//             placeholder="teuser44"
//             className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="button"
//           className="px-5 py-2 mt-2 capitalize bg-[#1544AB] text-white font-medium rounded-full"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ChangePassword









import React, { useState, useEffect } from 'react';
import { 
  updatePassword, 
  reauthenticateWithCredential, 
  reauthenticateWithPopup,
  EmailAuthProvider,
  GoogleAuthProvider 
} from 'firebase/auth';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase'; // Adjust path to your firebase config

function ChangePassword() {
  const [user, loading, error] = useAuthState(auth);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    retypePassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    retype: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [userSignInMethod, setUserSignInMethod] = useState('');
  const db = getFirestore();

  // Check user's sign-in method
  useEffect(() => {
    if (user && user.providerData && user.providerData.length > 0) {
      const providerId = user.providerData[0].providerId;
      setUserSignInMethod(providerId);
      console.log('User sign-in method:', providerId);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Only validate current password for email/password users
    if (userSignInMethod === 'password' && !formData.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'New password must be at least 6 characters';
    }

    if (!formData.retypePassword.trim()) {
      newErrors.retypePassword = 'Please retype your password';
    } else if (formData.newPassword !== formData.retypePassword) {
      newErrors.retypePassword = 'Passwords do not match';
    }

    // Only check if current and new passwords are different for email/password users
    if (userSignInMethod === 'password' && formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!user) {
      setMessage('Please log in to change your password.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      console.log('User sign-in method:', userSignInMethod);
      
      // Re-authenticate based on sign-in method
      if (userSignInMethod === 'google.com') {
        // For Google users, use popup re-authentication
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(user, provider);
        console.log('Google re-authentication successful');
      } else if (userSignInMethod === 'password') {
        // For email/password users
        if (!user.email) {
          setMessage('Email authentication required.');
          return;
        }
        
        const credential = EmailAuthProvider.credential(
          user.email,
          formData.currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        console.log('Email/password re-authentication successful');
      } else {
        setMessage('Password change not supported for this sign-in method. Please contact support.');
        return;
      }
      
      // Update password
      await updatePassword(user, formData.newPassword);
      console.log('Password update successful');
      
      // Update the updatedAt timestamp in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        updatedAt: new Date().toISOString()
      });

      setMessage('Password changed successfully! You can now use this password to sign in.');
      
      // Clear form
      setFormData({
        currentPassword: '',
        newPassword: '',
        retypePassword: ''
      });
      
    } catch (error) {
      console.error('Error changing password:', error);
      
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setErrors({ currentPassword: 'Current password is incorrect' });
          break;
        case 'auth/weak-password':
          setErrors({ newPassword: 'Password is too weak' });
          break;
        case 'auth/requires-recent-login':
          setMessage('Please log out and log back in before changing your password.');
          break;
        case 'auth/user-mismatch':
          setMessage('Authentication error. Please try logging out and back in.');
          break;
        case 'auth/user-not-found':
          setMessage('User account not found. Please try logging out and back in.');
          break;
        case 'auth/invalid-email':
          setMessage('Invalid email format. Please try logging out and back in.');
          break;
        default:
          setMessage(`Error changing password: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">Password Change</h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <h1 className="text-xl font-semibold text-black">
          To change your password, enter your current and new password.
        </h1>
       
        <div className="flex flex-col gap-4 mt-4">
          {/* Current Password - Only show for email/password users */}
          {userSignInMethod === 'password' && (
            <div className="w-full">
              <label className="w-full capitalize block text-sm font-medium text-black mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                  className={`w-full px-4 py-3 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.currentPassword ? 'border-red-500' : 'border-[#1544AB]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.current ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
              )}
            </div>
          )}

          {/* Info message for Google users */}
          {userSignInMethod === 'google.com' && (
            <div className="w-full p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Google Account Detected:</strong> You signed in with Google. 
                When you change your password, you'll be able to sign in with either Google or your new password.
              </p>
            </div>
          )}

          {/* New Password */}
          <div className="w-full">
            <label className="w-full block text-sm font-medium text-black mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
                className={`w-full px-4 py-3 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.newPassword ? 'border-red-500' : 'border-[#1544AB]'
                }`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.new ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* Retype Password */}
          <div className="w-full">
            <label className="w-full block text-sm font-medium text-black mb-1">
              Retype Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.retype ? "text" : "password"}
                name="retypePassword"
                value={formData.retypePassword}
                onChange={handleInputChange}
                placeholder="Retype new password"
                className={`w-full px-4 py-3 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.retypePassword ? 'border-red-500' : 'border-[#1544AB]'
                }`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('retype')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.retype ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.retypePassword && (
              <p className="text-red-500 text-xs mt-1">{errors.retypePassword}</p>
            )}
          </div>
        </div>

        {/* Password Requirements */}
        <div className="mt-3 p-3 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-600 font-medium mb-1">Password Requirements:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• At least 6 characters long</li>
            <li>• Different from your current password</li>
            <li>• Should contain a mix of letters, numbers, and symbols for better security</li>
          </ul>
        </div>

        {message && (
          <div className={`mt-4 p-3 rounded-md text-sm ${
            message.includes('Error') || message.includes('Please log') 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <button
          type="button"
          onClick={handleChangePassword}
          disabled={isSubmitting || !formData.newPassword || !formData.retypePassword || (userSignInMethod === 'password' && !formData.currentPassword)}
          className={`px-6 py-2 mt-4 capitalize font-medium rounded-full transition-colors ${
            isSubmitting || !formData.newPassword || !formData.retypePassword || (userSignInMethod === 'password' && !formData.currentPassword)
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-[#1544AB] text-white hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? (
            userSignInMethod === 'google.com' ? 'Authenticating with Google...' : 'Changing Password...'
          ) : (
            userSignInMethod === 'google.com' ? 'Set Password (Google will prompt)' : 'Save Password'
          )}
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;