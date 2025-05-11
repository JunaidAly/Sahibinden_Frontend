import React from 'react'
import { useState } from 'react'
import Navbar from '../Components/Navbar'
import NavMenuBar from '../Components/NavMenuBar'
import Footer from '../Components/Footer'
import CommentForm from '../Components/Home/CommentForm'
import NavigationMenu from '../Components/MyAccount/AccountNavigationMenu'
import MyAccountContent from '../Components/MyAccount/MyAccountContent'
function MyAccount() {
     const [activeComponent, setActiveComponent] = useState('personalInfo');
    
      const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
      };
  return (
    <>
    <Navbar />
    <NavMenuBar />
    <div className='mt-10 flex flex-row justify-center p-5 gap-5'>
    <NavigationMenu  onSectionChange={handleComponentChange} />
    <MyAccountContent activeComponent={activeComponent} />
    </div>
    <CommentForm />
    <Footer />
    </>
  )
}

export default MyAccount