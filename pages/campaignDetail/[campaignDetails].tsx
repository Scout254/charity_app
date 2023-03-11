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
    <div className='w-4/5'>
      <img src={image} alt="" className='h-[250px] w-[250px]' />
      <h1>{name}</h1>
      <p>{description}</p>
      <p>Address: {creator}</p>
      <p>Amount Collected: {amountCollected}</p>
      <p>Target: {target}</p>
     {donators.length} donors
      <input
       type="text"
        placeholder='0.1'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        />
     {remainingDays} days left
    <button 
    onClick={handleDonate}
    className='py2 bg-green-600 w-object-cover p-2 rounded-md'>fund cmpgain</button>
    </div>

  )
}

export default Layout(CampaignDetails)
