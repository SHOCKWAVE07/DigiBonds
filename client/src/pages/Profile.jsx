import React, { useState, useEffect } from 'react'

import { DisplayBiddings } from '../components';
import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [biddings, setBiddings] = useState([]);

  const { address, contract, getUserBiddings } = useStateContext();

  const fetchBiddings = async () => {
    setIsLoading(true);
    const data = await getUserBiddings();
    setBiddings(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchBiddings();
  }, [address, contract]);

  return (
    <DisplayBiddings 
      title="All Biddings"
      isLoading={isLoading}
      biddings={biddings}
    />
  )
}

export default Profile