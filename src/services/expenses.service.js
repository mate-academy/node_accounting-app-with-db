'use strict';

const { Expense } = require('../models/Expense.model');

const normalizeExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  id,
  note,
}) => {
  let res = {
    userId,
    spentAt,
    title,
    amount: +amount,
    id: +id,
  };

  if (category !== undefined) {
    res = { ...res, category };
  }

  if (note !== undefined) {
    res = { ...res, note };
  }

  return res;
};

const getAllExpensesService = async () => {
  const allExpenses = await Expense.findAll();

  return allExpenses;
};

const findExpenseService = async (id) => {
  return Expense.findByPk(id);
};

const createExpenseService = async (expense) => {
  const newExpense = await Expense.create(expense);

  return newExpense;
};

const updateExpenseService = async (id, title) => {
  await Expense.update({ title }, { where: { id } });

  const updatedExpense = await Expense.findByPk(id);

  return updatedExpense;
};

const deleteExpenseService = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  createExpenseService,
  findExpenseService,
  updateExpenseService,
  deleteExpenseService,
  getAllExpensesService,
  normalizeExpense,
};
