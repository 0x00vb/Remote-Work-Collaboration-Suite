const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try{
        const { projectName, projectDesc, teamId } = req.body;
        const existingProject = await Project.findOne({ name: projectName });
        if(existingProject){
            res.status(400).json({ message: 'Project with specified name already exists!'});
        }

        const project = new Project({
            name: projectName,
            description: projectDesc,
            team: teamId,
            tasks: []
        })
        await project.save()
        res.status(200).json({ message: "Project created successfully!" })
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Internal server error!' });
    }
}

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