import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useStateContext } from '../../context';
import {FiArrowRight} from 'react-icons/fi'
function CampaignDetails() {
  const router = useRouter();
  const { creator, name, description, target, remainingDays, amountCollected, image, pId } = router.query;
  const percentage = Math.floor((amountCollected / target) * 100);
  
 
  const { donate, getDonors, contract, address } = useStateContext();

  
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  

  const fetchDonators = async () => {
    const data = await getDonors(pId);
    // console.log(data)
    setDonators(data);
  }

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {
   

    await donate(pId, amount); 

    router.push("/")
   
  }

  return (
<div className=" rounded overflow-hidden shadow-lg mt-20 flex space-x-4 pl-4 pr-8 ">
<div className='w-[70%]'>
<img className="w-full h-64 object-cover" src={image} alt="Campaign" />

<div className='py-4 flex space-x-8'>
  <img src={image} alt="" className='h-24 w-24'/>
   
  <h1>{name}</h1>
    
</div>
  <div className="py-4">

    <h1>About Campgaign</h1>
   <p className="text-gray-700 text-base mb-4">{description}</p>
   
   
   
    
  </div>
  <div 
  className='flex justify-center space-x-4 items-center bg-blue-500 rounded-full h-[40px] w-[220px] mb-12 hover:bg-blue-700 transition-all duration-200 cursor-pointer'>
    <h1 className='text-white'>Track donation</h1>
    <FiArrowRight className='text-white'/>
  </div>
</div>
<div className='w-[30%] bg-blue-200 p-4 h-[380px] shadow-sm '>
  <div className='flex items-center justify-between'>
    <h1 className='font-bold'>Total Raised</h1>
    <div className='bg-blue-200 rounded-md h-[30px] w-[70px] flex items-center justify-center'>
    <p className="text-gray-700  text-sm">{amountCollected}</p>
    </div>
  </div>
  <h1 className='py-2'>progress</h1>
  <h1 className='py-2'>{percentage}% Completed</h1>
  <div className="bg-gray-400 w-full h-4 rounded-full">
                      <div
                        className={`${
                          percentage < 99 ? 'bg-orange-500' : 'bg-green-500'
                        } h-full rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
  <div className='flex justify-between items-center py-2'>
    <div className='flex flex-col justify-center items-center'>
      <h1>Donors</h1>
      <p  className='font-bold'>{donators.length}</p>
    </div>
    <div  className='flex flex-col justify-center items-center'>
      <h1>Deadline</h1>
      <p  className='font-bold'>{remainingDays} days left</p>
    </div>
    <div  className='flex flex-col justify-center items-center'>
      <h1>Max eth</h1>
      <h1 className='font-bold'>0.02</h1>
    </div>
  </div>
  <h1 className='font-semibold capitalize py-2'>select amount to donate</h1>
  <div className="flex items-center py-2 pl-3">
      <input type="text" placeholder='0.02' value={amount} onChange={(e) => setAmount(e.target.value)}
        className=" py-2 border px-4 border-gray-400 outline-none" />
      
    </div>
   
   <button onClick={handleDonate}
      className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-6 ml-12 rounded transition-all duration-200 ">
      Contribute
    </button>
   

</div>
</div>



  )
}

export default Layout(CampaignDetails)
