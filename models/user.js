const { default: mongoose } = require("mongoose");

//Schema
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passward: {
        type: String,
        required: true,
    }
});

const User=mongoose.model('users',userSchema);   

module.exports = User;