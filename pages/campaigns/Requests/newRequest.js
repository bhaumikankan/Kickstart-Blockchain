import Campaign from "../../../Ethereum/Campaign"
import 'semantic-ui-css/semantic.min.css'
import {Card,Form,Button,Container,Message,Label,Divider,Grid, GridColumn} from "semantic-ui-react"
import Navbar from "../../../components/header";
import {Router,Link} from "../../../routes"
import React from "react"
import web3 from "../../../Ethereum/web3"


const NewRequests=({campaign}) =>{
    const [name,setName]=React.useState('');
    const [value,setValue]=React.useState('');
    const [recipant,setRecipant]=React.useState('');
    const [load,setLoad]=React.useState(false);
    const[error,setError]=React.useState(false);
    const[success,setSuccess]=React.useState(false);

    const handelSubmit=async(e)=>{
          e.preventDefault();
          setLoad(true);
          try{
          const addresses=await web3.eth.getAccounts();
          await campaign.methods.createRequest(name,value,recipant).send({
               from: addresses[0]
          })
          setLoad(false);
          setSuccess("Request added successfully")
        }catch(err) {
            setLoad(false);
            setError(err.message);
        }
    }

    return(
        <Container>
            <Navbar/>
            <h3>Requests</h3>
            <Form onSubmit={handelSubmit} error={error} success={success}>
            <Form.Input label='Request Name' placeholder='Name' value={name} onChange={e=>setName(e.target.value)}/>
            <Form.Input label='Value of the profuct(wei)' placeholder='Value' value={value} onChange={e=>setValue(e.target.value)} />
            <Form.Input label='Recipient Address' placeholder='Walet address' value={recipant} onChange={e=>setRecipant(e.target.value)}/>
            <Message
            error
            header='Opps!!'
            content={error}
            />
            <Message
            success
            header='Success!!'
            content={success}
            />
            <Button loading={load} primary>Submit</Button>
            </Form>
        </Container>
    )
}

NewRequests.getInitialProps=async(props) =>{
    const address=props.query.address
    const campaign= Campaign(address)
    return {campaign:campaign}
}

export default NewRequests