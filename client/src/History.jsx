import {Container, Col, Row, Spinner}from 'react-bootstrap';
import { useEffect } from 'react';
import { NavBar } from './Home';
import dayjs from 'dayjs';



function History(props){


  useEffect( () => {

    if(props.loggedIn){
      
      props.getListMatches();
    
    }
  
}, []);
    

    return(
        <> 
        <NavBar user={props.user} play={props.play} doLogOut={props.doLogOut}/>
        {
             props.initialLoading ? 
                <Container className='d-flex justify-content-center align-items-center'>
                  <Spinner as="span" style={{width:'5em', height:'5em'}} animation="grow" size="sm" role="status" variant='light' aria-hidden="true"/>
                  {" "}
                </Container>
              : 
          <>
       
        <Container style={{marginTop: '8em', backgroundColor: '#EDF2F4'}} className='d-flex justify-content-center flex-column '>
          <Row className='d-flex justify-content-between'>
          <Col><h2>YOUR GAMES</h2></Col>
          <Col><h2>YOUR TOTAL SCORE: {props.matchlist[0]?props.matchlist[0].total: 0} </h2></Col>
          </Row>
          <Row>
            <Col><h3>Secret Animal</h3></Col>
          <Col><h3>Difficulty</h3></Col>
          <Col> <h3>Date</h3></Col>
           <Col> <h3>Score</h3></Col>
          </Row>
          <Container style={{border: '10px solid #2B2D42', borderRadius: '10px', backgroundColor: '#EDF2F4'}}>
          {
            props.matchlist.map((e,index)=>(
              
              <Row  key={index}>
                <Col>{e.name}</Col>
                <Col>{e.level}</Col>
                <Col>{dayjs(e.date).format('DD-MM-YYYY')}</Col>
                <Col>{e.score}</Col>
              </Row>
              
            ))

           
          } 
          </Container>

        </Container>
        </>
        }
        </>
    );
}

export default History;
