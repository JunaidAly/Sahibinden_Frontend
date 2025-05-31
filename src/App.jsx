import React from 'react'
import Routes from './Routes'
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from './Components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
function App() {

  return (
    <AuthProvider>
    <Router>
      <ScrollToTop />
      <Routes />
    </Router>
    </AuthProvider>
  )
}

export default App
