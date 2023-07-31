'use strict';

const { Expense } = require('./db');

const getAll = async(params) => {
  const {
    userId,
    categories,
    from,
    to,
  } = params;

  let expensesToReturn = await Expense.findAll();

  if (userId) {
    expensesToReturn = expensesToReturn
      .filter((expense) => expense.userId === parseInt(userId));
  }

  if (categories) {
    expensesToReturn = expensesToReturn
      .filter((expense) => categories.includes(expense.category));
  }

  if (from) {
    expensesToReturn = expensesToReturn
      .filter((expense) => expense.spentAt >= from);
  }

  if (to) {
    expensesToReturn = expensesToReturn
      .filter((expense) => expense.spentAt <= to);
  }

  return expensesToReturn;
};

const getOne = (id) => {
  return Expense.findByPk(id);
};

const add = (expense) => {
  return Expense.create(expense);
};

const update = async(id, expenseData) => {
  await Expense.update(expenseData, { where: { id } });

  return getOne(id);
};

const remove = async(id) => {
  await Expense.destroy({ where: { id } });

  return !!getOne(id);
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
