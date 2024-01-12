'use strict';

const { filterExpenses } = require('./expenses.helper');
const { Expense } = require('../db');

const getAll = async queryParams => {
  const expenses = await Expense.findAll();

  if (Object.keys(queryParams).length === 0) {
    return expenses;
  }

  return filterExpenses(expenses, queryParams);
};

const getByID = async id => {
  try {
    const expense = await Expense.findByPk(id);

    return expense;
  } catch (err) {
    return null;
  }
};

const create = async expense => {
  const newExpense = await Expense.create({
    ...expense,
  });

  return newExpense;
};

const remove = async id => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const update = async(id, props) => {
  await Expense.update(
    { ...props },
    {
      where: {
        id,
      },
    },
  );

  const expense = await getByID(id);

  return expense;
};

module.exports = {
  getAll,
  getByID,
  create,
  remove,
  update,
};
