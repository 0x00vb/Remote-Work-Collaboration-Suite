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
app.use(cors({origin: 'http://localhost:3000', credentials: true, methods: ['GET', 'POST', 'DELETE', 'PATCH']}))
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

// easyrtc.setOption("logLevel", "debug");

// // Overriding the default easyrtcAuth listener, only so we can directly access its callback
// easyrtc.events.on("easyrtcAuth", function(socket, easyrtcid, msg, socketCallback, callback) {
//     easyrtc.events.defaultListeners.easyrtcAuth(socket, easyrtcid, msg, socketCallback, function(err, connectionObj){
//         if (err || !msg.msgData || !msg.msgData.credential || !connectionObj) {
//             callback(err, connectionObj);
//             return;
//         }

//         connectionObj.setField("credential", msg.msgData.credential, {"isShared":false});

//         console.log("["+easyrtcid+"] Credential saved!", connectionObj.getFieldValueSync("credential"));

//         callback(err, connectionObj);
//     });
// });


// // To test, lets print the credential to the console for every room join!
// easyrtc.events.on("roomJoin", function(connectionObj, roomName, roomParameter, callback) {
//   console.log("["+connectionObj.getEasyrtcid()+"] Credential retrieved!", connectionObj.getFieldValueSync("credential"));
//   easyrtc.events.defaultListeners.roomJoin(connectionObj, roomName, roomParameter, callback);
// });

// // Start EasyRTC server
// var rtc = easyrtc.listen(app, io, null, function(err, rtcRef) {
//   console.log("Initiated");

//   rtcRef.events.on("roomCreate", function(appObj, creatorConnectionObj, roomName, roomOptions, callback) {
//       console.log("roomCreate fired! Trying to create: " + roomName);

//       appObj.events.defaultListeners.roomCreate(appObj, creatorConnectionObj, roomName, roomOptions, callback);
//   });
// });

const usersInRoom = {}; //all user(socket id) connected to a chatroom
const socketToRoom = {}; //roomId in which a socket id is connected

io.on('connection', socket => {
  console.log('Some one joined socketId: ' + socket.id);
  socket.on("joinRoom", roomId=> {
      // console.log('Joined roomId: ' + roomId + " socketId: " + socket.id + ' userId: ' + socket.userId);
      if (usersInRoom[roomId]) {
          usersInRoom[roomId].push(socket.id);
      } else {
          usersInRoom[roomId] = [socket.id];
      }
      socketToRoom[socket.id] = roomId;
      const usersInThisRoom = usersInRoom[roomId].filter(id => id !== socket.id);
      socket.join(roomId); //for message
      socket.emit("usersInRoom", usersInThisRoom); //sending all socket id already joined user in this room
  });

  //client send this signal to sever and sever will send to other user of peerId(callerId is peer id)
  socket.on("sendingSignal", payload => {
      console.log('console.log before sending userJoined', payload.callerId);
      io.to(payload.userIdToSendSignal).emit('userJoined', { signal: payload.signal, callerId: payload.callerId });
  });

  //client site receive signal of other peer and it sending its own signal for other member
  socket.on("returningSignal", payload => {
      io.to(payload.callerId).emit('takingReturnedSignal', { signal: payload.signal, id: socket.id });
  });

  //from client send message to send all other connected user of same room
  socket.on('sendMessage', payload => {
      //sending message to all other connected user at same room
      io.to(payload.roomId).emit('receiveMessage', { message: payload.message, name:socket.name, username: socket.username });
  });

  //someone left room
  socket.on('disconnect', () => {
      const roomId = socketToRoom[socket.id];
      let socketsIdConnectedToRoom = usersInRoom[roomId];
      if (socketsIdConnectedToRoom) {
          socketsIdConnectedToRoom = socketsIdConnectedToRoom.filter(id => id !== socket.id);
          usersInRoom[roomId] = socketsIdConnectedToRoom;
      }
      socket.leave(roomId); //for message group(socket)
      socket.broadcast.emit("userLeft", socket.id); //sending socket id to all other connected user of same room without its own
  });
});


server.listen(4444, () => {
    console.log("[+] Server running on: http://localhost:4444")
})