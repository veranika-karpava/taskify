const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const ERROR_MESSAGES = require('../utils/errorMessages');

const JWT_KEY = process.env.JWT_SECRET_KEY;

const protect = async (req, _res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return next(new HttpError(ERROR_MESSAGES.TOKEN.NO_TOKEN, 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return next(new HttpError(ERROR_MESSAGES.USER.NOT_FOUND_ID, 404));
    }

    req.user = user;
    next();
  } catch {
    return next(new HttpError(ERROR_MESSAGES.TOKEN.TOKEN_FAILED, 401));
  }
};

module.exports = protect;
