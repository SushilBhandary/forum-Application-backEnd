const Post = require("../models/post.schema")
const User = require("../models/user.scheme")

exports.getPosts = (req, res) => {
    Post.find({})
    .sort({data : -1})
    .then( (err, data) => {
        return res.status(200).json({
            posts : data
        })
    })
    .catch ( err => console.log(err))
}

exports.createPost = async(req, res) => {
    const {article} = req.body
    const {userid} = req.params

    const post = await Post.create({
        article  : article,
        createdBy : userid
    })
    await post.save()

    const user = await User.findById(userid)
    user.posts.push(post._id)
    await user.save()

    res.status(200).json({
        success: true,
        message: "Post created Succesfully"
    })

}

exports.editPost = (req, res) => {
    const {postid, userid} = req.params
    const {article} = req.body

    const post = Post.findByIdAndUpdate(postid, {article}, {new :true})
    if (! post) {
        return res.status(401).json({
            error : "Post does not Exist "
        })
    }
    res.status(200).json({
        message : "Post Updated Successfully",
        post
    })
}

// exports.