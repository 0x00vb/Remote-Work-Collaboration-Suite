const Project = require('../models/Project');
const User = require('../models/User');
const Chat = require('../models/Chat');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// exports.createProject = async (req, res) => {
//     try{
//         const { projectName, projectDesc, teamId } = req.body;
//         const existingProject = await Project.findOne({ name: projectName });
//         if(existingProject){
//             res.status(400).json({ message: 'Project with specified name already exists!'});
//         }

//         const project = new Project({
//             name: projectName,
//             description: projectDesc,
//             team: teamId,
//             tasks: []
//         })
//         await project.save()
//         res.status(200).json({ message: "Project created successfully!" })
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ message: 'Internal server error!' });
//     }
// }

exports.createProject = async (req, res) => {
  try {
    const { projectName, projectDesc, teamId } = req.body;
    const existingProject = await Project.findOne({ name: projectName });

    if (existingProject) {
      return res.status(400).json({ message: 'Project with specified name already exists!' });
    }

    const project = new Project({
      name: projectName,
      description: projectDesc,
      team: teamId,
      tasks: [],
    });
    await project.save();

    // Fetch team members
    const teamMembers = await User.find({ team: teamId });

    // Create individual chats for each pair of team members
    for (let i = 0; i < teamMembers.length; i++) {
      for (let j = i + 1; j < teamMembers.length; j++) {
        const user1 = teamMembers[i]._id;
        const user2 = teamMembers[j]._id;

        // Check if chat between these two users already exists
        const existingChat = await Chat.findOne({ 
          users: { $all: [user1, user2] }, 
          isGroup: false 
        });

        if (!existingChat) {
          const chat = new Chat({
            users: [user1, user2],
          });
          await chat.save();
        }
      }
    }

    res.status(200).json({ message: 'Project and private chats created successfully!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error!' });
  }
};

exports.searchUserProjects = async (req, res) => {
    try{
        const userUsername = req.user.username;
        const userProjects = await Project.aggregate([
            // Stage 1: Match teams where the user is a member
            {
              $lookup: {
                from: 'teams',
                localField: 'team',
                foreignField: '_id',
                as: 'teamData'
              }
            },
            {
              $match: {
                'teamData.members': userUsername
              }
            }
          ]);
          res.status(200).json({projects: userProjects});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Internal server error!'})
    }
}

exports.createOrGetMeetingId = async (req, res) => {
  try {
    const projectIdParam = req.params.projectId;
    console.log(projectIdParam);
    const projectId = new mongoose.Types.ObjectId(projectIdParam);
    let project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (!project.meetingId) {
      project.meetingId = uuidv4();
      await project.save();
    }

    res.json({ meetingId: project.meetingId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
