'use strict';

const filterByUserId = (expenses, userId) => {
  if (userId) {
    return expenses.filter(item => item.userId === +userId);
  }

  return expenses;
};

const filterByCategories = (expenses, categories) => {
  if (categories) {
    return expenses.filter(({ category }) => categories.includes(category));
  }

  return expenses;
};

const filterByFromDate = (expenses, from) => {
  if (from) {
    return expenses.filter(({ spentAt }) => {
      const at = new Date(spentAt);
      const spentFrom = new Date(from);

      return (at.getTime() - spentFrom.getTime()) > 0;
    });
  }

  return expenses;
};

const filterByToDate = (expenses, to) => {
  if (to) {
    return expenses.filter(({ spentAt }) => {
      const at = new Date(spentAt);
      const spentTo = new Date(to);

      return (at.getTime() - spentTo.getTime()) < 0;
    });
  };

  return expenses;
};

const filterExpensesByQuery = (expensesToFilter, query) => {
  const { userId, categories, from, to } = query;

  let expensesCopy = [...expensesToFilter];

  expensesCopy = filterByUserId(expensesCopy, userId);
  expensesCopy = filterByCategories(expensesCopy, categories);
  expensesCopy = filterByFromDate(expensesCopy, from);
  expensesCopy = filterByToDate(expensesCopy, to);

  return expensesCopy;
};

module.exports = {
  filterExpensesByQuery,
};
