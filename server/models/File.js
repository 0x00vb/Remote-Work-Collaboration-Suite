const mongoose = require('mongoose');
const fileSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        min: 4
    },
    path: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    uploaded_by: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("File", fileSchema);