const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAllExpenses = async (query) => {
  let filteredExpenses = await Expense.findAll();

  if (query) {
    const from = query.from ? new Date(query.from) : null;
    const to = query.to ? new Date(query.to) : null;
    const category = query.categories || null;
    const userId = query.userId || null;

    if (from) {
      filteredExpenses = filteredExpenses.filter((item) => {
        return new Date(item.spentAt) >= from;
      });
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter((item) => {
        return new Date(item.spentAt) <= to;
      });
    }

    if (category) {
      filteredExpenses = filteredExpenses.filter((item) => {
        return item.category === category;
      });
    }

    if (userId) {
      filteredExpenses = filteredExpenses.filter((item) => {
        return +item.userId === +userId;
      });
    }
  }

  return filteredExpenses;
};

const addExpense = async (expense) => {
  await Expense.create(expense);
};

const findExpense = async (id) => {
  return Expense.findByPk(id);
};

const filteredByIdExpenses = async (id) => {
  const expenses = await Expense.findAll();

  return expenses.filter((item) => +item.userId !== +id);
};

const changeExpense = async ({ title, id }) => {
  await Expense.update({ title }, { where: { id } });
};

const deleteExpense = async (id) => {
  await Expense.destroy({
    where: { id },
  });
};

const deleteExpenses = async () => {
  const users = Expense.findAll();
  const ids = (await users).map((item) => item.id);

  await Expense.destroy({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });
};

module.exports = {
  getAllExpenses,
  addExpense,
  findExpense,
  filteredByIdExpenses,
  changeExpense,
  deleteExpense,
  deleteExpenses,
};
