const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try{

    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Somthing went wrong!' });
    }
}