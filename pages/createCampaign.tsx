import React, { useState } from 'react'
import FormField from '../components/FormField';
import Layout from '../components/Layout'
import { useStateContext } from '../context';
import {ethers} from 'ethers'
import { useRouter } from 'next/router';
function CreateCampaign() {
  const router = useRouter();
  const {createCampaign} = useStateContext();
  const [form,setForm] = useState({
    name:"",
    description:"",
    image:"",
    deadline:"",
    target:"",
  });

  const handleSubmit = async (e)=>{
    e.preventDefault();

    await createCampaign({...form,target:ethers.utils.parseUnits(form.target,18)})
    console.log(form);
    
    router.push("/")
  }

  const handleFormFieldChange =(fieldName,e)=>{
    setForm({...form,[fieldName]:e.target.value})
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0]; // get today's date in ISO format
    setForm((prevForm) => ({
      ...prevForm,
      deadline: selectedDate,
    }));
    e.target.setAttribute('min', today); // set the min attribute to today's date
  };
  
  return (
    <div className=" bg-gray-200 shadow-md mt-12 p-4">
  <main className="flex justify-center">
    <div className="max-w-lg w-full">
      <h1 className="text-2xl font-bold text-center mb-4">Start a New Campaign</h1>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <div className="mb-4">
          <FormField
            labelName="Name"
            placeholder="Enter the Campgaign name here"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
        </div>
        <div className="mb-4">
          <FormField
            labelName="Description "
            placeholder="Enter a description of your case"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange("description", e)}
          />
        </div>
        <div className="mb-4">
          <FormField
            labelName="Image "
            placeholder="Paste the image url here"
            inputType="text"
            value={form.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
          />
        </div>
        <div className="mb-4">
          <FormField
            labelName="Deadline "
            placeholder="select the End date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => {
              handleFormFieldChange("deadline", e);
              handleDateChange(e);
            }}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="mb-4">
          <FormField
            labelName="Target Amount "
            placeholder="ETH 0.5"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Details
          </button>
        </div>
      </form>
    </div>
  </main>
</div>

  )
}

export default Layout(CreateCampaign)