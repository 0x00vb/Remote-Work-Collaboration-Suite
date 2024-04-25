const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controllers');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/createProject', verifyToken, projectController.createProject);


module.exports = router;