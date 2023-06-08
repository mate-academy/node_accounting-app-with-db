'use strict';

const filterExpenses = (expenses, options) => {
  const { userId, categories, from, to } = options;

  return expenses.filter(expense => {
    const spentAtDate = Date.parse(expense.spentAt);
    const fromDate = from ? Date.parse(from) : null;
    const toDate = to ? Date.parse(to) : null;

    const matchesUserId = !userId || expense.userId === +userId;
    const matchesCategories = !categories
      || !categories.length
      || categories.includes(expense.category);
    const matchesFromDate = !fromDate || spentAtDate >= fromDate;
    const matchesToDate = !toDate || spentAtDate <= toDate;

    return matchesUserId
      && matchesCategories
      && matchesFromDate
      && matchesToDate;
  });
};

const normalizeExpense = ({ id, userId, title, spentAt, amount, category, note }) => ({
  id, userId, title, spentAt, amount, category, note,
});

const normalizeUser = ({ id, email }) => ({ id, email });

module.exports = {
  filterExpenses,
  normalizeExpenses,
  normalizeUsers,
};
