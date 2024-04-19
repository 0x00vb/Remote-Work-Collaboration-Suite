const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

const app = express();

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

app.use('/auth', authRoutes)

app.listen(process.env.PORT, () => {
    console.log('[+] Listening on http://localhost:' + process.env.PORT)
})