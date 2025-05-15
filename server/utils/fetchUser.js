const User = require('../models/user');
const HttpError = require('../models/http-error');

const ERROR_MESSAGES = require('../utils/errorMessages');

const fetchUser = async (userId, next) => {
  try {
    const user = await User.findById(userId).select('_id');

    if (!user) {
      return next(new HttpError(ERROR_MESSAGES.USER.NOT_FOUND_ID, 404));
    }

    return user;
  } catch (err) {
    console.error('Error fetching user:', err);
    return next(new HttpError(ERROR_MESSAGES.USER.FETCH_FAIL, 500));
  }
};

module.exports = fetchUser;
