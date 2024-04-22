const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messages.controllers')
const { verifyToken } = require('../middlewares/auth.middleware');

router.post("/", verifyToken, sendMessage);
router.get("/:chatId", verifyToken, getMessages);

module.exports = router;