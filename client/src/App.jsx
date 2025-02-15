
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Button, Form, Table } from 'react-bootstrap';
import { useState, useEffect, createContext } from 'react';
import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import History from './History.jsx';
import LoginForm from './LoginForm.jsx';
import Home from './Home.jsx'
import API from './API';
import './App.css'



function DefaultRoute() {
  return(
    <Container className='App'>
      <h1>No data here...</h1>
      <h2>This is not the page you are looking for!</h2>
      <Link to='/'>Please go back to main page</Link>
    </Container>
  );
}

export const MatchContext=React.createContext();


function App() {
  
  const [itemlist, setItemlist]=useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [matchlist, setMatchlist]=useState([]);
  const [user, setUser] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);

  const [play, setPlay]=useState(false);
  const [matchId, setMatchId]=useState();
   //da cambiare con una stringa hash per check delete protezione
  //finire e implementare queste cose che cmq mi servono e le varie dipendenze 
  
  function handleError(err) {
    console.log(err);  // Only for debug
    let errMsg = 'Unkwnown error';
    if (err.errors) {
      if (err.errors[0])
        if (err.errors[0].msg)
          errMsg = err.errors[0].msg;
    } else if (err.error) {
      errMsg = err.error;
    }
    setErrorMsg(errMsg);
    
  }

  useEffect(()=> {
    const checkAuth = async() => {
      try {
        // here you have the user info, if already logged in
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user);
      } catch(err) {
        // NO need to do anything: user is simply not yet authenticated
        //handleError(err);  
        //console.log("no worries");
      }
    };
    checkAuth();
  }, []);


 
  useEffect( () => {
    
    
      API.getAllItems()
        .then((itemlist) => {
         
          setItemlist(itemlist);
          
          setInitialLoading(false);
        })
        .catch((err) => handleError(err));

        if(loggedIn){
          getListMatches();
          
        }
    
  }, []);





  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser(undefined);
    /* set state to empty if appropriate */
  }

  const loginSuccessful = (user) => {
    setUser(user);
    setLoggedIn(true);
    
  }


  const getItem= async (id, prop, value)=>{
    let answer=await API.getItem(id,prop, value)
    .then((res)=>{
      return res;
    })
    .catch((err)=>handleError(err));
    return answer;

  }

  const addMatch = async (m, vec) => {
    // REMEMBER to add questionId
    //e.userId = user.id;   // respondentId will be taken by server from the session, da usare al save
    
    let newMatch=await API.addMatch(m, vec)
      .then((res) =>{
        
       return res;
      } )
      .catch((err) => handleError(err));//handle error qui usato
      
    return newMatch;

  }
  const saveMatch= async (score, id)=>{//funziona
    let rows=await API.saveMatch(score, id)
    .then((res)=>{
      
      return res;
    }).catch((err)=> handleError(err));

    return rows;

  }

  const getListMatches=()=>{
    API.getAllMatches()
      .then((m) => {
        setMatchlist(m);
        
    
        setInitialLoading(false);
        
      })
      .catch((err) => handleError(err));

      
    
  }

  const deleteMatch= async (id, auto)=>{
    await API.deleteMatch(id, auto)
    .then((res)=>{
      
    }).catch((err)=> handleError(err));

  }

  const getMatchById = async (mid)=>{

    let result= await API.getMatchById(mid)
    .then((res)=>{
      //console.log(res)
      return res;
    }).catch((err)=> handleError(err));

    return result;
  }

  return (
   <>
      <MatchContext.Provider value={matchId}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home itemlist={itemlist} getListMatches={getListMatches} user={user} doLogOut={doLogOut} deleteMatch={deleteMatch} saveMatch={saveMatch} getItem={getItem} play={play} loggedIn={loggedIn} setMatchId={setMatchId} getMatchById={getMatchById} addMatch={addMatch} setPlay={setPlay} />} />
        <Route path='/history' element={loggedIn?<History getListMatches={getListMatches}  initialLoading={initialLoading} itemlist={itemlist} matchlist={matchlist} loggedIn={loggedIn}  user={user} doLogOut={doLogOut} play={play} />: <Navigate replace to='/login' />} />
        <Route path='/login' element={loggedIn? <Navigate replace to='/' />:  <LoginForm loginSuccessful={loginSuccessful} />} />
        <Route path='/*' element={<DefaultRoute />} />
        
      </Routes>
    </BrowserRouter>
    </MatchContext.Provider>

   </>
  )
}

export default App;
