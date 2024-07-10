const {
  isValidId,
  isValidDate,
  isValidString,
} = require('../../utils/validators');

module.exports.validateGetAllQuery = (req, res, next) => {
  const { userId, categories, from, to } = req.query;
  const errors = [];

  if (userId && !isValidId(userId)) {
    errors.push('Invalid "userId" query');
  }

  if (from && !isValidDate(new Date(from))) {
    errors.push('Invalid "from" query');
  }

  if (from && !isValidDate(new Date(to))) {
    errors.push('Invalid "to" query');
  }

  if (categories) {
    const isValid = Array.isArray(categories)
      ? categories.every(isValidString)
      : isValidString(categories);

    if (!isValid) {
      errors.push('Invalid "categories" query');
    }
  }

  if (errors.length) {
    res.status(400).send(errors);

    return;
  }

  next();
};
