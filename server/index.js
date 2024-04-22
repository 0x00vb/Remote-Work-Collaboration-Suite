const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socketio = require('socket-io');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const messagesRouter = require('./routes/messages.routes');

const app = express();
const server = require('http').Server(app);
const io = socketio(server);

app.use(cors({origin: '*', credentials: true, methods: ['GET', 'POST', 'DELETE']}))
app.use(cookieParser())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("[+] DB connected!")
})
.catch((e) => {
    console.log("[!] Failed to connect! ", e.message)
})

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);
  
    socket.on('sendMessage', (message) => {
      io.emit('message', message);
    });
  
    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`);
    }); 
});

app.use('/auth', authRoutes);
app.use('/messages', messagesRouter);

app.listen(process.env.PORT, () => {
    console.log('[+] Listening on http://localhost:' + process.env.PORT)
})