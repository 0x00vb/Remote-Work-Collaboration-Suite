const Task = require('../models/Task');
const Project = require('../models/Project');

exports.fetchTasks = async (req, res) => {
    try{
        const projectId = req.params.projectId;
        const projectExists = await Project.findOne({ _id : projectId })
        if(projectExists){
            const tasks = await Task.find({ project: projectId });
            return res.status(200).json({ message: 'Success rettrieving tasks', tasks  })
        }
        res.status(404).json({ message: 'Nothing found' });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'internal server error' });
    }
}

exports.createTask = async (req, res) => {
    try{
        const projectId = req.params.projectId;
        const {title, description, assignee, due_date} = req.body;
        const projectExists = await Project.findOne({ _id : projectId })
        if(projectExists){
            const newTask = new Task({
                title,
                description,
                assignee,
                due_date,
                project: projectId
            })

            await newTask.save();
            res.status(200).json({ message: 'Task created successfully' });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'internal server error' });
    }
}

exports.updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['todo', 'in_progress', 'done'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }
    try{
        const task = await Task.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task status updated successfully', task });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'internal server error' });
    }
}