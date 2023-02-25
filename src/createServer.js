'use strict';

let expenses = [];

function clear() {
  expenses = [];
}

function getAll({ userId, category, from, to }) {
  return expenses.filter(expense => {
    const isUserFilter = userId
      ? expense.userId === +userId
      : true;
    const isCategoryFilter = category
      ? expense.category === category
      : true;
    const isFromFilter = from
      ? expense.spentAt >= from
      : true;
    const isToFilter = to
      ? expense.spentAt <= to
      : true;

    return isUserFilter && isCategoryFilter && isFromFilter && isToFilter;
  });
};

function getbyId(expenseId) {
  const expenseFound = expenses.find(expense => expense.id === +expenseId);

  return expenseFound || null;
}

function create(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

function update({ id, data }) {
  const expense = getbyId(id);

  Object.assign(expense, data);

  return expense;
};

module.exports = {
  clear,
  getAll,
  getbyId,
  create,
  remove,
  update,
};
