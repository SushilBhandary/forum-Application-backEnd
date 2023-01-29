const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true, "name is required"]
        },
        email : {
            type : String,
            required : [true, "email is required"]
        },
        password : {
            type : String,
            required : [true, "Password is required"]
        },
        posts : {
            type : [mongoose.Schema.Types.ObjectId],
            ref : "post"
        }
    }
)

module.exports = mongoose.model('user', userSchema)