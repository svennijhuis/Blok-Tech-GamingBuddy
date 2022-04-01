require('dotenv').config()

const bcrypt = require('bcryptjs'),
    Q = require('q');
    
// database connection
const { MongoClient } = require('mongodb');
const mongodbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.acfzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
 client.connect(err => {
 
 //perform actions on the collection object
 
 });

const isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) { 
      return next(); 
  }
  res.redirect('/login');
};

const isLoggedOut = function (req, res, next) {
  if (!req.isAuthenticated()) { 
      return next(); 
  }
  res.redirect('/');
};


// register user
const dbReg =  (username, password) => {
  const deferred = Q.defer();
  
  MongoClient.connect(mongodbUrl,  (err, db) => {
    const collection = client.db('users').collection('user');
  
    //check if username already exists
    collection.findOne({ 'username' : username })
      .then( (result) => {
          
        if (null != result) {
          console.log("Username already exists:", result.username);
          deferred.resolve(false);
        }
        else  {
          const hash = bcrypt.hashSync(password, 10);
          const user = {
            "username": username,
            "password": hash,
          }
  
          console.log("User is being created:", username);
  
          collection.insertOne(user)
            .then( () => {
              db.close();
              deferred.resolve(user);
            });
        }
      });
  });
  return deferred.promise;
};
  
  
// authorize user
const dbAuth =  (username, password) => {
  const deferred = Q.defer();
  
  MongoClient.connect(mongodbUrl, (err, db) => {
    const collection = client.db('users').collection('user');
  
    collection.findOne({ 'username' : username })
      .then( (result) => {
        if (null == result) {
          console.log("Couldn't find:", username);
          deferred.resolve(false); 
        }
        else {
          const hash = result.password;
          console.log("User found: " + result.username);
  
          if (bcrypt.compareSync(password, hash)) {
            deferred.resolve(result);
          } else {
            console.log("Wrong password");
            deferred.resolve(false);
          }
        }
        db.close();
      });
    });
    return deferred.promise;
  }

module.exports = { dbReg, dbAuth, isLoggedIn, isLoggedOut };