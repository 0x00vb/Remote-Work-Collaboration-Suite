const express = require('express');
const router = express.Router();
import { sendMessage, getMessages } from '../controllers/me'
import { verifyToken } from '../middlewares/auth.middleware';

router.post("/", verifyToken, sendMessage);
router.get("/:chatId", verifyToken, getMessages);

module.exports = router;