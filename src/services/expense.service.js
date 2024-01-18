'use strict';

const { Expense } = require('../../db');
const { filterExpense } = require('../utils/filterExpense');

const getAll = async(userId, categories, from, to) => {
  const expenses = await Expense.findAll();

  return filterExpense(expenses,
    {
      userId,
      categories,
      from,
      to,
    });
};

const getById = async(id) => {
  try {
    const expense = await Expense.findByPk(id);

    return expense;
  } catch (e) {
    return e;
  }
};

const create = async(expense) => {
  const newExpense = await Expense.create({ ...expense });

  return newExpense;
};

const update = async(id, updatedExpense) => {
  await Expense.update(
    { ...updatedExpense },
    {
      where: {
        id,
      },
    },
  );

  const expense = getById(id);

  return expense;
};

const remove = async(id) => {
  try {
    await Expense.destroy({
      where: {
        id,
      },
    });
  } catch (e) {
    return e;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
