import React, { useState } from 'react';
import { FaEye, FaEyeSlash,  FaApple, } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router';
const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
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

            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-black mb-1">
                  FIRST NAME
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
                  LAST NAME
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
                PASSWORD
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
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-black">
                I agree to the <span className="underline cursor-pointer">Terms of Service and Privacy Policy.</span>
              </label>
            </div>
          </div>

          {/* Sign Up Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primaryBlue"
            >
              Sign Up
            </button>
          </div>

          {/* Already a member */}
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already a member?{' '}
              <Link to={"/signin"} className="font-medium text-primaryBlue ">
                Sign In
              </Link>
            </span>
          </div>

          {/* OR Divider */}
          <div className="relative">
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Social Login Options */}
          <div className="flex justify-center space-x-8">
            <button type="button" >
              <FcGoogle className="w-8 h-8" />
            </button>
            <button type="button" className="text-black">
              <FaApple className="w-8 h-8" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;