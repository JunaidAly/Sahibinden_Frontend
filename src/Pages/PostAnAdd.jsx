import React from 'react'
import Header from '../Components/AddAnPost/Header'
import CategorySelection from '../Components/AddAnPost/CategorySelection'
import Footer from '../Components/Footer'
import CategorySearch from '../Components/AddAnPost/CategorySearch'
import CommentForm from '../Components/Home/CommentForm'
function PostAnAdd() {
  return (
    <>
    
    <div className='min-h-screen'>
        <Header/>
        <CategorySelection/>
        <CategorySearch/>
        <CommentForm/>
        <Footer/>
    </div>
    </>
  )
}

export default PostAnAdd