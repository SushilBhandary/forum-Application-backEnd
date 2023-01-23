const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    article : {
        type : String,
        required : [true, "articl required"]
    },
    createdBy : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'user'
    },
    comment : [{
        userName : {
            type: String
        },
        comment : {
            type : String
        },
        commentDate : {
            type : Date 
        }
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model("todo", todoSchema)