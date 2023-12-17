'use strict';

const checkDate = (date) => {
  const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  return pattern.test(date);
};

const validateExpenseBody = (reqBody) => {
  const { spentAt, title, amount, category, note } = reqBody;

  if (
    Number.isNaN(amount)
    || typeof title !== 'string'
    || typeof category !== 'string'
    || typeof note !== 'string'
    || !checkDate(spentAt)
  ) {
    return false;
  }

  return true;
};

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || Number.isNaN(Number.parseInt(id))) {
    res.sendStatus(400);

    return;
  }

  next();
};

module.exports = {
  validateExpenseBody,
  validateId,
};
