require("dotenv").config();

const bcrypt = require("bcryptjs"),
  Q = require("q");

const { sendWelcomeEmail } = require('../email/email');


// check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

// check if user is logged out
const isLoggedOut = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

// register user
const dbReg = (client, username, password, req) => {

  const deferred = Q.defer();

  //check if username already exists
  client
    .db("users")
    .collection("user")
    .findOne({ username: username })
    .then((result) => {
      if (null != result) {
        console.log("Username already exists:", result.username);
        deferred.resolve(false);
      } else {
        const pass = req.body.password
        const confirm_pass = req.body.confirm_password

        const hash = bcrypt.hashSync(password, 10);
        const user = {
          username: username,
          password: hash,
          name: req.body.name,
          email: req.body.email,
          age: req.body.age,
          residence: req.body.residence,
          language: req.body.language
        };

        if (pass == confirm_pass) {
          console.log("User with username:", username,"is being created");

          client
            .db("users")
            .collection("user")
            .insertOne(user)
            .then(() => {
              deferred.resolve(user);
            });

          sendWelcomeEmail(username, req.body.email);
        } else {
          console.log("Passwords don't match");
          deferred.resolve(user);
        }
        
      }
    });
  return deferred.promise;
};

// authorize user
const dbAuth = (client, username, password) => {
  const deferred = Q.defer();

  client
    .db("users")
    .collection("user")
    .findOne({ username: username })
    .then((result) => {
      if (null == result) {
        console.log("Couldn't find:", username);
        deferred.resolve(false);
      } else {
        const hash = result.password;
        console.log("User found: " + result.username);

        if (bcrypt.compareSync(password, hash)) {
          deferred.resolve(result);
        } else {
          console.log("Wrong password");
          deferred.resolve(false);
        }
      }
    });
  return deferred.promise;
};

module.exports = { dbReg, dbAuth, isLoggedIn, isLoggedOut };
