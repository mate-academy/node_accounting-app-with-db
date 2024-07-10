const {
  isValidId,
  isValidDate,
  isValidString,
} = require('../../utils/validators');

module.exports.validateUpdateBody = (req, res, next) => {
  const { id, userId, spentAt, title, amount, category, note } = req.body;
  const errors = [];

  if (id && !isValidId(id)) {
    errors.push('Invalid property id in the request body');
  }

  if (userId && !isValidId(userId)) {
    errors.push('Invalid property userId in the request body');
  }

  if (spentAt && !isValidDate(new Date(spentAt))) {
    errors.push('Invalid property spentAt in the request body');
  }

  if (title && !isValidString(title)) {
    errors.push('Invalid property title in the request body');
  }

  if (amount && isNaN(+amount)) {
    errors.push('Invalid property amount in the request body');
  }

  if (category && !isValidString(category)) {
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
