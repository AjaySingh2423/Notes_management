const { default: mongoose } = require("mongoose");

//Schema
const noteSchema=new mongoose.Schema({
   title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // reference to User model
        required: true
    },

   
}, { timestamps: true });

const Post=mongoose.model('notes',noteSchema);   

module.exports = Post;