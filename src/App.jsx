import React from 'react'
import Routes from './Routes'
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from './Components/ScrollToTop';
function App() {

  return (
    <Router>
      <ScrollToTop />
      <Routes />
    </Router>
  )
}

export default App
