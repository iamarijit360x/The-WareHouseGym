import React, { useEffect, useState } from 'react';
import { Container,Table } from 'react-bootstrap';
import axios from 'axios';



export default function AdminDashboard(){
    const [data,setData]=useState([])
    useEffect( ()=>{
         axios.get(import.meta.env.VITE_BACKEND_URL+"/admin", { withCredentials: true })
        .then((response)=>{setData(response.data);console.log(response.data[0])})
        
        
    },[])
    const handleSendReminder=async (user)=>{
       await axios.put(import.meta.env.VITE_BACKEND_URL+"/send-reminder",{id:user._id},{ withCredentials: true })
      
      
    }
    return(
        <Container  fluid className="text-light align-content-center" style={{ minHeight: '100vh',backgroundColor:"#3f0715" }}>
            
      <h2 className="text-center">Admin Portal</h2>

    <Table striped bordered hover size="sm"  variant="dark" style={{fontFamily:"monospace"}}>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Expiry Date</th>
          <th>Reminder</th>
        </tr>
      </thead>
      <tbody>
        {
            data.map((item,index)=>(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.firstname+" "+item.lastname}</td>
                    <td>{item.daysLeft<-10000?"No Membership Purchased":item.daysLeft>0?item.daysLeft+" days left":"Expired "+Math.abs(item.daysLeft)+" days ago"}</td>
                    <td>
                      {item.daysLeft<=0?
                      (new Date()-new Date(item?.reminderSentOn || null )>1728000000 ? 
                        <button onClick={()=>handleSendReminder(item)} type="button" className="btn btn-sm btn-primary">Send Reminder</button>
                        :`Reminder Sent ${Math.floor((new Date()-new Date(item.reminderSentOn))/(1000*60))}min ago`):"Paid"}
                      </td>
                </tr>
            ))
        }
      </tbody>
    </Table>


     
        </Container>
        
    )

}
