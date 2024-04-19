const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/signin', authController.signin);

router.post('/login', authController.login);

router.post('/reset-password', authController.requestPasswordReset);

router.patch('/reset-password/:token', authController.resetPassword);

module.exports = router;