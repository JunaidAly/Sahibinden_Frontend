// src/components/auth/ProtectedAction.js
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from './AuthModal';

const ProtectedAction = ({ 
  children, 
  fallback, 
  requireAuth = true 
}) => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const handleProtectedClick = (callback) => {
    if (isAuthenticated) {
      // User is authenticated, execute the action
      if (callback) callback();
    } else {
      // User is not authenticated, show auth modal
      setPendingAction(() => callback);
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // Execute the pending action after successful authentication
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleAuthClose = () => {
    setShowAuthModal(false);
    setPendingAction(null);
  };

  // If requireAuth is false, always show the children
  if (!requireAuth) {
    return children;
  }

  return (
    <>
      {React.cloneElement(children, {
        onClick: (e) => {
          e.preventDefault();
          handleProtectedClick(children.props.onClick);
        }
      })}
      
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={handleAuthClose}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
};

export default ProtectedAction;