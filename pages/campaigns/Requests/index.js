import Campaign from "../../../Ethereum/Campaign"
import 'semantic-ui-css/semantic.min.css'
import {Card,Form,Button,Container,Message,Label,Divider,Grid, GridColumn,Table} from "semantic-ui-react"
import Navbar from "../../../components/header";
import {Router,Link} from "../../../routes"
import TableRow from "../../../components/TableRow"


const Requests=({allRequest,campaign,address,totalcontribution}) =>{

    

    return(
        <Container>
            <Navbar/>
            <Link route={`/campaigns/${address}/requests/new`}>
             <a>
                 <Button floated="right" primary>Add New Request</Button>
             </a>
            </Link>
            <h3>Requests</h3>

            <Table celled>
                <Table.Header>
                <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Value(wei)</Table.HeaderCell>
                <Table.HeaderCell>Recipient</Table.HeaderCell>
                <Table.HeaderCell>Approval Count</Table.HeaderCell>
                <Table.HeaderCell>Approve</Table.HeaderCell>
                <Table.HeaderCell>Finalize</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                
                <Table.Body>
                    {
                        allRequest.map((request,index) => 
                            <TableRow request={request} id={index} key={index.toString()} address={address} campaign={campaign} totalcontribution={totalcontribution}/>
                        )
                    }
                </Table.Body>

            </Table>
        </Container>
    )
}

Requests.getInitialProps=async(props) =>{
    const address=props.query.address
    const campaign= Campaign(address)
    let allRequest=[]
    const allrequestsCount=await campaign.methods.getRequestcount().call();
    for(let i=0; i<allrequestsCount; i++){
         const newrequest=await campaign.methods.requests(i).call();
         allRequest.push(newrequest);
    }
    const totalcontribution=await campaign.methods.totalcontributors().call();
    return {allRequest:allRequest,campaign:campaign,address:address,totalcontribution:totalcontribution}
}

export default Requests