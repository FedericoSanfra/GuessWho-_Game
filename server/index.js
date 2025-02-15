'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const path=require('path')
const {check, validationResult} = require('express-validator'); // validation middleware
const dao = require('./dao'); // module for accessing the DB
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./user_dao'); // module for accessing the user info in the DB
const cors = require('cors');


/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
  function(username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });
        
      return done(null, user);
    })
  }
));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});


// init express
const app = new express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use( express.static(path.join(__dirname, '/public')))
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions)); // NB: Usare solo per sviluppo e per l'esame! Altrimenti indicare dominio e porta corretti

const answerDelay = 300;

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated())
    return next();
  
  return res.status(401).json({ error: `Not authenticated`});
}

// set up the session
app.use(session({

  secret: 'cyr3hfelcnsdlcj',   //personalize this random string, should be a secret value
  resave: false,
  saveUninitialized: false 
}));

// then, init passport
app.use(passport.initialize());
app.use(passport.session());


/*** APIs ***/

//GET api/items
app.get('/api/items', (req, res) => {
  dao.getListItems()
    .then(items => setTimeout(()=>res.json(items), 0)) //timeout zero
    .catch((err) => { res.status(500).end()});
});

// GET /api/item/:id/property/:prop
app.get('/api/item/:id/property/:prop', async (req, res) => {
  try {
    const result = await dao.getItemById(req.params.id,req.params.prop);
    
    if(result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch(err) {
    console.log(err);
    res.status(500).end();
  }
});

// GET /api/history
app.get('/api/history', isLoggedIn, async (req, res) => {

  try {
    const matches = await dao.getListMatches(req.user.id);
    // number of changed rows is sent to client as an indicator of success
    setTimeout(()=>res.json(matches), answerDelay);
  } catch (err) {
    
    res.status(500).json({ error: `Error performing access to the list of matches for logged user` });
  }

});


// POST /api/match done
app.post('/api/match', [
  check('score').isInt(),
  check('date').isDate({format: 'YYYY-MM-DD', strictMode: true}),
  check('level').isInt()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const randomNumber=(min, max)=> { //generation of random number
    return Math.floor(Math.random() * (max - min) + min);
  }
  const rn=randomNumber(0,req.body.vec.length-1);
  const secretId=req.body.vec[rn];
  


    const newMatch = {
      secretItemId: secretId,
      score: req.body.score,
      date: req.body.date,
      level: req.body.level,
      userId: 0,    
    };

    
    //console.log("answer to add: "+JSON.stringify(answer));

    try {
      const matchId = await dao.addMatch(newMatch);
      //*** 
      // Return the newly created id of the question to the caller. 
      // A more complex object can also be returned (e.g., the original one with the newly created id)
      setTimeout(()=>{
        
        res.status(201).json(matchId)}, 0);//usare questo
    } catch (err) {
      
      res.status(503).json({ error: `Database error during the creation of match with ${item.name} as secret animal.` });
    }
  }
);


// PUT /api/match/save
app.put('/api/match/save',isLoggedIn, [
  check('score').isInt()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  try {
    const numRowChanges = await dao.saveMatch(req.body.score, req.user.id, req.body.id);
    // number of changed rows is sent to client as an indicator of success
    setTimeout(()=>res.json(numRowChanges), answerDelay);
  } catch (err) {
    
    res.status(503).json({ error: `Database error during the save of last match with score ${req.body.score}.` });
  }

});

// PUT /api/match/reset
app.delete('/api/match/reset', [], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  try {
    const numRowChanges = await dao.deleteMatch(req.body.id, req.body.auto);
    // number of changed rows is sent to client as an indicator of success
    setTimeout(()=>res.json(numRowChanges), answerDelay);
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error removing last match not authenticated .` });
  }

});

/*** Users APIs ***/

// POST /sessions 
// login
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user);
      });
  })(req, res, next);
});


// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout( ()=> { res.end(); } );
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});

/*** Other express-related instructions ***/



// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});