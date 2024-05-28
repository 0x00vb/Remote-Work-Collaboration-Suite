const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controllers');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/createProject', verifyToken, projectController.createProject);

router.get('/searchUserProjects', verifyToken, projectController.searchUserProjects);

router.get('/:projectId/meeting', verifyToken, projectController.createOrGetMeetingId);

module.exports = router;