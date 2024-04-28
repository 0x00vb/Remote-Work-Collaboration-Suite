const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    assignee: {
        type: String, // UserID
        required: true
    },
    due_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['todo', 'in_progress', 'done'],
        default: 'todo',
        required: false,
    },
    project: {
        type: String,  // Project id
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Task", taskSchema);