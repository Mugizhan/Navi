import React from 'react'
import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Bg from './Components/image/yellow.png'
import Home from './Components/Home'

const Home1 = () => {

    const [Value,setValue]=useState()
  
    return (
      <>
      <div className='bg-black h-screen'>
       <div className='bg-black w-screen h-Screen'>
  
       <img src={Bg} className='relative right-44 bottom-56 opacity-50'/>
      <div className='fixed inset-0 bg-white opacity-10 w-screen h-screen backdrop-blur-sm rounded-3xl my-1 '>
  
  
  
      </div>
      <div className='fixed inset-0 m-2'>
      <Header />
      <Home />
      </div>
  
      </div>
        </div>
      </>
    )
  }
  

export default Home1


