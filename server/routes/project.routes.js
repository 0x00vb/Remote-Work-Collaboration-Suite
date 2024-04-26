const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controllers');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/createProject', verifyToken, projectController.createProject);

router.get('/searchUserProjects', verifyToken, projectController.searchUserProjects)

module.exports = router;