import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './app/components/Footer'
import Header from './app/components/Header'
import toast, { Toaster } from 'react-hot-toast';


const App = () => {
  return (
   <>
   <Header/>
     <main className='min-h-[78vh]'>
      <Outlet/>
     </main>
    <Footer/>
    <Toaster/>
   </>
  )
}

export default App
