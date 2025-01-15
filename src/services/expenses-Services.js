const { getUserById } = require('./users.service');

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

const getAllExpenses = (
  userId = null,
  categories = null,
  from = null,
  to = null,
) => {
  return expenses.filter((expense) => {
    let isValid = true;

    if (userId) {
      isValid = isValid && expense.userId === Number(userId);
    }

    if (categories) {
      isValid = isValid && categories.includes(expense.category);
    }

    if (from) {
      isValid = isValid && new Date(expense.spentAt) >= new Date(from);
    }

    if (to) {
      isValid = isValid && new Date(expense.spentAt) <= new Date(to);
    }

    return isValid;
  });
};

function getExpenseById(id) {
  return expenses.find((expense) => expense.id === id);
}

function createExpense({ userId, spentAt, title, amount, category, note }) {
  const checkUserById = getUserById(userId);

  if (!checkUserById) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  const newExpense = {
    id: Date.now(),
    userId,
    spentAt: new Date(spentAt).toISOString(),
    title,
    amount,
    category,
    note: note || '',
  };

  expenses.push(newExpense);

  return newExpense;
}

function deleteExpense(expenseId) {
  const expenseIndex = expenses.findIndex(
    (expense) => expense.id === expenseId,
  );

  if (expenseIndex === -1) {
    return null;
  }

  return expenses.splice(expenseIndex, 1)[0];
}

function updateExpense(expenseId, updatedExpense) {
  const expenseIndex = expenses.findIndex(
    (expense) => expense.id === expenseId,
  );

  if (expenseIndex !== -1) {
    expenses[expenseIndex] = {
      ...expenses[expenseIndex],
      ...updatedExpense,
    };

    return expenses[expenseIndex];
  }

  return null;
}

const expensesService = {
  clearExpenses,
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};

module.exports = expensesService;
