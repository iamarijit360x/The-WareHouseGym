import { Col, Row, Container, Form,InputGroup, Button } from "react-bootstrap";
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthState,setUserData } from "../utils/store/AuthSlice";
import axios from "axios";

export default function Checkout() {
    const { state } = useLocation();
    const dispatch=useDispatch()
    const { products } = state;
    const items = products;
    console.log(products)

    
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(products)
            const response = await axios.post('http://localhost:3000/buy', products, { withCredentials: true });
            console.log(response)
            if(response.data.success)
           { 
                axios.get("http://localhost:3000/profile", { withCredentials: true })
               .then((response)=>{
                if(response.data)
                    dispatch(setUserData(response.data));})
                .then(()=>{
                    navigate('/dashboard')
                })
                .catch((err)=>{
                console.error("Error fetching data:", err);
                dispatch(setAuthState(false));
              })
                    
                
            }
        } catch (err) {
                console.error( err);
                dispatch(setAuthState(false));
        }
    };

    return (
        <Container fluid className="bg-dark text-light py-5">
            <Row lg={12} className="justify-content-center align-items-center">
                <Col lg={5}>
                    <div style={{ border: "1px solid white", padding: "1rem", height: "90vh" }}>
                        <p className="display-6 text-center">Order Summary</p>
                        <p className="fs-3">Products</p>
                        {items.map((item, index) => (
                            <div className="d-flex justify-content-between" key={index}>
                                <p className="">{index + 1}.{item.name ? item.name:null}</p>
                                <p>{item.price}</p>
                            </div>
                        ))}
             
                        <hr />
                        <div className="d-flex justify-content-between">
                            <p>Subtotal</p>
                            <p>{items.reduce((total, x) => total + x.price, 0)}</p>
                            
                        </div>
                        <div className="text-center">
                            <Button onClick={handleSubmit}>Pay Now</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
