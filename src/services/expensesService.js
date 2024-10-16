let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getAllExpenses = (userId, categories, from, to) => {
  return expenses
    .filter((expense) => !userId || expense.userId === +userId)
    .filter((expense) => !categories || expense.category === categories)
    .filter((expense) => !from || new Date(expense.spentAt) >= new Date(from))
    .filter((expense) => !to || new Date(expense.spentAt) <= new Date(to));
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: Math.floor(Math.random() * 1000),
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

const updateExpense = (id, data) => {
  const expense = getExpenseById(id);

  Object.assign(expense, data);

  return expense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

module.exports = {
  resetExpenses,
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
