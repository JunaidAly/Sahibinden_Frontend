import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import NavMenuBar from '../Components/NavMenuBar'
import Footer from '../Components/Footer'
import CommentForm from '../Components/Home/CommentForm'
import Accordion from '../Components/Services/Accordion'
import ServicesContent from '../Components/Services/ServicesContent'

function Services() {
  const [activeComponent, setActiveComponent] = useState('auto360');

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      <Navbar />
      <NavMenuBar />
      <div className='mt-10 flex flex-row justify-center p-5 gap-5'>
          <Accordion onComponentChange={handleComponentChange} />
          <ServicesContent activeComponent={activeComponent} />
      </div>
      <CommentForm />
      <Footer />
    </>
  )
}

export default Services