const express = require('express');
const cookiesParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 5050;

const userRouter = require('./middleware/userRouter');
const taskRouter = require('./middleware/taskRouter');
const quoteRouter = require('./middleware/quoteRouter');

const app = express();

// CORS middleware: configures cross-origin resource sharing
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    credentials: true,
  }),
);

// Middleware to parse incoming JSON requests into JS objects
app.use(express.json());

// Middleware to handle cookies in incoming requests
app.use(cookiesParser());

// Serve static files from the React app (for deployment)
app.use(express.static(path.join(__dirname, '../client/build')));

// Register route handlers for different parts of the app
app.use('/user', userRouter);
app.use('/tasks', taskRouter);
app.use('/quote', quoteRouter);

// The "catchall" handler: for any request that doesn't
// Match one above, send back React's index.html file.
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Set default status code and message for errors
app.use((error, _req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occurred' });
});

// MongoDB connection setup
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lhybrvz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('❌ Failed to connect to MongoDB:', err);
  });
