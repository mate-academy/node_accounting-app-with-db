const { isValidString } = require('../../utils/validators');

module.exports.validateCreateBody = (req, res, next) => {
  const { name } = req.body;

  if (!isValidString(name)) {
    res.status(400).send('Invalid property name in the request body');

    return;
  }

  next();
};
