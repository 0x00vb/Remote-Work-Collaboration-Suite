const mongoose = require('mongoose');
const fileSchema = mongoose.Schema({
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
        default: [],
        required: false
    }
})

module.exports = mongoose.model("File", fileSchema);