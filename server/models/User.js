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
    },
    profilePic: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.webp"
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);