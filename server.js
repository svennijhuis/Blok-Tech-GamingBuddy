const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// socket.io admin-ui
const { instrument } = require("@socket.io/admin-ui");
const cors = require("cors");
app.use(cors({ origin: "*" }));
instrument(io, { auth: false });

// database functions
const {
  loadChat,
  saveChat,
  deleteChat
} = require("./utils/io/chatActions.js");
const mongoConnect = require("./controller/mongoConnect");
let client;

const { formatMessage } = require("./utils/io/messages.js");

// houdt users in room bij
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require("./utils/io/users");

const {
  checkRoomData,
  loadRoomData
} = require("./utils/filters/getRoomInfo");

const { sendWelcomeEmail } = require('./utils/email/email.js')

// map voor static files (stylesheet etc)
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const exphbs = require("express-handlebars");
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "index",
    extname: ".hbs"
  })
);

app.set("view engine", "hbs");

// routes
app.use("/", require("./routes/roomSelect"));
app.use("/messages", require("./routes/chat"));
app.use("/register", require("./routes/test"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));



io.on("connect", (socket) => {
  socket.on("joinRoom", async ({ username, room }) => {
    // wordt uitgevoerd wanneer gebruiker room joined, user object wordt in users array gezet voor sidebar info (utils/users.js)
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // haal chat op uit database
    loadChat(client, user.room, socket);

    // kijk of kamer metadata bestaat, anders wordt die aangemaakt
    await checkRoomData(client, room);

    const roomData = await loadRoomData(client, room);

    // toont room metadata in sidebar popup
    io.to(user.room).emit("loadedRoomData", roomData);

    socket.broadcast
      .to(user.room)
      .emit("systemMessage", formatMessage("Server", `${user.username} has joined the chat`));

    // update users in sidebar
    io.to(user.room).emit("updateusers", getRoomUsers(user.room));

    socket.on("message", msg => {
      // chat message van user
      const user = getCurrentUser(socket.id);

      // voeg metadata aan message object toe (tijd, id etc.)
      const fullMsg = formatMessage(user, msg);

      io.to(user.room).emit("message", fullMsg);

      // sla message object op in database
      saveChat(client, fullMsg);
    });

    socket.on("deleteMsg", (room, messageId) => {
      // verwijder message globaal, zowel in room als database
      deleteChat(client, room, messageId);
      io.to(user.room).emit("deleteMsgGlobal", messageId);
    });

    socket.on("disconnect", () => {
      // update sidebar en emit "has left the chat" msg
      const user = userLeave(socket.id);

      // emit message als er nog users in room zijn
      if (user) {
        io.to(user.room).emit(
          "systemMessage",
          formatMessage("Server", `${user.username} has left the chat`)
        );

        io.to(user.room).emit("updateusers", getRoomUsers(user.room));
      }
    });
  });
});
//////////////////////////////
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const flash = require('express-flash');

const {
  dbReg,
  dbAuth
} = require("./utils/register/authentication");

// Passport.js
passport.serializeUser( (user, done) => {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  console.log("deserializing " + obj);
  done(null, obj);
});

 
// login
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true},
  (req, username, password, done) => {
    dbAuth(client, username, password)
    .then( (user) => {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'Succesful login from ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = "Couldn't find user";
        return done(null, false, { message: 'Username or password is incorrect' })
      }
    })
    .fail((err) => {
      console.log(err.body);
    });
  }
));

// register
passport.use('local-signup', new LocalStrategy(
  {passReqToCallback : true}, 
  (req, username, password, done) => {
    dbReg(client, username, password, req)
    .then( (user) => {
      if (user) {
        console.log("REGISTERED: " + user.username);
        req.session.success = 'Succesful register from ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT REGISTER");
        req.session.error = 'Username already exists'; //
        return done(null, false, { message: 'Username already exists' })
      }
    })
    .fail( (err) => {
      console.log(err.body);
    });
  }
));

// express
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash())
app.use(methodOverride('_method'));
app.use(session({ 
  secret: 'process.env.SESSION_SECRET', 
  saveUninitialized: true, 
  resave: true 
}));
app.use(passport.initialize());
app.use(passport.session());

// session-persisted message middleware
// [https://www.ctl.io/developers/blog/post/build-user-authentication-with-node-js-express-passport-and-mongodb]
app.use( (req, res, next) => {
  const err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

      delete req.session.error;
      delete req.session.success;
      delete req.session.notice;
    
      if (err) res.locals.error = err;
      if (msg) res.locals.notice = msg;
      if (success) res.locals.success = success;

      next();
});

app.use((req, res, next) => {
  app.locals.success = req.flash('success')
  next();
});




//////////////////////////////
// verbind met mongodb database en start server
const startServer = async () => {
  client = await mongoConnect.getDB();
  server.listen(port, "0.0.0.0", () => {
    console.log(`listening on: *${port}`);
  });
};

startServer();

app.use((req, res, next) => {
  res.status(404).send("404 Error: page not found");
});
