const { isValidId, isValidString } = require('../../utils/validators');

module.exports.validateUpdateBody = (req, res, next) => {
  const { name, id } = req.body;
  const errors = [];

  if (!name && !id) {
    errors.push('No data to update');
  }

  if (name && !isValidString(name)) {
    errors.push('Invalid property name in the request body');
  }

  if (id && !isValidId(id)) {
    errors.push('Invalid property id in the request body');
  }

  if (errors.length) {
    res.status(400).send(errors);

    return;
  }

  next();
};
