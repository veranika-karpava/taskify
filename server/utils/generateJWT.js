const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_SECRET_KEY;

const HttpError = require('../models/http-error');
const ERROR_MESSAGES = require('../utils/errorMessages');

const generateJWT = async (res, user) => {
  try {
    if (!user?.id || !user?.email) {
      return next(new HttpError(ERROR_MESSAGES.TOKEN.VALIDATION, 422));
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_KEY, {
      expiresIn: '1h',
    });

    // Set token as a cookie
    res.cookie('jwt', token, {
      maxAge: 60 * 60 * 1000, // Cookies will expire in 1 hour (in milliseconds)
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      sameSite: 'Strict', // Restrict the cookie to same-site requests
      secure: true, // Ensure the cookie is only sent over HTTPS
    });
  } catch {
    return next(new HttpError(ERROR_MESSAGES.TOKEN.GEN_TOKEN, 500));
  }
};

module.exports = generateJWT;
