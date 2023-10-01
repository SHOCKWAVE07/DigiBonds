import React, { useState, useEffect } from 'react'

import { DisplayBiddings } from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [biddings, setBiddings] = useState([]);

  const { address, contract, getBiddings } = useStateContext();

  const fetchBiddings = async () => {
    setIsLoading(true);
    const data = await getBiddings();
    setBiddings(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchBiddings();
  }, [address, contract]);

  return (
    <DisplayBiddings
      title="All Bills"
      isLoading={isLoading}
      biddings={biddings}
    />
  )
}

export default Home