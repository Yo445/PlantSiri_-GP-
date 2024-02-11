const express = require("express");
const helmet = require("helmet");

const http = require("http");
const { Server } = require("socket.io");

const admin = require("./firebase/dbadmin.js");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../client/build")));

const httpServer = http.createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  const ref = admin.database().ref("/arduino-pump");
  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    socket.emit("arduinopump", data);
  });

  socket.on("pumpmanual", (data) => {
    const ref = admin.database().ref(`/arduino-pump/${data.path}/state`);
    ref.set(data.state);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/arduino", (req, res) => {
  res.send("Work");
});

const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
