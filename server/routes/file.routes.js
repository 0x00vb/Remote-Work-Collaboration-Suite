const express = require('express');
const router = express.Router();
const fileController = require('./file.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { uploadFile } = require('../utils/file');

// Upload a file
router.post('/:projectId/upload', authMiddleware.verifyToken, uploadFile, fileController.uploadFile);

// Get all files for a project
router.get('/:projectId/files', authMiddleware.verifyToken, fileController.getProjectFiles);

// Get a specific file
router.get('/:fileId', authMiddleware.verifyToken, fileController.getFile);

// Delete a file
router.delete('/:fileId', authMiddleware.verifyToken, fileController.deleteFile);

module.exports = router;