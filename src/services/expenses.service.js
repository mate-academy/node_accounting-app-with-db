'use strict';

const { Expenses } = require('../database/expensesTable');

const getAll = async() => {
  const expenses = await Expenses.findAll();

  return expenses;
};

const getById = async(id) => {
  const expense = await Expenses.findByPk(id);

  return expense;
};

const add = async(expense) => {
  const newExpense = await Expenses.create({
    ...expense,
  });

  return newExpense;
};

const update = async(id, expense) => {
  const [isUpdated] = await Expenses.update(
    { ...expense }, { where: { id } }
  );

  if (!isUpdated) {
    return;
  }

  const updatedExpense = await getById(id);

  return updatedExpense;
};

const remove = (id) => {
  const isDeleted = Expenses.destroy(
    { where: { id } }
  );

  return isDeleted;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
