import React,{useContext,createContext} from "react";

import { useAddress,useContract,useMetamask,useContractWrite } from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider =({children})=>{
    const {contract} = useContract("0x91F32b93179cC2B0D9f48B57D33e03EC11642551");

    const {mutateAsync: createCampaign} = useContractWrite(contract,'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
          const data = await createCampaign([
            
            form.name, // title
            form.description, // description
            form.target,
            new Date(form.deadline).getTime(), // deadline,
            form.image,
            address, // owner
          ])
    
          console.log("contract call success", data)
        } catch (error) {
          console.log("contract call failure", error)
        }
      }
      const getCampaigns = async () => {
        const campaigns = await contract.call('getAllCampaigns');
     console.log(campaigns)
        const parsedCampaings = campaigns.map((campaign, i) => ({
          creator: campaign.creator,
          name: campaign.name,
          description: campaign.description,
          target: campaign.goalAmount?.toString() ? ethers.utils.formatEther(campaign.goalAmount.toString()) : '',
          deadline: campaign.deadline.toNumber(),
          amountCollected: campaign.raisedAmount?.toString() ? ethers.utils.formatEther(campaign.raisedAmount.toString()) : '',
          image: campaign.imageUrl,
          pId: i
        }));
          // console.log(parsedCampaings)
    
        return parsedCampaings;
      }
      
      const getUserCampaigns = async (address) => {
        const allCampaigns = await getCampaigns();
      
        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.creator === address);
      
        
        
        return filteredCampaigns;
      }
      
      const donate = async (pId, amount) => {
        if (!amount || amount.trim() === '') {
          throw new Error('Amount is required');
        }
      
        const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});
      
        return data;
      }
      
    
      const getDonors = async (pId) => {
        const donors = await contract.call('getDonators', pId);
        // console.log('donors:', donors);
      
        return donors;
      }
      
    

      return (
        <StateContext.Provider
          value={{ 
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
             getCampaigns,
             getUserCampaigns,
             donate,
             getDonors
          }}
        >
          {children}
        </StateContext.Provider>
      )
    }
    
    export const useStateContext = () => useContext(StateContext);




