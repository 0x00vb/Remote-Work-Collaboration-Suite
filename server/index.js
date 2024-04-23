const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socketio = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const messagesRouter = require('./routes/messages.routes');

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

const server = app.listen(process.env.PORT, () => {
  console.log('[+] Listening on http://localhost:' + process.env.PORT)
})

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

