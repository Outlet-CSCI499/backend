const express = require("express");
const router = express.Router();
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../utils/errors");
const Post = require("../models/posts");

// Get all replies for a post
router.get("/posts/:authorId", async (req, res, next) => {
  try {
    const { authorId } = req.params.authorId;
    const post = await Post.fetchPostByauthorId(authorId);
    const replies = await Post.getReplies(authorId);
    if (!authorId){
      throw new NotFoundError ("User not found");
    }
    res.status(200).json({ post, replies });
  } catch (err) {
    next(err);
  }
});

// Create a new reply for a post
router.post("/posts", async (req, res, next) => {
    const {title, body, authorId} = req.body;
    try {
        const post = await Post.fetchPostByauthorId(authorId);
      //throw exception if the post is empty 
      if (!title || !body || !authorId ){
          throw new BadRequestError ("Title, Author, and Content missing")
      }
      const reply = await Post.create({title, body, authorId})
      res.status(201).json({ post, reply });
    } 
    catch (err) {
      next(err);
    }
  });

// Update a specific reply by a specific author
router.patch("/posts/:postId", async (req, res, next) => {
  const author = req.params.postId;
  const {title, body, authorId} = req.body;
  try {
    const reply = await Post.fetchReply(author);
    //throw an error if the editor is not the original author
    reply.title = title||reply.title;
    reply.body = body||reply.body;
    reply.authorId = authorId||reply.authorId;
    const edited = await reply.edit();
    if (!reply.authorId) {
      throw new UnauthorizedError("You don't have permission to edit");
    }else if(!reply){
      throw new NotFoundError("User not found");
    }
    res.status(200).json({ edited });
  } catch (err) {
    next(err);
  }
});

// Delete a specific reply by a specific author
router.delete("/posts/:postId", async (req, res, next) => {
  const authorId = req.params.postId;
  try {
    const reply = await Post.fetchReply(authorId);
    //throw an error if the editor is not the original author
    if (reply.authorId !== authorId) {
      throw new UnauthorizedError("You don't have permission to delete");
    }
    await reply.removePost();
    res.status(204).json({ reply });
  } catch (err) {
    next(err);
  }
});

module.exports = router;