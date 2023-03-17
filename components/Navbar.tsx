import { useRouter } from 'next/router';
import React from 'react'
import { useStateContext } from '../context'
function Navbar() {

  const {connect,address} = useStateContext();
  const router = useRouter();
  return (
    <div className='flex justify-between items-center w-full h-12 sticky top-0 left-0 right-0 bg-white text-white z-50 '>
     <h1 className='text-black text-4xl font-bold ml-2'>Charity </h1>
     <button className={address ? "bg-green-600 h-8 px-2 mr-8 rounded-md hover:bg-green-700 shadow-lg ease-out-2s" : "bg-purple-500 h-8 px-2 mr-8 rounded-md hover:bg-purple-600 shadow-lg ease-out-2s"}
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