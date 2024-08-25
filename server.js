const express = require('express');
const cors = require('cors');
const path = require("path")
const bodyParser = require('body-parser');
const dotenv = require( "dotenv");
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const corsOptions = {
  origin: ['https://suleman-notes-app.netlify.app'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/auth', authRoutes);
app.use('/', postRoutes);
app.use('/', commentRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
