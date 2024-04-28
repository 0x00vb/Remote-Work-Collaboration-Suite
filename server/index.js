const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socketio = require('socket.io');
const easyrtc = require('easyrtc');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const messagesRouter = require('./routes/messages.routes');
const teamRouter = require('./routes/team.routes');
const taskRouter = require('./routes/task.routes');
const projectRouter = require('./routes/project.routes');

const app = express();
app.use(cors({origin: 'http://localhost:3000', credentials: true, methods: ['GET', 'POST', 'DELETE']}))
app.use(cookieParser())
app.use(express.json())
 
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("[+] DB connected!")
})
.catch((e) => {
  console.log("[!] Failed to connect! ", e.message)
})

app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRouter);
app.use('/api/team', teamRouter);
app.use('/api/task', taskRouter);
app.use('/api/project', projectRouter);

const server = http.createServer(app);
const io = new socketio.Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);
  
  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });
  
  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  }); 
});

easyrtc.setOption("logLevel", "debug");

// Overriding the default easyrtcAuth listener, only so we can directly access its callback
easyrtc.events.on("easyrtcAuth", function(socket, easyrtcid, msg, socketCallback, callback) {
    easyrtc.events.defaultListeners.easyrtcAuth(socket, easyrtcid, msg, socketCallback, function(err, connectionObj){
        if (err || !msg.msgData || !msg.msgData.credential || !connectionObj) {
            callback(err, connectionObj);
            return;
        }

        connectionObj.setField("credential", msg.msgData.credential, {"isShared":false});

        console.log("["+easyrtcid+"] Credential saved!", connectionObj.getFieldValueSync("credential"));

        callback(err, connectionObj);
    });
});


// To test, lets print the credential to the console for every room join!
easyrtc.events.on("roomJoin", function(connectionObj, roomName, roomParameter, callback) {
  console.log("["+connectionObj.getEasyrtcid()+"] Credential retrieved!", connectionObj.getFieldValueSync("credential"));
  easyrtc.events.defaultListeners.roomJoin(connectionObj, roomName, roomParameter, callback);
});

// Start EasyRTC server
var rtc = easyrtc.listen(app, io, null, function(err, rtcRef) {
  console.log("Initiated");

  rtcRef.events.on("roomCreate", function(appObj, creatorConnectionObj, roomName, roomOptions, callback) {
      console.log("roomCreate fired! Trying to create: " + roomName);

      appObj.events.defaultListeners.roomCreate(appObj, creatorConnectionObj, roomName, roomOptions, callback);
  });
});

server.listen(4444, () => {
    console.log("[+] Server running on: http://localhost:4444")
})