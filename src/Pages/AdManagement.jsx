import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Accordion from '../Components/AdManagement/Accordation'
import Dashboard from '../Components/AdManagement/Dashboard'
import CommentForm from '../Components/Home/CommentForm'
function AdManagement() {
  return (
    <>
    <Navbar />
    <div className='min-h-screen flex flex-col gap-5 items-center'>
        <div className='flex  justify-center w-full max-w-[1250px]  '>
          <Accordion />
          <Dashboard />
        </div>
        <div className='w-full max-w-[1250px]'>
        <CommentForm />
        </div>
    </div>
    <Footer />
    </>
  )
}

export default AdManagement