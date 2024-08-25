import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentList from '../components/CommentList';
import "../styles/BlogPost.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://blog-app-5fnw.onrender.com/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error.response.data.message);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://blog-app-5fnw.onrender.com/posts/${post.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate("/");
    } catch (error) {
      console.error('Failed to delete post:', error.response?.data?.message || error.message);
    }
  };

  if (!post) return <div className='loader'>Loading...</div>;

  return (
    <div className='blog-container'>
      <div className='blog-header'>
        <h2 className='blog-title'>{post.title}</h2>
        <div className='blog-controls'>
          <Link to={`/edit/${post.id}`} className='link'><FaEdit size={18}/></Link>
          <button type="button" className='btn' onClick={handleDelete}>
            <FaTrashAlt size={18}/>
          </button>
        </div>
      </div>
      <p className='blog-description'>{post.content}</p>
      <CommentList postId={id} />
    </div>
  );
};

export default BlogPost;
