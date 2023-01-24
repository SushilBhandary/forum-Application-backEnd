const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth.middlewares")
const  {
    signUp,
    login,
    logout
} = require('../controllers/auth.controller')
const  {
    getPosts,
    createPost,
    editPost,
    deletePost,
    addComment
} = require('../controllers/post.controller')

router.get("/", (req, res) => {
    res.send("Hello auth system")
})
router.post("/signup",signUp);
router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/get-post", auth, getPosts);
router.post("/create-post/:userid", auth, createPost);
router.post("/create-post/:userid", auth, createPost);
router.put("/edit-post/:postid/:userid", auth, editPost);
router.delete("/delete-post/:postid/:userid", auth, deletePost);
router.post("/add-comments/:postid", auth, addComment);

module.exports = router;
