'use strict';
/* Data Access Object (DAO) module for accessing questions and answers */

const sqlite = require('sqlite3');
const crypto = require('crypto');
const dayjs = require('dayjs');

// open the database
const db = new sqlite.Database('gw_db.db', (err) => { //file .sqlite boh
  if(err) throw err;
});


// get all items
exports.getListItems = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM itemSet';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const itemSet = rows.map((e) => ({ id: e.id, name: e.name, class: e.class, legs: e.legs, fly: e.fly, color: e.color, extinct: e.extinct, order: e.order, url: e.url, target: e.target }));
        resolve(itemSet);
      });
    });
  };

  // save match if loggedIn
exports.saveMatch = (score, uId, id) => {
  
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE matches SET score=?, userId=? WHERE id = ?';  
      // 
      db.run(sql, [score, uId, id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes);
      });
    });
  };

  //delete Match after endgame, if not loggedIn
  exports.deleteMatch = (id, password) => {

    const salt = 'yi4byi8vy3cou43p9';
        crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
          if (err) reject(err);

          const passwordHex = Buffer.from('f4f1cd357d94b4f90e2cbe332f8aca17d2b79920b889d45c6360c7730928d9f0', 'hex'); //ATTENZIONE HASH= PASSWORD scegliere come chiamarlo sul db 

          if(!crypto.timingSafeEqual(passwordHex, hashedPassword))
            resolve({err: 'Delete not authorized'});
          else {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM matches WHERE id = ?';  
      db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
          return;
        } else
          resolve(this.changes);  // return the number of affected rows
      });
    });
  } ; 
        });
  }


  // get all matches for the current logged user with req.user.id
  //retrieves also total score of current userID and name of item from itemSet

exports.getListMatches = (user) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM matches JOIN itemSet ON matches.secretItemId=itemSet.id JOIN (SELECT SUM(score) AS total FROM matches WHERE userId=?) WHERE userId=?';
      db.all(sql, [user, user], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const matches = rows.map((e) => ({ id: e.id, name: e.name, secretItemId: e.secretItemId, score: e.score, date: dayjs(e.date), level: e.level, total: e.total }));
        resolve(matches);
      });
    });
  };

//get item by id and property
  exports.getItemById = (id, property) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM itemSet JOIN matches ON matches.secretItemId=itemSet.id WHERE matches.id=?';
      db.all(sql, [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        if (row == undefined) {
          resolve({error: 'Item not found.'});
        } else{
          resolve(row[0][property]); //property[]
          
  
        }
      });
    });
  };
  
 

  // create new match
  exports.addMatch = (match) => {

    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO matches(secretItemId, score, date, level, userId) VALUES(?, ?, DATE(?), ?, ?)';
      db.run(sql, [match.secretItemId, match.score, match.date, match.level, match.userId], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID); //da salvare nello stato, se non loggato userId =0
      });
    });
  };

