import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import NavMenuBar from '../Components/NavMenuBar'
import Footer from '../Components/Footer'
import CommentForm from '../Components/Home/CommentForm'
import NavigationMenu from '../Components/MassageAndNotifications/NavigationMenu'
import Content from '../Components/MassageAndNotifications/Content'
function MassageAndNotifications() {
    const [activeComponent, setActiveComponent] = useState('messages');
    
      const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
      };
  return (
         <>
         <Navbar />
            <NavMenuBar />
            <div className='mt-10 flex flex-row justify-center p-5 gap-5'>
                <NavigationMenu  onSectionChange={handleComponentChange}/>
                <Content activeComponent={activeComponent} />
                </div>
            <CommentForm />
            <Footer />        
         </>
)
}

export default MassageAndNotifications