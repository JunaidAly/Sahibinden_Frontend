import React from 'react'
import Navbar from '../Navbar'
import NavbarMenu from './NavbarMenu'
import Footer from '../Footer'
import CommentForm from '../Home/CommentForm'
import RealEstateIndex from './RealEstateIndex'
import RealEstateExpertise from './RealEstateExpertise'
import Credit from '../RealEstate/CreditOffer'
import RealEstateGuide from './RealEstateGuide'
function RealEstate() {
  return (
    <>
    <Navbar/>
    <NavbarMenu/>
    <div className='max-w-7xl w-full mx-auto font-poppins'>
        <RealEstateIndex/>
        <RealEstateExpertise/>
        <Credit/>
        <RealEstateGuide/>
    </div>
    <CommentForm/>
    <Footer/>
    </>
  )
}

export default RealEstate