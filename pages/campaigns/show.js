import React from "react";
import 'semantic-ui-css/semantic.min.css'
import {Router,Link} from "../../routes"
import web3 from"../../Ethereum/web3"
import Navbar from "../../components/header";
import CampCard from "../../components/Campcard";
import {Card,Form,Button,Container,Message,Label,Divider,Grid, GridColumn} from "semantic-ui-react"
import Camp from "../../Ethereum/build/Campaign.json"
import Campaign from "../../Ethereum/Campaign"

const show=({campdetail,campaign,address}) => {

    const [value,setValue]=React.useState('');
    const [load,setLoad]=React.useState(false);
    const[error,setError]=React.useState(false);
    const handelSubmit=async(e) => {
        e.preventDefault();
        setError(false);
        try{
        setLoad(true);
        const accounts=await web3.eth.getAccounts();
        await campaign.methods.contribute().send(
            {
              from: accounts[0],
              value:value
            }
        );
        setLoad(false);
        setValue('');
        Router.replaceRoute(`/campaigns/${address}`)
        }catch(err){
            setLoad(false);
            setError(`${err.message}`);
        }
    }

   return(
    <Container>
       <Navbar/>
       <h3>Campaign Details</h3>
       <Grid>
        <GridColumn  width={10}>
       <Card.Group >
           <CampCard title="Address of the manager" value={`${campdetail[4]}`}/>
           <CampCard title="Campaign Balance" value={`${campdetail[1]} wai`}/>
           <CampCard title="Minimum Contribution" value={`${campdetail[0]} wai`}/>
           <CampCard title="Requests" value={`${campdetail[2]}`}/>
           <CampCard title="Contributors" value={`${campdetail[3]}`}/>
       </Card.Group>
       </GridColumn>   
       <Grid.Column   width={6}>
       <Card >
           <Card.Content>
       <Form onSubmit={handelSubmit} error={error}>
           <Label>CONTRIBUTE TO THE CAMPAIGN</Label>
           <Form.Input style={{marginTop:'10px'}} value={value} onChange={e=>setValue(e.target.value)} placeholder='ammount(wei)' />
           <Message
          error
          header='Opps!!'
          content={error}
          />
           <Button loading={load} type='submit' primary>Contribute</Button>
        </Form>
           </Card.Content>
        </Card>

        </Grid.Column>

        </Grid>
        <Divider></Divider>
        <Link route={`/campaigns/${address}/requests`}>
        <a>
            <Button primary>Show Requests</Button>
        </a>
        </Link>

    </Container>
   )
}

show.getInitialProps=async(props)=>{
    const address=props.query.address
    const campaign= Campaign(address)
    const campdetail=await campaign.methods.getSummary().call();
    //console.log(campdetail)
    return {campdetail:campdetail,campaign:campaign,address:address}
}

export default show;