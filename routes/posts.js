const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../models/Post');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all posts
router.get('/posts', (req, res) => {
  getAllPosts((err, posts) => {
    if (err) return res.status(500).json({ message: 'Failed to retrieve posts' });
    res.json(posts);
  });
});

// Get a specific post by ID
router.get('/posts/:id', (req, res) => {
  getPostById(req.params.id, (err, post) => {
    if (err) return res.status(500).json({ message: 'Failed to retrieve post' });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  });
});

// Create a new post
router.post('/posts', authenticateToken, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  createPost(title, content, req.user.id, (err, newPost) => {
    if (err) return res.status(500).json({ message: 'Failed to create post' });
    res.status(201).json(newPost);
  });
});

// Update a post by ID
router.put('/posts/:id', authenticateToken, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  updatePost(req.params.id, title, content, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to update post' });
    res.json({ message: 'Post updated successfully' });
  });
});

// Delete a post by ID
router.delete('/posts/:id', authenticateToken, (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id; // Get the ID of the authenticated user

  deletePost(postId, userId, (err) => {
    if (err) {
      if (err.message === 'Post not found or you do not have permission to delete this post') {
        return res.status(403).json({ message: err.message });
      }
      return res.status(500).json({ message: 'Failed to delete post' });
    }
    res.json({ message: 'Post deleted successfully' });
  });
});

module.exports = router;
