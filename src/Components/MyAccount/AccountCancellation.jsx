// import React from 'react'

// function AccountCancellation() {
//   return (
//     <div className="max-w-4xl w-full mx-auto font-poppins">
//     <h1 className="text-xl font-medium text-black">Account Cancellation</h1>
//     <div className='w-full shadow-custom-right rounded-lg p-5 mt-5'>
//      <h2 className=" font-normal text-black mb-4">
//         We are sorry that you want to cancel your sahibinden.com account.
//       </h2>
      
//       <p className=" font-normal text-black mb-4">
//         If you cancel your account;
//       </p>
      
//       <ul className="list-disc pl-10 mb-6 space-y-2">
//         <li className=" font-normal text-black">Your account cannot be reactivated.</li>
//         <li className=" font-normal text-black">All your published ads will be removed from publication and no refunds will be made.</li>
//         <li className=" font-normal text-black">If you have an ad in which you use doping, no refunds will be made.</li>
//         <li className=" font-normal text-black">You cannot use your e-mail address in a new sahibinden.com account for 10 years.</li>
//       </ul>
      
//       <p className="font-normal text-black mb-8">
//         If you have any questions or concerns about your account, you can contact us via the Support Center before closing your account. If you still want to cancel, please select the reason you want to cancel your account in order to maintain our service quality.
//       </p>
      
//       <div className="flex">
//         <button
//           className="px-8 py-3 bg-[#1544AB] text-white font-medium rounded-full text-lg  "
//         >
//           CANCEL ACCOUNT
//         </button>
//       </div>
//       </div>
//     </div>
//   )
// }

// export default AccountCancellation







import React, { useState, useEffect } from 'react';
import { 
  deleteUser, 
  reauthenticateWithCredential, 
  reauthenticateWithPopup,
  EmailAuthProvider,
  GoogleAuthProvider 
} from 'firebase/auth';
import { doc, deleteDoc, getFirestore } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase'; // Adjust path to your firebase config
import { useNavigate } from 'react-router-dom'; // For redirecting after deletion

