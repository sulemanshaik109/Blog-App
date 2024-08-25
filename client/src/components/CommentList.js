import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/CommentList.css"

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error.response.data.message);
      }
    };
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      await axios.post(`http://localhost:5000/posts/${postId}/comments`, { post: postId, content: newComment }, { headers });
      setNewComment('');
      // Refresh comments
      const response = await axios.get(`http://localhost:5000/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error posting comment:', error.response.data.message);
    }
  };

  return (
    <div className='comments-container'>
      <h3 className='title'>Comments</h3>
      <form onSubmit={handleCommentSubmit} className='form-container'>
        <textarea
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className='comment-textarea'
          required
        />
        <button type="submit" className='comment-btn'>Post Comment</button>
      </form>
      <ul className='comments-list'>
        {comments.map(comment => (
          <li key={comment.id} className='comment-item'>
            <p className='user'>{comment.username}</p>
            <p className='comment'>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
