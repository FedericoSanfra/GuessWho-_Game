import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {Container, Col, Row, Alert }from 'react-bootstrap';
import { createContext, useContext, useEffect, useState } from 'react';
import QuestionLogo from './assets/question-diamond-fill.svg';
import LoginLogo from './assets/door-open.svg';
import LogoutLogo from './assets/box-arrow-right.svg';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import dayjs from 'dayjs';
import { MatchContext } from './App';
import AlertBan from './AlertBan';
import { useNavigate } from 'react-router-dom';
import './App.css';


export function NavBar(props){

  const navigate=useNavigate();
  const [show, setShow]=useState(0); //0 false 1 e 2 true
  const endgame=useContext(EndgameContext);
  const matchId=useContext(MatchContext);

  const handleLink=(type)=>
  { 
    if(type==1){ //operazione con history click
      props.getListMatches();
      if(endgame==false&&props.play)
      {
        
        setShow(1);
      }
      else
      {
        navigate('/history');
      }
    } else if(type==2){
      if(endgame==false&&props.play)
      {
        setShow(2);

      }
      else{
        navigate('/login'); //vai al login normalmente
      }

    }
    
    
  }
  
    const name = props.user && props.user.name;
    return (
        <>
        <Alert style={{position: 'fixed', zIndex:'9999', left:'35vw'}} show={show>0} variant="danger">
        <Alert.Heading>ATTENTION!</Alert.Heading>
          <p>
          If you leave this page, you will lose your game score!
          </p>
        <hr />
        <div className="d-flex justify-content-between">
          <Button onClick={() =>{
          setShow(0);
          props.deleteMatch(matchId, 'auto');
          if(props.loggedIn) props.getListMatches();
          if(show==1) navigate('/history');
          if(show==2) navigate('/login');
          
        } } variant="outline-danger">
            Leave the game
        </Button>
        <Button onClick={() => setShow(0)} variant="outline-danger">
            Stay in the game
        </Button>
        </div>
      </Alert>
        <Navbar expand="lg" className="d-flex align-items-center fixed-top " style={{backgroundColor:'#D90429', color:'#2B2D42'}}>
        <Container className="d-flex align-items-center m-0">
            <Col className="d-flex justify-content-start align-items-center">
                <Link to='/' ><Navbar.Brand><img src={QuestionLogo} alt="QuestionLogo" /></Navbar.Brand></Link>
                <Link to='/' ><Navbar.Brand>Guess who?</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Text style={{fontSize:'1.5rem'}} className="mx-2"><Link to='/'>Home</Link></Navbar.Text>
                {
                name &&  <Button onClick={()=>handleLink(1)} style={{borderColor: 'transparent', backgroundColor:'transparent', fontSize:'1.5rem'}}><Navbar.Text  className="mx-2">History</Navbar.Text></Button>
                }
                
                </Navbar.Collapse>
            </Col>
        </Container>
        <Container className="d-flex justify-content-end align-items-center">
            {name ? <Navbar.Text style={{fontSize:'1.5rem', color: '#2B2D42'}} className="m-0 d-flex align-items-center">Logged in as {props.user.name}<Button className="m-2" style={{color: '#2B2D42'}} variant="link" onClick={()=>props.doLogOut()} ><span  className='m-3'>Logout</span><img src={LogoutLogo} alt="LogoutLogo" /></Button></Navbar.Text>:<Navbar.Text><Button style={{color:'black'}} className="m-3 p-0"variant="link" onClick={()=>handleLink(2)} >Login<img src={LoginLogo} alt="LoginLogo"/></Button></Navbar.Text>}
        </Container>
        </Navbar>
        </>
    )
}

