const socket = io();

const messages = document.querySelector(".chat main > ul");
let deleteButtons = [];

const messageForm = document.querySelector(".chat main form");
const messageInput = document.querySelector(".chat main form input[type=text]");

const asideElement = document.querySelector(".chat aside");
const usersList = document.querySelector(".chat aside ul:last-of-type");
const roomsList = document.querySelectorAll(".chat aside ul:first-of-type li a, .filter section:nth-of-type(2) ul li a");

const roomInfo = document.querySelector(".chat main > aside");
const roomInfoContainer = document.querySelector(".chat main > aside div");

const chatBackButton = document.querySelector(".chat main > div svg");
const roomInfoButton = document.querySelector(".chat main > div:first-of-type button");

// back button on error page
const errorBackButton = document.querySelector(".error ul li:first-of-type")


// function voor root van de site, wordt later veranderd
if (location.pathname === "/" || window.location.href.indexOf("filter") > -1) {
  const changeRoom = (e) => {
    window.location.href = `/messages?username=Laurens&room=${e.currentTarget.id}`;
  };

  for (let i = 0; i < roomsList.length; i++) {
    roomsList[i].addEventListener("click", changeRoom);
  }
}



if ((window.location.href.indexOf("messages") > -1)) {
  // haalt username en room op uit url
  const {
    username,
    room
  } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  socket.emit("joinRoom", {
    username,
    room
  });

  // regelt input van form(tekstbox voor msg)
  messageForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (messageInput.value) {
      socket.emit("message", messageInput.value);
      messageInput.value = "";
    }
  });


  // mobile aside (chatlijst) tonen
  function mobileAside () {
    asideElement.classList.add("active");
  }

  const editRoomInfo = () => {
    roomInfo.classList.toggle("active");
  };


  // verander room mbv sidebar
  const changeRoom = (e) => {
    window.location.href = `/messages?username=${username}&room=${e.currentTarget.id}`;
  };


  // haalt id op van msg die verwijderd moet worden en verwijderd deze lokaal
  const deleteMsg = (e) => {
    const liDelete = e.currentTarget.parentNode;
    const naamDelete = liDelete.querySelector("div strong");
    const berichtDelete = liDelete.querySelector("p");

    naamDelete.textContent = "[Removed]";
    berichtDelete.textContent = "Message is being deleted...";

    socket.emit("deleteMsg", room, liDelete.id);
  };


  // berichten output
  socket.on("message", function (msg) {
    const liMessage = document.createElement("li");
    liMessage.setAttribute("id", msg.uniqid);
    liMessage.innerHTML = `<div><strong>${msg.naam}</strong><small>${msg.time}</small></div><p>${msg.bericht}
    </p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-label="delete message">
    <g>
      <g>
      <path d="M 76.777 2.881 H 57.333 V 2.412 C 57.333 1.08 56.253 0 54.921 0 H 35.079 c -1.332 0 -2.412 1.08 -2.412 2.412 v 0.469 H 13.223 c -1.332 0 -2.412 1.08 -2.412 2.412 v 9.526 c 0 1.332 1.08 2.412 2.412 2.412 h 63.554 c 1.332 0 2.412 -1.08 2.412 -2.412 V 5.293 C 79.189 3.961 78.109 2.881 76.777 2.881 z"/>
      <path d="M 73.153 22.119 H 16.847 c -1.332 0 -2.412 1.08 -2.412 2.412 v 63.057 c 0 1.332 1.08 2.412 2.412 2.412 h 56.306 c 1.332 0 2.412 -1.08 2.412 -2.412 V 24.531 C 75.565 23.199 74.485 22.119 73.153 22.119 z M 33.543 81.32 c 0 1.332 -1.08 2.412 -2.412 2.412 h -2.245 c -1.332 0 -2.412 -1.08 -2.412 -2.412 V 30.799 c 0 -1.332 1.08 -2.412 2.412 -2.412 h 2.245 c 1.332 0 2.412 1.08 2.412 2.412 V 81.32 z M 48.535 81.32 c 0 1.332 -1.08 2.412 -2.412 2.412 h -2.245 c -1.332 0 -2.412 -1.08 -2.412 -2.412 V 30.799 c 0 -1.332 1.08 -2.412 2.412 -2.412 h 2.245 c 1.332 0 2.412 1.08 2.412 2.412 V 81.32 z M 63.526 81.32 c 0 1.332 -1.08 2.412 -2.412 2.412 h -2.245 c -1.332 0 -2.412 -1.08 -2.412 -2.412 V 30.799 c 0 -1.332 1.08 -2.412 2.412 -2.412 h 2.245 c 1.332 0 2.412 1.08 2.412 2.412 V 81.32 z"/>
    </g>
    </g>
    </svg>`;

    if (msg.naam === username) {
      liMessage.classList.add("yourmsg");
    };

    messages.appendChild(liMessage);
    messages.scrollTo(0, messages.scrollHeight);
    deleteButtons = document.querySelectorAll(".chat main ul li.yourmsg svg");

    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", deleteMsg);
    }
  });

  // room info output
  socket.on("loadedRoomData", function (roomData) {
    // Onderstaande data weergeven in div
    roomInfoContainer.innerHTML = `
    <img src="${roomData.img}" alt="group picture">
    <h2>${roomData.roomNaam}</h2>
    <p>${roomData.beschrijving}</p>
    <ul>
      <li>Taal: <em>${roomData.taal}</em></li>
      <li>Genre: <em>${roomData.genre}</em></li>
    </ul>`;
  });



  // display server berichten
  socket.on("systemMessage", function (msg) {
    const liMessage = document.createElement("li");
    liMessage.classList.add("servermsg");
    liMessage.innerHTML = `<div><strong>${msg.naam}</strong><small>${msg.time}</small></div>${msg.bericht}`;
    messages.appendChild(liMessage);
    messages.scrollTo(0, messages.scrollHeight);
  });

  // display lijst met users in room
  socket.on("updateusers", function (users) {
    usersList.innerHTML = "";
    users.forEach((user) => {
      const liUser = document.createElement("li");
      liUser.innerHTML = user.username;
      usersList.appendChild(liUser);
      usersList.scrollTo(0, usersList.scrollHeight);
    });
  });

  // check of gebruiker connected blijft
  socket.on("disconnect", () => {
    messageInput.setAttribute("placeholder", "Je bent niet verbonden");
  });

  // verwijder bericht globaal
  socket.on("deleteMsgGlobal", (messageId) => {
    const messageToBeRemoved = document.getElementById(messageId);
    messageToBeRemoved.remove();
  });

  for (let i = 0; i < roomsList.length; i++) {
    roomsList[i].addEventListener("click", changeRoom);
  }

  roomInfoButton.addEventListener("click", editRoomInfo);
  chatBackButton.addEventListener("click", mobileAside);
}


errorBackButton.addEventListener("click", () => {
  history.back();
});
