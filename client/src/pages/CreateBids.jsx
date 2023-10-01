import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';

const CreateBids = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createBids } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    totalamt: '', 
    dateofauction: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createBids({ ...form, totalamt: ethers.utils.parseUnits(form.totalamt, 18)})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create a new T-Bill</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Issueing Authority Name *"
            placeholder="Central/State Governmanet Name"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="T-Bill Type *"
            placeholder="T-Bill 91 days"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField 
            labelName="Bill Details *"
            placeholder="Yield rate , T&C"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">We charge 0% brokerage</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Total Amount *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.totalamt}
            handleChange={(e) => handleFormFieldChange('totalamt', e)}
          />
          <FormField 
            labelName="Date of Auction *"
            placeholder="Date of Auction"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('dateofauction', e)}
          />
        </div>

        <FormField 
            labelName="Central/State Gov. Logo *"
            placeholder="Place image URL of Central/State Gov. Logo"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit new T-Bill"
              styles="bg-[#1dc071]"
            />
          </div>
      </form>
    </div>
  )
}

export default CreateBids