export function Questions(props){
  
  return(
    <>
          <Container style={{color: 'white'}} className='d-flex flex-column  '>
          <Row style={{margin:'0.5em'}} className='d-flex align-items-center justify-content-center'>
              Which class does it belong to?
        
            <DropdownButton  variant='light' disabled={props.clicked[0].click} id="dropdown-button-drop-down" drop="bottom" title="Select class">
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                temp[0].click=true;
               props.handleProperty("class", "mammal",0);
                
                 props.setClicked(temp);
              }} >Mammal</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                temp[0].click=true;
                props.handleProperty("class", "reptile",0);
                
                props.setClicked(temp);
              }} >Reptile</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                temp[0].click=true;
                props.handleProperty("class", "fish",0);
                props.setClicked(temp);
              }} >Fish</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                temp[0].click=true;
                props.handleProperty("class", "bird",0);
                
                props.setClicked(temp);
              }} >Bird</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                temp[0].click=true;
                props.handleProperty("class", "amphibian",0);
                props.setClicked(temp);
              }} >amphibian</Dropdown.Item>
            </DropdownButton>
            {
              (props.clicked[0].click)&&
              <span>Your guess is {props.clicked[0].guess?'correct':'wrong'}!</span>
              
            }
          </Row>
          <Row style={{margin:'0.5em'}} className='d-flex align-items-center justify-content-center'>
              How many legs does it have?
             
            <DropdownButton  variant='light' disabled={props.clicked[1].click} id="dropdown-button-drop-down" drop="bottom" title="Select number of legs">
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("legs", 0,1);
                
                props.setClicked(temp);
              }} >0</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("legs", 2,1);
                
                props.setClicked(temp);
              }} >2</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("legs", 4,1);
                
                props.setClicked(temp);
              }} >4</Dropdown.Item>
            </DropdownButton>
            {
              (props.clicked[1].click)&&
              <span>Your guess is {props.clicked[1].guess?'correct':'wrong'}!</span>
              
              }
          </Row >
          <Row style={{margin:'0.5em'}} className='d-flex align-items-center justify-content-center'>
              Can it fly?
           
            <DropdownButton  variant='light' disabled={props.clicked[2].click} id="dropdown-button-drop-down" drop="bottom" title="Fly">
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("fly", 1,2);
               
                props.setClicked(temp);
              }} >Yes</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("fly", 0,2);
               
                props.setClicked(temp);
              }} >No</Dropdown.Item>
            </DropdownButton>
            {
              (props.clicked[2].click)&&
              <span>Your guess is {props.clicked[2].guess?'correct':'wrong'}!</span>
              
              }
          </Row>
       
          <Row style={{margin:'0.5em'}} className='d-flex align-items-center justify-content-center'>
              What color is it?
            
            <DropdownButton  variant='light' disabled={props.clicked[3].click} id="dropdown-button-drop-down" drop="bottom" title="Select colour">
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("color", "green",3);
                
                props.setClicked(temp);
              }} >Green</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("color", "grey",3);
                
                props.setClicked(temp);
              }}>Grey</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("color", "red",3);
                
                props.setClicked(temp);
              }}>Red</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("color", "brown",3);
                
                props.setClicked(temp);
              }}>Brown</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("color", "white",3);
                
                props.setClicked(temp);
              }}>White</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("color", "black",3);
                
                props.setClicked(temp);
              }}>Black</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("color", "yellow",3);
                
                props.setClicked(temp);
              }}>Yellow</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("color", "spots",3);
                
                props.setClicked(temp);
              }}>Spots</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("color", "striped",3);
                
                props.setClicked(temp);
              }}>Striped</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("color", "pink",3);
                
                props.setClicked(temp);
              }}>Pink</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("color", "blue",3);
                
                props.setClicked(temp);
              }}>Blue</Dropdown.Item>
            </DropdownButton>
            {
              (props.clicked[3].click)&&
              <span>Your guess is {props.clicked[3].guess?'correct':'wrong'}!</span>
              
              }
          </Row>
    
  
          <Row style={{margin:'0.5em'}} className='d-flex align-items-center justify-content-center'>
             Is it extinct?
             
            <DropdownButton  variant='light' disabled={props.clicked[4].click} id="dropdown-button-drop-down" drop="bottom" title="Extinction ">
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("extinct", 1,4);
                
                props.setClicked(temp);
              }}>Yes</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("extinct", 0,4);
                
                props.setClicked(temp);
              }}>No</Dropdown.Item>
            </DropdownButton>
            {
              (props.clicked[4].click)&&
              <span>Your guess is {props.clicked[4].guess?'correct':'wrong'}!</span>
              
              }
          </Row>
          <Row style={{margin:'0.5em'}} className='d-flex align-items-center justify-content-center' >
              Which order does it belong to?
          
            <DropdownButton  variant='light' disabled={props.clicked[5].click} id="dropdown-button-drop-down" drop="bottom" title="Select order">
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("order", "h",5);
                
                props.setClicked(temp);
              }}>Herbivore</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("order", "o",5);
                
                props.setClicked(temp);
              }}>Omnivorous</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                const temp=[...props.clicked];
                
                props.handleProperty("order", "c",5);
                
                props.setClicked(temp);
              }}>Carnivorous</Dropdown.Item>
            </DropdownButton>
            {
              (props.clicked[5].click)&&
              <span>Your guess is {props.clicked[5].guess?'correct':'wrong'}!</span>
              
              }

          </Row>
          </Container>
    
    </>
  )
}


