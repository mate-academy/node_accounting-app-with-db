const { NAME_REQUIRED_ERROR } = require('../utils/config');

const validateName = (name, res) => {
  if (!name || typeof name !== 'string') {
    res.status(400).send(NAME_REQUIRED_ERROR);

    return true;
  }
};

module.exports = {
  validateName,
};
