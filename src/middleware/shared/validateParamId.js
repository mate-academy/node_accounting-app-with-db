const { isValidId } = require('../../utils/validators');

module.exports.validateParamId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    res.status(400).send('Invalid id format');

    return;
  }

  next();
};
