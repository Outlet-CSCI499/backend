// endpoints for posts will go here
const express = require('express');
const Post = require('../models/posts');
const router = express.Router();
const { NotFoundError, BadRequestError, UnauthorizedError} = require("../utils/errors")

// Create a new post
router.post('/posts', async (req, res, next) => {
  const {title, body, authorId} = req.body;
  try {
    const post = await Post.create({title, body, authorId})
    res.status(201).json({ post });
    //throw exception if the post is empty 
    if (!title || !body || !authorId ){
        throw new BadRequestError ("Title, Author, and Content missing")
    }
  } 
  catch (err) {
    next(err);
  }
});

// Get all posts from database
router.get('/posts', async (req, res, next) => {
  try {
    const allposts = await Post.find();
    res.status(200).json({ allposts });
  } 
  catch (err) {
    next(err);
  }
});

// aquire a specific post by author
router.get('/posts/:authorId', async (req, res, next) => {
  const {authorId} = req.params.authorId;
  try {
    const post = await Post.fetchPostByauthorId(authorId)
    // throw an error if author is not found
    if (!authorId) {
        throw new NotFoundError ("User not found")
    }
    res.status(200).json({ post });
  } 
  catch (err) {
    next(err);
  }
});

// edit a specific post by a specific author
router.patch('/posts/:authorId', async (req, res, next) => {
  const author = req.params.authorId;
  const {title, body, authorId} = req.body;
  try {
    const post = await Post.fetchPostByauthorId(author);
    //update the new content 
    post.title = title||post.title;
    post.body = body||post.body;
    post.authorId = authorId||post.authorId;
    const edited = await post.edit()
    //throw an error if the editor is not the original author 
    if (!post.authorId) {
      throw new UnauthorizedError("You don't have permission to edit");
    //throw an error if the post does not exist 
    }else if(!post){
      throw new NotFoundError ("User not found")
    }
    res.status(201).json({edited});
  } 
  catch (err) {
    next(err);
  }
});

// Delete a specific post by a specific author
router.delete('/posts/:authorId', async (req, res, next) => {
  const authorId = req.params.authorId;
  try {
    const post = await Post.fetchPostByauthorId(authorId);
    //throw an error if the editor is not the original author 
    if (post.authorId !== authorId) {
      throw new UnauthorizedError("You don't have permission to delete");
    }
    await post.removePost();
    res.status(204).json({post});
  } 
  catch (err) {
    next(err);
  }
});

// Upvote a specific post by a specific author
router.post('/posts/:authorId/upvote', async (req, res, next) => {
  const authorId = req.params.authorId;
  const userID = req.body.userID
  try {
    const post = await Post.fetchPostByauthorId(authorId);
    //throw an error if the post does not exist 
    if (!post) {
      return res.status(404).json({ err: 'Post not found' });
    }
    await post.upvote(userID);
    res.status(204).json({post});
  } 
  catch (err) {
    next(err);
  }
});

// Downvote a specific post by a specific author
router.post('/posts/:authorId/downvote', async (req, res, next) => {
  const authorId = req.params.authorId;
  const userID = req.body.userID
  try {
    const post = await Post.fetchPostByauthorId(authorId);
    //throw an error if the post does not exist 
    if (!post) {
      return res.status(404).json({ err: 'Post not found' });
    }
    await post.downvote(userID);
    res.status(204).json({post});
  } 
  catch (err) {
    next(err);
  }
});

  module.exports = router;
