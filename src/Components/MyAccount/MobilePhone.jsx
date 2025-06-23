

import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase'; // Adjust path to your firebase config

function MobilePhone() {
  const [user, loading, error] = useAuthState(auth);
  const [homePhone, sethomePhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const db = getFirestore();

  // Format phone number as user types
  const formathomePhone = (value) => {
    // Remove all non-digits
    const homePhone = value.replace(/\D/g, '');
    
    // Format as +90(XXX)XX XXX
    if (homePhone.length <= 3) {
      return `+90(${homePhone}`;
    } else if (homePhone.length <= 5) {
      return `+90(${homePhone.slice(0, 3)})${homePhone.slice(3)}`;
    } else {
      return `+90(${homePhone.slice(0, 3)})${homePhone.slice(3, 5)} ${homePhone.slice(5, 8)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formathomePhone(e.target.value);
    sethomePhone(formatted);
  };

  const handleAddhomePhone = async () => {
    if (!user) {
      setMessage('Please log in to add your phone number.');
      return;
    }

    // Basic validation
    const cleanPhone = homePhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setMessage('Please enter a valid phone number.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // Reference to the user's document
      const userDocRef = doc(db, 'users', user.uid);
      
      // Update the document with phone number and updatedAt timestamp
      await updateDoc(userDocRef, {
        homePhone: homePhone,
        updatedAt: new Date().toISOString()
      });

      setMessage('Phone number added successfully!');
      // Optionally clear the input
      // sethomePhone('');
    } catch (error) {
      console.error('Error updating phone number:', error);
      setMessage('Error adding phone number. Please try again.');
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
      <h1 className="text-xl font-medium text-black">Mobile Phone</h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <h1 className="text-xl font-semibold text-black">
          Help Us Protect Your Account
        </h1>
        <p className="text-sm text-black font-normal">
          You can add your mobile phone number so that you can log in to your
          account when you forget your password or protect your account with SMS
          verification.
        </p>
        <div className="flex-1 gap-2 items-center mt-2">
          <label className="w-full block text-sm font-medium text-black mb-1">
            Mobile Phone Number
          </label>
          <input
            type="text"
            value={homePhone}
            onChange={handlePhoneChange}
            placeholder="+90(__)__ ___"
            maxLength={14}
            className="w-full px-4 py-3 border placeholder:text-gray-400 border-[#1544AB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {message && (
          <div className={`mt-3 p-3 rounded-md text-sm ${
            message.includes('Error') || message.includes('Please') 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <button
          type="button"
          onClick={handleAddhomePhone}
          disabled={isSubmitting || !homePhone.trim()}
          className={`px-5 py-2 mt-4 capitalize font-medium rounded-full transition-colors ${
            isSubmitting || !homePhone.trim()
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-[#1544AB] text-white hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Adding...' : 'Add My Phone Number'}
        </button>
      </div>
    </div>
  );
}

export default MobilePhone;