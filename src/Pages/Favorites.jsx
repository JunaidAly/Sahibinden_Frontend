import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import NavMenuBar from '../Components/NavMenuBar'
import Footer from '../Components/Footer'
import CommentForm from '../Components/Home/CommentForm'
import FavoritesContent from '../Components/Favorites/FavoritesContent'
import Accordion from '../Components/Favorites/Accordion'

function Favorites() {
     const [activeComponent, setActiveComponent] = useState('listing');
    
      const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
      };
  return (
    <>
        <Navbar />
        <NavMenuBar />
        <div className='mt-10 flex flex-row   p-5 gap-5'>
            <Accordion onComponentChange={handleComponentChange} />
            <FavoritesContent activeComponent={activeComponent} />
        </div>
        <CommentForm />
        <Footer />
    </>
  )
}

export default Favorites