const HttpError = require('../models/http-error');
const User = require('../models/user');

const generateJWT = require('../utils/generateJWT');
const ERROR_MESSAGES = require('../utils/errorMessages');

// @desc Check authentication status of the user
// @route GET/user/check
// @access Protected
const checkAuth = async (req, res, next) => {
  const { user } = req;

  try {
    res.status(200).json({
      userName: user.username,
      userId: user.id,
      email: user.email,
    });
  } catch {
    return next(new HttpError(ERROR_MESSAGES.TOKEN.TOKEN_FAILED, 401));
  }
};

// @desc Register a new user in db
// @route POST/user/signup
// @access Public
const signUp = async (req, res, next) => {
  let { username, email, password } = req.body;

  username = username?.toLowerCase();
  email = email?.toLowerCase();
  password = password?.trim();

  // Validate required fields
  if (!username || !email || !password) {
    return next(new HttpError(ERROR_MESSAGES.VALIDATION.REQUIRED_FIELDS, 422));
  }

  try {
    // Check if a user with the same username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      const message =
        existingUser.username === username
          ? ERROR_MESSAGES.USER.DUPLICATE_USERNAME
          : ERROR_MESSAGES.USER.DUPLICATE_EMAIL;
      return next(new HttpError(message, 422));
    }

    // Create a new user in the db
    const newUser = await User.create({ username, email, password });

    // Generate JWT and set it as a cookie
    generateJWT(res, newUser);

    res.status(201).json({
      userName: newUser.username,
      userId: newUser.id,
      email: newUser.email,
    });
  } catch (err) {
    console.error('Error during sign up:', err);
    return next(new HttpError(ERROR_MESSAGES.USER.SIGNUP_FAILED, 500));
  }
};

// @desc Authenticate an existing user
// @route POST/user/login
// @access Public
const logIn = async (req, res, next) => {
  let { email, password } = req.body;

  email = email.toLowerCase();
  password = password.trim();

  // Validate required fields
  if (!email || !password) {
    return next(new HttpError(ERROR_MESSAGES.VALIDATION.REQUIRED_FIELDS, 422));
  }

  try {
    // Find the user by email
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      // If no user is found, return an error
      return next(new HttpError(ERROR_MESSAGES.USER.NOT_FOUND, 422));
    }

    // Compare the provided password with the hashed password in the db
    const isValidPassword = await existingUser.matchPassword(password);

    if (!isValidPassword) {
      // If the password is invalid, return an error
      return next(new HttpError(ERROR_MESSAGES.USER.INVALID_PASSWORD, 403));
    }

    // Generate JWT and set it as a cookie
    generateJWT(res, existingUser);

    res.status(200).json({
      userName: existingUser.username,
      userId: existingUser.id,
      email: existingUser.email,
    });
  } catch (err) {
    console.error('Error during login:', err);
    return next(new HttpError(ERROR_MESSAGES.USER.LOGIN_FAILED, 500));
  }
};

// @desc Log out the user by clearing the JWT cookie
// @route POST/user/logout
// @access Protected
const logOut = async (_req, res, next) => {
  try {
    // Clear the JWT cookie from the client
    res.clearCookie('jwt', {
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      sameSite: 'Strict', // Restrict the cookie to same-site requests
      secure: true, // Ensure the cookie is only sent over HTTPS
    });

    res.status(200).json({ message: ERROR_MESSAGES.USER.LOGOUT_SUCCESS });
  } catch (err) {
    console.error('Error during logout:', err);
    return next(new HttpError(ERROR_MESSAGES.USER.LOGOUT_FAILED, 500));
  }
};

module.exports = { signUp, logIn, checkAuth, logOut };
