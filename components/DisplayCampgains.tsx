import React from 'react';
import { useRouter } from 'next/router';

function DisplayCampaigns({ campaigns }) {
  const router = useRouter();

  function daysLeft(date: string) {
    const deadline = new Date(date).getTime(); // Convert deadline to timestamp
    const today = new Date().getTime(); // Get today's date as a timestamp
    const diff = deadline - today; // Calculate the difference in milliseconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days and round down
    return days;
  }

  const handleCampaignClick = (id, campaign) => {
    const remainingDays = daysLeft(campaign.deadline);
    router.push({
      pathname: `/campaignDetail/${id}`,
      query: { ...campaign, remainingDays },
    });
  };

  return (
    <div>
      <main>
        <div className="flex flex-wrap justify-center items-center gap-[10px]">
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
                  className="h-[400px] w-[300px] rounded-md shadow-lg p-1 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-100 cursor-pointer"
                >
                  <img src={image} alt="" className="h-[250px] w-object-cover rounded-md shadow-sm " />

                  <div>
                    <div className="flex w-full">
                     
                      
                    </div>
                    <h1 className="text-2xl break-all font-bold">{description}</h1>
                    <div className="bg-gray-200 w-full h-4 rounded-full">
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
                  <div className="bg-gray-200 h-[35px] flex items-center justify-center w-1/2 rounded-md gap-2">
                        <img
                          src="https://www.svgrepo.com/show/507991/clock.svg"
                          alt=""
                          className="h-[20px] w-[20px]"
                        />

                        {daysLeft(deadline)} days left
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
