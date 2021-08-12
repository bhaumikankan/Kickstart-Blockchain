// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract CreateCampaign{
    address[] public allCamps;
    
    function Create(uint minimum) public {
        address newCampaign = address( new Campaign(minimum,msg.sender));
        allCamps.push(newCampaign);
    }

    function getAllCamps() public view returns(address[] memory) {
        return allCamps;
    }
}

contract Campaign{

    struct Request{
        string name;
        uint value;
        address recipent;
        uint approvelnumber;
        bool iscomplete;
        mapping(address=>bool) approvals;
    }

    address public manager;
    uint public mimumAmmount;
    mapping(address=>bool) public contributers;
    uint public totalcontributors;
    Request[] public requests;

    constructor(uint minimum,address creator) {
        manager=creator;
        mimumAmmount=minimum;
    }
    
    function contribute() payable public {
        require(msg.value>=mimumAmmount, "YOU HAVE TO PAY A MINIMUM AMMOUNT TO BE A CONTRIBUTER");
        if(contributers[msg.sender]==true){
            contributers[msg.sender]=true;
        }else{
        contributers[msg.sender]=true;
        totalcontributors++;}
    }

    function createRequest(string memory n,uint v,address r) public{
        require(msg.sender==manager, "YOU ARE NOT A MANAGER OF THIS CAMP");
        Request storage newRequest=requests.push();
        
        newRequest.name=n;
        newRequest.value=v;
        newRequest.recipent=r;
        newRequest.iscomplete=false;
        newRequest.approvelnumber=0;

    }

    function approveRequest(uint index) public {
        Request storage request=requests[index];
        require(contributers[msg.sender]==true,"YOU ARE NOT A CONTRIBUTER OF THIS CAMP");
        require(request.approvals[msg.sender]==false,"YOU ALREADY VOTE FOR THIS REQUEST");
        request.approvals[msg.sender]=true;
        request.approvelnumber++;
    }

    function finalizeRquest(uint index) public{
        Request storage request=requests[index];
        require(msg.sender==manager, "YOU ARE NOT A MANAGER OF THIS CAMP");
        require(request.approvelnumber>(totalcontributors/2),"YOU HAVE TO GET HALF VOTE TO DO THIS");
        require(request.iscomplete==false, "THIS IS ALREADY APPROVED");

        payable(request.recipent).transfer(request.value);
        request.iscomplete=true;
    }

    function getSummary() public view returns(uint,uint,uint,uint,address){
        return (
            mimumAmmount, 
            address(this).balance, 
            requests.length, 
            totalcontributors,
            manager
        );
    }
    
    function getRequestcount() public view returns(uint){
        return(
           requests.length
        );
    }
}
