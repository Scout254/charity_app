import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'


function Sidebar() {
  const router = useRouter();
  
  return (
    <div className=' text-black  h-screen sticky bottom-0'>
      <div className='flex flex-col gap-2'>
      <Link href="/">
      <div className='bg-gray-200 flex items-center gap-1 h-[40px] w-full'>
        <img src="https://cdn-icons-png.flaticon.com/128/3405/3405258.png" alt=""
        className='h-[30px] w-[30px]'
        />
        <h1>Dashboard</h1>
      </div>
      </Link>
      <Link href="/profile">
        <div className='bg-gray-200 flex items-center gap-1 h-[40px] w-full'>
        <img src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png" alt="" 
        className='h-[30px] w-[30px]'
        
        />
        <h2>Profile</h2>
        </div>
        
      </Link>
      <Link href="/">
      
      <div className='bg-gray-200 flex items-center gap-1 h-[40px] w-full'>
      <img src="https://cdn-icons-png.flaticon.com/128/2529/2529508.png" alt=""
      className='h-[30px] w-[30px]'
      
      />
      <h2>Logout</h2>
      </div>
        
      </Link>
      </div>
    
    </div>
  )
}

export default Sidebar;
