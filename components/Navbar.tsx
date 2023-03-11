import { useRouter } from 'next/router';
import React from 'react'
import { useStateContext } from '../context'
function Navbar() {

  const {connect,address} = useStateContext();
  const router = useRouter();
  return (
    <div className='flex justify-between items-center w-full h-12 sticky top-0 left-0 right-0 bg-white text-white z-50'>
     <h1 className='text-black'>donate</h1>
     <button className={address ? "bg-green-600 h-8 w-object-cover" : "bg-purple-500 h-8 w-object-cover rounded-md px-2"}
     onClick={() => {
      if (address) {
        router.push("/createCampaign");
      } else {
        connect();
      }
    }}
    
     >
       {address ? "Create Campaign" : "connect"}
      
      </button>
    </div>
  )
}

export default Navbar