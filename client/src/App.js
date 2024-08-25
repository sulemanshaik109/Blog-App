import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import BlogPostList from './pages/BlogPostList';
import NotFound from './components/NotFound';
import BlogPost from './pages/BlogPost';
import CreateEditPost from './pages/CreateEditPost';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute/>}>
      <Route path="/" element={<BlogPostList />} />
        <Route path="/posts/:id" element={<BlogPost />} />
        <Route path="/create" element={<CreateEditPost />} />
        <Route path="/edit/:id" element={<CreateEditPost />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
