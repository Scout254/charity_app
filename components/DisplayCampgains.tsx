import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStateContext } from '../context';
import {ImAlarm} from 'react-icons/im'
import {BsPeople} from 'react-icons/bs'
function DisplayCampaigns({ campaigns }) {
  const router = useRouter();

  function daysLeft(date: string) {
    const deadline = new Date(date).getTime(); // Convert deadline to timestamp
    const today = new Date().getTime(); // Get today's date as a timestamp
    const diff = deadline - today; // Calculate the difference in milliseconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days and round down
    return days;
  }
  const {address,contract,getCampaigns,getDonors} = useStateContext();
  const handleCampaignClick = (id, campaign) => {
    const remainingDays = daysLeft(campaign.deadline);
    router.push({
      pathname: `/campaignDetail/${id}`,
      query: { ...campaign, remainingDays },
    });
  };
  const [donators, setDonators] = useState({});

// console.log("donors:",donators)
const fetchDonators = async (pId) => {
  const data = await getDonors(pId);
  setDonators((prevDonators) => ({ ...prevDonators, [pId]: data.length }));
};

  
  useEffect(() => {
    if (contract && campaigns.length > 0) {
      campaigns.forEach((campaign) => {
        fetchDonators(campaign.pId);
      });
    }
  }, [contract, campaigns]);

  type Props = {
    name: string;
  };
  const TruncatedHeading: React.FC<Props> = ({ name }) => {
    const words = name.split(" ");
    const truncatedName = words.length > 3 ? `${words.slice(0, 3).join(" ")}...` : name;
  
    return <h1 className="font-bold">{truncatedName}</h1>;
  };
  

  return (
    <div>
      <main>
        <div className="flex flex-wrap  items-center gap-[10px] bg-gray-200 p-5">
          {campaigns?.map(
            ({ pId, name, creator, description, image, deadline, amountCollected, target }) => {
              const percentage = Math.floor((amountCollected / target) * 100);

              return (
                <div
                  key={pId}
                  onClick={() =>
                    handleCampaignClick(pId, {
                      pId,
                      name,
                      creator,
                      description,
                      image,
                      deadline,
                      amountCollected,
                      target,
                    })
                  }
                  className=" w-[280px] rounded-md shadow-lg p-5 "
                >
                  <img src={image} alt="" className="h-[100px] w-full   " />

                  <div>
                    <div className="flex w-full">
                     
                      
                    </div>
                    <TruncatedHeading name={name} />
                    <div className="bg-gray-400 w-full h-4 rounded-full">
                      <div
                        className={`${
                          percentage < 99 ? 'bg-orange-500' : 'bg-green-500'
                        } h-full rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-right mt-1 font-medium">
                      Raised: ETH {amountCollected} ({percentage}% of target)
                    </p>
                    <p className="text-sm text-right font-medium">Target: ETH {target}</p>
                  </div>
                  <div className='flex justify-between items-center '>
                    <div className='flex items-center space-x-2'>
                      <BsPeople/>
                    <p className="text-sm text-right font-medium">{donators[pId] || 0} donors</p>
                    </div>
                  <div className="flex items-center space-x-2">
                       
                       <ImAlarm/>
                      <h1>{daysLeft(deadline)} days left</h1>
                     </div>
                  </div>
                  
                     
                </div>
              );
            }
          )}
        </div>
      </main>
    </div>
  );
}

export default DisplayCampaigns;
