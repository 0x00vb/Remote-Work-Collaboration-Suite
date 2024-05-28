const mongoose = require('mongoose');
const projectSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        min: 4
    },
    description: {
        type: String,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId, //Team ID
    },
    tasks: {
        type: Array,  // Tasks Ids
    },
    meetingId: String
}, { timestamps: true })

module.exports = mongoose.model("Project", projectSchema);