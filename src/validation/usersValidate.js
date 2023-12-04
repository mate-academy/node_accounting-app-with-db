'use strict';

const validateUserRequest = (req, res, next) => {
  const { id } = req.params;

  if (id && isNaN(Number(id))) {
    res.status(400).send({ message: 'Invalid user ID' });

    return;
  }

  next();
};

module.exports = validateUserRequest;
