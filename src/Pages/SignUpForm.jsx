// import React, { useState } from 'react';
// import { FaEye, FaEyeSlash, FaApple } from 'react-icons/fa';
// import { FcGoogle } from "react-icons/fc";
// import { Link } from 'react-router';
// import { auth, db } from '../../firebase'; // Import your firebase config and firestore
// import { 
//   createUserWithEmailAndPassword, 
//   signInWithPopup, 
//   GoogleAuthProvider,
//   updateProfile 
// } from 'firebase/auth';
// import { 
//   doc, 
//   setDoc, 
//   serverTimestamp 
// } from 'firebase/firestore';

// const SignUpForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({
//     email: '',
//     firstName: '',
//     lastName: '',
//     password: '',
//     agreeToTerms: false
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     // Clear error when user starts typing
//     if (error) setError('');
//   };

//   // Function to create user document in Firestore
//   const createUserDocument = async (user, additionalData = {}) => {
//     try {
//       const userDocRef = doc(db, 'users', user.uid);
      
//       const userData = {
//         uid: user.uid,
//         email: user.email,
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         displayName: user.displayName || `${formData.firstName} ${formData.lastName}`,
//         createdAt: serverTimestamp(),
//         updatedAt: serverTimestamp(),
//         emailVerified: user.emailVerified,
//         photoURL: user.photoURL || null,
//         ...additionalData
//       };

//       await setDoc(userDocRef, userData);
//       console.log('User document created successfully in Firestore');
      
//     } catch (error) {
//       console.error('Error creating user document:', error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.agreeToTerms) {
//       setError('Please agree to the Terms of Service and Privacy Policy');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       // Create user with email and password
//       const userCredential = await createUserWithEmailAndPassword(
//         auth, 
//         formData.email, 
//         formData.password
//       );
      
//       // Update user profile with display name
//       await updateProfile(userCredential.user, {
//         displayName: `${formData.firstName} ${formData.lastName}`
//       });

//       // Create user document in Firestore
//       await createUserDocument(userCredential.user, {
//         signUpMethod: 'email'
//       });

//       console.log('User created successfully:', userCredential.user);
//       // You can redirect to dashboard or show success message here
//       window.location.href = '/';
      
//     } catch (error) {
//       console.error('Signup error:', error);
      
//       // Handle different error types
//       switch (error.code) {
//         case 'auth/email-already-in-use':
//           setError('An account with this email already exists');
//           break;
//         case 'auth/weak-password':
//           setError('Password should be at least 6 characters');
//           break;
//         case 'auth/invalid-email':
//           setError('Please enter a valid email address');
//           break;
//         default:
//           setError('Something went wrong. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setLoading(true);
//     setError('');
    
//     const provider = new GoogleAuthProvider();
    
//     try {
//       const result = await signInWithPopup(auth, provider);
      
//       // Extract name from Google profile
//       const displayName = result.user.displayName || '';
//       const nameParts = displayName.split(' ');
//       const firstName = nameParts[0] || '';
//       const lastName = nameParts.slice(1).join(' ') || '';
      
//       // Create user document in Firestore for Google sign-in
//       await createUserDocument(result.user, {
//         signUpMethod: 'google',
//         firstName: firstName,
//         lastName: lastName
//       });
      
//       console.log('Google sign-in successful:', result.user);
//       // You can redirect to dashboard or show success message here
//       window.location.href = '/'; 
      
//     } catch (error) {
//       console.error('Google sign-in error:', error);
      
//       switch (error.code) {
//         case 'auth/popup-closed-by-user':
//           setError('Sign-in was cancelled');
//           break;
//         case 'auth/popup-blocked':
//           setError('Popup was blocked. Please allow popups and try again');
//           break;
//         default:
//           setError('Google sign-in failed. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 font-poppins">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
//         <div>
//           <h2 className="text-center text-3xl font-bold text-black">
//             Sign up to Sahibinden
//           </h2>
//           <p className="mt-2 text-center text-sm text-primarygray">
//             Quick & Simple way to Automate your payment
//           </p>
//         </div>
        
