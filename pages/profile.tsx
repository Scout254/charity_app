import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import React,{useEffect,useState} from 'react'
import { useStateContext } from '../context'
import DisplayCampgains from '../components/DisplayCampgains'
const Profile: NextPage = () => {

  const [campaigns , setCampaigns] = useState([]);
const {address,contract,getUserCampaigns} = useStateContext();

const fetchCampaigns = async () => {
  const data = await getUserCampaigns(address); // Pass the address as a parameter here
  setCampaigns(data);  
}

useEffect(() => {
  if(contract) fetchCampaigns();
},[address,contract])



  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
         <DisplayCampgains campaigns={campaigns}/>
        </div>
      </main>
      
    </div>
  )
}

export default Layout(Profile)
