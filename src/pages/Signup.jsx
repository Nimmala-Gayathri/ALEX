import React,{ useState } from "react"; 
import { Row,Col,Form,Button } from "react-bootstrap";
// import SigninImg from "../assets/signin.png"
import {useNavigate} from "react-router-dom"


export default function Signup({setUser}) {
    const [email,setEmail] = useState("")
    const navigate  = useNavigate()

    return(
        <div>
            <Row style={{width:"100vw"}}>
                <Col>
                
                     <Form style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around",marginTop:"10rem"}}>
                     <h1 style={{textAlign:"center"}}>Welcome to your Book finder <span style={{color:"#1e3457"}}>ALEX</span></h1>
                            
                     <Form.Group >
                                {/* <Form.Label>First name</Form.Label> */}
                                    <Form.Control type="email" placeholder="Enter Username"
                                    style={style.input}
                                    onChange={(e) =>setEmail(e.currentTarget.value)}
                                    />
                                </Form.Group>
                                {/* <Form.Label style={{textAlign:"start"}}>First name</Form.Label> */}
                                <Form.Group >
                                    <Form.Control type="name" placeholder="Enter Name" 
                                     style={style.input}/>
                                </Form.Group>
                              {/* <Form.Label style={{textAlign:"start"}}>First name</Form.Label> */}
                                <Form.Group >
                                    <Form.Control type="name" placeholder="Enter Roll Number" 
                                     style={style.input}/>
                                </Form.Group>
                                <Button
                            onClick={() =>{
                                localStorage.setItem("UserEmail",email);
                                setUser(email);
                                navigate("/")
                            }}
                            style={{marginTop:"2rem",backgroundColor:"#1e3457"}}  type="submit"
                            >
                                Submit
                            </Button>
                            <div style={{marginTop:"2rem",}}>
                                Join the club, <span onClick={() => navigate("/login")} >Click here</span>
                            </div>
                        </Form>
                
                </Col>
                {/* <Col> <img src={SigninImg} style={{height:"86vh"}}/></Col> */}
            </Row>
        </div>
    )
}
const style ={
    input: {
        marginTop:"2rem",
        backgroundColor:" skyblue"

        // width:"50%"
    },
    // form: {
    //     display : 'flex',
       
    // }
}