const expenses = [];
let nextId = 1;

const getExpenses = () => {
  return expenses;
};

const getExpenseById = (id) => {
  const expense = expenses.find((item) => item.id === Number(id));

  if (!expense) {
    return null;
  }

  return expense;
};

const createExpense = ({ userId, title, amount, category, note, spentAt }) => {
  const exp = {
    id: nextId++,
    userId,
    spentAt: new Date(spentAt || new Date()),
    title,
    amount,
    category,
    note: note || '',
  };

  expenses.push(exp);

  return exp;
};

const updateExpense = (id, { spentAt, title, amount, category, note }) => {
  const editingExpenseIndex = expenses.findIndex(
    (item) => item.id === Number(id),
  );

  if (editingExpenseIndex === -1) {
    return null;
  }

  const changedExpense = {
    ...expenses[editingExpenseIndex],
    spentAt: spentAt
      ? new Date(spentAt || new Date())
      : expenses[editingExpenseIndex].spentAt,
    title: title ?? expenses[editingExpenseIndex].title,
    amount: amount ?? expenses[editingExpenseIndex].amount,
    category: category ?? expenses[editingExpenseIndex].category,
    note: note ?? expenses[editingExpenseIndex].note,
  };

  expenses[editingExpenseIndex] = changedExpense;

  return changedExpense;
};

const deleteExpense = (id) => {
  const deletingExpenseIndex = expenses.findIndex(
    (item) => item.id === Number(id),
  );

  if (deletingExpenseIndex === -1) {
    return null;
  }

  const [deletedExpense] = expenses.splice(deletingExpenseIndex, 1);

  return deletedExpense;
};

module.exports = {
  expenses,
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
