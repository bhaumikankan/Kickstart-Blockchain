import React,{useEffect} from "react"
import 'semantic-ui-css/semantic.min.css'
import Navbar from "../../components/header";
import factory from "../../Ethereum/CampFactory";
import web3 from"../../Ethereum/web3"
import {Card,Form,Button,Container,Message,Label} from "semantic-ui-react"
import {Router} from "../../routes"

const campNew=() => {
    const [value,setValue]=React.useState('');
    const [load,setLoad]=React.useState(false);
    const[error,setError]=React.useState(false);
    const handelSubmit=async(e) => {
        e.preventDefault();
        setError(false);
        try{
        setLoad(true);
        const accounts=await web3.eth.getAccounts();
        await factory.methods.Create(value).send(
            {
              from: accounts[0]
            }
        );
        setLoad(false);
        setValue('');
        Router.pushRoute('/');
        }catch(err){
            setLoad(false);
            setError(`${err.message}`);
        }
    }
   return(
       <Container>
       <Navbar/>
       <Card fluid>
           <Form loading={load} style={{margin:"10px"}} onSubmit={handelSubmit} error={error}>
           <Form.Input label='ammount(wei)'  value={value} onChange={e=>setValue(e.target.value)} placeholder='Enter minimum contribution ammount' />
           <Message
          error
          header='Opps!!'
          content={error}
          />
           <Button type='submit' primary>Create</Button>
           </Form>
       </Card>
       </Container>
   )
}

export default campNew;