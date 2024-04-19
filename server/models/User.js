const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        min: 6
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        min: 8
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);