export function Game(props){
  const[level, setLevel]=useState(undefined);
  const [newlist, setNewlist]=useState([]);
  const [trials, setTrials]=useState(0);
  const [win, setWin]=useState(undefined);
  const matchId=useContext(MatchContext);
  const endgame=useContext(EndgameContext);
  const [show, setShow]=useState({view: false, value: undefined});
  const [clicked, setClicked]=useState([{click:false, guess: ""}, {click:false, guess: ""}, {click:false, guess: ""}, {click:false, guess: ""}, {click:false, guess: ""}, {click:false, guess: ""}]);
  const [secret, setSecret]=useState(QuestionLogo);
  
  let diff='';
  if(level==12) diff='Easy';
  if(level==24) diff='Medium';
  if(level==36) diff='Hard'; 
  
 
  const handleReset=()=>{
    //caso in cui si restarta prima del termine del gioco, bisogna cancellare l'entry in matches
    if(endgame==false){//che sia loggato oppure no
      props.deleteMatch(matchId, 'auto');
     if (props.loggedIn) props.getListMatches();
    }

    //continuo con il reset del resto
    props.setPlay(false);
    setLevel(undefined);
    setNewlist([]);
    props.setEndgame(false);
    setTrials(0);
    setWin(undefined);
    setSecret(QuestionLogo);
    setClicked([{click:false, guess: ""}, {click:false, guess: ""}, {click:false, guess: ""}, {click:false, guess: ""}, {click:false, guess: ""}, {click:false, guess: ""}]);

    

  }
  useEffect( () => {
    
    handleReset(); //per resettare ogni volta che esco da una pagina 
  }, []);

  const handleRestart=async ()=>{
//per il button restart
    const img=await props.getItem(matchId, "url");
    setSecret(`http://localhost:3001/${img}`);
    let punteggio=win?level-trials:0;
    
    if(props.loggedIn) {

      const rowChanges=props.saveMatch(punteggio, matchId);
    }
    else{
      props.deleteMatch(matchId, 'auto'); //uso una stringa criptata per sicurezza, solo il client può utilizzarla, se chiamo una delete da url non funziona
    }
    props.getListMatches();
  }
  useEffect(()=>{
    if(win!=undefined) handleRestart(); //caso di lastItem==1
    
  }, [win])
 
  useEffect( () => { //check di tutti i casi
    let trialNum=0;
    let lastItem=0;
    //ogni volta che entra è un tentativo in più
    for(let i=0;i<clicked.length;i++){
      if(clicked[i].click==true) trialNum++;
    }
  
    for(let i=0;i<newlist.length;i++){
      if(newlist[i].guess==true) lastItem++;
  }
    setTrials(trialNum);
    

    if(lastItem==1){
      props.setEndgame(true);//se non finisco i tentativi, ma trovo prima quello rimanente
      setWin(true);
    }
  }, [clicked]);

  const handleProperty= async (property, value, index)=>{ //solo per le proprietà precedenti
    const result=await props.getItem(matchId, property, value);
    let clickList=[...clicked];
    
    if(property!='secretItemId'){
      let temp=[...newlist];
      for(let i=0;i<temp.length;i++ ){
        
        if(temp[i].guess==true){
          if(result){
            clickList[index].guess=true;
            clickList[index].click=true;
           if(temp[i][property]!=value) temp[i].guess=false;
        } 
        else {
          clickList[index].guess=false;
          clickList[index].click=true;
          if(temp[i][property]==value) temp[i].guess=false;
        }
      }
      
    }
      setClicked(clickList);
      setNewlist(temp);
  }
   else{
    
 
    if(result) {
    
        if(endgame==false)
        { 
          
          props.setEndgame(true) //ha vinto
          setWin(true);
        }
    }
    else{
      if(endgame==false){
        
      props.setEndgame(true);//ha perso indovinando prima della fine
      setWin(false);
      }
    }
    
   }

   return result;

  }

  const handlePlay= async ()=>{
    
    if(!level) props.setWarn(true);
    else {
      
      props.setPlay(true);
      let vec=newlist.map((e)=>e.id);
      const m={
        secretItemId: 0,
        score: 0,
        date: dayjs().format("YYYY-MM-DD"),
        level: level,
        user: 0 //utente verifico dopo se loggato
      }
      const mat=await props.addMatch(m,vec);
      props.setMatchId(mat);
      
  
    }

  }


    useEffect( () => {
      if(level){
        let newArr=[];
      for (let i = 0; i < level; i++) {
        let newElem = props.itemlist[Math.floor(Math.random() * props.itemlist.length)];
        
        while (newArr.includes(newElem)) {
          newElem = props.itemlist[Math.floor(Math.random() * props.itemlist.length)];
        }
       newArr.push(newElem);
       
      }
      const v=newArr.map((e)=>{return {...e, guess: true}});
      
      setNewlist(v);
    
      
    }
      
    }, [level]);

    return(
      <>
      <Alert style={{position: 'fixed', zIndex:'9999', left:'30vw', width:'40vw'}} show={show.view} variant="danger">
        <Alert.Heading>ATTENTION!</Alert.Heading>
        <p>
          Do you want to select this animal?
        </p>
        <hr />
        <div className="d-flex justify-content-between">
        <Button onClick={() =>{
          setShow({...show, view: false});
          handleProperty('secretItemId', show.value);
        } } variant="outline-danger">
            GUESS
        </Button>
        <Button onClick={() => setShow({view:false, value: undefined})} variant="outline-danger">
           I'VE CHANGED MY MIND
        </Button>
        </div>
      </Alert>
          
      {props.play?
      <Container>
        <Row  className='d-flex justify-content-center'>
          <div style={{backgroundColor:'#EF233C', color:'white', borderRadius: '10px', padding: '1em', width: '15vw', marginTop: '7em'}}>
            Level selected: {diff}
          </div>
        </Row>
        <Row>
      <Col className="d-flex flex-wrap ml-0" lg="9">
        {
          newlist.map((i)=>
          <Button  className='my-button' disabled={endgame==true||i.guess==false} style={{backgroundColor:'#EF233C', height: '12em', borderColor: 'transparent', margin: '0.5rem'}} key={i.id} onClick={()=>{
            setShow({view: true, value: i.id});
            }} >
          <Card>
          <Card.Img style={{ width: '8rem', height: '5rem',  fontSize:'1rem'}} variant="top" src={`http://localhost:3001/${i.url}`}/>
          <Card.Body style={{backgroundColor: '#8D99AE'}}>
            <Card.Title style={{fontSize: '1rem'}}>{i.name}</Card.Title>
          </Card.Body>
          </Card>
          </Button>
          )
        }
    </Col>
        <Col style={{backgroundColor:'#335C67', borderRadius:'10px', maxHeight: '60em'}} className="d-flex flex-column align-items-center" lg="3">
        <Card  style={{backgroundColor:'#335C67', borderColor:'transparent', color:'white'}} className='m-3'>
        <Card.Img variant="top" src={secret}/>
        <Card.Body >
          <Card.Title>Secret Animal</Card.Title>
        </Card.Body>
        </Card>
        {endgame?
        <span style={{color: 'white'}}>You {win?'win!': 'lose!'} Your score is: {win?level-trials: 0}</span>:
        <Questions  className="mt-3" setClicked={setClicked} clicked={clicked} setEndgame={props.setEndgame} handleProperty={handleProperty} />

        }
        <Button style={{backgroundColor:'#D90429', borderColor: 'transparent', width: '10rem'}} className="m-3" onClick={()=>handleReset()}> Restart game</Button>
        </Col>
        </Row>
        </Container>
    :
     <Container style={{width: '25em', backgroundColor:'#EF233C', borderRadius:'10px', padding:'2rem', marginTop:'7rem'}} className="d-flex justify-content-center " >
            <Row style={{width: '100vw'}}>
                <Col md="12" lg="12" className="d-flex flex-column align-items-center justify-content-center">
                <h1 style={{color: '#2B2D42'}}>Guess who? </h1>
                <h3 style={{color: '#2B2D42'}}>The game</h3>
                <Button style={{marginTop: '0.5em', width: '15em', borderColor: 'white'}} disabled={props.play} variant={level==12 ?"success":"secondary"}  onClick={()=>setLevel(12)}>Easy</Button>
                <Button style={{marginTop: '0.5em', width: '15em', borderColor: 'white'}} disabled={props.play} variant={level==24 ?"warning":"secondary"} onClick={()=>setLevel(24)}>Medium</Button>
                <Button style={{marginTop: '0.5em', width: '15em', borderColor: 'white', marginBottom:'1rem'}} disabled={props.play} variant={level==36 ?"danger":"secondary"} onClick={()=>setLevel(36)}>Hard</Button>
                <Button style={{ width: '15em', backgroundColor:'#2B2D42', borderColor:'#2B2D42' }} className="m-2" onClick={()=>handlePlay()}>Play</Button>
                </Col>
      </Row>
      </Container>
      }
      </>
    )
}

export const EndgameContext=createContext();

function Home(props){
  const [warn, setWarn]=useState(false);
  const [type, setType]=useState(0);
  const [endgame, setEndgame]=useState(false);

  return(
    <>
    <EndgameContext.Provider value={endgame}>
      <NavBar user={props.user} deleteMatch={props.deleteMatch} getListMatches={props.getListMatches} loggedIn={props.loggedIn} play={props.play} doLogOut={props.doLogOut} />
      <AlertBan className="warn"  type={type} setType={setType} loggedIn={props.loggedIn} warn={warn} setWarn={setWarn}  />
      <Game style={{backgroundColor: '#DE8F6E'}} setEndgame={setEndgame} className="cards" play={props.play} getListMatches={props.getListMatches} getItem={props.getItem} setWarn={setWarn} setMatchId={props.setMatchId} 
         deleteMatch={props.deleteMatch} saveMatch={props.saveMatch} loggedIn={props.loggedIn} getMatchById={props.getMatchById} itemlist={props.itemlist} addMatch={props.addMatch} setPlay={props.setPlay}/>
  </EndgameContext.Provider>
    </>
  )
}

export default Home;