import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x8b1E57B31E9e4652B192c4db8A69bF3Ea1Fb87a5');
  const { mutateAsync: createBids } = useContractWrite(contract, 'createBids');

  const address = useAddress();
  const connect = useMetamask();

  const publishBids = async (form) => {
    try {
      const data = await createBids({
				args: [
					address, // owner
					form.title, // title
					form.description, // description
					form.totalamt,
					new Date(form.dateofauction).getTime(), // deadline,
					form.image,
				],
			});

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getBiddings = async () => {
    const biddings = await contract.call('getBiddings');

    const parsedBiddings = biddings.map((bidding, i) => ({
      owner: bidding.owner,
      title: bidding.title,
      description: bidding.description,
      target: ethers.utils.formatEther(bidding.totalamt.toString()),
      dateofauction: bidding.dateofauction.toNumber(),
      bidplaced: ethers.utils.formatEther(bidding.bidplaced.toString()),
      image: bidding.image,
      pId: i
    }));
    return parsedBiddings;
  }

  const getUserBiddings = async () => {
    const allBiddings = await getBiddings();

    const filteredBiddings = allBiddings.filter((bidding) => bidding.owner === address);

    return filteredBiddings;
  }

  const bid = async (pId, amount) => {
    const data = await contract.call('placeBids', [pId], { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getBids = async (pId) => {
    const biddations = await contract.call('getBidders', [pId]);
    const numberofBids = biddations[0].length;

    const parsedBidders = [];

    for(let i = 0; i < numberofBids; i++) {
      parsedBidders.push({
        biddator: biddations[0][i],
        biddation: ethers.utils.formatEther(biddations[1][i].toString())
      })
    }

    return parsedBidders;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createBids: publishBids,
        getBiddings,
        getUserBiddings,
        bid,
        getBids
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);