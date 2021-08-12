import web3 from "./web3";
import Camp from "./build/Campaign.json"

const abi=Camp.abi;

export default address=>{
    return(new web3.eth.Contract(abi,address))
}