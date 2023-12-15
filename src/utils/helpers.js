'use strict';

const checkDate = (date) => {
  const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  return pattern.test(date);
};

const validateExpenseBody = (reqBody) => {
  const { spentAt, title, amount, category, note } = reqBody;

  if (
    Number.isNaN(amount) ||
    typeof title !== 'string' ||
    typeof category !== 'string' ||
    typeof note !== 'string' ||
    !checkDate(spentAt)
  ) {
    return false;
  }

  return true;
};

module.exports = {
  validateExpenseBody,
};
