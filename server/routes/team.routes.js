const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const teamController = require('../controllers/team.controller');

router.post('/createTeam', verifyToken, teamController.createTeam);

router.get('/getTeam/:projectId', verifyToken, teamController.fetchTeamData);

module.exports = router;