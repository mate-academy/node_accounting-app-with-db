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

const getExpensesFilterQuerry = (categories, userId, from, to) => {
  const filter = {};

  /* eslint-disable no-fallthrough */
  switch (true) {
    case userId:
      filter.userId = userId;

    case categories && categories.length:
      filter.category = { [Op.in]: categories };

    case from:
      filter.spentAt = { [Op.gte]: new Date(from) };

    case to:
      filter.spentAt = {
        ...filter.spentAt,
        [Op.lte]: new Date(to),
      };

    default:
      return filter;
  }
};

module.exports = {
  isExpenseValid,
  getNewExpenseData,
  getExpensesFilterQuerry,
};
