import React, { useEffect, useState } from 'react';
import { Container,Table } from 'react-bootstrap';
import axios from 'axios';



export default function AdminDashboard(){
    const [data,setData]=useState([])
    const [userdata,setUserdata]=useState([])
    useEffect( ()=>{
        axios.get(import.meta.env.VITE_BACKEND_URL+"/admin", { withCredentials: true })
        .then((response)=>{setData(response.data);console.log(response.data)})
        
        
    },[])
    return(
        <Container  fluid className="text-light align-content-center" style={{ minHeight: '100vh',backgroundColor:"#3f0715" }}>
            


    <Table striped bordered hover size="sm"  variant="dark" style={{fontFamily:"monospace"}}>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Expiry Date</th>
        </tr>
      </thead>
      <tbody>
        {
            data.map((item,index)=>(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.firstname+" "+item.lastname}</td>
                    <td>{item.daysLeft<-10000?"No Membership Purchased":item.daysLeft>0?item.daysLeft+" days left":"Expired "+Math.abs(item.daysLeft)+" days ago"}</td>
                </tr>
            ))
        }
      </tbody>
    </Table>


     
        </Container>
        
    )

}
