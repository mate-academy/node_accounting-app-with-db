'use strict';

const Expense = require('../models/expenses');

const normalize = ({
  id,
  userId,
  title,
  category,
  spentAt,
  amount,
  note,
}) => {
  return {
    id,
    userId,
    title,
    category,
    spentAt,
    amount,
    note,
  };
};

const getAll = async() => {
  const expenses = await Expense.findAll();

  return expenses;
};

const getOne = async(id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const add = async(data) => {
  const newExpense = await Expense.create({ ...data });

  return newExpense;
};

const update = async(id, data) => {
  await Expense.update({ ...data }, {
    where: {
      id,
    },
  });
};

const remove = async(id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  normalize,
  getAll,
  getOne,
  add,
  update,
  remove,
};
