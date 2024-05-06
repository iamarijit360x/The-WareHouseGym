import { Col, Row, Container, Button,Card,ListGroup} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


export default function Pricing2() {

    const { state } = useLocation();
    const navigate=useNavigate()
    const { item } = state ||{item:""}; ;

    const [products,setProducts]=useState([item])
    const [treadmillButton,settreadmillButton]=useState(true)
    const [personalTrainingButton,setpersonalTrainingButton]=useState(true)
    const data=[{id:"p0001",price:3000,name:"Personal Training",type:"personal_training",description:"🌟 Personal Training: Maximize your results with customized workouts tailored to your unique needs and goals. Our certified trainers will motivate and guide you to surpass your limits"},
    {id:"p0002",price:200,name:"Trademil",type:"trademil",description:"🏃‍♀️ Treadmill Access: Take your cardio game to the next level with unrestricted access to our state-of-the-art treadmills, perfect for burning calories and boosting endurance."}
    ]
    useEffect(() => {
        if(!item)
            navigate('/pricing1')
      }, [navigate,item])
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
   
    function handleAdd(type){
        if(type==='personal_training')
        {
            setProducts([...products,{name:"Personal Tranning",personal_training:true,price:item.duration*3000}])
            setpersonalTrainingButton(false)
        }
        else if(type==='trademil'){
            setProducts([...products,{name:"TradeMil",trademil:true,price:item.duration*200}])
            settreadmillButton(false)
        }
    }

    function handlePersonalTraning(){
        setProducts([...products,{name:"Personal Tranning",personal_training:true,price:item.duration*3000}])
        setpersonalTrainingButton(false)
    }
    function handleTradeMil(){
        setProducts([...products,{name:"TradeMil",trademil:true,price:item.duration*200}])
        settreadmillButton(false)
    }

     function removeItem(name){
        if(name==='trademil')
        settreadmillButton(true)
        else
        setpersonalTrainingButton(true)

        let updateList=[...products]
       
        console.log(products)
        const index=updateList.findIndex(x=>x.hasOwnProperty(name))
        updateList.splice(index,1)
        setProducts(updateList)

     }



    return (
        <Container fluid className="bg-dark text-light py-5" style={{minHeight:"100vh"}}>
             <div className="text-center"> <Button onClick={()=>{navigate('/checkout', { state: {products} });}}>Go to Checkout</Button></div>
            <Row lg={12} className="justify-content-center align-items-center">
                <Col >


                    {data.map(item=>(
                    <Container fluid className="p-3">
                        <Card bg='black' text='white'>
                        <Card.Body >
                            <Card.Title>{item.name} {item.type==='personal_training'?!personalTrainingButton&&<FontAwesomeIcon icon={faCheck} style={{ scale:"1.3",color: 'green' }}/>:
                            !treadmillButton && <FontAwesomeIcon icon={faCheck} style={{ scale:"1.3",color: 'green' }}/>
                            
                            } 
                            
                            </Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                            <Card.Subtitle>Rs. {item.price} / Month</Card.Subtitle>
                            <hr></hr>
                            {item.type==='personal_training'?personalTrainingButton?<Button onClick={()=>handleAdd(item.type)}>Add</Button>
                            :<Button  variant="danger" onClick={() => removeItem(item.type)}>Remove</Button>
                            :treadmillButton?<Button onClick={()=>handleAdd(item.type)}>Add</Button>
                            :<Button  variant="danger" onClick={() => removeItem(item.type)}>Remove</Button>
                            }
                            <span></span>
                        </Card.Body>
                        </Card>
                    </Container>))}
                      
                      
                   
                    <br/>
                  
                </Col>
               
    
            <Row lg={12}>
                <Col>
                    <Card bg='black' text='white' >
                    <Card.Body  >
                        <div >
                        {products.map((item, index) => (
                            <p className="p-5 rounded-2 py-2" style={{border:"1px solid white",}} key={index}>{index+1}. {item.name}     Rs.{item.price}</p>
                        ))}
                        </div>
                        <p className="fw-bold fs-6 text-center">Subtotal:{products.reduce((total,x)=>total+x.price,0)}</p>
                    </Card.Body>

                    </Card>
                    
                   <div className="text-center"> <Button onClick={()=>{navigate('/checkout', { state: {products} });}}>Go to Checkout</Button></div>
                </Col>

            </Row>
                  
                   
                    
                
            </Row>
        </Container>
    );
}
