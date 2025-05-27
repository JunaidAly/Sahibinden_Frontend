import React from 'react'
import Navbar from '../Navbar'
import NavMenuBar from '../NavMenuBar'
import Footer from '../Footer'
import CommentForm from '../Home/CommentForm'

function CartPage() {
  return (
    <>
    <Navbar />
    <NavMenuBar />
    <div className='max-w-4xl h-96  w-full mx-auto flex flex-col  gap-5 items-center justify-center p-6 shadow-custom-diagonal rounded-lg mt-10 font-poppins'>
           <div className='w-36 h-36'>
           <img src="/assets/cart.png"  alt="cart" className='w-full h-full' />
           </div>
           <h3 className='text-md font-medium '>No Items found in your cart</h3>
          <button className='bg-primaryBlue text-white py-2 px-5 font-normal text-lg rounded-full uppercase'>Post an ad</button>
            
    </div>
    <CommentForm />
    <Footer />
    </>
  )
}

export default CartPage