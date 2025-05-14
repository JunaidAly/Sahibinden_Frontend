import React, { useState } from 'react';
import { FaEye, FaEyeSlash,  FaApple,  } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
          <h2 className="text-center text-4xl font-bold text-black">
            Log In to Sahibinden
          </h2>
          <p className="mt-2 text-center text-sm text-primarygray">
            Quick & Simple way to Automate your payment
          </p>
        </div>

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
                <a
                  href="#"
                  className="font-medium text-primarygray underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>

          {/* PROCEED Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-primaryBlue"
            >
              Sign In with your email
            </button>
          </div>

          {/* Not a member */}
          <div className="text-center">
            <span className="text-base text-black">
              Not a member?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-primaryBlue"
              >
                Sign Up
              </Link>
            </span>
          </div>

          {/* OR USE Divider */}
          <div className="relative">
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-black text-base">
                OR USE
              </span>
            </div>
          </div>

          {/* Social Login Options */}
          <div className="flex justify-center space-x-8">
            <button type="button">
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

export default LoginForm;