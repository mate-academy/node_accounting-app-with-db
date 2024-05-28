const STATUS_CODES = require('../constant/statusCode');

const validateExpense = (expense) => {
  const { spentAt, title, amount } = expense;

  if (
    !spentAt ||
    !title ||
    typeof title !== 'string' ||
    !amount ||
    typeof amount !== 'number'
  ) {
    return { isValid: false, statusCode: STATUS_CODES.badRequest };
  }

  return { isValid: true };
};

module.exports = {
  validateExpense,
};
