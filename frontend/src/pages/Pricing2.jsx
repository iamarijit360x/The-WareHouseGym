import { Col, Row, Container, Form,InputGroup, Button } from "react-bootstrap";
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthState,setUserData } from "../utils/store/AuthSlice";
import axios from "axios";

export default function Pricing2() {
    const { state } = useLocation();
    const dispatch=useDispatch()
    const { item } = state;
    const items = [item];

    const [products,setProducts]=useState([item])
    const navigate=useNavigate()

    function handlePersonalTraning(){
        setProducts([...products,{name:"Personal Tranning",personal_training:true,price:item.duration*3000}])
        console.log(products)
    }
    function handleTradeMil(){
        setProducts([...products,{name:"TradeMil",trademil:true,price:item.duration*200}])
        console.log(products)

    }
    return (
        <Container fluid className="bg-dark text-light py-5" style={{minHeight:"100vh"}}>
            <Row lg={12} className="justify-content-center align-items-center">
                <Col lg={5}>
                    <p>Wana Add Perosnal Tranning?</p><Button onClick={()=>handlePersonalTraning()}>Add</Button>
                    

                    <p>Wana Add Perosnal TradeMill?</p><Button onClick={()=>handleTradeMil()}>Add</Button>
                    <Button onClick={()=>{navigate('/checkout', { state: {products} });}}>Go to Checkout</Button>
                </Col>
            </Row>
        </Container>
    );
}
