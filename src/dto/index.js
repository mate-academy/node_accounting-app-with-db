const { normalizeUser } = require('./user.dto');
const { normalizeExpense } = require('./expense.dto');
const { normalizeCategory } = require('./category.dto');

module.exports = {
  normalizeUser,
  normalizeExpense,
  normalizeCategory,
};
