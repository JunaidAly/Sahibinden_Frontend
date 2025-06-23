

import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaApple } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Use your AuthContext with session management
import { 
  signInWithPopup, 
  GoogleAuthProvider,
  sendPasswordResetEmail 
} from 'firebase/auth';
import { auth } from '../../firebase'; // Import your firebase config
import { addUserSessionWithProfile } from '../Components/MyAccount/sessionManager'; // Import enhanced session manager

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const { signIn } = useAuth(); // Use your AuthContext
  const navigate = useNavigate(); // Use navigate instead of window.location

  // Device and browser detection for Google sign-in
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
    if (resetEmailSent) setResetEmailSent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use AuthContext signIn method (includes session tracking)
      await signIn(formData.email, formData.password);
      
      console.log('User signed in successfully with session tracking');
      
      // Navigate to dashboard
      navigate('/'); // or wherever you want to redirect
      
    } catch (error) {
      console.error('Sign-in error:', error);
      
      // Handle different error types
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later');
          break;
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please check your credentials');
          break;
        default:
          setError('Sign-in failed. Please check your credentials and try again');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign-in successful:', result.user);
      
      // Add session tracking for Google sign-in with profile preservation
      const sessionData = createSessionData();
      await addUserSessionWithProfile(result.user.uid, sessionData, result.user);
      
      // Navigate to dashboard
      navigate('/'); // or wherever you want to redirect
      
    } catch (error) {
      console.error('Google sign-in error:', error);
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign-in was cancelled');
          break;
        case 'auth/popup-blocked':
          setError('Popup was blocked. Please allow popups and try again');
          break;
        case 'auth/account-exists-with-different-credential':
          setError('An account already exists with this email using a different sign-in method');
          break;
        default:
          setError('Google sign-in failed. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await sendPasswordResetEmail(auth, formData.email);
      setResetEmailSent(true);
    } catch (error) {
      console.error('Password reset error:', error);
      
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        default:
          setError('Failed to send password reset email. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div>
          <h2 className="text-center text-4xl font-bold text-black">
            Log In to Sahibinden
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

        {/* Success Message for Password Reset */}
        {resetEmailSent && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
            Password reset email sent! Check your inbox and follow the instructions.
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black mb-1"
              >
                EMAIL ADDRESS
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

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black mb-1"
              >
                PASSWORD
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
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

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primaryBlue border-black rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-primarygray underline"
                >
                   Keep me logged in
                </label>
              </div>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="font-medium text-primarygray underline hover:text-blue-600 disabled:opacity-50"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>

          {/* Sign In Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-primaryBlue hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In with your email'}
            </button>
          </div>

          {/* Not a member */}
          <div className="text-center">
            <span className="text-base text-black">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-medium text-primaryBlue hover:underline"
              >
                Sign Up
              </Link>
            </span>
          </div>

          {/* OR USE Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-black text-base">
                OR USE
              </span>
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
              className="text-black hover:scale-110 transition-transform"
              disabled
            >
              <FaApple className="w-8 h-8" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;