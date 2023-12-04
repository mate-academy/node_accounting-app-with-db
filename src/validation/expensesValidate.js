'use strict';

const validateQuery = (req, res, next) => {
  const {
    userId,
    from,
    to,
  } = req.query;

  if (userId && isNaN(Number(userId))) {
    res.status(400).send({ message: 'Invalid userId' });

    return;
  }

  if (from && !isValidDate(from)) {
    res.status(400).send({ message: 'Invalid from date' });

    return;
  }

  if (to && !isValidDate(to)) {
    res.status(400).send({ message: 'Invalid to date' });

    return;
  }

  next();
};

const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  return dateString.match(regex) !== null;
};

module.exports = validateQuery;
