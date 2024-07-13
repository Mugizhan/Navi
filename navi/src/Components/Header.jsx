import React from 'react'
import {useNavigate} from 'react-router-dom'

const Header = () => {
  const navigate=useNavigate()

  const Login=()=>{
    navigate('/login')

  }

  return (
    <div>
      <div className='ml-5 mt-5 flex gap-12'>
      <div>
    <h1 className='text-2xl font-bold text-yellow-500'><span id='head'>Puddy</span></h1>
    </div>
    <div className='mt-1'>
      <ul className='flex gap-6'>
        <li><a href='#' className='text-sm  font-bold text-white pb-1  hover:border hover:border-2 hover:border-b-yellow-500 border-transparent '>HOME</a></li>
        <li><a href='#' className='text-sm  font-bold text-white pb-1  hover:border hover:border-2 hover:border-b-yellow-500 border-transparent '>FOODS</a></li>
      
<div className='ml-5'>
<svg xmlns="http://www.w3.org/2000/svg" onClick={Login} viewBox="0 0 24 24" fill="white" class="size-7">
  <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
</svg>

</div>
      </ul>
    </div>
    </div>
    </div>
  )
}

export default Header