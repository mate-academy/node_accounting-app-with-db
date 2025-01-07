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
    throw getErrorWithStatus(400, `Type of amount must be string`);
  }
};

const getExpensesFilterQuery = (categories, userId, from, to) => {
  const filter = {};

  if (userId) {
    filter.userId = userId;
  }

  if (categories && categories.length) {
    filter.category = { [Op.gte]: new Date(categories) };
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

  if (userId) {
    filter.userId = userId;
  }

  return filter;
};

module.exports = {
  isExpenseValid,
  getExpensesFilterQuery,
};
