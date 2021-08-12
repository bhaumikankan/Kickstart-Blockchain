const ganache=require("ganache-cli");
const Web3=require("web3");
const capmaignjson=require("../Ethereum/build/Campaign.json");
const campaignFactoryjson=require("../Ethereum/build/CreateCampaign.json");

const web3=new Web3(ganache.provider());

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach("deploy contract",async()=>{
     //get all address
     accounts= await web3.eth.getAccounts();
     //instanse of contract
     const campinstance=new web3.eth.Contract(campaignFactoryjson.abi);
     //deploy;
     factory=await campinstance.deploy({data:campaignFactoryjson.evm.bytecode.object}).send({
         from:accounts[0],
         gas:'3000000'
     })
    await factory.methods.Create('100').send({
         from:accounts[0],
         gas:'3000000'
     });
    const address=await factory.methods.getAllCamps().call();
    //console.log(address)
     campaignAddress=address[0];

     campaign=new web3.eth.Contract(
         capmaignjson.abi,
         campaignAddress
     )
     console.log(campaign)


})

describe("Campaign",async()=>{
    it("it will create new camp",async()=>{
        console.log("ok");
    })
})