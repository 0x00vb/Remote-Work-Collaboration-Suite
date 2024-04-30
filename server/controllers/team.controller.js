const Team = require('../models/Team');
const Project = require('../models/Project');

exports.createTeam = async (req, res) => {
    try{
        const { teamMembersId, leaderId } = req.body;
        const team = new Team({
            members: teamMembersId,
            leader: leaderId
        })        
        await team.save();
        res.status(200).json({ message: 'Team created successfully!', teamId: team._id})
    }catch(err){ 
        console.log(err);
        res.status(500).json({ message: 'Somthing went wrong!' });
    }
}

exports.fetchTeamData = async (req, res) => {
    try{
        const projectId = req.params.projectId;
        const projectExists = await Project.findOne({ _id : projectId });
        if(projectExists){
            const team = await Team.findOne({ _id: projectExists.team });

            res.status(200).json({ message: 'Success rettrieving teams', team });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Somthing went wrong!' });
    }
}