'use strict';

const checkDate = (date) => {
  const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  return pattern.test(date);
};

const validateExpenseBody = (reqBody) => {
  const { userId, spentAt, title, amount, category, note } = reqBody;

  if (
    Number.isNaN(userId)
    || Number.isNaN(amount)
    || typeof title !== 'string'
    || typeof category !== 'string'
    || typeof note !== 'string'
    || !checkDate(spentAt)
  ) {
    return false;
  }

  return true;
};

const filterExpenses = (expenses, queries) => {
  const { from, to, userId, categories } = queries;

  return expenses.filter((expense) => {
    switch (true) {
      case userId
        && Number.parseInt(expense.userId) !== Number.parseInt(userId):
      case categories && !categories.includes(expense.category):
      case from && new Date(expense.spentAt) < new Date(from):
      case to && new Date(expense.spentAt) > new Date(to):
        return false;

      default:
        return true;
    }
  });
};

module.exports = {
  validateExpenseBody,
  filterExpenses,
};
