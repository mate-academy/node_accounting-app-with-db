'use strict';

const { isUuid } = require('../utils/isUuid');

const validateUuid = (req, res, next) => {
  if (!isUuid(req.params.id)) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  next();
};

module.exports = { validateUuid };
