const { Expense } = require('../models/Expense.model');

const noramalize = (item) => {
  return {
    id: +item.id,
    userId: +item.userId,
    spentAt: item.spentAt,
    title: item.title,
    amount: +item.amount,
    category: item.category,
    note: item.note,
  };
};

const getAllExpenses = async (userId, categories, from, to) => {
  let filteredExpences = await Expense.findAll();

  if (userId) {
    filteredExpences = filteredExpences.filter(
      (expense) => noramalize(expense).userId === Number(userId),
    );
  }

  if (categories) {
    filteredExpences = filteredExpences.filter(
      (expense) => noramalize(expense).category === categories,
    );
  }

  if (from) {
    const fromDate = new Date(from);

    filteredExpences = filteredExpences.filter(
      (expense) => new Date(noramalize(expense).spentAt) >= fromDate,
    );
  }

  if (to) {
    const toDate = new Date(to);

    filteredExpences = filteredExpences.filter(
      (expense) => new Date(noramalize(expense).spentAt) <= toDate,
    );
  }

  return filteredExpences;
};

const getExpensesById = (id) => Expense.findByPk(id);

const createExpense = (userId, spentAt, title, amount, category, note) =>
  Expense.create({
    userId: userId,
    spentAt: spentAt,
    title: title,
    amount: amount,
    category: category,
    note: note,
  });

const updateExpense = (id, data) => {
  return Expense.update(data, { where: { id } });
};

const deleteExpense = (id) => Expense.destroy({ where: { id } });

module.exports = {
  noramalize,
  getAllExpenses,
  getExpensesById,
  createExpense,
  updateExpense,
  deleteExpense,
};
