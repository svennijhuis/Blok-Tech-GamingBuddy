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
app.use("/register", require("./routes/register.js"));



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
