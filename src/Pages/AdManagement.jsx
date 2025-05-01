// import React from 'react'
// import Navbar from '../Components/Navbar'
// import Footer from '../Components/Footer'
// import Accordion from '../Components/AdManagement/Accordion'
// import Dashboard from '../Components/AdManagement/Dashboard'
// import CommentForm from '../Components/Home/CommentForm'
// function AdManagement() {
//   return (
//     <>
//     <Navbar />
//     <div className='min-h-screen flex flex-col gap-5 items-center'>
//         <div className='flex  justify-center w-full max-w-[1250px]  '>
//           <Accordion />
//           <Dashboard />
//         </div>
//         <div className='w-full max-w-[1250px]'>
//         <CommentForm />
//         </div>
//     </div>
//     <Footer />
//     </>
//   )
// }

// export default AdManagement



// AdManagement.jsx
import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Accordion from '../Components/AdManagement/Accordion'
import Dashboard from '../Components/AdManagement/Dashboard'
import PublishedAdvertisements from '../Components/AdManagement/PublishedAdvertisements'
import CommentForm from '../Components/Home/CommentForm'

function AdManagement() {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  // Function to be passed to Accordion to change active component
  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  // Render the appropriate component based on activeComponent state
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'onAir':
        return <PublishedAdvertisements />;
      case 'notOnAir':
        // Replace with your NotOnAir component when created
        return <div>Not On Air Component</div>;
      case 'myTransactions':
        // Replace with your MyTransactions component when created
        return <div>My Transactions Component</div>;
      case 'myExpertReports':
        // Replace with your MyExpertReports component when created
        return <div>My Expert Reports Component</div>;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Navbar />
      <div className='min-h-screen flex flex-col gap-5 items-center'>
        <div className='flex justify-center w-full max-w-[1250px]'>
          <Accordion onComponentChange={handleComponentChange} />
          {renderActiveComponent()}
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