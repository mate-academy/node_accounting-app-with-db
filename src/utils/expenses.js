const { Op } = require('sequelize');

const { getValidString } = require('./validation');
const { getErrorWithStatus } = require('./getError');

const isExpenseValid = (expense) => {
  const { title, category, spentAt, note } = expense;

  const textFields = {
    title,
    category,
    spentAt,
    note,
  };

  Object.entries(textFields).forEach(([key, value]) => {
    const field = key.toString();

    if ((field === 'note' || field === 'category') && !value) {
      return;
    }

    getValidString(value, field);
  });

  if (typeof expense.amount !== 'number') {
    throw getErrorWithStatus(400, `Type of amount must be number`);
  }
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
    // If both 'from' and 'to' are provided, this will overwrite the spentAt filter instead of merging the conditions.
    // Consider conditionally adding the [Op.lte] condition to the existing spentAt filter.
    filter.spentAt = {
      ...filter.spentAt,
      [Op.lte]: new Date(to),
    };
  }

  return filter;
};

module.exports = {
  isExpenseValid,
  getExpensesFilterQuery,
};
