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

  if (from || to) {
    const dateConditions = [];

    if (from) {
      dateConditions.push({ spentAt: { [Op.gte]: new Date(from) } });
    }

    if (to) {
      dateConditions.push({ spentAt: { [Op.lte]: new Date(to) } });
    }

    // Combine conditions with Op.and if both from and to are provided
    if (dateConditions.length === 1) {
      Object.assign(filter, dateConditions[0]);
    } else {
      filter[Op.and] = dateConditions;
    }
  }

  return filter;
};

module.exports = {
  isExpenseValid,
  getExpensesFilterQuery,
};
