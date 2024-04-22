const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/signin', authController.signin);

router.post('/login', authController.login);

router.get('/valid', verifyToken, authController.validUser)

router.post('/reset-password', authController.requestPasswordReset);

router.patch('/reset-password/:token', authController.resetPassword);

module.exports = router;