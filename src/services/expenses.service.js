let expenses = [];
const clearExpensesForTest = () => {
  expenses = [];
};

const getAllExpenses = (filters = {}) => {
  let result = [...expenses];

  if (filters.userId) {
    result = result.filter((expense) => expense.userId === filters.userId);
  }

  if (filters.from && filters.to) {
    result = result.filter((expense) => {
      const spentDate = new Date(expense.spentAt);

      return (
        spentDate >= new Date(filters.from) && spentDate <= new Date(filters.to)
      );
    });
  }

  if (filters.categories) {
    const categoriesArray = Array.isArray(filters.categories)
      ? filters.categories
      : [filters.categories];

    result = result.filter((expense) => {
      return categoriesArray.includes(expense.category);
    });
  }

  return result;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === id) || null;
};

const createExpense = (expense) => {
  const newExpense = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

const updateExpense = (id, updateData) => {
  const expense = getExpenseById(id);

  if (!expense) {
    return null;
  }

  Object.assign(expense, updateData);

  return expense;
};

module.exports = {
  clearExpensesForTest,
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