//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
//             {error}
//           </div>
//         )}
        
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             {/* Email Address */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
//                 EMAIL ADDRESS
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="johndoe@example.com"
//                 className="appearance-none relative block w-full px-3 py-3 border border-primaryBlue placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               />
//             </div>

//             {/* Name Fields Row */}
//             <div className="grid grid-cols-2 gap-4">
//               {/* First Name */}
//               <div>
//                 <label htmlFor="firstName" className="block text-sm font-medium text-black mb-1">
//                   FIRST NAME
//                 </label>
//                 <input
//                   id="firstName"
//                   name="firstName"
//                   type="text"
//                   autoComplete="given-name"
//                   required
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   placeholder="John"
//                   className="appearance-none relative block w-full px-3 py-3 border border-primaryBlue placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>

//               {/* Last Name */}
//               <div>
//                 <label htmlFor="lastName" className="block text-sm font-medium text-black mb-1">
//                   LAST NAME
//                 </label>
//                 <input
//                   id="lastName"
//                   name="lastName"
//                   type="text"
//                   autoComplete="family-name"
//                   required
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   placeholder="Doe"
//                   className="appearance-none relative block w-full px-3 py-3 border border-primaryBlue placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
//                 PASSWORD
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="new-password"
//                   required
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   placeholder="**********"
//                   className="appearance-none relative block w-full px-3 py-3 pr-10 border border-primaryBlue placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <FaEyeSlash className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <FaEye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Terms Checkbox */}
//             <div className="flex items-center">
//               <input
//                 id="agree-terms"
//                 name="agreeToTerms"
//                 type="checkbox"
//                 checked={formData.agreeToTerms}
//                 onChange={handleInputChange}
//                 className="h-4 w-4 text-primaryBlue border-gray-300 rounded"
//               />
//               <label htmlFor="agree-terms" className="ml-2 block text-sm text-black">
//                 I agree to the <span className="underline cursor-pointer">Terms of Service and Privacy Policy.</span>
//               </label>
//             </div>
//           </div>

//           {/* Sign Up Button */}
//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primaryBlue hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Creating Account...' : 'Sign Up'}
//             </button>
//           </div>

//           {/* Already a member */}
//           <div className="text-center">
//             <span className="text-sm text-gray-600">
//               Already a member?{' '}
//               <Link to="/signin" className="font-medium text-primaryBlue hover:underline">
//                 Sign In
//               </Link>
//             </span>
//           </div>

//           {/* OR Divider */}
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">OR</span>
//             </div>
//           </div>

//           {/* Social Login Options */}
//           <div className="flex justify-center space-x-8">
//             <button 
//               type="button" 
//               onClick={handleGoogleSignIn}
//               disabled={loading}
//               className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
//             >
//               <FcGoogle className="w-8 h-8" />
//             </button>
//             <button 
//               type="button" 
//               className="text-black hover:scale-110 transition-transform"
//               disabled
//             >
//               <FaApple className="w-8 h-8" />
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;










import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaApple } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom'; // Fixed import
import { auth, db } from '../../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  updateProfile 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  serverTimestamp,
  getDoc 
} from 'firebase/firestore';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Function to create user document in Firestore (using AuthBanner pattern)
  const createUserDocument = async (user, additionalData = {}) => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    
    try {
      // Check if user document already exists
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        // Extract first and last name from displayName or use form data
        const fullName = user.displayName || '';
        const nameParts = fullName.trim().split(' ');
        const firstName = additionalData.firstName || nameParts[0] || formData.firstName || '';
        const lastName = additionalData.lastName || (nameParts.length > 1 ? nameParts.slice(1).join(' ') : '') || formData.lastName || '';

        // Create new user document with your specified fields
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || `${firstName} ${lastName}`.trim(),
          firstName: firstName,
          lastName: lastName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          signUpMethod: additionalData.signUpMethod || 'email',
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
        const firstName = additionalData.firstName || nameParts[0] || formData.firstName || '';
        const lastName = additionalData.lastName || (nameParts.length > 1 ? nameParts.slice(1).join(' ') : '') || formData.lastName || '';

        // Update existing user's information
        await setDoc(userDocRef, {
          updatedAt: serverTimestamp(),
          // Update any changed profile info
          displayName: user.displayName || `${firstName} ${lastName}`.trim(),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('Please enter both first name and last name');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email.trim(), 
        formData.password
      );
      
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName.trim()} ${formData.lastName.trim()}`
      });

      // Create user document in Firestore
      await createUserDocument(userCredential.user, {
        signUpMethod: 'email',
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim()
      });

      console.log('User created successfully:', userCredential.user);
      
      // Redirect to dashboard
      window.location.href = '/dashboard'; // More specific redirect
      
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle different error types
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('An account with this email already exists');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/operation-not-allowed':
          setError('Email/password accounts are not enabled. Please contact support.');
          break;
        default:
          setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    const provider = new GoogleAuthProvider();
    
    // Add additional scopes if needed
    provider.addScope('email');
    provider.addScope('profile');
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      console.log('🔐 Google sign-in successful:', user.email);
      
      // Create or update user document in Firestore (using AuthBanner pattern)
      await createUserDocument(user, { signUpMethod: 'google' });
      
      // Show success message
      console.log('🎉 Sign-in complete! Welcome,', user.displayName || user.email);
      
      // Redirect to dashboard
      window.location.href = '/dashboard';
      
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
      
      setError(errorMessage);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div>
          <h2 className="text-center text-3xl font-bold text-black">
            Sign up to Sahibinden
          </h2>
          <p className="mt-2 text-center text-sm text-primarygray">
            Quick & Simple way to Automate your payment
          </p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                EMAIL ADDRESS *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="johndoe@example.com"
                className="appearance-none relative block w-full px-3 py-3 border border-primaryBlue placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-black mb-1">
                  FIRST NAME *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="appearance-none relative block w-full px-3 py-3 border border-primaryBlue placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-black mb-1">
                  LAST NAME *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="appearance-none relative block w-full px-3 py-3 border border-primaryBlue placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                PASSWORD *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="**********"
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-primaryBlue placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-primaryBlue border-gray-300 rounded"
                required
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-black">
                I agree to the <span className="underline cursor-pointer">Terms of Service and Privacy Policy.</span> *
              </label>
            </div>
          </div>

          {/* Sign Up Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primaryBlue hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>

          {/* Already a member */}
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already a member?{' '}
              <Link to="/signin" className="font-medium text-primaryBlue hover:underline">
                Sign In
              </Link>
            </span>
          </div>

          {/* OR Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Social Login Options */}
          <div className="flex justify-center space-x-8">
            <button 
              type="button" 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
            >
              <FcGoogle className="w-8 h-8" />
            </button>
            <button 
              type="button" 
              className="text-black hover:scale-110 transition-transform opacity-50 cursor-not-allowed"
              disabled
              title="Apple Sign-In coming soon"
            >
              <FaApple className="w-8 h-8" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;