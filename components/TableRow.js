import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import { Button, Dropdown, Menu ,Table} from 'semantic-ui-react'
import {Link,Router} from '../routes'
import web3 from "../Ethereum/web3"

const TableRow=(props)=>{
   const[load1,setLoad1]=React.useState(false)
   const[load2,setLoad2]=React.useState(false)
   const[error,setError]=React.useState(false) 
   const readyTofinalize=props.request.approvelnumber>(props.totalcontribution)/2;

   const handelApprove=async()=>{
       setLoad1(true)
       try{
      const accounts=await web3.eth.getAccounts(); 
      await props.campaign.methods.approveRequest(props.id).send({
           from:accounts[0]
       })
       setLoad1(false);
       Router.replaceRoute(`/campaigns/${props.address}/requests`)
    }catch(err) {
          setLoad1(false);
          setError(err.message);
    }

   }
   

   const handelFinalize=async()=>{
    setLoad2(true)
       try{
        const accounts=await web3.eth.getAccounts(); 
        await props.campaign.methods.finalizeRquest(props.id).send({
             from:accounts[0]
         })
       setLoad2(false);
       Router.replaceRoute(`/campaigns/${props.address}/requests`)
    }catch(err) {
          setLoad2(false);
          setError(err.message);
          console.log(err)
    }
    

 }

    
    return(
        <Table.Row disabled={props.request.iscomplete} positive={readyTofinalize && !props.request.iscomplete}>
                    <Table.Cell>{props.id+1}</Table.Cell>
                    <Table.Cell>{props.request.name}</Table.Cell>
                    <Table.Cell>{props.request.value}</Table.Cell>
                    <Table.Cell>{props.request.recipent}</Table.Cell>
                    <Table.Cell>{props.request.approvelnumber}/{props.totalcontribution}</Table.Cell>
                    {!props.request.iscomplete&&<Table.Cell><Button loading={load1} color="red" onClick={handelApprove}>Approve</Button></Table.Cell>}
                    {!props.request.iscomplete&&<Table.Cell><Button loading={load2}  primary onClick={handelFinalize}>Finalize</Button></Table.Cell>}
                    </Table.Row>
    )
}

export default TableRow