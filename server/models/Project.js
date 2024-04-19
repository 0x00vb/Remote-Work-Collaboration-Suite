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
        type: String, //Team ID
    },
    tasks: {
        type: Array,
    }
}, { timestamps: true })

module.exports = mongoose.model("Project", projectSchema);