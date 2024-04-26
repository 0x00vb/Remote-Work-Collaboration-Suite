const mongoose = require('mongoose');
const teamSchema = mongoose.Schema({
    members: {
        type: Array,
        default: [], //UserId's
        required: false
    },
    leader: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Team", teamSchema);