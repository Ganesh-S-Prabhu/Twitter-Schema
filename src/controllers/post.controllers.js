const express = require("express");

const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

const router = express.Router();

//getting  a post
router.get("", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate(userId)
      .lean()
      .exec();

    return res.status(200).send(posts);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


//adding new post
router.post("", async (req, res) => {
    try {
      const posts = await Post.create(req.body);
      return res.status(201).send(posts);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


//getting a post by its id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate(userId)
      .lean()
      .exec();

    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


//updating the post by it's id
router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate(userId)
      .lean()
      .exec();

    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


//delete a post by it's id
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id).lean().exec();
        
      return res.status(200).send(post);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });





module.exports = router;