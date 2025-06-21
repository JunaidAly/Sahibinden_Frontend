

import { useState } from 'react';
import FavoriteListing from './FavoriteListing';
import FavoriteSellers from './FavoriteSellers';
import FavoriteSearches from './FavoriteSearches';

function FavoritesContent({ activeComponent }) {
  // Shared alert state
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Shared alert function for child components
  const handleShowAlert = (message, type) => {
    setAlertMessage(message);
    if (type === 'success') {
      setShowSuccessAlert(true);
    } else if (type === 'error') {
      setShowErrorAlert(true);
    }
  };

  // Render content based on activeComponent
  return (
    <>
      {/* Render active component */}
      {activeComponent === 'listing' && <FavoriteListing onShowAlert={handleShowAlert} />}
      {activeComponent === 'sellers' && <FavoriteSellers />}
      {activeComponent === 'searches' && <FavoriteSearches />}

      {/* Global Success Alert */}
      {showSuccessAlert && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-30 z-50"></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Success!</h3>
                  <p className="text-sm text-gray-500 mb-6">{alertMessage}</p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowSuccessAlert(false)}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Global Error Alert */}
      {showErrorAlert && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-30 z-50"></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
                  <p className="text-sm text-gray-500 mb-6">{alertMessage}</p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowErrorAlert(false)}
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FavoritesContent;