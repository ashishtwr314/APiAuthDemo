const express = require("express");
const router = express.Router();
const postController = require("../controller/postsController");
const isAuth = require("../middleware/isAuth");

router.get("/posts", isAuth, postController.getAllPosts);

router.post("/createPost", postController.createPost);

router.get("/posts/:id", postController.getPostDetails);

router.get("/delete/:id", postController.deletePost);

router.post("/edit/:id", postController.editPost);

module.exports = router;
