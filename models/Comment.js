const db = require('../database');

const createComment = (content, postId, userId, callback) => {
  db.run(
    'INSERT INTO comments (content, postId, userId) VALUES (?, ?, ?)',
    [content, postId, userId],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, content, postId, userId, createdAt: new Date().toISOString() });
    }
  );
};

const getCommentsByPostId = (postId, callback) => {
  const query = `
    SELECT comments.id, comments.content, users.username
    FROM comments
    JOIN users ON comments.userId = users.id
    WHERE comments.postId = ?
    ORDER BY comments.id ASC
  `;

  db.all(query, [postId], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};


module.exports = { createComment, getCommentsByPostId };
