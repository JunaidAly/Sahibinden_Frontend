import React from 'react'
import Navbar from '../Components/Navbar'
import NavMenuBar from '../Components/NavMenuBar'
import Footer from '../Components/Footer'
import PropertyListing from '../Components/AdDetails/PropertyListing'
import { PropertyDescription } from '../Components/AdDetails/PropertyListing'
import CommentForm from '../Components/Home/CommentForm'
function AdDetails() {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <NavMenuBar />
      <PropertyListing />
      <PropertyDescription />
      <CommentForm />
      <Footer />
    </div>
  )
}

export default AdDetails