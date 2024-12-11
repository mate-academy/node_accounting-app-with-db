const { Op } = require('sequelize');

const isExpenseValid = (expense) => {
  const { title, amount, category, spentAt, note } = expense;

  return !!(
    typeof title === 'string' &&
    typeof amount === 'number' &&
    typeof category === 'string' &&
    typeof spentAt === 'string' &&
    (typeof note === 'string' || typeof note === 'undefined')
  );
};

const getNewExpenseData = (expense, id) => {
  const { title, amount, category, userId, note } = expense;

  const newExpense = {
    id,
    title,
    amount,
    category,
    userId,
  };

  return note ? { ...newExpense, note } : newExpense;
};

const getExpensesFilterQuery = (categories, userId, from, to) => {
  const filter = {};

  if (userId) {
    filter.userId = userId;
  }

  if (categories && categories.length) {
    filter.category = { [Op.in]: categories };
  }

  if (from) {
    filter.spentAt = { [Op.gte]: new Date(from) };
  }

  if (to) {
    filter.spentAt = {
      ...filter.spentAt,
      [Op.lte]: new Date(to),
    };
  }

  return filter;
};

module.exports = {
  isExpenseValid,
  getNewExpenseData,
  getExpensesFilterQuery,
};
