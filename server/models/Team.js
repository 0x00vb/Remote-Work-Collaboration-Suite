const mongoose = require('mongoose');
const teamSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        min: 4
    },
    description: {
        type: String,
    },
    members: {
        type: Array,
        default: [], //UserId's
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Team", teamSchema);