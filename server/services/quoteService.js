const HttpError = require('../models/http-error');
const ERROR_MESSAGES = require('../utils/errorMessages');

// @desc Get quote
// @route GET/quote
// @access Private
const getRandomQuote = async (_req, res, next) => {
  const QUOTE_API_URL = process.env.QUOTE_URL;

  if (!QUOTE_API_URL) {
    return next(new HttpError(ERROR_MESSAGES?.QUOTE?.QUOTE_ERROR, 500));
  }

  try {
    const response = await fetch(QUOTE_API_URL);

    if (!response.ok) {
      return next(new HttpError(ERROR_MESSAGES?.QUOTE?.QUOTE_ERROR, 500));
    }
    const data = await response.json();

    if (
      !Array.isArray(data) ||
      data.length === 0 ||
      !data[0]?.q ||
      !data[0]?.a
    ) {
      return next(new HttpError(ERROR_MESSAGES?.QUOTE?.QUOTE_ERROR, 500));
    }

    res.status(200).json({
      text: data[0].q,
      author: data[0].a,
    });
  } catch (err) {
    console.error('Error fetching quote:', err);
    return next(new HttpError(ERROR_MESSAGES?.QUOTE?.QUOTE_ERROR, 500));
  }
};

module.exports = { getRandomQuote };
