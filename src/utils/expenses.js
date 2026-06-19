const { Op } = require('sequelize');

const { getValidString } = require('./validation');
const { getErrorWithStatus } = require('./getError');

const isExpenseValid = (expense) => {
  const { title, spentAt, note, amount, userId, categoryId } = expense;

  // Validare text pentru titlu și notă
  getValidString(title, 'title');

  if (note) {
    getValidString(note, 'note');
  }

  if (!spentAt || isNaN(Date.parse(spentAt))) {
    throw getErrorWithStatus(400, 'Invalid spentAt date');
  }

  if (typeof amount !== 'number') {
    throw getErrorWithStatus(400, 'Type of amount must be number');
  }

  if (typeof userId !== 'number') {
    throw getErrorWithStatus(400, 'userId must be a number');
  }

  if (typeof categoryId !== 'number') {
    throw getErrorWithStatus(400, 'categoryId must be a number');
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
