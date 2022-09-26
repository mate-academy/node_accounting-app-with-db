'use strict';

const { Expense } = require('../storage/models/Expense.model');

const getAll = async() => {
  const expenses = await Expense.findAll({
    order: [ 'createdAt' ],
  });

  return expenses;
};

const getById = async(id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const create = async(expenseData) => {
  const parsedDate = new Date(expenseData.date);

  if (parsedDate.toString() === 'Invalid Date') {
    return null;
  }

  const newExpense = await Expense.create({
    ...expenseData,
    date: parsedDate.toISOString(),
  });

  return newExpense;
};

const patchById = async(id, patchData) => {
  const foundExpense = await getById(id);

  if (!foundExpense) {
    return null;
  }

  const patchedExpense = await Expense.update(patchData, {
    where: { id },
  });

  return patchedExpense;
};

const removeById = async(id) => {
  const deleted = await Expense.destroy({
    where: { id },
  });

  return deleted;
};

module.exports = {
  getAll,
  getById,
  create,
  patchById,
  removeById,
};
