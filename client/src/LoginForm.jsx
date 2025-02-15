import {Container, Col, Row, Spinner, Alert, CloseButton }from 'react-bootstrap';
import { NavBar } from './Home';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import OpenEye from './assets/eye.svg';
import EyeSlash from './assets/eye-slash.svg';
import { useState } from 'react';
import validator from "validator";
import API from './API';


export function LoginError(props){

    return(
      <>
      <Alert show={props.error} variant="danger" className="difficulty-warning d-flex justify-content-between" style={{zIndex:'9999', width:'50vw', left:'25vw', position:'fixed'}}>
        Wrong username and/or password! Try again
        <CloseButton onClick={()=>props.setError(false)} />
      </Alert>
      </>
    )
  }

function LoginForm(props){

    const [view, setView]=useState(false);
    const [username, setUsername] = useState("luigi@test.com");
    const [password, setPassword] = useState("pwd");
    const [error, setError]=useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
  
    const [waiting, setWaiting] = useState(false);

    const doLogin=  (credentials)=>{

         API.logIn(credentials)
        .then((user)=>{
            setError(false);
          props.loginSuccessful(user);
          setWaiting(false);
        })
        .catch((err)=>{setError(true);
            setWaiting(false);
        }
        );//senza dare altre info particolari mando alert
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Validate form
      const trimmedEmail = username.trim();
      const usernameError = validator.isEmpty(trimmedEmail) ? "Email must not be empty" : (
        !validator.isEmail(trimmedEmail) ? "Not a valid email" : ""
      );
      const passwordValid = !validator.isEmpty(password);
  
      if (!usernameError && passwordValid) {
        setWaiting(true);
        const credentials={username, password};
        doLogin(credentials);
        
      } else {
        setUsernameError(usernameError);
        setPasswordValid(passwordValid);
      }
    };

    const handleView=()=>{
        if(view) setView(false);
        else setView(true);
    }
    

    return (
        <>
            <NavBar/>
            <LoginError error={error} setError={setError} />
            <form onSubmit={(event)=>handleSubmit(event)}>
            <Container style={{height: '100vh'}} className='d-flex align-items-center flex-column justify-content-center m-6'>
                <Row className=''>
                <Col>
                    <h2 className=''>Login</h2>
                </Col>
                </Row>
                <Row>
                <Col>
                <Form.Floating style={{width: '40vw', marginTop: '2em'}} className="mb-3">
                    <Form.Control
                    isInvalid={!!usernameError}
                    id="floatingInputCustom"
                    type="email"
                    placeholder="name@example.com"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                {usernameError}
              </Form.Control.Feedback>
                    <label htmlFor="floatingInputCustom">Username</label>
                </Form.Floating>
                </Col>
                </Row>
                <Row className='d-flex align-items-center '>
                <Col style={{width: '40vw'}}>
                <Form.Floating style={{width: '37.5vw'}}>
                    <Form.Control
                    isInvalid={!passwordValid}
                    id="floatingPasswordCustom"
                    type={view?'text':'password'}
                    value={password}
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                {passwordValid}
              </Form.Control.Feedback>
                    <label htmlFor="floatingPasswordCustom">Password</label>
                </Form.Floating>
                </Col>
                <Col style={{padding: '0', margin: '0'}}>
                <Button onClick={()=>handleView()} style={{backgroundColor: 'transparent', borderColor:'transparent', padding: '0px', margin: '0px'}}><img src={view?EyeSlash:OpenEye}  /></Button>
                </Col>
                </Row>
                <Row>
                    <Col>
                    
                        <Button disabled={waiting} style={{width: '10vw', marginTop: '2em'}} className="btn btn-primary btn-large centerButton" type="submit">
                        {
              waiting ? 
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                  {" "}
                </>
              : false
            }Login</Button>
                   
                    </Col>
                </Row>

            </Container>
            </form>
            

        </>
    )
}
export default LoginForm;