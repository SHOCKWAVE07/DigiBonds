import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayBiddings = ({ title, isLoading, biddings }) => {
  const navigate = useNavigate();

  const handleNavigate = (bidding) => {
    navigate(`/bidding-details/${bidding.title}`, { state: bidding })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({biddings.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && biddings.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#0000]">
            You have not created any bidss yet
          </p>
        )}

        {!isLoading && biddings.length > 0 && biddings.map((bidding) => <FundCard 
          key={uuidv4()}
          {...bidding}
          handleClick={() => handleNavigate(bidding)}
        />)}
      </div>
    </div>
  )
}

export default DisplayBiddings