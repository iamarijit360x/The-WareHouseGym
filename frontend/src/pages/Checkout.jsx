import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthState } from "../utils/store/AuthSlice";
import axios from "axios";

export default function Checkout() {
    const { state } = useLocation();
    const dispatch=useDispatch()
    const { item } = state;
    const items = [item];
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Perform the POST request
            const response = await axios.post('http://localhost:3000/buy', item, { withCredentials: true });
            console.log(response)
            if(response.data.success)
            navigate('/dashboard')
        } catch (err) {
            if(!err.response.data.authStatus);
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
                                <p className="">{index + 1}.{item.name}</p>
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
