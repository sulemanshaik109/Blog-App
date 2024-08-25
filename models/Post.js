const db = require('../database');

const createPost = (title, content, userId, callback) => {
  db.run(
    'INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)',
    [title, content, userId],
    function (err) {
      if (err) return callback(err);

      // Retrieve the newly inserted post to include `createdAt`
      db.get('SELECT * FROM posts WHERE id = ?', [this.lastID], (err, row) => {
        if (err) return callback(err);
        callback(null, row);
      });
    }
  );
};


const getAllPosts = (callback) => {
  db.all('SELECT * FROM posts', [], callback);
};

const getPostById = (id, callback) => {
  db.get('SELECT * FROM posts WHERE id = ?', [id], callback);
};

const updatePost = (id, title, content, callback) => {
  db.run(
    'UPDATE posts SET title = ?, content = ? WHERE id = ?',
    [title, content, id],
    function (err) {
      if (err) return callback(err);
      callback(null, { id, title, content });
    }
  );
};

const deletePost = (id, userId, callback) => {
  const deleteQuery = 'DELETE FROM posts WHERE id = ? AND userId = ?';

  db.run(deleteQuery, [id, userId], function (err) {
    if (err) {
      return callback(err);
    }
    if (this.changes === 0) {
      return callback(new Error('Post not found or you do not have permission to delete this post'));
    }
    callback(null);
  });
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
