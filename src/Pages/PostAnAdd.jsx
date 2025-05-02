import React from 'react'
import Navbar from '../Components/Navbar'
import CategorySelection from '../Components/AddAnPost/CategorySelection'
import Footer from '../Components/Footer'
import CategorySearch from '../Components/AddAnPost/CategorySearch'
import CommentForm from '../Components/Home/CommentForm'
function PostAnAdd() {
  return (
    <>
    
    <div className='min-h-screen'>
        <Navbar/>
        <CategorySelection/>
        <CategorySearch/>
        <CommentForm/>
        <Footer/>
    </div>
    </>
  )
}

export default PostAnAdd