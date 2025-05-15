const express = require('express');
const { check } = require('express-validator');

const { signUp, logIn, checkAuth, logOut } = require('../services/userService');

const protect = require('../middleware/AuthMiddleware');

const userRouter = express.Router();

// Register a new user
// @access Public
userRouter.post(
  '/signup',
  [
    check('username').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 8 }),
  ],
  signUp,
);

// Authenticate an existing user and login
// @access Public
userRouter.post(
  '/login',
  [check('email').isEmail(), check('password').isLength({ min: 8 })],
  logIn,
);

// Authenticating checking
// @access Protected
userRouter.get('/check', protect, checkAuth);

// Log out the authenticated user
// @access Protected
userRouter.post('/logout', protect, logOut);

module.exports = userRouter;
