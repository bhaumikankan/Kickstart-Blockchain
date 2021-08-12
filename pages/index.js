import React from "react";
import 'semantic-ui-css/semantic.min.css'
import factory from "../Ethereum/CampFactory";
import Navbar from "../components/header";
import { Button, Card, Container,Dimmer,GridColumn,GridRow,Icon,Loader,Grid } from 'semantic-ui-react'
import {Link} from '../routes'

const index=({list})=>{
    const getCards=()=>{
     const items=list.map(address=>{
        return({ header:address,
         description: <Link route={`/campaigns/${address}`}><a className='item'>ViewCampaign</a></Link>,
         fluid:true,
         style:{overflowWrap: 'break-word'}
        }
        )
     })
     return <Card.Group items={items}/>;
    }
    return(
        <div>
        <Container>
        <Navbar/>
           <h3>Open Campaigns</h3>
           <Link route='/campaigns/new'>
           <Button floated="right" primary >Create Campaign</Button>
           </Link>
            {getCards()}
        </Container>
        </div>
    )
}

index.getInitialProps=async()=>{
    const list=await factory.methods.getAllCamps().call();
    return { list:list }
}

export default index
