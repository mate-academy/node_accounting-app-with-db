'use strict';

const { Expense } = require('../models/Expenses');

const normalize = ({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return {
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  };
};

const findAll = () => {
  return Expense.findAll({
    order: ['createdAt'],
  });
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const create = (expense) => {
  return Expense.create(expense);
};

const removeExpense = (id) => {
  return Expense.destroy({
    where: { id },
  });
};

const updateExpense = ({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return Expense.update({
    spentAt,
    title,
    amount,
    category,
    note,
  }, {
    where: { id },
  });
};

module.exports = {
  normalize,
  findAll,
  getById,
  create,
  removeExpense,
  updateExpense,
};
