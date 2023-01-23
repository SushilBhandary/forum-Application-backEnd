const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello auth system")
})
router.post("/signup");
router.post("/login");
router.post("/logout");
router.post("/get-post");
router.post("/create-post");
router.put("/edit-post");
router.delete("/delete-post");
router.post("/add-comments");
module.exports = router;
