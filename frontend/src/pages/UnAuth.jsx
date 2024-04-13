import { useEffect, useState } from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
export default function UnAuth(){
    const navigate=useNavigate()
    const [count, setCount] = useState(4);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer); 
    }
    else
        navigate('/signin')
  }, [count]);
    return(
       
        <Container>
            <Row>

                <Col>
                    <h2>You are not Authrized please Login </h2>
                    <h3>{count}</h3>
                    
                </Col>
            </Row>

        </Container>
    )
}