const express = require('express');
const { createComment, getCommentsByPostId } = require('../models/Comment');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/posts/:postId/comments', (req, res) => {
  getCommentsByPostId(req.params.postId, (err, comments) => {
    if (err) return res.status(500).json({ message: 'Failed to retrieve comments' });
    res.json(comments);
  });
});

router.post('/posts/:postId/comments', authenticateToken, (req, res) => {
  const { content } = req.body;
  createComment(content, req.params.postId, req.user.id, (err, newComment) => {
    if (err) return res.status(500).json({ message: 'Failed to create comment' });
    res.status(201).json(newComment);
  });
});

module.exports = router;
