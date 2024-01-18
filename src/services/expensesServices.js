'use strict';

const { Expense } = require('../db');

const getAllExpenses = async(userId, categories, from, to) => {
  let preparedExpenses = await Expense.findAll();

  if (userId) {
    preparedExpenses
      = preparedExpenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    preparedExpenses = preparedExpenses.filter((expense) =>
      categories.includes(expense.category)
    );
  }

  if (from && to) {
    preparedExpenses = preparedExpenses.filter(
      (expense) =>
        new Date(expense.spentAt) >= new Date(from)
        && new Date(expense.spentAt) <= new Date(to)
    );
  }

  return preparedExpenses;
};

const getExpenseById = async(id) => {
  try {
    const expense = await Expense.findByPk(id);

    return expense;
  } catch (err) {
    return null;
  }
};

const postNewExpense = async({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const newExpense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return newExpense;
};

const deleteExpense = async(id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const updateExpense = async(id, title) => {
  await Expense.update(
    { title },
    {
      where: {
        id,
      },
    },
  );

  const expense = await getExpenseById(id);

  return expense;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  postNewExpense,
  deleteExpense,
  updateExpense,
};
