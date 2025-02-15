/**
 * All the API calls
 */

import dayjs from "dayjs";

const URL = 'http://localhost:3001/api';

async function getAllItems() {
  // call  /api/questions
  const response = await fetch(URL+'/items');
  const items = await response.json();
  if (response.ok) {
    return items.map((e) => ({id: e.id, name:e.name, class:e.class, legs:e.legs, fly: e.fly, color:e.color, extinct: e.extinct, order: e.order, url: e.url}) )
  } else {
    throw items;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getItem(id, prop, value) {
    // call  /api/questions/<id>/answers
    const response = await fetch(URL+`/item/${id}/property/${prop}`);
    const item = await response.json();
    if (response.ok) {
        
        if(prop){
          console.log(item);
          if(prop=="url"||prop=='name' ) return item;
          else return (item==value);
        }
        else{
          const obj=Object.assign({}, item[0]);
          return {id: obj.id, name:obj.name, class:obj.class, legs:obj.legs, fly: obj.fly, color:obj.color, extinct: obj.extinct, order: obj.order, url: obj.url };
        }
          } else {
      throw item;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
  }


  async function getAllMatches() {
    // call  /api/history
    return new Promise((resolve, reject) => {
      fetch(URL+`/history`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => { 
        if (response.ok) {
          response.json()
          .then((matches) =>{
            
            resolve(matches)})
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        } else {
         //qui non entra
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }

function addMatch(match, vec) {
  // call  POST /api/match

  return new Promise((resolve, reject) => {
    fetch(URL+`/match`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.assign({}, match, {date: dayjs(match.date).format("YYYY-MM-DD")}, {vec: vec})),
    }).then((response) => { 
      if (response.ok) {
        response.json()
        .then((id) => resolve(id))
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      } else {
       //qui non entra
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function saveMatch(score, id) {
  // call  PUT /api/match/save
  return new Promise((resolve, reject) => {
    fetch(URL+`/match/save`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, score: score }),
    }).then((response) => {
      if (response.ok) {
        resolve(response); //numero di rows changed
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function deleteMatch(id, auto) {
    // call  PUT /api/match/reset
    return new Promise((resolve, reject) => {
      fetch(URL+`/match/reset`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id, auto: auto}),
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }


async function logIn(credentials) {
  let response = await fetch(URL + '/sessions', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  
  if (response.ok) {
    const user = await response.json();
   
    return user;
  } else {
    
    const errDetail = await response.json();
    
    throw errDetail.message;
  }
}

async function logOut() {
  await fetch(URL+'/sessions/current', {
    method: 'DELETE', 
    credentials: 'include' 
  });
}

async function getUserInfo() {
  const response = await fetch(URL+'/sessions/current', {
    credentials: 'include'
  });
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}



const API = {
    getAllItems, getItem, getAllMatches, addMatch, saveMatch, deleteMatch,
  logIn, logOut, getUserInfo
};
export default API;