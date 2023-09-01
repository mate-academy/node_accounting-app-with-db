'use strict';

const validateUser = ({ required } = { required: true }) => {
  return (req, res, next) => {
    const { name } = req.body;
    let errorMessage = '';

    if (required && !name) {
      errorMessage = 'Name field is required';
    } else if (name && typeof name !== 'string') {
      errorMessage = 'Name field must be string';
    }

    if (errorMessage) {
      res.statusCode = 400;
      res.send(errorMessage);

      return;
    }

    next();
  };
};

module.exports = { validateUser };