function AccountCancellation() {
  const [user, loading, error] = useAuthState(auth);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userSignInMethod, setUserSignInMethod] = useState('');
  const [message, setMessage] = useState('');
  const db = getFirestore();
  const navigate = useNavigate();

  // Check user's sign-in method
  useEffect(() => {
    if (user && user.providerData && user.providerData.length > 0) {
      const providerId = user.providerData[0].providerId;
      setUserSignInMethod(providerId);
    }
  }, [user]);

  const cancellationReasons = [
    "I don't need it anymore",
    "I have another account",
    "I do not use this email address",
    "I do not want my information to be available on the internet",
    "I can't change my username",
    "Free ad limits are insufficient",
    "I will open a corporate account",
    "I don't want to say",
    "Other"
  ];

  const handleReasonChange = (reason) => {
    setSelectedReason(reason);
    if (reason !== 'Other') {
      setCustomReason('');
    }
  };

  const handleInitialCancel = () => {
    if (!selectedReason) {
      setMessage('Please select a reason for cancellation.');
      return;
    }
    
    if (selectedReason === 'Other' && !customReason.trim()) {
      setMessage('Please specify your reason for cancellation.');
      return;
    }

    setMessage('');
    setShowConfirmation(true);
  };

  const handleFinalCancel = async () => {
    if (!user) {
      setMessage('Please log in to delete your account.');
      return;
    }

    // Validate password for email/password users
    if (userSignInMethod === 'password' && !currentPassword.trim()) {
      setMessage('Please enter your current password to confirm account deletion.');
      return;
    }

    setIsDeleting(true);
    setMessage('');

    try {
      // Re-authenticate user based on sign-in method
      if (userSignInMethod === 'google.com') {
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(user, provider);
      } else if (userSignInMethod === 'password') {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
      }

      // Delete user document from Firestore first
      const userDocRef = doc(db, 'users', user.uid);
      await deleteDoc(userDocRef);

      // Log cancellation reason (optional - you might want to store this in a separate collection)
      const reason = selectedReason === 'Other' ? customReason : selectedReason;
      console.log('Account cancellation reason:', reason);
      
      // You could store cancellation data in a separate collection for analytics:
      // const cancellationRef = doc(collection(db, 'cancellations'));
      // await setDoc(cancellationRef, {
      //   userId: user.uid,
      //   email: user.email,
      //   reason: reason,
      //   cancelledAt: new Date().toISOString()
      // });

      // Delete the Firebase Auth user
      await deleteUser(user);

      // Success - redirect to home page or login
      alert('Your account has been successfully deleted. We\'re sorry to see you go!');
      navigate('/'); // Redirect to home page

    } catch (error) {
      console.error('Error deleting account:', error);
      
      switch (error.code) {
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setMessage('Current password is incorrect. Please try again.');
          break;
        case 'auth/requires-recent-login':
          setMessage('Please log out and log back in, then try again.');
          break;
        case 'auth/user-not-found':
          setMessage('User account not found.');
          break;
        default:
          setMessage(`Error deleting account: ${error.message}`);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">Account Cancellation</h1>
      <div className='w-full shadow-custom-right rounded-lg p-5 mt-5'>
        <h2 className="font-normal text-black mb-4">
          We are sorry that you want to cancel your sahibinden.com account.
        </h2>
        
        <p className="font-normal text-black mb-4">
          If you cancel your account;
        </p>
        
        <ul className="list-disc pl-10 mb-6 space-y-2">
          <li className="font-normal text-black">Your account cannot be reactivated.</li>
          <li className="font-normal text-black">All your published ads will be removed from publication and no refunds will be made.</li>
          <li className="font-normal text-black">If you have an ad in which you use doping, no refunds will be made.</li>
          <li className="font-normal text-black">You cannot use your e-mail address in a new sahibinden.com account for 10 years.</li>
        </ul>
        
        <p className="font-normal text-black mb-8">
          If you have any questions or concerns about your account, you can contact us via the Support Center before closing your account. If you still want to cancel, please select the reason you want to cancel your account in order to maintain our service quality.
        </p>

        {!showConfirmation ? (
          <div>
            {/* Cancellation Reason Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-black mb-3">Why do you want to cancel your account?</h3>
              <div className="space-y-2">
                {cancellationReasons.map((reason, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="cancellationReason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={() => handleReasonChange(reason)}
                      className="w-4 h-4 text-[#1544AB] border-gray-300 focus:ring-[#1544AB]"
                    />
                    <span className="text-black">• {reason}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Custom Reason Text Area */}
            {selectedReason === 'Other' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-2">
                  Please specify your reason:
                </label>
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Please tell us why you want to cancel your account..."
                  className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            )}

            {message && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
                {message}
              </div>
            )}

            <div className="flex">
              <button
                onClick={handleInitialCancel}
                disabled={!selectedReason}
                className={`px-8 py-3 font-medium rounded-full text-lg transition-colors ${
                  !selectedReason
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-[#1544AB] text-white hover:bg-blue-700'
                }`}
              >
                CANCEL ACCOUNT
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Final Confirmation */}
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <h3 className="text-lg font-semibold text-red-800 mb-3">⚠️ Final Confirmation</h3>
              <p className="text-red-700 mb-3">
                This action is <strong>PERMANENT</strong> and cannot be undone. Are you absolutely sure you want to delete your account?
              </p>
              <p className="text-sm text-red-600">
                <strong>Cancellation reason:</strong> {selectedReason === 'Other' ? customReason : selectedReason}
              </p>
            </div>

            {/* Password confirmation for email/password users */}
            {userSignInMethod === 'password' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-2">
                  Enter your current password to confirm:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current password"
                    className="w-full px-4 py-3 pr-12 border border-[#1544AB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
            )}

            {/* Google user info */}
            {userSignInMethod === 'google.com' && (
              <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  You'll need to authenticate with Google to confirm account deletion.
                </p>
              </div>
            )}

            {message && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
                {message}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={handleFinalCancel}
                disabled={isDeleting || (userSignInMethod === 'password' && !currentPassword)}
                className={`px-8 py-3 font-medium rounded-full text-lg transition-colors ${
                  isDeleting || (userSignInMethod === 'password' && !currentPassword)
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {isDeleting ? (
                  userSignInMethod === 'google.com' ? 'Authenticating...' : 'DELETING ACCOUNT...'
                ) : (
                  'YES, DELETE MY ACCOUNT'
                )}
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                disabled={isDeleting}
                className="px-8 py-3 bg-gray-500 text-white font-medium rounded-full text-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                CANCEL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountCancellation;