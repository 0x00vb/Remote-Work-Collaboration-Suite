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
        res.status(500).json({ message: 'Somthing went wrong!' });
    }
}