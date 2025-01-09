/* eslint-disable function-paren-newline */
function getRandomNumber() {
  const min = 0;
  const max = 1000000;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let expenses = [];

const start = () => {
  expenses = [];
};

const getAll = (userId, categories, from, to) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter((e) => e.userId === +userId);
  }

  if (categories) {
    if (Array.isArray(categories)) {
      filteredExpenses = filteredExpenses.filter((e) =>
        categories.includes(e.category),
      );
    } else {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.category === categories,
      );
    }
  }

  if (from || to) {
    filteredExpenses = filteredExpenses.filter((e) => {
      const isAfterFrom = from ? e.spentAt >= from : true;
      const isBeforeTo = to ? e.spentAt <= to : true;

      return isAfterFrom && isBeforeTo;
    });
  }

  return filteredExpenses;
};

const getById = (id) => {
  return expenses.find((person) => person.id === +id);
};

const create = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: getRandomNumber(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

const change = (id, title) => {
  const expense = getById(id);

  if (expense) {
    expense.title = title;

    return expense;
  }

  return null;
};

module.exports = {
  start,
  getAll,
  getById,
  create,
  remove,
  change,
};
