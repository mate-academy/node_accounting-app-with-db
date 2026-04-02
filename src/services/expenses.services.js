let expenses = [];
let currentId = 1;

function initExpenses() {
  expenses = [];
  currentId = 1;
}

function getExpenses(data) {
  const { userId, categories, from, to } = data;

  return expenses.filter((expense) => {
    if (userId && expense.userId !== userId) {
      return false;
    }

    if (categories) {
      const categoriesArray = Array.isArray(categories)
        ? categories
        : [categories];

      if (!categoriesArray.includes(expense.category)) {
        return false;
      }
    }

    if (from && new Date(expense.spentAt) < new Date(from)) {
      return false;
    }

    if (to && new Date(expense.spentAt) > new Date(to)) {
      return false;
    }

    return true;
  });
}

function getExpenseById(id) {
  return expenses.find((expense) => expense.id === id);
}

function createExpense(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: currentId++,
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  expenses.push(newExpense);

  return newExpense;
}

function deleteExpense(id) {
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    return false;
  }

  expenses.splice(index, 1);

  return true;
}

function updateExpense(data) {
  const { id, ...changes } = data;

  const index = expenses.findIndex((expense) => expense.id === +id);

  if (index === -1) {
    return null;
  }

  expenses[index] = {
    ...expenses[index],
    ...changes,
  };

  return expenses[index];
}

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  initExpenses,
};
