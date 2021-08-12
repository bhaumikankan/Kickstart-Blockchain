import React from 'react';
import {Card,Form,Button,Container,Message,Label} from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'

const Campcard=(props)=>{
    return(
        <Card >
               <Card.Content style={{overflowWrap: 'break-word'}}>
               <Card.Header>{props.value}</Card.Header>
               <Card.Description>
                <strong>{props.title}</strong>
               </Card.Description>
               </Card.Content>
           </Card>
    )
}

export default Campcard;