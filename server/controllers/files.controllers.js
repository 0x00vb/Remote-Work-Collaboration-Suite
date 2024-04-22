const File = require('../models/file.model');
const { deleteFile, extractFileMetadata } = require('../utils/file');

// Upload a file
export const uploadFile = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { file } = req;
    const { path, mimetype, size } = file;

    // Extract file metadata
    const metadata = extractFileMetadata(path);

    // Create a new file document in the database
    const newFile = new File({
      name: file.originalname,
      path,
      mimetype,
      size,
      metadata,
      project: projectId,
      uploadedBy: req.userId,
    });
    await newFile.save();

    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get all files for a project
export const getProjectFiles = async (req, res) => {
  try {
    const { projectId } = req.params;
    const files = await File.find({ project: projectId });
    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get a specific file
export const getFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.status(200).json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Delete a file
export const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findByIdAndDelete(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    deleteFile(file.path); // Delete the file from the file system
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};