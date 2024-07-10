const {
  isValidId,
  isValidDate,
  isValidString,
} = require('../../utils/validators');

module.exports.validateCreateBody = (req, res, next) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const errors = [];

  if (!isValidId(userId)) {
    errors.push('Invalid property userId in the request body');
  }

  if (!isValidDate(new Date(spentAt))) {
    errors.push('Invalid property spentAt in the request body');
  }

  if (!isValidString(title)) {
    errors.push('Invalid property title in the request body');
  }

  if (isNaN(+amount)) {
    errors.push('Invalid property amount in the request body');
  }

  if (!isValidString(category)) {
    errors.push('Invalid property category in the request body');
  }

  if (note && !isValidString(note)) {
    errors.push('Invalid property note in the request body');
  }

  if (errors.length) {
    res.status(400).send(errors);

    return;
  }

  next();
};
