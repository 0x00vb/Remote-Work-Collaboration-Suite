const Team = require('../models/Team');

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