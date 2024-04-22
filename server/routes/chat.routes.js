const express = require('express');
const router = express.Router();
import { verifyToken } from '../middlewares/auth.middleware';

import {accessSelectedChat, fetchAllChats} from '../controllers/chat.controllers';

router.get('/', verifyToken, fetchAllChats);
router.post('/', verifyToken, accessSelectedChat);

module.exports = router;