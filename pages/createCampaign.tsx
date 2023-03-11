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

  return (
    <div className='w-4/5'>
     <main>
      <div className='flex flex-col'>
        <h1>start a campgain</h1>
        <form action="" onSubmit={handleSubmit} className="flex flex-col">
          <FormField
          labelName ="Your Name *"
          placeholder = "John doe"
          inputType ="text"
          value={form.name}
          handleChange ={(e)=>handleFormFieldChange('name',e)}
          />
          <FormField
          labelName ="description*"
          placeholder = "enter desc of your case"
          isTextArea
          value={form.description}
          handleChange ={(e)=>handleFormFieldChange('description',e)}
          />
          <FormField
          labelName ="Image *"
          placeholder = "imageUrl"
          inputType ="text"
          value={form.image}
          handleChange ={(e)=>handleFormFieldChange('image',e)}
          />
          <FormField
          labelName ="Deadline "
          placeholder = "End date"
          inputType ="date"
          value={form.deadline}
          handleChange ={(e)=>handleFormFieldChange('deadline',e)}
          />
          <FormField
          labelName ="Target Amount *"
          placeholder = "ETH.0.5"
          inputType ="text"
          value={form.target}
          handleChange ={(e)=>handleFormFieldChange('target',e)}
          />
          <button type='submit' className='bg-green-600 h-8 w-[200px] rounded-md'>
            submitt new campaign
          </button>
        </form>
      </div>
     </main>
    </div>
  )
}

export default Layout(CreateCampaign)