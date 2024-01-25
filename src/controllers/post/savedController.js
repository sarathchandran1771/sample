// server/src/controllers/post/postControllers.js
const express = require("express");
const postRouter = express.Router();
const corsManage = require("../../../shared/utilities/corsManage");
const SavedPost = require("../../models/savedPostSchema");
const Post = require("../../models/postSchema");
const User = require("../../models/userSchema");
const dotenv = require("dotenv");
dotenv.config();
postRouter.use(corsManage);

const getAllSavedPosts = async (req, res) => {
  try {
    const { userId } = req.query;
    const savedPosts = await SavedPost.find({ user: userId })
      .populate({
        path: "post",
        model: "Post",
        match: { isReport: { $ne: true } },
      })
      .exec();

    const filteredSavedPosts = savedPosts.filter(
      (savedPost) => savedPost.post !== null
    );

    res.status(200).json(filteredSavedPosts);
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const savePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const post = await Post.findById({ _id: postId });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let savedPost = await SavedPost.findOne({ user: user._id, post: postId });

    if (savedPost) {
      await SavedPost.findOneAndDelete({ user: user._id, post: postId });
      return res.status(200).json({ message: "Post removed successfully" });
    } else {
      savedPost = new SavedPost({
        user: user._id,
        post: postId,
      });

      await savedPost.save();
      return res.status(201).json({ message: "Post saved successfully" });
    }
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = { getAllSavedPosts, savePost };
