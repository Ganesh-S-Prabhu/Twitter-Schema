
const express = require("express");

const Comment = require("../models/comment.model");



const router = express.Router();

//getting all comment
router.get("", async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate(postId).populate(userId)
      .lean()
      .exec();

    return res.status(200).send(comments);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


//creating a comment
router.post("", async (req, res) => {
    try {
      const comments = await Comment.create(req.body);
      return res.status(201).send(comments);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


//getting a comment by it's id
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate(postId)
      .populate(userId)
      .lean()
      .exec();

    return res.status(201).send(comment);
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
});

//updating the comment by it's id
router.patch("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate(postId)
      .populate(userId)
      .lean()
      .exec();

    return res.status(200).send(comment);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


//delete the comment by its id
router.delete("/:id", async (req, res) => {
    try {
      const comments = await Comment.findByIdAndDelete(req.params.id).lean().exec();
      return res.status(200).send(comments);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });



module.exports = router;
