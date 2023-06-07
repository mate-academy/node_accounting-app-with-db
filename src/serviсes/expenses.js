'use strict';

const { Expense } = require('../models/expenses');

const getAll = () => Expense.findAll();

const getById = (expenseId) => Expense.findByPk(expenseId);

const add = async(expenseData) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = expenseData;
  const isDataValid = !userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note;

  if (isDataValid) {
    return null;
  }

  const newExpense = {
    ...expenseData,
  };

  await Expense.create({ ...newExpense });

  return newExpense;
};

const remove = async(id) => Expense.destroy({
  where: {
    id,
  },
});

const update = async(id, dataToChange) => {
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = dataToChange;
  const isDataValid = !spentAt
    || !title
    || !amount
    || !category
    || !note;

  if (isDataValid) {
    return null;
  }

  await Expense.update(
    { ...dataToChange },
    {
      where: { id },
    }
  );

  return Expense.findByPk(id);
};

module.exports = {
  getAll,
  add,
  getById,
  remove,
  update,
};
