const Post = require("../models/post.schema")
const User = require("../models/user.scheme")

exports.getPosts = (req, res) => {
    Post.find({})
    // db.collection.find().skip(20).limit(10)
    // db.collection.findOne().sort({ _id: -1 })
    .sort({data : -1})
    .then( (data, err) => {
        // Bubble Sort
        let len = data.length,
        i, j, temp;
        for (i=0; i < len; i++){
            for (j=0 ; j < len-i-1; j++){
                if ( new Date( data[j].createdAt ).getTime() < new Date( data[j+1].createdAt ).getTime() ){
                    
                    temp = data[j];
                    data[j] = data[j+1];
                    data[j+1] = temp;
                }
            }
        }
        return res.status(200).json({
            posts : data
        })
    })
    .catch ( err => {
        console.log(err)
        return res.status(401).json({
            error : "Something went wrong"
        })
    })
}

exports.getMyPosts = (req, res) => {
    const {userid} = req.params
    User.findById(userid)
    .then( async(data, err) => {
        let myPost = []
        for (let index = 0; index < data.posts.length; index++) {
            let a = await Post.findById(data.posts[index])
            if (a) {
                myPost.push(a)
            }
        }
        return res.status(200).json({
            posts : myPost
        })
    })
    .catch ( err => {
        console.log(err)
        return res.status(401).json({
            error : "Something went wrong"
        })
    })
}

exports.createPost = async(req, res) => {
    const {article} = req.body
    const {userid} = req.params
    const user = await User.findById(userid)
    const post = await Post.create({
        article  : article,
        createdBy : userid,
        createdByName : user.name
    })
    await post.save()
    user.posts.push(post._id)
    await user.save()

    res.status(200).json({
        success: true,
        message: "Post created Succesfully"
    })

}

exports.editPost = async(req, res) => {
    const {postid} = req.params
    const {article} = req.body

    const post = await Post.findByIdAndUpdate(postid, {article}, {new :true})
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

exports.deletePost = async(req, res) => {
    const {postid, userid } = req.params
    const user = await User.findById(userid)
    user.posts = user.posts.filter( post => post !== postid)
    await user.save()
    await Post.findByIdAndDelete(postid)

    res.status(200).json({
        success : true,
        message : "Post deleted successfully"
    })
}

exports.addComment = async (req, res) => {
    const { postid } = req.params
    const { name, value } = req.body

    const post = await Post.findById(postid)
    post.comment.push({
        userName : name,
        comment : value,
        commentDate : new Date()
    })
    await post.save()

    res.status(200).json({
        success : true,
        message : "Comment added successfully",
        post
    })
}
