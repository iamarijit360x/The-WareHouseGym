import { useEffect, useState } from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
export default function UnAuth(){
    const navigate=useNavigate()
    const [count, setCount] = useState(2);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer); 
    }
    else
        navigate('/signin')
  }, [count]);
    return(
       
        <Container style={{height:"100vh"}}fluid className='bg-dark text-light'>
            <Row>

                <Col>
                    <h2 className='text-center'>You are not Authrized please Login </h2>
                    <h3 className='text-center'>Redirecting to Login in {count} Secs</h3>
                    
                </Col>
            </Row>

        </Container>
    )
}