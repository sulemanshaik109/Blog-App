import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/CreateEditPost.css";

const CreateEditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`https://blog-app-5fnw.onrender.com/posts/${id}`);
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (error) {
          console.error('Error fetching post:', error.response.data.message);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const postData = {title, content};
      if (id) {
        await axios.put(`https://blog-app-5fnw.onrender.com/posts/${id}`, postData, config);
      } else {
        await axios.post('https://blog-app-5fnw.onrender.com/posts', postData, config);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving post:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className='post-container'>
      <h2 className='page-title '>{id ? 'Edit Post' : 'Create Post'}</h2>
      <form onSubmit={handleSubmit} className='form-container'>
        <label htmlFor='title' className='label'>Title</label>
        <input
          type='text'
          id='title'
          placeholder='Title'
          className='input'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor='content' className='label'>Content</label>
        <textarea
          id='content'
          placeholder='Content'
          className='textarea'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type='submit' className='button'>{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default CreateEditPost;
