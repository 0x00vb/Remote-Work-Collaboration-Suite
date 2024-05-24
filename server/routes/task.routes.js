const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const taskController = require('../controllers/task.controllers');

router.get('/fetchTasks/:projectId', verifyToken, taskController.fetchTasks);

router.post('/createTask/:projectId', verifyToken, taskController.createTask);

router.patch('updateTaskStatus', verifyToken, taskController.updateTaskStatus);

module.exports = router;