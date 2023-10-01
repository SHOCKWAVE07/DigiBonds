// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DigiBonds {
    struct Bids{
        address owner;
        string title;
        string description;
        uint256 totalamt;
        uint256 dateofauction;
        uint256 bidplaced;
        string image; 
        address[] bidders;
        uint[] biddingamt;
    }
    mapping(uint256 => Bids) public biddings;

    uint256 public numberofBids=0;
    function createBids(address _owner, string memory _title,string memory _description, uint256 _totalamt, uint256 _dateofauction,string memory _image)public returns (uint256) {
        Bids storage bids = biddings[numberofBids];

        require(bids.dateofauction < block.timestamp, "The date of auction should be a date in the future.");

        bids.owner = _owner;
        bids.title = _title;
        bids.description = _description;
        bids.totalamt = _totalamt;
        bids.dateofauction = _dateofauction;
        bids.totalamt = 0;
        bids.image = _image;

        numberofBids++;

        return numberofBids - 1;
    }  

    function placeBids(uint256 _id) public payable {
        uint256 amount = msg.value;

        Bids storage bids = biddings[_id];
        bids.bidders.push(msg.sender);
        bids.biddingamt.push(amount);

        (bool sent,) = payable(bids.owner).call{value: amount}("");

        if(sent) {
            bids.bidplaced = bids.bidplaced + amount;
        }
    }

    function getBidders(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (biddings[_id].bidders, biddings[_id].biddingamt);
    }

    function getBiddings() public view returns (Bids[] memory) {
        Bids[] memory allBids = new Bids[](numberofBids);

        for(uint i = 0; i < numberofBids; i++) {
            Bids storage item = biddings[i];

            allBids[i] = item;
        }

        return allBids;
    }
}
