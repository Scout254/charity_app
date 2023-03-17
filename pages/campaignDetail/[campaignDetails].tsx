import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useStateContext } from '../../context';

function CampaignDetails() {
  const router = useRouter();
  const { creator, name, description, target, remainingDays, amountCollected, image, pId } = router.query;

  
 
  const { donate, getDonors, contract, address } = useStateContext();

  
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  

  const fetchDonators = async () => {
    const data = await getDonors(pId);
    console.log(data)
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
<div className="w-[450px] rounded overflow-hidden shadow-lg">
  <img className="w-full h-64 object-cover" src={image} alt="Campaign" />
  <div className="py-4">
    <div className="font-bold text-xl mb-2">{name}</div>
    <p className="text-gray-700 text-base mb-4">{description}</p>
    <div className="mb-4">
      <p className="text-gray-700 text-base mb-2">{creator}</p>
      <p className="text-gray-700 text-base mb-2">Amount Collected: {amountCollected}</p>
      <p className="text-gray-700 text-base mb-2">Target: {target}</p>
      <p className="text-gray-700 text-base">{donators.length} donors</p>
    </div>
    <div className="flex items-center mb-4">
      <input type="text" placeholder='0.1' value={amount} onChange={(e) => setAmount(e.target.value)}
        className="w-20 py-2 px-3 mr-2 rounded-md border border-gray-400 outline-none" />
      <p className="text-gray-600 text-sm">ETH</p>
    </div>
    <p className="text-gray-700 text-base mb-4">{remainingDays} days left</p>
    <button onClick={handleDonate}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all duration-200">
      Fund Campaign
    </button>
  </div>
</div>



  )
}

export default Layout(CampaignDetails)
