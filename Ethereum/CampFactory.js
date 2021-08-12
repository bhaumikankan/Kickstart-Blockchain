import web3 from "./web3";
import createCamp from "./build/CreateCampaign.json"

const address='0x76042d4822DD726d03f2f48cf3194df9b17D8aeB'
const abi=createCamp.abi;

export default new web3.eth.Contract(abi,address)
