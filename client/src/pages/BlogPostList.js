import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/BlogPostList.css"

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://blog-app-5fnw.onrender.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error.response.data.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className='blog-list-container'>
      {posts.length > 0 ? (
        <>
          <h2 className='page-title'>Blogs</h2>
          <ul className='blog-list'>
            {posts.map(post => (
              <li key={post.id} className='blog-item'>
                <Link to={`/posts/${post.id}`} className='link'>
                  <p className='title'>{post.title}</p>
                  <p className='description'>{post.content.substring(0, 100)}...</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : <p className='message'>No posts yet!</p>}
    </div>
  );
};

export default BlogPostList;
